import * as T from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { roomScene, type Frame } from "./room-scene";

// The hero's room is built and drawn here, off the page's own thread, so loading it never freezes scrolling or typing.
let scene: ReturnType<typeof roomScene> | null = null, next: Frame | null = null, queued = false;
const tick: (fn: () => void) => void = typeof requestAnimationFrame === "function" ? requestAnimationFrame : (fn) => setTimeout(fn, 16);
const paint = () => { queued = false; if (scene && next) postMessage({ lamp: scene.draw(next) }); };

onmessage = async (e: MessageEvent<{ canvas?: OffscreenCanvas; small?: boolean; frame: Frame }>) => {
  const d = e.data;
  next = d.frame;
  if (d.canvas) {
    try {
      const s = roomScene(T, RoomEnvironment, d.canvas, !!d.small);
      await s.ready(d.frame);
      scene = s; postMessage({ ready: true }); paint();
    } catch {
      postMessage({ fail: true });
    }
  } else if (!queued) { queued = true; tick(paint); } // several scroll events in one frame draw once
};
