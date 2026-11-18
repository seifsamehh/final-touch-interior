"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { Copy } from "@/content/copy";
import type { Lang } from "@/content/services";
import { HashLink } from "./hash-link";
import { Mark, Wordmark } from "./logo";

const SECTIONS = ["work", "about", "process", "workshop", "contact"] as const;

export function Header({ lang, t }: { lang: Lang; t: Copy["nav"] }) {
  const other: Lang = lang === "en" ? "ar" : "en";
  const swap = `/${other}${usePathname().slice(3)}`;
  return (
    <header className="hdr">
      <HashLink lang={lang} id="top" className="brand" aria-label="Final Touch">
        <Mark className="m" />
        <Wordmark className="w" />
      </HashLink>
      <div className="hend">
        <nav className="nav" aria-label={t.main}>
          {SECTIONS.map((id) => (
            <HashLink key={id} lang={lang} id={id}>
              {t[id]}
            </HashLink>
          ))}
        </nav>
        <Button asChild variant="bare" className="lang">
          {/* both languages on the logo's slanted tile; the filled half is the one you are reading. Not prefetched: that would also fetch the other language's fonts on every page. */}
          <Link href={swap} hrefLang={other} data-cur={lang} prefetch={false}>
            <span className="sr-only" lang={other}>
              {t.other}
            </span>
            <span aria-hidden="true" className={lang === "en" ? "on" : undefined}>
              EN
            </span>
            <span aria-hidden="true" className={lang === "ar" ? "on ar" : "ar"}>
              ع
            </span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
