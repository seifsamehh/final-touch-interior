"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import type { Lang } from "@/content/services";
import { scrollToId } from "@/lib/scroll";

/** A link to a section of the home page. On the home page it glides there; elsewhere it navigates. `here` targets the current page instead. */
export function HashLink({ lang, id, here, ...props }: { lang: Lang; id: string; here?: boolean } & Omit<ComponentProps<typeof Link>, "href">) {
  const home = `/${lang}`;
  const same = usePathname() === home || here;
  return (
    <Link
      href={here ? `#${id}` : id === "top" ? home : `${home}#${id}`}
      onClick={(e) => {
        if (!same) return;
        e.preventDefault();
        scrollToId(id);
      }}
      {...props}
    />
  );
}
