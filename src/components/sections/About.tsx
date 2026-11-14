import { about } from "../../data/site";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section id="o-mnie" title={about.title}>
      <div className="max-w-2xl space-y-5 text-lead">
        {about.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </Section>
  );
}
