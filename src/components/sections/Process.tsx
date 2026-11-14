import { process } from "../../data/site";
import Section from "../ui/Section";

export default function Process() {
  return (
    <Section id="zajecia" title={process.title}>
      <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {process.steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent font-display text-lg font-semibold text-accent"
            >
              {i + 1}
            </span>
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
