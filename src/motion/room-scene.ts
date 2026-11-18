import type * as THREE from "three";

import { STROKES, TILE } from "@/components/site/logo-paths";
import { clamp, clock, eo, io, lerp, seg, STARTS, type Three } from "./util";

/*
 * The hero, drawn. You stand outside a burgundy wall; the logo's tile is a glass door in it.
 * Scrolling walks you through the door into the finished room, the light goes out,
 * the room is bare, and the rest of the scroll builds it back layer by layer.
 *
 * Nothing here touches the page, so the same code runs in a worker (the usual case) or on the page.
 */

/** Everything one picture depends on. */
export type Frame = { p: number; intro: number; w: number; h: number; dpr: number; rtl: boolean };
type Ctx = CanvasRenderingContext2D;

const P = { night: 0x170e10, wall: 0x3e111b, concrete: 0x868079, plaster: 0xefe6da, floor: 0x8a5c3e, wood: 0x5d3a23, sofa: 0xdacdbd, chair: 0x4a121d, rug: 0xa59182, stone: 0xeae2d7, metal: 0xc9a066, moon: 0xb4c2f0, lamp: 0xffcf96, pearl: 0xf1e9e3 };
const PI = Math.PI; // light intensities were tuned on three's old scale, which was PI times brighter

// build clock, camera x y z, look-at x y z
const SHOTS = [
  [0, -0.6, 1.45, 6.7, 0.3, 1.22, -3],
  [0.05, -0.4, 1.45, 6.3, 0.1, 1.25, -3],
  [0.19, 1.7, 1.3, 5, -2.8, 1.35, -0.6], // bare shell: turn to the window and the moonlight
  [0.28, 1.3, 0.75, 4.4, -0.6, 1.9, -3], // plaster: low, looking up the wall as it rises
  [0.35, 0.3, 1, 4.8, 0, 2.75, -0.6], // and up to the ceiling as it crosses
  [0.43, -1.5, 0.38, 5.7, 0.5, 0.2, -2.6], // flooring: down at board level
  [0.51, -0.5, 1, 4.8, 0, 0.9, -3],
  [0.6, -1.4, 1.5, 2.4, 0.5, 1.45, -3], // joinery: close along the slat wall
  [0.67, 1.1, 1.4, 2.9, 1.9, 1, -3], // the console arrives
  [0.74, 2.5, 2, 4.7, -0.3, 0.45, -1.2], // furniture: from a high corner, looking down
  [0.82, -2.3, 1.25, 3.7, 0.3, 0.7, -1.4], // round to the other side at eye height
  [0.89, -0.8, 1.3, 4.9, 0, 1.8, -1.1], // the lamp comes down
  [0.955, 0.28, 1.5, 4.5, 0, 1.42, -3], // wide: the finished room
  [1, 0.2, 1.6, 3.4, 0, 1.72, -3],
];
const cr = (a: number, b: number, c: number, d: number, t: number) => 0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (3 * b - a - 3 * c + d) * t * t * t);

export function roomScene(T: Three, Env: new () => THREE.Scene, cv: HTMLCanvasElement | OffscreenCanvas, small: boolean) {
  const R = new T.WebGLRenderer({ canvas: cv as HTMLCanvasElement, antialias: true, powerPreference: "high-performance" });
  R.toneMapping = T.ACESFilmicToneMapping; R.toneMappingExposure = 1.12;
  R.shadowMap.enabled = true; R.shadowMap.type = T.PCFShadowMap; R.localClippingEnabled = true;
  R.setClearColor(0x030202);
  const S = new T.Scene(), cam = new T.PerspectiveCamera(36, 1, 0.1, 80);
  const col = (hex: number) => new T.Color(hex);
  // soft light from all around, so stone, brass, glass and the polished floor have something to reflect
  { const pm = new T.PMREMGenerator(R); S.environment = pm.fromScene(new Env(), 0.04).texture; pm.dispose(); }

  /* surfaces: every texture is painted here, so nothing is downloaded */
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const mk = (w: number, h: number) => (typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(w, h) : Object.assign(document.createElement("canvas"), { width: w, height: h })) as HTMLCanvasElement;
  const paint = (w: number, h: number, fn: (x: Ctx) => void, rx = 1, ry = 1) => {
    const c = mk(w, h); fn(c.getContext("2d") as Ctx);
    const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rx, ry); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
  };
  const speck = (x: Ctx, w: number, h: number, amt: number) => { // fine grain
    const d = x.getImageData(0, 0, w, h), a = d.data;
    for (let i = 0; i < a.length; i += 4) { const n = (rnd() - 0.5) * amt; a[i] += n; a[i + 1] += n; a[i + 2] += n; }
    x.putImageData(d, 0, 0);
  };
  const clouds = (x: Ctx, w: number, h: number, n: number, r0: number, r1: number, al: number) => { // soft patches, wrapped so the tile repeats without a seam
    for (let i = 0; i < n; i++) {
      const cx = rnd() * w, cy = rnd() * h, r = lerp(r0, r1, rnd()), c = rnd() < 0.5 ? "0,0,0" : "255,255,255";
      for (const ox of [-w, 0, w]) for (const oy of [-h, 0, h]) {
        if (cx + ox + r < 0 || cx + ox - r > w || cy + oy + r < 0 || cy + oy - r > h) continue;
        const g = x.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, r); g.addColorStop(0, `rgba(${c},${al})`); g.addColorStop(1, `rgba(${c},0)`);
        x.fillStyle = g; x.fillRect(0, 0, w, h);
      }
    }
  };
  const flat = (x: Ctx, w: number, h: number, c: string) => { x.fillStyle = c; x.fillRect(0, 0, w, h); };
  const plasterT = paint(256, 256, (x) => { flat(x, 256, 256, "#f0f0f0"); clouds(x, 256, 256, 46, 30, 90, 0.02); speck(x, 256, 256, 9); }, 2.4, 1);
  const concreteT = paint(512, 512, (x) => {
    flat(x, 512, 512, "#cdcdcd"); clouds(x, 512, 512, 80, 30, 150, 0.045);
    for (let i = 0; i < 520; i++) { x.fillStyle = `rgba(0,0,0,${0.08 + rnd() * 0.22})`; x.beginPath(); x.arc(rnd() * 512, rnd() * 512, 0.4 + rnd() * 1.5, 0, 7); x.fill(); } // pores
    x.fillStyle = "rgba(0,0,0,.16)"; x.fillRect(0, 255, 512, 1.5); x.fillRect(255, 0, 1.5, 512); // formwork seams
    speck(x, 512, 512, 20);
  }, 3, 1.2);
  const woodT = paint(256, 1024, (x) => {
    flat(x, 256, 1024, "#d2d2d2");
    for (let i = 0; i < 250; i++) { // grain running the length of the board
      const x0 = rnd() * 256, dx = (rnd() - 0.5) * 26;
      x.strokeStyle = rnd() < 0.22 ? `rgba(255,255,255,${0.04 + rnd() * 0.06})` : `rgba(0,0,0,${0.03 + rnd() * 0.12})`; x.lineWidth = 0.4 + rnd() * 2.2;
      x.beginPath(); x.moveTo(x0, -10); x.bezierCurveTo(x0 + dx, 300, x0 - dx, 720, x0 + dx * 0.5, 1034); x.stroke();
    }
    for (let k = 0; k < 2; k++) { const cx = 40 + rnd() * 176, cy = 120 + rnd() * 780; x.strokeStyle = "rgba(0,0,0,.09)"; x.lineWidth = 1.4; for (let r = 3; r < 20; r += 3) { x.beginPath(); x.ellipse(cx, cy, r, r * 2.7, 0, 0, 7); x.stroke(); } }
    speck(x, 256, 1024, 6);
  });
  const weaveT = paint(64, 64, (x) => {
    for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) { const v = ((i + j) & 1 ? 236 : 198) + (rnd() - 0.5) * 22; x.fillStyle = `rgb(${v},${v},${v})`; x.fillRect(i * 4, j * 4, 4, 4); }
  }, 22, 22);
  const marbleT = paint(512, 512, (x) => {
    flat(x, 512, 512, "#f4f2ee"); clouds(x, 512, 512, 30, 60, 170, 0.035);
    for (let i = 0; i < 11; i++) { // veins: wandering lines with a soft edge
      let px = rnd() * 512, py = rnd() * 512, a = rnd() * 6.28;
      x.strokeStyle = `rgba(104,97,92,${0.1 + rnd() * 0.3})`; x.lineWidth = 0.5 + rnd() * 2; x.shadowColor = "rgba(104,97,92,.5)"; x.shadowBlur = 4 + rnd() * 9;
      x.beginPath(); x.moveTo(px, py); for (let k = 0; k < 28; k++) { a += (rnd() - 0.5) * 0.9; px += Math.cos(a) * 22; py += Math.sin(a) * 22; x.lineTo(px, py); } x.stroke();
    }
    x.shadowBlur = 0;
  });
  const rugT = paint(256, 256, (x) => {
    flat(x, 256, 256, "#dcdcdc");
    for (let j = 0; j < 256; j += 2) { x.fillStyle = `rgba(0,0,0,${0.03 + rnd() * 0.07})`; x.fillRect(0, j, 256, 1); }
    x.strokeStyle = "rgba(0,0,0,.2)"; x.lineWidth = 5; x.strokeRect(13, 13, 230, 230); x.lineWidth = 1; x.strokeRect(22, 22, 212, 212);
    speck(x, 256, 256, 16);
  }, 1 / 3.7, 1 / 2.6);
  rugT.offset.set(0.5, 0.5);
  const skyT = paint(512, 512, (x) => {
    const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, "#070b18"); g.addColorStop(1, "#27324d"); x.fillStyle = g; x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 140; i++) { x.fillStyle = `rgba(255,255,255,${0.15 + rnd() * 0.6})`; x.fillRect(rnd() * 512, rnd() * 400, 1.1, 1.1); }
    const m = x.createRadialGradient(300, 150, 0, 300, 150, 230); m.addColorStop(0, "rgba(230,236,255,.98)"); m.addColorStop(0.07, "rgba(230,236,255,.95)"); m.addColorStop(0.1, "rgba(190,204,246,.3)"); m.addColorStop(1, "rgba(190,204,246,0)");
    x.fillStyle = m; x.fillRect(0, 0, 512, 512);
  });
  // black-to-clear ramps: where two surfaces meet, and where furniture stands, light does not reach
  const blobT = paint(64, 64, (x) => { const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, "rgba(0,0,0,.95)"); g.addColorStop(0.55, "rgba(0,0,0,.5)"); g.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = g; x.fillRect(0, 0, 64, 64); });
  const edgeT = paint(4, 64, (x) => { const g = x.createLinearGradient(0, 0, 0, 64); g.addColorStop(0, "rgba(0,0,0,.6)"); g.addColorStop(0.35, "rgba(0,0,0,.2)"); g.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = g; x.fillRect(0, 0, 4, 64); });
  const beamT = paint(64, 64, (x) => { // a shaft of light: brightest at the window, soft at its sides
    const g = x.createLinearGradient(0, 0, 0, 64); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(1, "rgba(255,255,255,.12)"); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    x.globalCompositeOperation = "destination-in"; const s = x.createLinearGradient(0, 0, 64, 0); s.addColorStop(0, "rgba(0,0,0,0)"); s.addColorStop(0.3, "rgba(0,0,0,1)"); s.addColorStop(0.7, "rgba(0,0,0,1)"); s.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = s; x.fillRect(0, 0, 64, 64);
  });
  const haloT = paint(128, 128, (x) => { const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, "rgba(255,255,255,.85)"); g.addColorStop(0.22, "rgba(255,255,255,.3)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, 128, 128); });
  const vary = (t: THREE.CanvasTexture, rx: number, ry: number) => { const c = t.clone(); c.repeat.set(rx, ry); c.offset.set(rnd(), rnd()); return c; };

  const M = (hex: number, o?: THREE.MeshStandardMaterialParameters) => new T.MeshStandardMaterial({ color: col(hex), roughness: 0.9, metalness: 0, ...o });
  const cloth = (hex: number, sheen: number) => new T.MeshPhysicalMaterial({ color: col(hex), roughness: 1, bumpMap: weaveT, bumpScale: 0.6, sheen: 0.45, sheenRoughness: 0.55, sheenColor: col(hex).lerp(col(0xffffff), sheen) });
  const ghost = (map: THREE.Texture, o?: THREE.MeshBasicMaterialParameters) => new T.MeshBasicMaterial({ map, transparent: true, depthWrite: false, ...o });
  const add = (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, par?: THREE.Object3D) => {
    const o = new T.Mesh(g, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; (par || S).add(o); return o;
  };
  /** A flat picture laid in the scene: it neither casts nor receives shadow. */
  const lay = (w: number, d: number, m: THREE.Material, x: number, y: number, z: number, rx: number, rz: number, par?: THREE.Object3D) => {
    const o = new T.Mesh(new T.PlaneGeometry(w, d), m); o.position.set(x, y, z); o.rotation.set(rx, 0, rz); (par || S).add(o); return o;
  };
  const box = (w: number, h: number, d: number) => new T.BoxGeometry(w, h, d);
  const rbox = (w: number, h: number, d: number, r: number) => { // soft-edged block, base at y 0
    const b = Math.min(r * 0.6, h / 2 - 0.004), W = w - 2 * b, D = d - 2 * b, c = Math.min(r, W / 2 - 0.001, D / 2 - 0.001), s = new T.Shape();
    s.moveTo(-W / 2 + c, -D / 2); s.lineTo(W / 2 - c, -D / 2); s.quadraticCurveTo(W / 2, -D / 2, W / 2, -D / 2 + c);
    s.lineTo(W / 2, D / 2 - c); s.quadraticCurveTo(W / 2, D / 2, W / 2 - c, D / 2);
    s.lineTo(-W / 2 + c, D / 2); s.quadraticCurveTo(-W / 2, D / 2, -W / 2, D / 2 - c);
    s.lineTo(-W / 2, -D / 2 + c); s.quadraticCurveTo(-W / 2, -D / 2, -W / 2 + c, -D / 2);
    const g = new T.ExtrudeGeometry(s, { depth: h - 2 * b, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 3, curveSegments: 6 });
    g.rotateX(-Math.PI / 2); g.translate(0, b, 0); return g;
  };
  const lathe = (pts: number[][]) => new T.LatheGeometry(pts.map((a) => new T.Vector2(a[0], a[1])), 28);

  const wallM = M(P.concrete, { map: concreteT, bumpMap: concreteT, bumpScale: 1.4 }), slabT = vary(concreteT, 3, 4), slabM = M(P.concrete, { map: slabT, bumpMap: slabT, bumpScale: 1.4 }); slabM.color.multiplyScalar(0.82);
  const riseP = new T.Plane(new T.Vector3(0, -1, 0), 0), ceilP = new T.Plane(new T.Vector3(0, 0, -1), -3.2),
    plasterM = M(P.plaster, { map: plasterT, bumpMap: plasterT, bumpScale: 0.5, clippingPlanes: [riseP] }), plasterC = M(P.plaster, { map: plasterT, clippingPlanes: [ceilP] }),
    plankM = [0, 1, 2].map((i) => { const t = vary(woodT, 1, 1), m = M(P.floor, { map: t, bumpMap: t, bumpScale: 0.35, roughness: 0.42 }); m.color.multiplyScalar(1 - i * 0.07); return m; }),
    slatT = vary(woodT, 0.5, 0.6), woodM = M(P.wood, { map: slatT, roughness: 0.5 }), woodD = M(P.wood, { roughness: 0.7 }), sofaM = cloth(P.sofa, 0.5), chairM = cloth(P.chair, 0.3),
    rugM = M(P.rug, { map: rugT, bumpMap: rugT, bumpScale: 0.8, roughness: 1 }), stoneM = M(P.stone, { map: marbleT, roughness: 0.16, side: T.DoubleSide }),
    metalM = M(P.metal, { roughness: 0.3, metalness: 1, side: T.DoubleSide }),
    trimM = M(P.plaster, { roughness: 0.75 }), darkM = M(0x0b0b0c, { roughness: 0.6 }), globeM = M(0xf2efe8, { roughness: 0.3, emissive: col(P.lamp), emissiveIntensity: 0 });
  woodD.color.multiplyScalar(0.5);

  // shell: 7.2 m wide, 3 m high; one window in the left wall
  add(box(7.6, 0.2, 10.4), slabM, 0, -0.1, 2);
  add(box(7.6, 0.2, 10.4), wallM, 0, 3.1, 2);
  add(box(7.6, 3, 0.2), wallM, 0, 1.5, -3.1);
  add(box(0.2, 3, 10.4), wallM, 3.7, 1.5, 2);
  add(box(0.2, 0.55, 10.4), wallM, -3.7, 0.275, 2); add(box(0.2, 0.45, 10.4), wallM, -3.7, 2.775, 2);
  add(box(0.2, 2, 1.7), wallM, -3.7, 1.55, -2.15); add(box(0.2, 2, 5.9), wallM, -3.7, 1.55, 4.05);
  const sky = new T.Mesh(new T.PlaneGeometry(8, 6), new T.MeshBasicMaterial({ map: skyT })); sky.position.set(-5.2, 1.6, 0); sky.rotation.y = Math.PI / 2; S.add(sky);

  // plaster: a skin just inside the walls, revealed from the floor up
  const skin = (w: number, h: number, x: number, y: number, z: number, ry: number, m: THREE.Material = plasterM) => {
    const o = new T.Mesh(new T.PlaneGeometry(w, h), m); o.position.set(x, y, z); o.rotation.y = ry; o.receiveShadow = true; S.add(o); return o;
  };
  skin(7.2, 3, 0, 1.5, -2.995, 0); skin(10, 3, 3.595, 1.5, 2, -Math.PI / 2);
  skin(10, 0.55, -3.595, 0.275, 2, Math.PI / 2); skin(10, 0.45, -3.595, 2.775, 2, Math.PI / 2);
  skin(1.7, 2, -3.595, 1.55, -2.15, Math.PI / 2); skin(5.9, 2, -3.595, 1.55, 4.05, Math.PI / 2);
  skin(7.2, 10, 0, 2.995, 2, 0, plasterC).rotation.x = Math.PI / 2;

  // where wall meets floor and ceiling the room is a shade darker
  const edgeM = ghost(edgeT, { opacity: 0.85 });
  lay(7.2, 0.8, edgeM, 0, 0.034, -2.6, -PI / 2, 0); lay(10, 0.8, edgeM, 3.2, 0.034, 2, -PI / 2, -PI / 2); lay(10, 0.8, edgeM, -3.2, 0.034, 2, -PI / 2, PI / 2);
  lay(7.2, 0.7, edgeM, 0, 2.99, -2.65, PI / 2, PI); lay(10, 0.7, edgeM, 3.25, 2.99, 2, PI / 2, -PI / 2); lay(10, 0.7, edgeM, -3.25, 2.99, 2, PI / 2, PI / 2);

  // floor
  const planks: THREE.Mesh[] = [], PW = 0.24;
  for (let i = 0; i < 30; i++) { const m = add(box(PW - 0.012, 0.03, 10), plankM[i % 3], -3.6 + PW / 2 + i * PW, 0.015, 2); m.castShadow = false; m.userData.o = i / 29; planks.push(m); }

  // joinery
  // the back skirting stops at the slat panel: two faces in one plane flicker
  const skirts = [add(box(1.89, 0.12, 0.03), trimM, -2.655, 0.06, -2.98), add(box(1.89, 0.12, 0.03), trimM, 2.655, 0.06, -2.98), add(box(0.03, 0.12, 10), trimM, 3.58, 0.06, 2), add(box(0.03, 0.12, 10), trimM, -3.58, 0.06, 2)];
  const backing = add(box(3.42, 2.76, 0.03), woodD, 0, 1.38, -2.98);
  const slats: THREE.Mesh[] = []; for (let i = 0; i < 21; i++) { const s = add(box(0.075, 2.7, 0.06), woodM, -1.6 + i * 0.16, 1.35, -2.935); s.userData.o = Math.abs(i - 10) / 10; slats.push(s); }
  const frame = (cx: number, w: number, h: number) => {
    const g = new T.Group(), t = 0.05, d = 0.035;
    add(box(w, t, d), trimM, 0, h / 2, 0, g); add(box(w, t, d), trimM, 0, -h / 2, 0, g); add(box(t, h, d), trimM, -w / 2, 0, 0, g); add(box(t, h, d), trimM, w / 2, 0, 0, g);
    g.position.set(cx, 1.6, -2.98); S.add(g); return g;
  };
  const frames = [frame(-2.62, 1.3, 2), frame(2.62, 1.3, 2)];
  const win = new T.Group();
  add(box(0.07, 0.07, 2.5), woodM, 0, 1.03, 0, win); add(box(0.07, 0.07, 2.5), woodM, 0, -1.03, 0, win);
  add(box(0.07, 2.1, 0.07), woodM, 0, 0, -1.23, win); add(box(0.07, 2.1, 0.07), woodM, 0, 0, 1.23, win); add(box(0.045, 2, 0.045), woodM, 0, 0, 0, win);
  { const pane = lay(2.4, 2, M(0xa9bccf, { transparent: true, opacity: 0.13, roughness: 0.03, depthWrite: false }), -0.02, 0, 0, 0, 0, win); pane.rotation.y = PI / 2; } // glass: all it does is catch a reflection
  win.position.set(-3.62, 1.55, -0.1); S.add(win);
  const cons = new T.Group();
  add(box(1.3, 0.1, 0.36), darkM, 0, 0.05, 0, cons); add(box(1.42, 0.58, 0.42), woodM, 0, 0.39, 0, cons); add(box(1.46, 0.03, 0.46), stoneM, 0, 0.695, 0, cons);
  add(lathe([[0, 0], [0.07, 0], [0.11, 0.1], [0.09, 0.24], [0.045, 0.34], [0.06, 0.4]]), stoneM, 0.36, 0.71, 0, cons);
  cons.position.set(2.6, 0, -2.72); S.add(cons);

  // furniture, each piece with the soft shadow it stands in
  const blobM = ghost(blobT, { opacity: 0.6 });
  const rug = add(rbox(3.7, 0.025, 2.6, 0.02), rugM, 0, 0.03, -0.9); rug.castShadow = false;
  const sofa = new T.Group();
  add(rbox(2.6, 0.34, 0.98, 0.08), sofaM, 0, 0.1, 0, sofa); add(rbox(2.6, 0.64, 0.26, 0.1), sofaM, 0, 0.38, -0.36, sofa);
  add(rbox(0.24, 0.5, 0.98, 0.09), sofaM, -1.18, 0.2, 0, sofa); add(rbox(0.24, 0.5, 0.98, 0.09), sofaM, 1.18, 0.2, 0, sofa);
  for (const x of [-0.71, 0, 0.71]) { add(rbox(0.69, 0.16, 0.66, 0.07), sofaM, x, 0.42, 0.12, sofa); add(rbox(0.66, 0.4, 0.16, 0.07), sofaM, x, 0.56, -0.2, sofa).rotation.x = -0.18; }
  add(rbox(0.42, 0.42, 0.13, 0.06), chairM, -0.78, 0.58, -0.02, sofa).rotation.set(-0.3, 0.25, 0);
  add(rbox(0.38, 0.38, 0.12, 0.06), chairM, 0.86, 0.58, 0, sofa).rotation.set(-0.3, -0.3, 0);
  for (const [x, z] of [[-1.2, -0.4], [1.2, -0.4], [-1.2, 0.4], [1.2, 0.4]]) add(new T.CylinderGeometry(0.025, 0.02, 0.1, 10), metalM, x, 0.05, z, sofa);
  lay(3.3, 1.7, blobM, 0, 0.06, 0.05, -PI / 2, 0, sofa);
  sofa.position.set(0, 0, -2.25); S.add(sofa);
  const chair = (x: number, ry: number) => {
    const g = new T.Group();
    add(rbox(0.82, 0.3, 0.8, 0.09), chairM, 0, 0.14, 0, g); add(rbox(0.82, 0.5, 0.2, 0.09), chairM, 0, 0.4, -0.3, g);
    add(rbox(0.16, 0.36, 0.8, 0.07), chairM, -0.33, 0.3, 0, g); add(rbox(0.16, 0.36, 0.8, 0.07), chairM, 0.33, 0.3, 0, g); add(rbox(0.5, 0.12, 0.52, 0.05), chairM, 0, 0.42, 0.08, g);
    for (const [a, b] of [[-0.32, -0.3], [0.32, -0.3], [-0.32, 0.3], [0.32, 0.3]]) add(new T.CylinderGeometry(0.02, 0.015, 0.14, 8), metalM, a, 0.07, b, g);
    lay(1.3, 1.3, blobM, 0, 0.06, 0, -PI / 2, 0, g);
    g.position.set(x, 0, -0.55); g.rotation.y = ry; S.add(g); return g;
  };
  const chL = chair(-1.95, 0.95), chR = chair(1.95, -0.95);
  const table = new T.Group();
  add(new T.CylinderGeometry(0.34, 0.4, 0.3, 40), metalM, 0, 0.15, 0, table); add(new T.CylinderGeometry(0.64, 0.64, 0.045, 56), stoneM, 0, 0.322, 0, table);
  add(box(0.3, 0.035, 0.21), chairM, -0.2, 0.362, 0.1, table).rotation.y = 0.4; add(box(0.26, 0.03, 0.19), sofaM, -0.2, 0.394, 0.1, table).rotation.y = 0.1;
  add(lathe([[0, 0], [0.06, 0], [0.13, 0.05], [0.15, 0.08]]), metalM, 0.22, 0.345, -0.12, table);
  lay(1.7, 1.7, blobM, 0, 0.062, 0, -PI / 2, 0, table);
  table.position.set(0, 0, -0.8); S.add(table);
  lay(1.9, 0.9, blobM, 0, 0.036, 0.08, -PI / 2, 0, cons);

  // the lamp: three globes
  const lamp = new T.Group(), glow = new T.PointLight(col(P.lamp), 0, 20, 1.1);
  for (const [x, y, z, r] of [[0, 0, 0, 0.17], [0.27, 0.24, 0.06, 0.12], [-0.22, 0.36, -0.05, 0.1]]) {
    add(new T.CylinderGeometry(0.005, 0.005, 3, 6), darkM, x, y + 1.5 + r, z, lamp).castShadow = false;
    add(new T.SphereGeometry(r, 36, 24), globeM, x, y, z, lamp).castShadow = false;
    add(new T.CylinderGeometry(0.028, 0.04, 0.05, 14), metalM, x, y + r + 0.012, z, lamp).castShadow = false;
  }
  const haloM = new T.SpriteMaterial({ map: haloT, color: col(P.lamp), transparent: true, opacity: 0, depthWrite: false, blending: T.AdditiveBlending });
  const halo = new T.Sprite(haloM); halo.scale.set(2.8, 2.8, 1);
  lamp.add(halo, glow); glow.position.set(0.02, 0.12, 0); halo.position.set(0.02, 0.12, 0);
  glow.castShadow = !small; glow.shadow.mapSize.set(1024, 1024); glow.shadow.bias = -0.004; glow.shadow.radius = 5;
  lamp.position.set(0, 2.02, -0.85); S.add(lamp);

  // the door: the logo's tile cut through a burgundy wall, tinted glass in it, the handwriting on the glass
  const TS = 3.3 / 902, tcx = 1384, tcy = 329.5, WZ = 8.2;
  const tile = TILE.split(" ").map((s) => s.split(",").map(Number)).map(([x, y]) => [(x - tcx) * TS, (tcy - y) * TS]);
  const wsh = new T.Shape(); wsh.moveTo(-34, -14); wsh.lineTo(34, -14); wsh.lineTo(34, 18); wsh.lineTo(-34, 18); wsh.lineTo(-34, -14);
  const hole = new T.Path(), gsh = new T.Shape();
  tile.forEach(([x, y], i) => { if (i) { hole.lineTo(x, y); gsh.lineTo(x, y); } else { hole.moveTo(x, y); gsh.moveTo(x, y); } }); hole.closePath(); gsh.closePath(); wsh.holes.push(hole);
  const door = new T.Group(); door.position.set(0, 1.5, WZ); S.add(door);
  { const t = vary(plasterT, 0.4, 0.4); door.add(new T.Mesh(new T.ExtrudeGeometry(wsh, { depth: 0.34, bevelEnabled: false }), M(P.wall, { roughness: 0.6, map: t, bumpMap: t, bumpScale: 0.4, envMapIntensity: 0.2 }))); }
  const glassM = new T.MeshBasicMaterial({ color: col(P.wall), transparent: true, opacity: 0.6, depthWrite: false });
  const glass = new T.Mesh(new T.ShapeGeometry(gsh), glassM); glass.position.z = 0.17; door.add(glass);
  const handT = paint(1040, 686, (x) => { x.translate(-919, 13); x.fillStyle = "#fff"; x.fill(new Path2D(STROKES), "evenodd"); });
  const handM = new T.MeshBasicMaterial({ map: handT, color: col(P.pearl), transparent: true, depthWrite: false, toneMapped: false });
  const hand = new T.Mesh(new T.PlaneGeometry(1040 * TS, 686 * TS), handM);
  hand.position.set((1439 - tcx) * TS, (tcy - 330) * TS, 0.36); hand.renderOrder = 2; door.add(hand);
  const wash = new T.PointLight(col(0xffd2a8), 0, 30, 0.2); wash.position.set(-3.4, 4.6, WZ + 6.5); S.add(wash);

  // light: cool moon through the window first, the warm lamp at the end
  const cool = col(0x7f95c4), warm = col(0xffe6c8);
  const hemi = new T.HemisphereLight(cool.clone(), col(0x1a1c24), 0.5 * PI); S.add(hemi);
  const moon = new T.DirectionalLight(col(P.moon), 2 * PI); moon.position.set(-9.5, 5.6, 1.9); moon.target.position.set(0, 0, -0.2); S.add(moon, moon.target);
  moon.castShadow = true; moon.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  Object.assign(moon.shadow.camera, { left: -3.8, right: 8.1, top: 5, bottom: -2.8, near: 3, far: 17 }); moon.shadow.bias = -0.0005; moon.shadow.normalBias = 0.03; moon.shadow.radius = 3;
  const fill = new T.DirectionalLight(col(0xd5dde8), 0.24 * PI); fill.position.set(0.5, 2, 9); S.add(fill);
  // moonlight hanging in the dusty air of the bare room
  const beamM = ghost(beamT, { color: col(P.moon), blending: T.AdditiveBlending, side: T.DoubleSide, opacity: 0 });
  for (const y of [2.5, 1.95, 1.4, 0.85]) {
    const k = y / 5.6, g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute([-3.6, y, -1.25, -3.6, y, 1.05, -3.6 + 9.5 * k, 0.02, 1.05 - 2.1 * k, -3.6 + 9.5 * k, 0.02, -1.25 - 2.1 * k], 3));
    g.setAttribute("uv", new T.Float32BufferAttribute([0, 1, 1, 1, 1, 0, 0, 0], 2)); g.setIndex([0, 1, 2, 0, 2, 3]);
    S.add(new T.Mesh(g, beamM));
  }
  // the finished room: a light washing down the slats, and its glow on the ceiling above them
  const graze = new T.SpotLight(col(P.lamp), 0, 7, 0.95, 1, 1.1); graze.position.set(0, 2.94, -2.3); graze.target.position.set(0, 0, -2.96); S.add(graze, graze.target);
  const coveM = ghost(haloT, { color: col(P.lamp), blending: T.AdditiveBlending, opacity: 0 });
  lay(5, 2.6, coveM, 0, 2.985, -2.6, PI / 2, 0);

  const sv: number[] = [], v3 = new T.Vector3(); let lw = 0, lh = 0, lr = 0;
  const grow = (o: THREE.Object3D, k: number, hgt: number) => { o.visible = k > 0; o.scale.y = Math.max(k, 0.001); o.position.y = (hgt * k) / 2; };
  const carry = (o: THREE.Object3D, k: number, z: number) => { o.visible = k > 0; o.position.z = lerp(10.5, z, eo(k)); };

  /** Puts everything where it belongs for one moment of the scroll. */
  function pose({ p, intro, w, h, dpr, rtl }: Frame) {
    const pr = Math.min(dpr || 1, small ? 1.5 : 1.75);
    if (w !== lw || h !== lh || pr !== lr) { lw = w; lh = h; lr = pr; R.setPixelRatio(pr); R.setSize(w, h, false); cam.aspect = w / h; }
    const port = w / h < 0.9, q = clock(p), outside = p < 0.11;
    cam.fov = port ? 58 : w / h < 1.35 ? 45 : 36; cam.updateProjectionMatrix();
    if (outside) { // from the wall, through the door
      const a = io(seg(p, 0.012, 0.1));
      cam.position.set(lerp(0, -0.6, a), lerp(1.5, 1.45, a), lerp(port ? 18.6 : 16, 6.7, a));
      const sh = 1 - io(seg(p, 0.012, 0.07)), side = rtl ? -1 : 1; // lens shift: the door stands beside the headline, then centres as you walk in
      if (port) cam.setViewOffset(w, h, 0, h * 0.13 * sh, w, h); else cam.setViewOffset(w, h, -side * w * 0.2 * sh, h * (h > 600 ? 0.14 : 0.02) * sh, w, h);
      cam.lookAt(lerp(0, 0.3, a), lerp(1.5, 1.22, a), -3);
    } else {
      cam.clearViewOffset();
      let i = 0; while (i < SHOTS.length - 2 && q > SHOTS[i + 1][0]) i++; // one camera shot per stage, joined by a smooth curve
      const k0 = SHOTS[Math.max(i - 1, 0)], k1 = SHOTS[i], k2 = SHOTS[i + 1], k3 = SHOTS[Math.min(i + 2, SHOTS.length - 1)], t = seg(q, k1[0], k2[0]);
      for (let j = 1; j < 7; j++) sv[j] = cr(k0[j], k1[j], k2[j], k3[j], t);
      cam.position.set(clamp(sv[1], -3.2, 3.2), clamp(sv[2], 0.3, 2.6), clamp(sv[3], 1.8, 6.8));
      cam.lookAt(sv[4], sv[5], sv[6]);
    }
    door.visible = outside; wash.intensity = outside ? 0.85 * PI * eo(clamp(intro * 1.6)) * (1 - seg(p, 0.06, 0.095)) : 0;
    glassM.opacity = 0.6 * (1 - seg(p, 0.02, 0.07)); handM.opacity = 1 - seg(p, 0.035, 0.075);

    const t1 = seg(q, STARTS[1], STARTS[1] + 0.13); // plaster rises, then crosses the ceiling
    riseP.constant = lerp(-0.01, 3.05, io(seg(t1, 0, 0.75))); ceilP.constant = lerp(-3.2, 7.3, io(seg(t1, 0.55, 1)));
    const t2 = seg(q, STARTS[2], STARTS[2] + 0.14); // boards slide in from behind the camera
    planks.forEach((m) => { const k = eo(seg(t2, m.userData.o * 0.62, m.userData.o * 0.62 + 0.38)); m.visible = k > 0; m.position.z = lerp(13, 2, k); });
    const t3 = seg(q, STARTS[3], STARTS[3] + 0.14);
    skirts.forEach((s) => grow(s, eo(seg(t3, 0, 0.25)), 0.12)); grow(backing, eo(seg(t3, 0.05, 0.4)), 2.76);
    slats.forEach((s) => grow(s, eo(seg(t3, 0.15 + s.userData.o * 0.3, 0.5 + s.userData.o * 0.3)), 2.7));
    frames.forEach((f, i) => { const k = eo(seg(t3, 0.4 + i * 0.1, 0.8 + i * 0.1)); f.visible = k > 0; f.scale.set(1, Math.max(k, 0.001), 1); });
    { const k = eo(seg(t3, 0.25, 0.65)); win.visible = k > 0; win.scale.set(1, Math.max(k, 0.001), 1); }
    { const k = eo(seg(t3, 0.5, 1)); cons.visible = k > 0; cons.position.z = lerp(9, -2.72, k); }
    const t4 = seg(q, STARTS[4], STARTS[4] + 0.14);
    { const k = eo(seg(t4, 0, 0.3)); rug.visible = k > 0; rug.scale.x = Math.max(k, 0.001); }
    carry(sofa, seg(t4, 0.08, 0.6), -2.25); carry(chL, seg(t4, 0.3, 0.8), -0.55); carry(chR, seg(t4, 0.4, 0.9), -0.55); carry(table, seg(t4, 0.52, 1), -0.8);

    // the light goes out as you cross the threshold, and the room is bare when the moon finds it
    const D = outside ? 1 - seg(p, 0.088, 0.104) : seg(p, 0.116, 0.152);
    const drop = eo(seg(q, STARTS[5], STARTS[5] + 0.06)), on = io(seg(q, STARTS[5] + 0.06, STARTS[5] + 0.115)) * (outside ? eo(clamp(intro * 1.5)) : 1);
    lamp.visible = drop > 0; lamp.position.y = lerp(4.9, 2.02, drop);
    glow.intensity = on * 3.6 * PI * D; globeM.emissiveIntensity = on * 1.5 * D; haloM.opacity = on * 0.55 * D;
    moon.intensity = lerp(2.5, 0.3, on) * PI * D; hemi.intensity = lerp(0.32, 0.2, on) * PI * D; hemi.color.copy(cool).lerp(warm, on); fill.intensity = (outside ? 0.3 : 0.09) * PI * D;
    S.environmentIntensity = lerp(0.1, 0.34, on) * D;
    graze.intensity = on * 9 * PI * D; coveM.opacity = on * 0.3 * D; beamM.opacity = (1 - on) * 0.04 * D * (outside ? 0 : 1);
    R.toneMappingExposure = lerp(1.1, 1, on);
  }
  /** Where the lamp is on screen, in px: the page's flood of light starts there. */
  const lampAt = (): [number, number] => { v3.setFromMatrixPosition(lamp.matrixWorld).project(cam); return [(v3.x * 0.5 + 0.5) * lw, (-v3.y * 0.5 + 0.5) * lh]; };

  return {
    /** Builds every shader without blocking, then draws the first picture. */
    async ready(f: Frame) { pose(f); await R.compileAsync(S, cam); R.render(S, cam); },
    draw(f: Frame) { pose(f); R.render(S, cam); return lampAt(); },
    dispose() { R.dispose(); R.forceContextLoss(); },
  };
}
