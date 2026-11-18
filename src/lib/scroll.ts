import type LocomotiveScroll from "locomotive-scroll";

// One smooth-scroll instance per page, owned by <Scroll />.
let loco: LocomotiveScroll | null = null;
export const setLoco = (l: LocomotiveScroll | null) => { loco = l; };

/** Freeze page scroll while the photo viewer is open. */
export const lockScroll = (on: boolean) => (on ? loco?.stop() : loco?.start());

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (loco) loco.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView();
}

// The header is light over dark sections and dark over light ones. The hero changes tone when its lamp goes on.
const tone = { cur: "night", heroLit: false, flow: false, bg: "" };
export function setTone(next: Partial<typeof tone>) {
  Object.assign(tone, next);
  const h = document.querySelector<HTMLElement>(".hdr");
  if (!h) return;
  h.classList.toggle("lit", tone.cur === "lit" || (tone.cur === "room" && tone.heroLit));
  h.classList.toggle("flow", tone.flow); // content scrolls under the header here: shade it in the section's colour
  h.style.setProperty("--hb", tone.bg);
}

export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
