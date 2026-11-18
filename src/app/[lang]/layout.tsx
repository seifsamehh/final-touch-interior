import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { LogoDefs } from "@/components/site/logo";
import { LateScroll } from "@/components/site/late";
import { copy } from "@/content/copy";
import { isLang, LANGS } from "@/content/services";
import { JsonLd, NAME, pageMeta, siteLd } from "@/lib/seo";
import { INDEX, SITE } from "@/lib/site";
import { PRELOAD } from "../fonts";
import "../globals.css";

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#170E10", colorScheme: "dark" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = copy[lang].meta;
  return {
    metadataBase: new URL(SITE),
    ...pageMeta(lang, { title: t.title, description: t.description }),
    title: { default: t.title, template: `%s | ${NAME}` },
    applicationName: NAME,
    authors: [{ name: NAME, url: SITE }],
    creator: NAME,
    publisher: NAME,
    category: lang === "ar" ? "تصميم داخلي" : "Interior design",
    robots: INDEX
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = copy[lang];
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>
        {/* React moves these into the head */}
        {PRELOAD[lang].map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={href} />
        ))}
        <JsonLd data={siteLd(lang)} />
        <LogoDefs />
        <div className="site">
          <Header lang={lang} t={t.nav} />
          {children}
          <Footer lang={lang} t={t.footer} />
        </div>
        <LateScroll />
      </body>
    </html>
  );
}
