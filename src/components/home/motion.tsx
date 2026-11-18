"use client";

import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { num, type Lang } from "@/content/services";
import { reducedMotion, setTone } from "@/lib/scroll";
import { room } from "@/motion/room";
import { clamp, eo, io, lerp, seg, type Scene3D } from "@/motion/util";
import { wall, type Wall } from "@/motion/wall";

/**
 * Everything that moves on the home page. Each piece is a function of scroll progress (0..1),
 * fed by a GSAP ScrollTrigger; three.js is loaded only here and only in the browser.
 */
export function HomeMotion({ fallback }: { fallback: string }) {
  useEffect(() => {
    const still = reducedMotion(), rtl = () => document.documentElement.dir === "rtl";
    const one = <E extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<E>(s)!;
    const all = <E extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<E>(s)];
    const ups: (() => void)[] = [];
    let dead = false, scene: Scene3D | null = null, gl: Wall | null = null, flat = false; // flat: no WebGL, the CSS wall stands in

    const ctx = gsap.context(() => {});
    /** Feeds `up` the scroll progress of `el`: while it is pinned (default) or while it crosses the screen (`through`). */
    const drive = (el: HTMLElement, up: (p: number) => void, through = false) => {
      const s = { p: 0 }, run = () => up(s.p);
      ctx.add(() =>
        gsap.to(s, { p: 1, ease: "none", onUpdate: run, scrollTrigger: { trigger: el, start: through ? "top bottom" : "top top", end: through ? "bottom top" : "bottom bottom", scrub: still ? true : 0.5 } }),
      );
      ups.push(run);
      return run;
    };

    /* the room. While it loads, the logo is drawn on the wall (plain CSS); once both are done the drawing becomes the glass door. */
    const hero = one(".hero"), stage = one(".stage", hero), intro = { v: 0 };
    scene = room(hero, { intro: () => intro.v, rtl, onLit: (heroLit) => setTone({ heroLit }), fallback });
    const heroRun = drive(hero, (p) => scene?.up(p));
    const drawn = Promise.all(one(".door", stage).getAnimations({ subtree: true }).map((a) => a.finished.catch(() => {})));
    Promise.all([scene.ready, drawn]).then(() => {
      if (dead) return;
      stage.classList.add("live");
      ctx.add(() => gsap.to(intro, { v: 1, duration: still ? 0 : 2.4, ease: "none", onUpdate: heroRun }));
    });

    /* about: the lead lights up word by word, the wide photo tilts in, the signatures are written */
    const words = all(".lead span");
    drive(one(".lead"), (p) => { const k = seg(p, 0.14, 0.52) * words.length; words.forEach((w, i) => (w.style.opacity = String(lerp(0.16, 1, clamp(k - i))))); }, true);
    const wide = one(".wide"), wideImg = one("img", wide);
    drive(wide, (p) => {
      const k = io(seg(p, 0.04, 0.46));
      wide.style.clipPath = `inset(${((1 - k) * 6).toFixed(2)}% ${((1 - k) * 10).toFixed(2)}%)`;
      wide.style.transform = `translateZ(${((k - 1) * 260).toFixed(1)}px) rotateX(${((1 - k) * 16).toFixed(2)}deg)`;
      wideImg.style.transform = `scale(${(1.2 - 0.2 * k).toFixed(4)}) translateY(${((p - 0.5) * -5).toFixed(2)}%)`;
    }, true);
    all("[data-view=draw]").forEach((el) =>
      drive(el, (p) => { const k = ((1 - eo(seg(p, 0.12, 0.42))) * 104).toFixed(2); el.style.clipPath = rtl() ? `inset(-30% -4% -30% ${k}%)` : `inset(-30% ${k}% -30% -4%)`; }, true),
    );

    /* process: a corridor you walk down, pictures on the walls */
    {
      const st = one(".proc .stage"), imgs = all(".pimg", st), txt = all(".ptxt", st), n = imgs.length, GAP = 1500;
      drive(one(".proc"), (p) => {
        const raw = p * (n - 1), fl = Math.min(Math.floor(raw), n - 2), a = fl + io(seg(raw - fl, 0.2, 0.8)); // each step holds before the walk goes on
        const w = st.clientWidth, h = st.clientHeight, port = w / h < 0.9, dir = rtl() ? -1 : 1;
        imgs.forEach((s, i) => {
          const z = (a - i) * GAP, side = (i % 2 ? 1 : -1) * dir, o = clamp((z + 2700) / 1300) * clamp((620 - z) / 320) * (port && z < 0 ? clamp(1 + (z + 300) / 500) : 1); // upright, the next picture waits out of sight
          s.style.visibility = o > 0 ? "visible" : "hidden"; s.style.opacity = o.toFixed(3); s.style.zIndex = String(500 + Math.round(z / 10));
          s.style.transform = `translate(-50%,-50%) translate3d(${(port ? 0 : side * w * 0.22 * clamp(1 + z / GAP)).toFixed(1)}px,${(port ? -h * 0.15 : 0).toFixed(1)}px,${z.toFixed(1)}px) rotateY(${-side * (port ? 9 : 30)}deg)`;
        });
        txt.forEach((t, i) => { const o = clamp(1 - Math.abs(i - a) * 2.6); t.style.opacity = String(o); t.style.visibility = o ? "visible" : "hidden"; t.style.transform = `translateY(${((i - a) * 60).toFixed(1)}px)`; });
      });
    }

    /* gallery: titles, counter and focus order here; the wall itself is 3D (or CSS when WebGL is missing) */
    const drum = one(".drum"), dst = one(".stage", drum), arc = one(".arc", dst), plates = all(".plate", arc);
    {
      const titles = all(".dt", dst), descs = all(".dd", dst), count = one(".dcount", dst), fld = plates.map((p) => Number(p.dataset.f)), n = plates.length;
      let key = "", R = 0, step = 0, last: number | null = null;
      const lang = document.documentElement.lang as Lang;
      drive(drum, (p) => {
        const dir = rtl() ? -1 : 1, a = p * (n - 1), cur = Math.round(a), f = fld[cur];
        titles.forEach((t, i) => t.classList.toggle("on", i === f)); descs.forEach((t, i) => t.classList.toggle("on", i === f));
        count.textContent = `${num(cur + 1, lang, 2)} / ${num(n, lang, 2)}`;
        plates.forEach((pl, i) => (pl.tabIndex = Math.abs(i - a) < 0.6 ? 0 : -1));
        if (gl) { gl.set(a, dir, last === null ? 0 : p - last); last = p; return; }
        if (!flat) return;
        const w = plates[0].offsetWidth;
        if (key !== `${w}|${dir}`) { // plates sit on a circle and face its centre, where you stand
          key = `${w}|${dir}`; R = w * 2.5; step = ((w * 1.08) / R) * (180 / Math.PI);
          plates.forEach((pl, i) => (pl.style.transform = `rotateY(${(-i * step * dir).toFixed(3)}deg) translateZ(${-R}px) translate(-50%,-50%) translateY(${i % 2 ? 3.2 : -3.2}vh)`));
        }
        arc.style.transform = `translateZ(${R}px) rotateY(${(a * step * dir).toFixed(3)}deg)`;
        plates.forEach((pl, i) => { const ad = Math.abs(i - a), vis = ad * step < 52; pl.style.visibility = vis ? "visible" : "hidden"; if (vis) pl.style.filter = `brightness(${(1 - Math.min(ad, 1.5) * 0.34).toFixed(3)})`; });
      });
      // the wall's photos and its 3D code start loading three screens before you reach it, not with the page
      const hang = () => {
        all<HTMLImageElement>("img", arc).forEach((im) => (im.loading = "eager"));
        import("three").then((T) => {
          if (dead || gl) return;
          try { gl = wall(T, dst, one<HTMLCanvasElement>("canvas", dst), plates, still); dst.classList.add("gl"); } catch { flat = true; dst.classList.add("nogl"); }
          redraw();
        }).catch(() => { if (dead) return; flat = true; dst.classList.add("nogl"); redraw(); });
      };
      ctx.add(() => ScrollTrigger.create({ trigger: drum, start: "top 400%", once: true, onEnter: hang }));
    }

    /* workshop: three photos drift at different speeds and turn to face you */
    const phs = all(".ph");
    phs.forEach((el) => {
      const s = Number(el.dataset.s), r = Number(el.dataset.r);
      drive(el, (p) => { const k = 1 - eo(seg(p, 0.05, 0.5)); el.style.transform = `translate3d(0,${((0.5 - p) * s).toFixed(1)}px,${(-k * 240).toFixed(1)}px) rotateY(${(k * r).toFixed(2)}deg)`; }, true);
    });

    // positions are measured with the moving pieces at rest
    const rest = () => [wide, ...phs].forEach((e) => (e.style.transform = ""));
    const redraw = () => ups.forEach((u) => u());
    ScrollTrigger.addEventListener("refreshInit", rest);
    ScrollTrigger.addEventListener("refresh", redraw);
    redraw();
    document.fonts?.ready.then(() => !dead && ScrollTrigger.refresh());

    return () => {
      dead = true;
      ScrollTrigger.removeEventListener("refreshInit", rest);
      ScrollTrigger.removeEventListener("refresh", redraw);
      ctx.revert();
      scene?.dispose();
      gl?.dispose();
    };
  }, [fallback]);
  return null;
}
