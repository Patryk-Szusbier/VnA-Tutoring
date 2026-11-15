import type { CSSProperties } from "react";
import { ChevronDown, Phone } from "lucide-react";
import Portrait from "../../assets/korepetytorka-hero.webp";
import PortraitSmall from "../../assets/korepetytorka-hero-200.webp";
import { brand, contact, cta, hero, offer } from "../../data/site";
import ButtonLink from "../ui/ButtonLink";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="relative flex min-h-[calc(100svh_-_var(--spacing-nav)_-_1px)] items-center"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 md:pb-24 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1
            id="start-title"
            className="rise text-hero font-bold tracking-tight"
            style={step(0)}
          >
            {hero.titleLines.map((line, i) => (
              <span
                key={line}
                className={i > 0 ? "text-accent xl:block" : "xl:block"}
              >
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </h1>
          <p className="rise mt-6 max-w-xl text-lead" style={step(1)}>
            {hero.lead}
          </p>

          <p className="mt-8 flex flex-col font-display text-2xl font-semibold text-text2 sm:flex-row sm:gap-x-5 sm:text-3xl">
            {hero.beats.map((beat, i) => (
              <span key={beat} className="rise" style={step(i + 2)}>
                {beat}
              </span>
            ))}
          </p>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row"
            style={step(5)}
          >
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            <ButtonLink href={contact.phoneHref} variant="secondary">
              <Phone aria-hidden="true" size={18} />
              Zadzwoń: {contact.phoneDisplay}
            </ButtonLink>
          </div>
          <p className="rise mt-6 max-w-xl" style={step(5)}>
            {hero.facts}
          </p>
        </div>

        <figure
          className="rise ml-2 flex items-center gap-5 lg:col-span-4 lg:flex-col lg:ml-0 lg:items-start"
          style={step(1)}
        >
          {/* Koło zajmuje dół ramki; postać stoi na jego dolnej krawędzi i wystaje górą. */}
          <div className="relative aspect-[1/1.36] w-28 shrink-0 sm:w-36 lg:w-60">
            <div className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-accent shadow-glow ring-4 ring-accent ring-offset-4 ring-offset-dark" />
            {/* Zaokrąglony dół przycina postać do koła, góra zostaje nieprzycięta. */}
            <img
              src={Portrait}
              // Telefon dostaje mniejszy plik; szerokości to realny rozmiar postaci w ramce (ok. 80% koła).
              srcSet={`${PortraitSmall} 200w, ${Portrait} 398w`}
              sizes="(min-width: 64rem) 15rem, (min-width: 40rem) 7.2rem, 5.6rem"
              alt="Vanessa Heckel"
              width={398}
              height={678}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full rounded-b-full object-contain object-bottom"
            />
          </div>
          <figcaption className="leading-snug">
            <span className="block font-display text-xl font-semibold text-text2">
              {brand.name}
            </span>
            <span className="block">{brand.role}</span>
          </figcaption>
        </figure>
      </div>
      {/* Mieści się w dolnym paddingu treści (pb-16), więc jej nie zasłania. */}
      <a
        href="#oferta"
        aria-label={`Przejdź do sekcji: ${offer.title}`}
        className="absolute bottom-2 md:bottom-12 left-1/2 inline-flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-grayish text-text2 transition-colors hover:border-grayish hover:bg-accent hover:text-dark"
      >
        <ChevronDown aria-hidden="true" className="animate-bounce" />
      </a>
    </section>
  );
}
