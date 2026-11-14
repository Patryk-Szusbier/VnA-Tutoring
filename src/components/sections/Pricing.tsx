import { Check } from "lucide-react";
import { cta, pricing } from "../../data/site";
import ButtonLink from "../ui/ButtonLink";
import Section from "../ui/Section";

export default function Pricing() {
  return (
    <Section id="cennik" title={pricing.title}>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-3xl bg-grayish p-7 sm:p-9">
          <p className="font-display font-bold leading-none text-text2">
            <span className="text-7xl tracking-tight">{pricing.amount}</span>{" "}
            <span className="text-3xl">{pricing.currency}</span>
          </p>
          <p className="mt-3 text-text2">{pricing.unit}</p>
          <ul className="mt-7 space-y-3">
            {pricing.included.map((item) => (
              <li key={item} className="flex gap-3">
                <Check aria-hidden="true" size={20} className="mt-1 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ButtonLink href={cta.href} className="mt-8 w-full sm:w-auto">
            {cta.label}
          </ButtonLink>
        </div>

        <div>
          <h3 className="text-xl font-semibold">{pricing.rulesTitle}</h3>
          <dl className="mt-4 border-b border-grayish">
            {pricing.rules.map((rule) => (
              <div key={rule.title} className="border-t border-grayish py-4">
                <dt className="font-semibold text-text2">{rule.title}</dt>
                <dd className="mt-1">{rule.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
