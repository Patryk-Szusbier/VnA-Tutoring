import { offer } from "../../data/site";
import Section from "../ui/Section";

export default function Offer() {
  return (
    <Section id="oferta" title={offer.title} intro={offer.intro}>
      <ul className="border-b border-grayish">
        {offer.items.map((item) => (
          <li
            key={item.title}
            className="group grid gap-1 border-t border-grayish py-5 sm:grid-cols-5 sm:gap-6"
          >
            <h3 className="text-xl font-semibold transition group-hover:translate-x-1 group-hover:text-accent sm:col-span-2">
              {item.title}
            </h3>
            <p className="sm:col-span-3">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
