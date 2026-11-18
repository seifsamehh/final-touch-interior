"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentProps } from "react";

import type { Viewer as FullViewer } from "./viewer";

export type { Shot } from "./viewer";

// The viewer and the dialog code under it are not part of the page's first load.
const Full = dynamic(() => import("./viewer").then((m) => m.Viewer), { ssr: false });

/** The photo viewer, mounted the first time a photo is opened. Its code is fetched a few seconds after the page, so the first click does not wait for it. */
export function Viewer(p: ComponentProps<typeof FullViewer>) {
  const [used, setUsed] = useState(false);
  if (p.index !== null && !used) setUsed(true);
  useEffect(() => {
    const t = setTimeout(() => void import("./viewer"), 3000);
    return () => clearTimeout(t);
  }, []);
  return used ? <Full {...p} /> : null;
}
