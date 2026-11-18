import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/site/cta";
import { Arrow } from "@/components/site/logo";
import { PhotoGrid } from "@/components/site/photo-grid";
import { Button } from "@/components/ui/button";
import { copy } from "@/content/copy";
import { getService, isLang, LANGS, services } from "@/content/services";
import { fieldLd, JsonLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.flatMap((lang) => services.map((s) => ({ lang, service: s.slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[service]">): Promise<Metadata> {
  const { lang, service } = await params;
  const s = getService(service);
  if (!isLang(lang) || !s) return {};
  return pageMeta(lang, { title: `${s.name[lang]}: ${s.line[lang]}`, description: s.intro[lang], path: `/work/${s.slug}`, image: s.photos[0] });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/work/[service]">) {
  const { lang, service } = await params;
  const s = getService(service);
  if (!isLang(lang) || !s) notFound();
  const t = copy[lang];
  const next = services[(services.indexOf(s) + 1) % services.length];
  const shots = s.photos.map((p) => ({ src: p.src, w: p.w, h: p.h, alt: p.alt[lang], label: s.name[lang] }));
  return (
    <main id="top">
      <JsonLd data={fieldLd(lang, s)} />
      <section data-tone="night" className="bg-night px-(--g) pt-[clamp(84px,14vh,130px)] pb-[clamp(90px,16vh,200px)]">
        <Button asChild variant="text">
          <Link href={`/${lang}#work`}>{t.work.back}</Link>
        </Button>
        <div className="mt-5 overflow-hidden border-y border-on/25 py-[clamp(14px,3.4vh,40px)] text-center">
          <h1 className="d rise text-[clamp(46px,9.4vw,112px)]">{s.name[lang]}</h1>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-1 text-sm text-mute-n">
          <span>{s.line[lang]}</span>
          <span>{t.work.count(shots.length)}</span>
        </div>
        <p className="d mt-[clamp(44px,9vh,110px)] mb-[clamp(44px,9vh,110px)] max-w-[22em] text-[clamp(25px,3.2vw,46px)]">{s.intro[lang]}</p>
        <PhotoGrid shots={shots} t={t.viewer} />
      </section>
      <section data-tone="lit" className="bg-lit px-(--g) py-[clamp(70px,13vh,160px)] text-ink">
        <h2 className="text-sm text-mute-l">{t.work.next}</h2>
        <Link href={`/${lang}/work/${next.slug}`} className="d nextf mt-2 inline-flex items-baseline gap-[.3em] text-[clamp(46px,10vw,132px)] text-mat no-underline">
          {next.name[lang]}
          <Arrow />
        </Link>
      </section>
      <Cta t={t.cta} />
    </main>
  );
}
