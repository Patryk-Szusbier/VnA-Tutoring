import { Plus } from "lucide-react";
import { faq } from "../../data/site";
import Section from "../ui/Section";

export default function Faq() {
  return (
    <Section id="faq" title={faq.title}>
      <div className="border-b border-grayish text-text2 ">
        {faq.items.map((item) => (
          <details
            key={item.question}
            name="faq" // wspólne name: przeglądarka sama zamyka pozostałe pytania
            className="group border-t border-grayish px-5 transition-colors duration-300 open:bg-grayish open:text-accent"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold ">
              {item.question}
              <Plus
                aria-hidden="true"
                size={22}
                className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="max-w-2xl pb-5 text-text2">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
