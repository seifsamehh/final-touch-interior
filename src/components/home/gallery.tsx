"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Viewer, type Shot } from "@/components/site/viewer-lazy";
import { Button } from "@/components/ui/button";
import type { Copy } from "@/content/copy";
import { num, type Lang } from "@/content/services";

export type WallShot = Shot & { f: number };
export type WallField = { name: string; line: string; href: string };

/**
 * The gallery wall. The photos are real buttons here; <HomeMotion /> hangs them on the 3D wall
 * (or turns them as a CSS wall when WebGL is missing) and moves the titles and the counter.
 */
export function Gallery({ title, fields, shots, t, v }: { title: string; fields: WallField[]; shots: WallShot[]; t: Pick<Copy["work"], "how" | "all">; v: Copy["viewer"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const { lang } = useParams<{ lang: Lang }>();
  return (
    <section className="drum" id="work" data-tone="night">
      <div className="stage">
        <h2 className="sr-only">{title}</h2>
        <canvas aria-hidden="true" />
        <div className="dhead" aria-hidden="true">
          {fields.map((f) => (
            <p className="dt d" key={f.href}>
              {f.name}
            </p>
          ))}
        </div>
        <div className="arc">
          {shots.map((s, i) => (
            <Button variant="bare" className="plate" data-f={s.f} key={s.src} onClick={() => setOpen(i)}>
              <Image src={s.src} width={s.w} height={s.h} alt={s.alt} sizes="(max-aspect-ratio: 9/10) 76vw, 50vw" />
            </Button>
          ))}
        </div>
        <div className="dmeta">
          <span>
            {fields.map((f) => (
              <span className="dd" key={f.href}>
                <span>{f.line}</span>
                <Link href={f.href}>{t.all}</Link>
              </span>
            ))}
          </span>
          <span className="how">{t.how}</span>
          <span className="dcount">
            {num(1, lang, 2)} / {num(shots.length, lang, 2)}
          </span>
        </div>
      </div>
      <Viewer shots={shots} index={open} onIndex={setOpen} t={v} />
    </section>
  );
}
