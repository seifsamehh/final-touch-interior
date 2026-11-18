import { STROKES, TILE, VB_MARK, VB_WORD, WORD } from "./logo-paths";

/** The shapes of the logo, drawn once per page and reused by <Mark /> and <Wordmark />. */
export function LogoDefs() {
  return (
    <svg className="absolute size-0" aria-hidden="true">
      <defs>
        <polygon id="p-tile" points={TILE} />
        <path id="p-strokes" fillRule="evenodd" d={STROKES} />
        <path id="p-word" fillRule="evenodd" d={WORD} />
      </defs>
    </svg>
  );
}

/** The slanted tile with the handwritten FT. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={VB_MARK} aria-hidden="true">
      <use href="#p-tile" />
      <use className="k" href="#p-strokes" />
    </svg>
  );
}

/** "Final Touch" in the handwriting of the logo. */
export function Wordmark({ className, label }: { className?: string; label?: string }) {
  return (
    <svg className={className} viewBox={VB_WORD} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <use href="#p-word" />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  );
}
