import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  /** Zajmuje lewą kolumnę zamiast nagłówka; nagłówek trafia wtedy nad treść po prawej. */
  aside?: ReactNode;
  children: ReactNode;
};

/** Wspólny układ sekcji: nagłówek w lewej kolumnie, treść w prawej. */
export default function Section({
  id,
  title,
  intro,
  aside,
  children,
}: SectionProps) {
  const heading = (
    <>
      <h2
        id={`${id}-title`}
        className="text-title font-semibold tracking-tight text-accent"
      >
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-sm">{intro}</p>}
    </>
  );
  const grid =
    "reveal mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-12";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // Od lg sekcja wypełnia okno pod nawigacją (jak Hero), treść wyśrodkowana w pionie.
      className="border-t border-grayish lg:flex lg:min-h-[calc(100svh_-_var(--spacing-nav)_-_1px)] lg:items-center"
    >
      {aside ? (
        // Kolejność w kodzie (nagłówek, aside, treść) to układ na telefonie; od lg aside idzie w lewo.
        <div className={`${grid} lg:grid-rows-[auto_1fr] lg:gap-y-6`}>
          <div className="lg:col-span-8 lg:col-start-5">{heading}</div>
          <div className="lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {aside}
          </div>
          <div className="lg:col-span-8 lg:col-start-5">{children}</div>
        </div>
      ) : (
        <div className={grid}>
          <div className="lg:col-span-4">{heading}</div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      )}
    </section>
  );
}
