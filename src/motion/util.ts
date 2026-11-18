export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Progress of p through the range a..b, clamped to 0..1. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const eo = (t: number) => 1 - Math.pow(1 - t, 3);
export const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// The hero's timetable, shared by the drawn room and the words over it.
export const STARTS = [0.05, 0.2, 0.36, 0.52, 0.68, 0.84]; // where each of the six stages begins, on the build clock
export const DONE = 0.954; // build clock value of the finished, lit room
export const BEATS = [[0.066, 0.1], [0.108, 0.152]]; // first line once you are through the door, second after the light is out
/** Scroll progress to build clock: outside the door the room is finished, inside it starts bare. */
export const clock = (p: number) => (p < 0.11 ? DONE : 0.03 + 0.97 * seg(p, 0.14, 1));

export type Three = typeof import("three");
/** `ready` resolves true when the first picture is drawn, false when the device cannot draw it. */
export type Scene3D = { up: (p: number) => void; dispose: () => void; ready: Promise<boolean> };
