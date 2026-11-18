"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Copy } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Viewer, type Shot } from "./viewer-lazy";

/** A field's photos in two staggered columns that drift at different speeds. Each opens in the viewer. */
export function PhotoGrid({ shots, t }: { shots: Shot[]; t: Copy["viewer"] }) {
  const [open, setOpen] = useState<number | null>(null);
  // each photo goes to the shorter column, so the two end near the same height
  const cols: number[][] = shots.length > 1 ? [[], []] : [[]];
  const tall = cols.map(() => 0);
  shots.forEach((s, i) => {
    const c = tall.indexOf(Math.min(...tall));
    cols[c].push(i);
    tall[c] += s.h / s.w;
  });
  return (
    <>
      <div className={cn("grid items-start gap-[clamp(14px,2vw,30px)]", cols.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-[1100px]")}>
        {cols.map((col, c) => (
          <div key={c} className={cn("grid gap-[clamp(14px,2vw,30px)]", c === 1 && "sm:mt-[16vh]")} data-scroll={c ? "" : undefined} data-scroll-speed={c ? "0.06" : undefined}>
            {col.map((i) => (
              <Button variant="bare" className="shot" key={shots[i].src} data-scroll onClick={() => setOpen(i)}>
                <Image src={shots[i].src} width={shots[i].w} height={shots[i].h} alt={shots[i].alt} sizes="(max-width: 640px) 100vw, 50vw" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
              </Button>
            ))}
          </div>
        ))}
      </div>
      <Viewer shots={shots} index={open} onIndex={setOpen} t={t} />
    </>
  );
}
