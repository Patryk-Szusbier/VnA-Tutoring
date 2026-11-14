// Wszystkie treści strony w jednym miejscu. Komponenty tylko je wyświetlają.
import { keepShortWords as t } from "./typography";

export const brand = {
  name: "Vanessa Heckel",
  studio: "V&A Studio",
  role: "korepetytorka matematyki",
};

export const cta = { label: "Umów się na zajęcia", href: "#kontakt" };

export const contact = {
  phoneDisplay: "737 457 125",
  phoneHref: "tel:+48737457125",
  email: "patryk.szusbier1@gmail.com",
  whatsapp: "https://wa.me/48737457125",
  messenger: "https://www.facebook.com/profile.php?id=100013915864426",
};

export const navLinks = [
  { label: "Oferta", href: "#oferta" },
  { label: "Zajęcia", href: "#zajecia" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Cennik", href: "#cennik" },
  { label: "Pytania", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export const hero = {
  titleLines: ["Matematyka online –", "i\u00a0wszystko jasne!"],
  lead: t("Indywidualne korepetycje i przygotowanie do matury z\u00a0matematyki"),
  beats: ["Zrozum.", "Przećwicz.", "Poczuj się pewniej."],
  facts: t("Szkoły średnie, poziom podstawowy. Lekcje 60 minut na Microsoft Teams."),
};

export const offer = {
  title: "W czym pomagam",
  intro:
    t("Zajęcia są dla uczniów wszystkich szkół średnich i obejmują matematykę na poziomie podstawowym."),
  items: [
    {
      title: "Bieżący materiał",
      text: t("Omawiamy tematy, które masz teraz na lekcjach w szkole."),
    },
    {
      title: "Przygotowanie do sprawdzianów",
      text: t("Powtarzamy dział i ćwiczymy zadania przed sprawdzianem."),
    },
    {
      title: "Poprawy",
      text: t("Wracamy do tego, co nie poszło, i przygotowujemy Cię do poprawy."),
    },
    {
      title: "Nadrabianie zaległości",
      text: t("Uzupełniamy braki z wcześniejszych działów i klas."),
    },
    {
      title: "Matura podstawowa",
      text: t("Przygotowanie do egzaminu maturalnego z matematyki na poziomie podstawowym."),
    },
  ],
};

export const process = {
  title: "Jak wyglądają zajęcia",
  steps: [
    {
      title: "Bezpłatna rozmowa telefoniczna",
      text: t("Zanim zaczniemy, ustalamy przez telefon, z czym potrzebujesz pomocy."),
    },
    {
      title: "Stały termin",
      text: t("Termin zajęć ustalamy raz, na stałe. Możesz go zamienić, dając znać co najmniej 48 godzin wcześniej."),
    },
    {
      title: "Lekcja na Microsoft Teams",
      text: t("60 minut, jeden na jeden. Przygotuj coś do pisania i rozwiązywania zadań."),
    },
    {
      title: "Notatki i zadania",
      text: t("Po lekcji dostajesz przez Teams notatki z zajęć i zadania do zrobienia przed następnym spotkaniem."),
    },
  ],
};

export const about = {
  title: "O mnie",
  paragraphs: [
    t("Nazywam się Vanessa Heckel. Od dwóch lat prowadzę korepetycje z matematyki, a na co dzień studiuję finanse i rachunkowość."),
    t("Uczę uczniów szkół średnich na poziomie podstawowym: pomagam w bieżącym materiale i przygotowuję do matury. Zajęcia prowadzę wyłącznie indywidualnie i online."),
  ],
};

export const pricing = {
  title: "Cennik",
  amount: "110",
  currency: "zł",
  unit: t("za 60 minut lekcji indywidualnej online"),
  included: [
    t("Bezpłatna konsultacja telefoniczna przed zajęciami"),
    t("Notatki i zadania po każdej lekcji"),
  ],
  rulesTitle: "Zasady",
  rules: [
    {
      title: "Stały termin",
      text: t("Zajęcia odbywają się w terminie ustalonym na stałe."),
    },
    {
      title: "Zmiana terminu",
      text: t("Termin można zamienić, zgłaszając to co najmniej 48 godzin przed zajęciami."),
    },
    {
      title: "Odwołanie lekcji",
      text: t("Lekcję należy odwołać najpóźniej 24 godziny wcześniej. Przy późniejszym odwołaniu jest płatna, chyba że to nagły wypadek."),
    },
  ],
};

export const faq = {
  title: "Najczęstsze pytania",
  items: [
    {
      question: "Czego potrzebuję do zajęć?",
      answer:
        t("Urządzenia z dostępem do Microsoft Teams oraz czegoś do pisania i rozwiązywania zadań."),
    },
    {
      question: "Jak długo trwa lekcja?",
      answer: t("60 minut. Zajęcia są indywidualne i odbywają się online na Microsoft Teams."),
    },
    {
      question: "Czy dostanę notatki z zajęć?",
      answer:
        t("Tak. Po każdej lekcji dostajesz przez Teams notatki oraz zadania do wykonania przed następnymi zajęciami."),
    },
    {
      question: "Czy mogę zmienić termin?",
      answer:
        t("Tak. Termin ustalamy na stałe, ale możesz go zamienić, jeśli dasz znać co najmniej 48 godzin przed zajęciami."),
    },
    {
      question: "Co, jeśli muszę odwołać lekcję?",
      answer:
        t("Odwołaj ją najpóźniej 24 godziny wcześniej. Przy późniejszym odwołaniu lekcja jest płatna, chyba że to nagły wypadek."),
    },
    {
      question: "Czy pierwsza lekcja jest bezpłatna?",
      answer:
        t("Bezpłatna jest konsultacja telefoniczna przed rozpoczęciem zajęć. Każda lekcja kosztuje 110 zł."),
    },
    {
      question: "Czy zajęcia obejmują poziom rozszerzony?",
      answer: t("Nie. Prowadzę zajęcia z matematyki na poziomie podstawowym, w tym przygotowanie do matury podstawowej."),
    },
  ],
};

export const contactSection = {
  title: "Kontakt",
  intro:
    t("Zadzwoń albo napisz. Zaczynamy od bezpłatnej rozmowy telefonicznej, w której ustalimy termin i zakres zajęć."),
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/djvanessa.pl/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100013915864426" },
  { label: "TikTok", href: "https://www.tiktok.com/@djvanessa_djaro" },
  { label: "djvanessa-djaro.com", href: "https://djvanessa-djaro.com" },
];
