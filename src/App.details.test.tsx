// Szczegóły strony: struktura, dostępność i to, czy każda sekcja pokazuje wszystkie swoje dane.
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import App from "./App";
import {
  about,
  brand,
  contact,
  contactSection,
  cta,
  faq,
  hero,
  navLinks,
  offer,
  pricing,
  process,
  socials,
} from "./data/site";

const $ = (selector: string) => document.querySelector<HTMLElement>(selector)!;
const $$ = (selector: string) => [...document.querySelectorAll<HTMLElement>(selector)];
const text = (selector: string) => $(selector).textContent ?? "";
const name = (el: Element) => (el.getAttribute("aria-label") ?? el.textContent ?? "").trim();

test("sekcje stoją w kolejności z menu, a każda ma własny nagłówek", () => {
  render(<App />);
  const sections = $$("main > section");

  expect(sections.map((s) => `#${s.id}`)).toEqual(["#start", ...navLinks.map((l) => l.href)]);
  for (const section of sections) {
    const heading = document.getElementById(section.getAttribute("aria-labelledby")!)!;
    expect(section.contains(heading)).toBe(true);
    expect(heading.textContent!.trim()).not.toBe("");
  }
});

test("jest jeden nagłówek h1, a poziomy nagłówków nie są przeskakiwane", () => {
  render(<App />);
  const levels = $$("h1, h2, h3, h4, h5, h6").map((h) => Number(h.tagName[1]));

  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  expect(levels[0]).toBe(1);
  levels.forEach((level, i) => i > 0 && expect(level).toBeLessThanOrEqual(levels[i - 1] + 1));
});

test("punkty orientacyjne: link pomijający menu, nawigacje, treść główna i stopka", () => {
  render(<App />);

  expect($("a").getAttribute("href")).toBe("#tresc");
  expect($("main").id).toBe("tresc");
  expect($$("main")).toHaveLength(1);
  expect($$("header")).toHaveLength(1);
  expect($$("footer")).toHaveLength(1);
  expect($$("nav").map((n) => n.getAttribute("aria-label"))).toEqual(["Główna", "Stopka"]);
});

test("każdy link i przycisk ma nazwę, a każdy link ma adres", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Menu" }));

  const controls = $$("a, button");
  expect(controls.length).toBeGreaterThan(30);
  expect(controls.filter((el) => !name(el)).map((el) => el.outerHTML)).toEqual([]);
  expect($$("a").filter((a) => !a.getAttribute("href")).map((a) => a.outerHTML)).toEqual([]);
});

test("obrazy mają opis alt i wymiary, a ikony są ukryte przed czytnikami ekranu", () => {
  render(<App />);
  const images = $$("img");

  expect(images.length).toBeGreaterThanOrEqual(4);
  for (const img of images) {
    expect(img.hasAttribute("alt")).toBe(true);
    expect(Number(img.getAttribute("width"))).toBeGreaterThan(0);
    expect(Number(img.getAttribute("height"))).toBeGreaterThan(0);
  }
  const described = images.filter((img) => img.getAttribute("alt"));
  expect(described).toHaveLength(2);
  for (const img of described) expect(img.getAttribute("alt")).toContain(brand.name);
  expect($$("svg").filter((svg) => svg.getAttribute("aria-hidden") !== "true")).toEqual([]);
});

test("hero pokazuje wszystkie treści, zdjęcie, telefon i strzałkę do następnej sekcji", () => {
  render(<App />);
  const section = $("#start");

  for (const value of [hero.lead, hero.facts, ...hero.beats, brand.name, brand.role])
    expect(section.textContent).toContain(value);
  expect($(`#start a[href="${contact.phoneHref}"]`).textContent).toContain(contact.phoneDisplay);
  expect($(`#start a[href="${cta.href}"]`).textContent).toBe(cta.label);
  expect($('#start a[href="#oferta"]').getAttribute("aria-label")).toContain(offer.title);
  expect($("#start img").getAttribute("fetchpriority")).toBe("high");
});

test("oferta, zajęcia i O mnie pokazują komplet danych", () => {
  render(<App />);

  expect(text("#oferta")).toContain(offer.intro);
  expect($$("#oferta li h3").map((h) => h.textContent)).toEqual(offer.items.map((i) => i.title));
  for (const item of offer.items) expect(text("#oferta")).toContain(item.text);

  const steps = $$("#zajecia ol > li");
  expect(steps).toHaveLength(process.steps.length);
  steps.forEach((li, i) => {
    expect(li.querySelector("span")!.textContent).toBe(String(i + 1));
    expect(li.querySelector("h3")!.textContent).toBe(process.steps[i].title);
    expect(li.textContent).toContain(process.steps[i].text);
  });

  expect($$("#o-mnie p").map((p) => p.textContent)).toEqual(about.paragraphs);
  expect($("#o-mnie img").getAttribute("loading")).toBe("lazy");
  // Na telefonie kolejność to nagłówek, zdjęcie, tekst – tak jak w kodzie.
  expect($$("#o-mnie h2, #o-mnie img, #o-mnie p").map((el) => el.tagName)).toEqual(["H2", "IMG", "P", "P"]);
});

test("cennik pokazuje cenę, zawartość, zasady i przycisk kontaktu", () => {
  render(<App />);
  const section = text("#cennik");

  for (const value of [pricing.amount, pricing.currency, pricing.unit, pricing.rulesTitle, ...pricing.included])
    expect(section).toContain(value);
  expect($$("#cennik dt").map((dt) => dt.textContent)).toEqual(pricing.rules.map((r) => r.title));
  expect($$("#cennik dd").map((dd) => dd.textContent)).toEqual(pricing.rules.map((r) => r.text));
  expect($(`#cennik a[href="${cta.href}"]`).textContent).toBe(cta.label);
});

test("FAQ: wszystkie pytania z odpowiedziami, zamknięte na starcie, we wspólnej grupie", () => {
  render(<App />);
  const items = $$("#faq details") as HTMLDetailsElement[];

  expect(items.map((d) => d.querySelector("summary")!.textContent)).toEqual(faq.items.map((i) => i.question));
  expect(items.map((d) => d.querySelector("p")!.textContent)).toEqual(faq.items.map((i) => i.answer));
  expect(items.filter((d) => d.open)).toEqual([]);
  // Wspólne name sprawia, że przeglądarka trzyma otwarte tylko jedno pytanie.
  expect(new Set(items.map((d) => d.getAttribute("name")))).toEqual(new Set(["faq"]));
});

test("kontakt: wstęp, wszystkie kanały i pola formularza z etykietami", () => {
  render(<App />);

  expect(text("#kontakt")).toContain(contactSection.intro);
  for (const href of [contact.phoneHref, contact.whatsapp, contact.messenger, `mailto:${contact.email}`])
    expect($(`#kontakt a[href="${href}"]`)).toBeTruthy();

  const controls = $$("#kontakt input, #kontakt textarea") as HTMLInputElement[];
  expect(controls.map((c) => c.name)).toEqual(["website", "name", "email", "message"]);
  for (const control of controls) expect(control.labels!.length).toBe(1);
  for (const control of controls.slice(1)) {
    expect(control.required).toBe(true);
    expect(control.maxLength).toBeGreaterThan(0);
  }
  expect(controls[2].type).toBe("email");
  expect(controls.slice(1, 3).map((c) => c.autocomplete)).toEqual(["name", "email"]);
  expect($("#kontakt [role=status]").textContent).toBe("");
});

test("stopka: menu, kontakt, profile w sieci, bieżący rok i dokumenty", () => {
  render(<App />);

  expect($$("footer nav a").map((a) => [a.textContent, a.getAttribute("href")])).toEqual(
    navLinks.map((l) => [l.label, l.href]),
  );
  expect($(`footer a[href="${contact.phoneHref}"]`).textContent).toBe(contact.phoneDisplay);
  expect($(`footer a[href="mailto:${contact.email}"]`).textContent).toBe(contact.email);
  for (const social of socials) expect($(`footer a[href="${social.href}"]`).textContent).toBe(social.label);
  expect(text("footer")).toContain(`© ${new Date().getFullYear()} ${brand.name}`);
  expect($$("footer button").map((b) => b.textContent)).toEqual(["Regulamin", "Polityka prywatności"]);
});

test("pasek nawigacji: logo prowadzi na górę, menu ma wszystkie pozycje, telefon jest zawsze dostępny", () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: "Menu" });

  expect($("header a").getAttribute("href")).toBe("#start");
  expect($("header a").textContent).toContain(brand.name);
  expect($(`header a[href="${contact.phoneHref}"]`).textContent).toContain(contact.phoneDisplay);
  expect($$("header ul a").map((a) => a.textContent)).toEqual(navLinks.map((l) => l.label));

  fireEvent.click(toggle);
  const menu = document.getElementById(toggle.getAttribute("aria-controls")!)!;
  expect([...menu.querySelectorAll("a")].map((a) => a.getAttribute("href"))).toEqual([
    ...navLinks.map((l) => l.href),
    cta.href,
  ]);
});

test("na samym dole strony podświetlony jest ostatni link, a nasłuch przewijania jest sprzątany", () => {
  const tops: Record<string, number> = { oferta: -50 };
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
    return { top: tops[this.id] ?? 5000 } as DOMRect;
  });
  const scrollHeight = vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(10000);
  const remove = vi.spyOn(window, "removeEventListener");
  const { unmount } = render(<App />);
  const current = () => $$('header [aria-current="location"]').map((a) => a.textContent);

  fireEvent.scroll(window);
  expect(current()).toEqual(["Oferta"]);

  scrollHeight.mockReturnValue(window.innerHeight);
  fireEvent.scroll(window);
  expect(current()).toEqual([navLinks[navLinks.length - 1].label]);

  // Otwarte menu mobilne podświetla tę samą pozycję.
  fireEvent.click(screen.getByRole("button", { name: "Menu" }));
  expect(current()).toHaveLength(2);

  unmount();
  expect(remove.mock.calls.map((c) => c[0])).toEqual(expect.arrayContaining(["scroll", "resize"]));
});

test("regulamin otwiera się ze stopki, blokuje przewijanie tła i zwalnia je po zamknięciu", async () => {
  const fetchMock = vi.fn(async () => new Response("# Regulamin", { headers: { "content-type": "text/markdown" } }));
  vi.stubGlobal("fetch", fetchMock);
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "Regulamin" }));
  const dialog = await screen.findByRole("dialog", {}, { timeout: 10000 });
  expect(dialog.getAttribute("aria-label")).toBe("Regulamin");
  expect(fetchMock).toHaveBeenCalledWith("/terms.md");
  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.body.style.overflow).toBe("");
}, 20000);
