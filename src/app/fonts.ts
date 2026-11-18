import type { Lang } from "@/content/services";

// The fonts are served from public/fonts and declared in globals.css (see the note there).
// Each language preloads the pair its first screen is set in; the rest arrive after the first paint.
export const PRELOAD: Record<Lang, string[]> = {
  en: ["/fonts/noto-serif-display-latin-1351cd41.woff2", "/fonts/hanken-grotesk-latin-9fa901a8.woff2"],
  ar: ["/fonts/markazi-text-ar-812f5b52.woff2", "/fonts/readex-pro-ar-530fa6dc.woff2"],
};
