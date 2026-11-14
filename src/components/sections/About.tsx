import Photo from "../../assets/vanessa-plaza.webp";
import { about, brand } from "../../data/site";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section
      id="o-mnie"
      title={about.title}
      aside={
        // Pomarańczowa ramka przesunięta za zdjęciem; mr/mb robią na nią miejsce.
        <div className="relative mb-4 mr-4 max-w-72 before:absolute before:inset-0 before:translate-x-4 before:translate-y-4 before:rounded-3xl before:border-2 before:border-accent">
          <img
            src={Photo}
            alt={`${brand.name} na plaży nad morzem`}
            width={679}
            height={815}
            loading="lazy"
            className="relative aspect-[5/6] w-full rounded-3xl object-cover"
          />
        </div>
      }
    >
      <div className="max-w-2xl space-y-5 text-lead">
        {about.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </Section>
  );
}
