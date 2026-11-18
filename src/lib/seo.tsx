import type { Metadata } from "next";

import { contact, copy } from "@/content/copy";
import type { Lang, Photo, Service } from "@/content/services";
import { services } from "@/content/services";
import { SITE } from "./site";

export const NAME = "Final Touch";
const ORG = `${SITE}/#org`;
const WEB = `${SITE}/#site`;

/** Head tags each page needs: canonical address, the other language, and the share card. */
export function pageMeta(lang: Lang, o: { title: string; description: string; path?: string; image?: Photo }): Metadata {
  const path = o.path ?? "";
  const shared = path ? `${o.title} | ${NAME}` : o.title;
  // a field shares its first photo; every other page shares the brand card
  const img = [o.image ? { url: o.image.src, width: o.image.w, height: o.image.h, alt: o.image.alt[lang] } : { url: "/opengraph-image.png", width: 1200, height: 630, alt: copy[lang].meta.title }];
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: `/${lang}${path}`, languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` } },
    openGraph: {
      type: "website",
      siteName: NAME,
      title: shared,
      description: o.description,
      url: `/${lang}${path}`,
      locale: lang === "ar" ? "ar_EG" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_EG",
      images: img,
    },
    twitter: { card: "summary_large_image", title: shared, description: o.description, images: img },
  };
}

/** Structured data, for search engines and AI assistants. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Who the company is and what it offers. No street address or phone is published yet, so none is stated. */
export function siteLd(lang: Lang) {
  const t = copy[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG,
        name: NAME,
        alternateName: "فينال تاتش",
        url: SITE,
        logo: `${SITE}/apple-icon.png`,
        image: `${SITE}/opengraph-image.png`,
        description: t.meta.description,
        slogan: t.hero.title,
        foundingDate: "1996",
        email: contact.mail,
        address: { "@type": "PostalAddress", addressCountry: "EG" },
        areaServed: [{ "@type": "Country", name: "Egypt" }, "Arab countries"],
        knowsLanguage: ["en", "ar"],
        knowsAbout: t.about.disciplines,
        sameAs: [contact.instagram.url, contact.facebook.url],
        contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: contact.mail, availableLanguage: ["English", "Arabic"] },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.nav.work,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name[lang], description: s.intro[lang], url: `${SITE}/${lang}/work/${s.slug}`, provider: { "@id": ORG } },
          })),
        },
      },
      { "@type": "WebSite", "@id": WEB, url: SITE, name: NAME, inLanguage: ["en", "ar"], publisher: { "@id": ORG } },
    ],
  };
}

/** One field of work: where it sits in the site, and its photos. */
export function fieldLd(lang: Lang, s: Service) {
  const t = copy[lang], url = `${SITE}/${lang}/work/${s.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NAME, item: `${SITE}/${lang}` },
          { "@type": "ListItem", position: 2, name: t.nav.work, item: `${SITE}/${lang}#work` },
          { "@type": "ListItem", position: 3, name: s.name[lang], item: url },
        ],
      },
      {
        "@type": "ImageGallery",
        "@id": `${url}#gallery`,
        url,
        name: `${s.name[lang]}: ${s.line[lang]}`,
        description: s.intro[lang],
        inLanguage: lang,
        isPartOf: { "@id": WEB },
        publisher: { "@id": ORG },
        image: s.photos.map((p) => ({ "@type": "ImageObject", contentUrl: `${SITE}${p.src}`, width: p.w, height: p.h, caption: p.alt[lang] })),
      },
    ],
  };
}
