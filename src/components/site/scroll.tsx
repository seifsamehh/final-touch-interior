"use client";

import type LocomotiveScroll from "locomotive-scroll";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { reducedMotion, setLoco, setTone } from "@/lib/scroll";

/** Smooth scrolling (Locomotive Scroll) tied to GSAP ScrollTrigger, and the light or dark tone of the header. Set up again on every page. */
export function Scroll() {
  const pathname = usePathname();
  useEffect(() => {
    let dead = false, loco: LocomotiveScroll | null = null;
    setTone({ cur: "night", heroLit: false, flow: false, bg: "" });
    const tones = gsap.utils.toArray<HTMLElement>("[data-tone]").map((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 40px", end: "bottom 40px", onToggle: (s) => s.isActive && setTone({ cur: el.dataset.tone, flow: !el.querySelector(".stage"), bg: getComputedStyle(el).backgroundColor }) }),
    );
    if (!reducedMotion())
      import("locomotive-scroll").then(({ default: Loco }) => {
        if (dead) return;
        loco = new Loco({ lenisOptions: { lerp: 0.09 }, scrollCallback: () => ScrollTrigger.update() });
        setLoco(loco);
      });
    return () => {
      dead = true;
      tones.forEach((t) => t.kill());
      loco?.destroy();
      setLoco(null);
    };
  }, [pathname]);
  return null;
}
