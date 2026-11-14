import type { CSSProperties } from "react";
import { Phone } from "lucide-react";
import Portrait from "../../assets/vanessa-heckel.webp";
import { brand, contact, cta, hero } from "../../data/site";
import ButtonLink from "../ui/ButtonLink";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="flex min-h-[calc(100svh_-_var(--spacing-nav)_-_1px)] items-center"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 md:pb-24 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1
            id="start-title"
            className="rise text-hero font-bold tracking-tight"
            style={step(0)}
          >
            {hero.titleLines.map((line, i) => (
              <span key={line} className="xl:block">
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

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={step(5)}>
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

        <figure className="rise ml-2 flex items-center gap-5 lg:col-span-4 lg:flex-col lg:ml-0 lg:items-start" style={step(1)}>
          <img
            src={Portrait}
            alt="Vanessa Heckel"
            width={480}
            height={480}
            fetchPriority="high"
            className="h-28 w-28 shrink-0 rounded-full bg-accent object-cover ring-4 ring-accent ring-offset-4 ring-offset-dark sm:h-36 sm:w-36 lg:h-60 lg:w-60"
          />
          <figcaption className="leading-snug">
            <span className="block font-display text-xl font-semibold text-text2">
              {brand.name}
            </span>
            <span className="block">{brand.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
