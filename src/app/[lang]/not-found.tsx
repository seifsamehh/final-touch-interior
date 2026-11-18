"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { copy } from "@/content/copy";

export default function NotFound() {
  const lang = usePathname().startsWith("/ar") ? "ar" : "en";
  const t = copy[lang].missing;
  return (
    <main data-tone="night" className="grid min-h-svh content-center justify-items-start gap-6 bg-wine px-(--g) py-32">
      <h1 className="d text-[clamp(40px,7vw,96px)]">{t.title}</h1>
      <p className="max-w-[38ch] text-mute-w">{t.text}</p>
      <Button asChild>
        <Link href={`/${lang}`}>{t.home}</Link>
      </Button>
    </main>
  );
}
