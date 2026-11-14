import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

/** Wspólny układ sekcji: nagłówek w lewej kolumnie, treść w prawej. */
export default function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-grayish">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id={`${id}-title`} className="text-title font-semibold tracking-tight">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-sm">{intro}</p>}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
