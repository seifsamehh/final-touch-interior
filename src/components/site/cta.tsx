import Link from "next/link";

import { contact, type Copy } from "@/content/copy";
import { Arrow } from "./logo";

/** The closing call to action. There is no form: mail and the two social pages. */
export function Cta({ t }: { t: Copy["cta"] }) {
  const rows = [
    { label: t.mail, href: `mailto:${contact.mail}`, text: contact.mail, out: false },
    { label: t.instagram, href: contact.instagram.url, text: contact.instagram.label, out: true },
    { label: t.facebook, href: contact.facebook.url, text: contact.facebook.label, out: true },
  ];
  return (
    <section className="cta" id="contact" data-tone="night">
      <h2 className="d">{t.title}</h2>
      <p className="sig talk" data-view="draw">
        {t.talk}
      </p>
      <address>
      <ul className="links">
        {rows.map((r) => (
          <li key={r.href}>
            <span>{r.label}</span>
            <Link href={r.href} {...(r.out ? { target: "_blank", rel: "noopener" } : {})}>
              <bdi dir="ltr">{r.text}</bdi>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
      </address>
    </section>
  );
}
