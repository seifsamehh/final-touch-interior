import Link from "next/link";

import { copy, type Copy } from "@/content/copy";
import { services, type Lang } from "@/content/services";
import { HashLink } from "./hash-link";
import { Mark, Wordmark } from "./logo";

export function Footer({ lang, t }: { lang: Lang; t: Copy["footer"] }) {
  return (
    <footer className="ftr" data-tone="night">
      <div className="lock">
        <Mark className="m" />
        <Wordmark className="w" label="Final Touch" />
        <span>Interior Design &amp; Finishing</span>
      </div>
      <nav aria-label={copy[lang].nav.work}>
      <ul className="ffields">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/${lang}/work/${s.slug}`}>{s.name[lang]}</Link>
          </li>
        ))}
      </ul>
      </nav>
      <p className="fine">
        <span>{t.line}</span>
        <br />
        <HashLink lang={lang} id="top" here>
          {t.top}
        </HashLink>
      </p>
    </footer>
  );
}
