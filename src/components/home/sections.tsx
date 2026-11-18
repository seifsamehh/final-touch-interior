import Image from "next/image";

import { STROKES, TILE, VB_MARK } from "@/components/site/logo-paths";
import { copy, type Copy } from "@/content/copy";
import { num, photo, planPhoto, type Lang, type Photo } from "@/content/services";

// The markup of the home page. Everything that moves is driven from <HomeMotion />, by class name.

const Inc = ({ items }: { items: string[] }) =>
  items.length ? (
    <ul className="inc">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  ) : null;

const Pic = ({ p, lang, sizes }: { p: Photo; lang: Lang; sizes: string }) => <Image src={p.src} width={p.w} height={p.h} alt={p.alt[lang]} sizes={sizes} />;

/** The door, then the room being finished. */
export function Hero({ t }: { t: Copy["hero"] }) {
  return (
    <section className="hero" id="top" data-tone="room">
      <div className="stage">
        <canvas aria-hidden="true" />
        {/* the loader: the logo drawn on the wall, exactly where the 3D door will stand, so one becomes the other */}
        <div className="door" aria-hidden="true">
          <div>
            <svg viewBox={VB_MARK}>
              <polygon className="t" points={TILE} pathLength={1} />
            </svg>
            <svg viewBox={VB_MARK} className="h">
              <path d={STROKES} fillRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="shade" />
        <div className="open">
          <h1 className="d">{t.title}</h1>
          <p>{t.sub}</p>
          <div className="hint">
            <i />
            <span className="l1" aria-hidden="true">
              {t.loading}
            </span>
            <span className="l2">{t.hint}</span>
          </div>
        </div>
        {t.beats.map(([title, text]) => (
          <div className="beat" key={title}>
            <h2 className="d">{title}</h2>
            <p>{text}</p>
          </div>
        ))}
        {t.stages.map((s, i) => (
          <div className={i === t.stages.length - 1 ? "cap fin" : "cap"} key={s.name}>
            <h2 className={i === t.stages.length - 1 ? undefined : "d"}>{s.name}</h2>
            <p>{s.text}</p>
            <Inc items={s.inc} />
          </div>
        ))}
        <ol className="stages" aria-hidden="true">
          {t.stages.map((s) => (
            <li key={s.name}>
              <span>{s.name}</span>
              <i />
            </li>
          ))}
        </ol>
        <div className="flood" />
      </div>
    </section>
  );
}

export function About({ t, lang }: { t: Copy["about"]; lang: Lang }) {
  return (
    <section className="about" id="about" data-tone="lit">
      <h2 className="sr-only">{copy[lang].nav.about}</h2>
      <p className="lead d">
        {t.lead.split(" ").map((w, i) => (
          <span key={i}>{w} </span>
        ))}
      </p>
      <div className="cols">
        <p className="body">{t.body}</p>
        <ul className="disc">
          {t.disciplines.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="widewrap">
        <figure className="wide">
          <Pic p={photo("res-1")} lang={lang} sizes="(max-width: 760px) 100vw, 91vw" />
        </figure>
        <p className="capline">{t.caption}</p>
        <p className="sig since" data-view="draw">
          {t.since}
        </p>
      </div>
    </section>
  );
}

/** Four steps; the pictures walk past in depth as you scroll. */
export function Process({ t, lang }: { t: Copy["process"]; lang: Lang }) {
  const pics = [planPhoto, photo("res-11"), photo("furn-26"), photo("res-4")];
  return (
    <section className="proc" id="process" data-tone="night">
      <div className="stage">
        <h2 className="d">{t.title}</h2>
        {pics.map((p) => (
          <figure className="pimg" key={p.src}>
            <Pic p={p} lang={lang} sizes="(max-aspect-ratio: 9/10) 78vw, 40vw" />
          </figure>
        ))}
        {t.steps.map((s, i) => (
          <div className={i % 2 ? "ptxt s" : "ptxt e"} key={s.name}>
            <b>{num(i + 1, lang)}</b>
            <h3 className="d">{s.name}</h3>
            <p>{s.text}</p>
            <Inc items={s.inc} />
          </div>
        ))}
      </div>
    </section>
  );
}

const SHOP = [
  { name: "furn-40", cls: "ph a", s: 70, r: -5 },
  { name: "furn-25", cls: "ph b", s: -50, r: 6 },
  { name: "furn-41", cls: "ph c", s: 130, r: -4 },
];

export function Workshop({ t, lang }: { t: Copy["workshop"]; lang: Lang }) {
  return (
    <section className="shop" id="workshop" data-tone="lit">
      <div className="txt">
        <h2 className="d">{t.title}</h2>
        <p>{t.text}</p>
      </div>
      {SHOP.map((f, i) => (
        <figure className={f.cls} data-s={f.s} data-r={f.r} key={f.name}>
          <Pic p={photo(f.name)} lang={lang} sizes="(max-width: 760px) 100vw, 50vw" />
          <figcaption>{t.captions[i]}</figcaption>
        </figure>
      ))}
    </section>
  );
}
