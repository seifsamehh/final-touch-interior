# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- People in Egypt and the Arab countries who own a home, shop, office, hotel or garden that needs
  designing and finishing, and are choosing who to trust with it. (Inferred from the old site's copy,
  not confirmed by the owner.)
- They arrive mostly on a phone, from the company's Facebook or Instagram.
- Their job on the site: judge the work, see that their kind of project is covered, and get in touch.

## Product Purpose

The company site of Final Touch, an interior design and finishing company. It shows the work across
six fields and gets the visitor to contact the company. Success: the visitor writes, calls or follows.

## Positioning

Final Touch designs and also finishes: one team carries a space from drawing to the last detail.
Engineers and technicians with experience since 1996, working across Egypt and the Arab countries,
with the capability to manufacture the works themselves. (From the old site's About copy.)

## Operating Context

- Six fields, each with its own gallery: Residential, Commercial, Hotel, Administrative, Landscape,
  Furniture.
- Four named disciplines: Architectural Design, Interior Design, Landscape, Furniture.
- Two languages: English and Arabic (right-to-left), same pages.
- No contact form. Mail and social links sit in a closing call to action above the footer on every page
  (owner's decision, 2026-11-18).

## Capabilities and Constraints

- Stack chosen by Seif: Next.js, TypeScript, Tailwind CSS, shadcn, GSAP, Locomotive Scroll, three.js
  where needed.
- Open: phone / WhatsApp number (the old site has none), final domain.

## Brand Commitments

- Name: Final Touch. Arabic: فينال تاتش. Line: Interior Design & Finishing.
- The existing mark stays: handwritten FT on a slanted tile. It is redrawn clean, not redesigned.
- The old yellow (#ffed00), the old fonts and the old look are rejected by Seif.
- Must read as elegant and must not look AI-made (Seif).

## Evidence on Hand

- About copy in English and Arabic (`src/components/About.jsx`, `AboutArabic.jsx`).
- About 130 project photos in `src/assets` (`res-*`, `com-*`, `hotel-*`, `admin-*`, `land-*`,
  `furn-*`), mixed quality. Seif asked for the best to be curated; some look like stock images and
  must not be presented as the company's work.
- Logo rasters only: `public/logo512.png`, `src/assets/logo-light.webp`, `src/assets/final-touch-2.webp`.
- Mail finaltouch960@gmail.com; Facebook profile id 100089838618274; Instagram hfinaltouch2022.
- Absent, never to be invented: client names, testimonials, project counts, awards, prices.

## Product Principles

1. The work leads; the interface stays out of its way.
2. Finishing is the claim, so every detail of the site has to be finished too.
3. Both languages are first-class; Arabic is not a translation layer.
4. Nothing on the site is claimed that the company cannot show.
