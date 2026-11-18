import { notFound } from "next/navigation";

import { Gallery, type WallShot } from "@/components/home/gallery";
import { LateHomeMotion } from "@/components/site/late";
import { About, Hero, Process, Workshop } from "@/components/home/sections";
import { Cta } from "@/components/site/cta";
import { copy } from "@/content/copy";
import { isLang, photo, services } from "@/content/services";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = copy[lang];
  const fields = services.map((s) => ({ name: s.name[lang], line: s.line[lang], href: `/${lang}/work/${s.slug}` }));
  const shots: WallShot[] = services.flatMap((s, f) => s.photos.slice(0, s.wall).map((p) => ({ src: p.src, w: p.w, h: p.h, alt: p.alt[lang], label: s.name[lang], f })));
  return (
    <main>
      <Hero t={t.hero} />
      <About t={t.about} lang={lang} />
      <Process t={t.process} lang={lang} />
      <Gallery title={t.nav.work} fields={fields} shots={shots} t={{ how: t.work.how, all: t.work.all }} v={t.viewer} />
      <Workshop t={t.workshop} lang={lang} />
      <Cta t={t.cta} />
      <LateHomeMotion fallback={photo("res-1").src} />
    </main>
  );
}
