"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Copy } from "@/content/copy";
import { num, type Lang } from "@/content/services";
import { lockScroll } from "@/lib/scroll";

export type Shot = { src: string; w: number; h: number; alt: string; label: string };

/** Full-screen photo viewer. Arrow keys and the two buttons step through; Escape, Close or a click on the photo closes. */
export function Viewer({ shots, index, onIndex, t }: { shots: Shot[]; index: number | null; onIndex: (i: number | null) => void; t: Copy["viewer"] }) {
  const open = index !== null, n = shots.length;
  const [shown, setShown] = useState(0); // keeps the photo on screen while the viewer fades out
  if (open && index !== shown) setShown(index);
  const shot = shots[shown];
  const { lang } = useParams<{ lang: Lang }>();
  const from = useRef<HTMLElement | null>(null); // the photo that opened the viewer gets the focus back
  useEffect(() => {
    lockScroll(open);
  }, [open]);
  const go = (d: number) => onIndex((shown + d + n) % n);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndex(null)}>
      <DialogContent
        aria-describedby={undefined}
        data-lenis-prevent
        onOpenAutoFocus={() => { from.current = document.activeElement as HTMLElement | null; }}
        onCloseAutoFocus={(e) => { e.preventDefault(); from.current?.focus({ preventScroll: true }); }}
        className="flex flex-col gap-3 p-[max(16px,2.4vw)]"
        onKeyDown={(e) => {
          const fwd = document.documentElement.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") go(e.key === fwd ? 1 : -1);
        }}
      >
        <div className="flex items-center justify-between gap-6">
          <DialogTitle className="text-sm text-mute-n">
            {shot.label}
            <span className="mx-3 inline-block h-px w-4 bg-current align-middle opacity-60" />
            <span className="text-on tabular-nums">
              {num(shown + 1, lang, 2)} / {num(n, lang, 2)}
            </span>
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="text">{t.close}</Button>
          </DialogClose>
        </div>
        <div className="relative min-h-0 flex-1 cursor-zoom-out" onClick={() => onIndex(null)}>
          <Image key={shot.src} src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-contain duration-500 animate-in fade-in-0" />
        </div>
        {n > 1 && (
          <div className="flex items-center justify-between gap-6">
            <Button variant="text" onClick={() => go(-1)}>
              {t.prev}
            </Button>
            <Button variant="text" onClick={() => go(1)}>
              {t.next}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
