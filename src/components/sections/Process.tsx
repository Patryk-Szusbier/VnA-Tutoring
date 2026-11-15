import { useEffect, useRef, type CSSProperties } from "react";
import { process } from "../../data/site";
import Section from "../ui/Section";

export default function Process() {
  const list = useRef<HTMLOListElement>(null);

  // Sekwencja kroków (.steps-run w index.css) startuje raz, gdy lista dojdzie do połowy ekranu.
  useEffect(() => {
    const el = list.current!;
    const run = () => el.classList.add("steps-run");
    if (!("IntersectionObserver" in window)) return run();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        run();
        io.disconnect();
      },
      // Start dopiero, gdy początek listy minie połowę ekranu, czyli sekcja jest już przed oczami.
      { rootMargin: "0px 0px -50% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="zajecia" title={process.title}>
      <ol ref={list} className="steps">
        {process.steps.map((step, i) => (
          <li
            key={step.title}
            className="group relative flex gap-4 pb-10 last:pb-0"
            style={{ "--i": i } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="step-dot flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent font-display text-lg font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-dark"
            >
              {i + 1}
            </span>
            {/* Linia do następnego kroku. */}
            {i < process.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="step-line absolute bottom-0 left-[1.375rem] top-11 w-px origin-top bg-accent"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-2">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
