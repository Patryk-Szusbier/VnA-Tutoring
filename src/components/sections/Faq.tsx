import { Plus } from "lucide-react";
import { faq } from "../../data/site";
import Section from "../ui/Section";

export default function Faq() {
  return (
    <Section id="faq" title={faq.title}>
      <div className="border-b border-grayish">
        {faq.items.map((item) => (
          <details key={item.question} className="group border-t border-grayish">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-text2 [&::-webkit-details-marker]:hidden">
              {item.question}
              <Plus
                aria-hidden="true"
                size={22}
                className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="max-w-2xl pb-5">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
