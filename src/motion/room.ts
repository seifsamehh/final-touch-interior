import { roomScene, type Frame } from "./room-scene";
import { BEATS, clock, eo, io, seg, STARTS, type Scene3D } from "./util";

export type RoomEnv = {
  /** 0..1 over the first seconds after the room is ready: the wall lights up and the lamp behind the glass goes on. */
  intro: () => number;
  rtl: () => boolean;
  /** Called when the room's lamp goes on or off, so the header can change tone. */
  onLit: (lit: boolean) => void;
  /** Photo shown instead of the scene when WebGL is not available. */
  fallback: string;
};

// One drawing per canvas. A canvas can be handed to a worker only once, so the link outlives a remount of the component.
type Link = { post: (f: Frame) => void; ready: Promise<boolean>; onLamp: (xy: [number, number]) => void; kill: () => void; timer?: ReturnType<typeof setTimeout> };
const links = new WeakMap<HTMLCanvasElement, Link>();

function link(cv: HTMLCanvasElement, small: boolean, first: Frame): Link {
  const had = links.get(cv);
  if (had) { clearTimeout(had.timer); return had; }
  const L: Link = { post() {}, ready: Promise.resolve(false), onLamp() {}, kill() {} };
  if ("transferControlToOffscreen" in cv && typeof Worker !== "undefined") {
    // the usual case: a worker builds and draws the room, the page only sends it the scroll position
    let w: Worker | null = null, latest = first, dead = false;
    L.ready = new Promise((res) => {
      // started two frames in, once the headline is on screen, so the room's download never competes with it
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (dead) return res(false);
        const off = cv.transferControlToOffscreen();
        w = new Worker(new URL("./room.worker.ts", import.meta.url), { type: "module" });
        w.onmessage = (e: MessageEvent<{ ready?: boolean; fail?: boolean; lamp?: [number, number] }>) => { if (e.data.ready) res(true); else if (e.data.fail) res(false); else if (e.data.lamp) L.onLamp(e.data.lamp); };
        w.onerror = () => res(false);
        w.postMessage({ canvas: off, small, frame: latest }, [off]);
      }));
    });
    L.post = (frame) => { latest = frame; w?.postMessage({ frame }); };
    L.kill = () => { dead = true; w?.terminate(); };
  } else {
    // older browsers: the same room, drawn on the page
    let sc: ReturnType<typeof roomScene> | null = null;
    L.ready = Promise.all([import("three"), import("three/examples/jsm/environments/RoomEnvironment.js")])
      .then(async ([T, E]) => { const s = roomScene(T, E.RoomEnvironment, cv, small); await s.ready(first); sc = s; return true; })
      .catch(() => false);
    L.post = (f) => { if (sc) L.onLamp(sc.draw(f)); };
    L.kill = () => sc?.dispose();
  }
  links.set(cv, L);
  return L;
}

/** The hero: the words over the scene are moved here, the room itself is drawn by `roomScene`. */
export function room(el: HTMLElement, env: RoomEnv): Scene3D {
  const st = el.querySelector<HTMLElement>(".stage")!, cv = st.querySelector("canvas")!, flood = st.querySelector<HTMLElement>(".flood")!, door = st.querySelector<HTMLElement>(".door")!,
    open = st.querySelector<HTMLElement>(".open")!, beats = [...st.querySelectorAll<HTMLElement>(".beat")], caps = [...st.querySelectorAll<HTMLElement>(".cap")], lis = [...st.querySelectorAll<HTMLElement>(".stages li")];
  const fade = (e: HTMLElement, v: number, y: number) => {
    e.style.opacity = String(v); e.style.visibility = v ? "visible" : "hidden"; e.style.transform = `translateY(${y}px)`;
    e.style.filter = v < 1 && v > 0 ? `blur(${(1 - v) * 5}px)` : "none";
  };
  let lit = false, last = 0, lamp: [number, number] | null = null;

  function hud(p: number) { // the words over the scene
    const q = clock(p), o = 1 - seg(p, 0.02, 0.04);
    open.style.opacity = String(o); open.style.visibility = o ? "visible" : "hidden"; door.style.opacity = String(o);
    beats.forEach((b, i) => { const [a, z] = BEATS[i], inn = seg(p, a, a + 0.012), out = seg(p, z - 0.012, z); fade(b, inn * (1 - out), (1 - eo(inn)) * 30 - eo(out) * 24); });
    const cq = p < 0.14 ? -1 : q; let act = -1;
    caps.forEach((c, i) => {
      const a = STARTS[i], b = STARTS[i + 1] || 2, inn = seg(cq, a, a + 0.03), out = seg(cq, b - 0.03, b);
      if (cq >= a) act = i;
      fade(c, inn * (1 - out), (1 - eo(inn)) * 34 - eo(out) * 26);
    });
    lis.forEach((l, i) => (i === act ? l.setAttribute("aria-current", "step") : l.removeAttribute("aria-current")));
    const k = p < 0.11 ? 0 : io(seg(q, 0.9, 0.955));
    st.style.setProperty("--k", k.toFixed(3)); st.style.setProperty("--s", seg(p, 0.14, 0.17).toFixed(3));
    if (k > 0.6 !== lit) env.onLit((lit = k > 0.6));
    const f = p < 0.11 ? 0 : io(seg(q, 0.955, 1)), [x, y] = lamp ?? [st.clientWidth / 2, st.clientHeight * 0.4];
    flood.style.transform = `translate(${x}px,${y}px) scale(${(f * Math.hypot(st.clientWidth, st.clientHeight)) / 7})`;
  }
  const frame = (p: number): Frame => ({ p, intro: env.intro(), w: st.clientWidth, h: st.clientHeight, dpr: devicePixelRatio || 1, rtl: env.rtl() });

  const L = link(cv, Math.min(innerWidth, innerHeight) < 520, frame(0));
  L.onLamp = (xy) => { lamp = xy; if (last > 0.9) hud(last); }; // the flood of light follows the lamp, which the worker reports a moment later
  const ready = L.ready.then((ok) => {
    if (!ok) { st.classList.add("nogl"); st.style.backgroundImage = `url(${env.fallback})`; } // no WebGL: a still photo stands in, the words still run
    return ok;
  });

  return {
    ready,
    up(p) { last = p; if (st.clientWidth && st.clientHeight) L.post(frame(p)); hud(p); },
    dispose() { L.onLamp = () => {}; L.timer = setTimeout(() => { L.kill(); links.delete(cv); }, 200); },
  };
}
