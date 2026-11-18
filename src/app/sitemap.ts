import type { MetadataRoute } from "next";

import { LANGS, services } from "@/content/services";
import { SITE } from "@/lib/site";

// Every page in both languages, each pointing at its other language, with the photos of each field.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [{ path: "", images: [] as string[] }, ...services.map((s) => ({ path: `/work/${s.slug}`, images: s.photos.map((p) => `${SITE}${p.src}`) }))];
  return LANGS.flatMap((lang) =>
    pages.map((p) => ({
      url: `${SITE}/${lang}${p.path}`,
      alternates: { languages: { ...Object.fromEntries(LANGS.map((l) => [l, `${SITE}/${l}${p.path}`])), "x-default": `${SITE}/en${p.path}` } },
      ...(p.images.length && { images: p.images }),
    })),
  );
}
