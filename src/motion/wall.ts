import type * as THREE from "three";

import { clamp, eo, lerp, type Three } from "./util";

/*
 * The gallery. Photos hang as bent panels on a curved wall in a dark room with a polished floor.
 * The wall ripples and the camera leans and pulls back with scroll speed, then settles.
 * `plates` are the real buttons (kept in the DOM for keyboard and screen readers); a click on a panel clicks its button.
 * Throws when WebGL is not available: the caller keeps the CSS wall.
 */

const RAD = 5.4, H = 2.2, W = (H * 4) / 3, STEP = (W + 0.36) / RAD, GAP = 0.07;

const VS = `uniform float uVel,uRefl;varying vec2 vUv;varying float vX;void main(){vUv=uv;vec4 wp=modelMatrix*vec4(position,1.);
wp.y+=sin(wp.x*.7)*uVel*.42*(1.-2.*uRefl);wp.z-=cos(clamp(wp.x*.42,-1.57,1.57))*abs(uVel)*1.1;vX=wp.x;gl_Position=projectionMatrix*viewMatrix*wp;}`;
const FS = `uniform sampler2D map;uniform vec4 uUv;uniform float uRefl,uHi,uFocus;varying vec2 vUv;varying float vX;void main(){
vec3 c=texture2D(map,vUv*uUv.xy+uUv.zw).rgb*(1.-smoothstep(1.3,4.8,abs(vX))*.6)*(1.+uHi*.1);
vec2 d=min(vUv,1.-vUv);if(uFocus>.5&&min(d.x*1.333,d.y)<.012)c=vec3(.914,.745,.525);
gl_FragColor=vec4(c,uRefl>.5?pow(1.-vUv.y,2.4)*.2:1.);}`;

export type Wall = {
  /** a = position along the wall in photos, dir = 1 or -1 (right-to-left), dp = scroll progress change since the last call. */
  set: (a: number, dir: number, dp: number) => void;
  dispose: () => void;
};

export function wall(T: Three, st: HTMLElement, cv: HTMLCanvasElement, plates: HTMLElement[], still: boolean): Wall {
  const R = new T.WebGLRenderer({ canvas: cv, antialias: true });
  R.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75)); R.setClearColor(0x150d0f);
  const S = new T.Scene(), cam = new T.PerspectiveCamera(38, 1, 0.1, 60), ring = new T.Group(); S.add(ring);
  const geo = new T.PlaneGeometry(1, 1, 28, 1), pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) { const g = (pos.getX(i) * W) / RAD; pos.setXYZ(i, Math.sin(g) * RAD, pos.getY(i) * H, -Math.cos(g) * RAD); }
  geo.computeBoundingSphere();
  const uVel = { value: 0 };
  let a = 0, dir = 1, velT = 0, velS = 0, running = false, dead = false, lw = 0, lh = 0;

  const panels = plates.map((pl, i) => {
    // The page's <img> is responsive (srcset), so its reported size is not its pixel size; the texture gets its own copy of the same file, from cache.
    const img = pl.querySelector("img")!, pic = new Image(), tex = new T.Texture(pic); tex.minFilter = T.LinearFilter; tex.generateMipmaps = false;
    const u = { map: { value: tex }, uUv: { value: new T.Vector4(1, 1, 0, 0) }, uVel, uRefl: { value: 0 }, uHi: { value: 0 }, uFocus: { value: 0 } };
    const m = new T.Mesh(geo, new T.ShaderMaterial({ uniforms: u, vertexShader: VS, fragmentShader: FS, side: T.DoubleSide }));
    const r = new T.Mesh(geo, new T.ShaderMaterial({ uniforms: { ...u, uRefl: { value: 1 } }, vertexShader: VS, fragmentShader: FS, side: T.DoubleSide, transparent: true, depthWrite: false }));
    r.scale.y = -1; r.position.y = -H - GAP; m.add(r); m.userData.i = i; ring.add(m);
    pic.onload = () => { // fill the 4:3 panel like object-fit: cover
      const ia = pic.naturalWidth / pic.naturalHeight, pa = 4 / 3, sx = ia > pa ? pa / ia : 1, sy = ia > pa ? 1 : ia / pa;
      u.uUv.value.set(sx, sy, (1 - sx) / 2, (1 - sy) / 2); tex.needsUpdate = true; kick();
    };
    const copy = () => { pic.src = img.currentSrc || img.src; };
    if (img.complete && img.naturalWidth) copy(); else img.addEventListener("load", copy, { once: true });
    pl.addEventListener("focus", () => { u.uFocus.value = 1; kick(); }); pl.addEventListener("blur", () => { u.uFocus.value = 0; kick(); });
    return m;
  });
  const hi = (m: THREE.Mesh) => (m.material as THREE.ShaderMaterial).uniforms.uHi;

  function render() {
    const w = st.clientWidth, h = st.clientHeight;
    if (!w || !h) return;
    const port = w / h < 0.9, sp = Math.abs(velS), rise = eo(clamp(a / 0.7));
    if (w !== lw || h !== lh) { lw = w; lh = h; R.setSize(w, h, false); cam.aspect = w / h; }
    cam.fov = (port ? 60 : 38) + sp * 6; cam.updateProjectionMatrix();
    cam.position.set(velS * 0.5 * dir, lerp(-0.25, 0.5, rise) - sp * 0.12, lerp(3.4, 1.7, rise) + sp * 1.2); // walks up to the wall on the way in, pulls back and leans when you scroll fast
    cam.lookAt(0, lerp(0.3, 0.42, rise), -RAD); cam.rotation.z = -velS * 0.05 * dir;
    ring.rotation.y = a * STEP * dir; uVel.value = velS;
    panels.forEach((m, i) => { m.rotation.y = -i * STEP * dir; m.visible = Math.abs(i - a) * STEP < 1.3; });
    R.render(S, cam);
  }
  function loop() {
    if (dead) return;
    velS += (velT - velS) * 0.1; velT *= 0.7; render();
    if (Math.abs(velS) > 0.002 || Math.abs(velT) > 0.002) requestAnimationFrame(loop); else { running = false; velS = velT = 0; render(); }
  }
  function kick() { if (!running && !dead) { running = true; requestAnimationFrame(loop); } }

  const ray = new T.Raycaster(), m2 = new T.Vector2(); let hov = -1;
  const pick = (e: MouseEvent) => {
    const r = cv.getBoundingClientRect(); m2.set(((e.clientX - r.left) / r.width) * 2 - 1, 1 - ((e.clientY - r.top) / r.height) * 2); ray.setFromCamera(m2, cam);
    const hit = ray.intersectObjects(panels.filter((m) => m.visible), false)[0]; return hit ? (hit.object.userData.i as number) : -1;
  };
  const hover = (i: number) => { if (i === hov) return; hov = i; cv.style.cursor = i < 0 ? "" : "zoom-in"; panels.forEach((m, k) => (hi(m).value = k === i ? 1 : 0)); kick(); };
  cv.addEventListener("pointermove", (e) => hover(pick(e))); cv.addEventListener("pointerleave", () => hover(-1));
  cv.addEventListener("click", (e) => { const i = pick(e); if (i >= 0) plates[i].click(); });

  return {
    set(na, ndir, dp) { a = na; dir = ndir; if (still) { velS = velT = 0; render(); } else { velT = clamp(dp * 75, -1, 1); kick(); } },
    dispose() { dead = true; R.dispose(); R.forceContextLoss(); },
  };
}
