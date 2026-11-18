# Final Touch brand kit

Interior Design & Finishing, since 1996. This folder holds the logo files and the rules for using them.
The website reads its colours and fonts from `src/app/globals.css`; keep the two in step.

## Logo

The logo is the original one, redrawn as clean vector from the old raster. Nothing was redesigned.

| File (in `logo/`) | Use |
| --- | --- |
| `mark-*.svg` | The slanted tile with the handwritten FT. Favicon, app icon, stamps, small sizes. |
| `wordmark-*.svg` | "Final Touch" in the logo's own handwriting. |
| `lockup-stacked-*.svg` | Tile above the wordmark. The original arrangement; use it when there is room. |
| `lockup-horizontal-*.svg` | Tile beside the wordmark. Headers and narrow strips. |
| `mark-one-colour.svg` | One colour, handwriting cut out of the tile. Engraving, embossing, single-colour print. |

Each comes in three colourways: `ink` (on light paper), `pearl` (on dark or burgundy), `oxblood` (on light paper, when the logo is the only colour on the page).

Rules:

- Keep clear space around the logo equal to the height of the tile's letter F.
- Smallest size: tile 24 px wide on screen, 8 mm in print. Below that, use the tile alone.
- Do not retype the wordmark in a font. No font matches the handwriting; always use the vector.
- Do not straighten the tile, recolour the handwriting separately, add shadows, or place the logo on a busy photo.
- The line "Interior Design & Finishing" is set in Hanken Grotesk, capitals, widely spaced, under or beside the lockup.

`source/` holds the three traced shapes the rest is built from. `preview/` holds the approved landing preview.

There is no Arabic wordmark. On Arabic pages the Latin logo stays as it is, as on the company's own signage.

## Colour

Burgundy is the signature, used the way a designer uses an accent wall: deep, in a few places, with neutral materials around it.

| Name | Hex | Role |
| --- | --- | --- |
| Night | `#170E10` | Dark ground. Gallery, footer, field pages. |
| Wine | `#34101A` | The burgundy wall. Entrance, process section. |
| Oxblood | `#4A1420` | Contact section. The brightest burgundy surface. |
| Mat | `#6E2130` | Burgundy as text on light paper (headings, the signature). Never as a large fill. |
| Plaster | `#EFE8DF` | Light ground. |
| Stone | `#E2D8CC` | Second light ground. |
| Ink | `#1F1517` | Text on light grounds. |
| Pearl | `#F1E9E3` | Text on dark and burgundy grounds. |
| Lamp | `#E9BE86` | Warm gold. Light only: the lamp, step numbers, a hover. Never a fill, never body text. |

Supporting greys for small text: `#5E4E4B` on light, `#B3A29D` on night, `#D0B8B3` on burgundy.

Rules: photos carry the colour, so grounds stay neutral or deep. Do not put green or blue pictures on a bright burgundy ground. Gold script on burgundy is not used.

## Type

| Role | Latin | Arabic |
| --- | --- | --- |
| Display (headlines) | Noto Serif Display, Light 300 | Markazi Text, Regular 400 |
| Text | Hanken Grotesk, Regular 400 | Readex Pro, Regular 400 |
| Signature (a few words at most) | Oooh Baby | Aref Ruqaa |

All six are free (SIL Open Font License) and served from the site itself.

- Headlines are sentence case, never all capitals. Small labels may be capitals with wide spacing.
- The signature font is for one short phrase per section at most ("since 1996", "Let's talk.").
- Arabic text never gets letter-spacing.

## Form

Square corners, hairline rules, no cards, no drop-shadow boxes. The slanted tile is the one recurring shape:
it is the door in the entrance, and the tick that marks the current stage.
