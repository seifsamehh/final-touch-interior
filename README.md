# Final Touch

The website of Final Touch, an interior design and finishing company (Egypt, since 1996).
English and Arabic, six fields of work, no contact form: mail and social links only.

## Run it

Needs Node 24 and pnpm (through corepack).

```
corepack pnpm install
corepack pnpm dev         # http://localhost:3000
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
```

## Stack

Next.js (App Router), TypeScript, Tailwind CSS 4, shadcn (Button, Dialog), GSAP ScrollTrigger,
Locomotive Scroll 5, three.js.

## Where things are

| Path | What |
| --- | --- |
| `src/content/copy.ts` | Every word on the site, English and Arabic. |
| `src/content/services.ts` | The six fields and their photos (file, size, alt text in both languages). |
| `public/work/<field>/` | The photos. |
| `src/app/globals.css` | Colours and fonts (`@theme`), and the styles of the home page. |
| `public/fonts/` | The six font files (see Fonts below). |
| `src/app/[lang]/page.tsx` | Home page. |
| `src/app/[lang]/work/[service]/page.tsx` | One page for all six fields. |
| `src/components/home/motion.tsx` | Everything that moves on the home page, driven by scroll. |
| `src/motion/room.ts` | The 3D room in the hero. |
| `src/motion/wall.ts` | The 3D gallery wall. |
| `src/proxy.ts` | Sends `/` to `/ar` or `/en` by browser language. |
| `next.config.ts` | Redirects from the 2023 site's addresses. |
| `brand/` | Logo files and brand rules (`BRAND.md`). |

## To add a photo

Put the `.webp` in `public/work/<field>/`, then add one line to that field in `src/content/services.ts`
with its width, height and a description in both languages. The first photos of each list (`wall` of them)
also hang on the home page gallery.

## Fonts

All six are Google Fonts under the SIL Open Font License, served from `public/fonts` and declared in `src/app/globals.css`.
`next/font` is not used: it preloads per route, and this site needs it per language (`src/app/fonts.ts` lists the pair each language preloads).

| File | What is in it |
| --- | --- |
| `noto-serif-display-latin-*` | Latin, weight 300. As Google serves it. |
| `hanken-grotesk-latin-*` | Latin, cut to weights 400 to 500. |
| `markazi-text-ar-*` | Arabic letters U+0600 to U+06FF and the space, weight 400. |
| `readex-pro-ar-*` | Same letters, weights 400 to 500. |
| `aref-ruqaa-arabic-*`, `oooh-baby-latin-*` | The signature fonts, as Google serves them. Fetched after the first paint. |

A bolder weight, or a letter outside those ranges (Persian or Urdu letters, for example), will not show in the real font.
Cut the file again from the Google Fonts original with [`subset-font`](https://www.npmjs.com/package/subset-font),
then change its name in `globals.css` and `src/app/fonts.ts`. The file name ends in a hash because `/fonts` is cached for a year.

## Notes

- Set `NEXT_PUBLIC_SITE_URL` to the final domain when it is known (used for the sitemap and share links).
- With "reduce motion" on, smooth scrolling is off and scenes follow the scroll directly.
- Without WebGL, the hero shows a still photo and the gallery becomes a CSS wall.
