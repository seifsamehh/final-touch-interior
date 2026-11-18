"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The motion code (GSAP, smooth scroll, the 3D room) is fetched once the first picture is on screen,
// so the page shows before any of it arrives. Until then the hero's entrance runs on CSS alone.
const Scroll = dynamic(() => import("./scroll").then((m) => m.Scroll), { ssr: false });
const HomeMotion = dynamic(() => import("../home/motion").then((m) => m.HomeMotion), { ssr: false });

function usePainted() {
  const [on, set] = useState(false);
  useEffect(() => {
    let b = 0;
    const a = requestAnimationFrame(() => (b = requestAnimationFrame(() => set(true))));
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, []);
  return on;
}

export function LateScroll() {
  const on = usePainted();
  // also the cue for the signature fonts, which are only used below the first screen (see globals.css)
  useEffect(() => { if (on) document.documentElement.classList.add("late"); }, [on]);
  return on ? <Scroll /> : null;
}
export const LateHomeMotion = (p: { fallback: string }) => (usePainted() ? <HomeMotion {...p} /> : null);
