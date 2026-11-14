import { expect, test } from "vitest";
import indexHtml from "../../index.html?raw";
import robots from "../../public/robots.txt?raw";
import terms from "../../public/terms.md?raw";
import privacy from "../../public/privacy.md?raw";
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
} from "./site";

const publicFiles = Object.keys(import.meta.glob("/public/*")).map((p) => p.replace("/public", ""));
const page = new DOMParser().parseFromString(indexHtml, "text/html");
const meta = (selector: string) => page.querySelector(selector)?.getAttribute("content") ?? "";

test.each([
  ["linki nawigacji (adresy)", navLinks.map((l) => l.href)],
  ["linki nawigacji (nazwy)", navLinks.map((l) => l.label)],
  ["pozycje oferty", offer.items.map((i) => i.title)],
  ["kroki zajęć", process.steps.map((s) => s.title)],
  ["zasady cennika", pricing.rules.map((r) => r.title)],
  ["co zawiera cena", pricing.included],
  ["pytania FAQ", faq.items.map((i) => i.question)],
  ["akapity O mnie", about.paragraphs],
  ["profile w sieci (nazwy)", socials.map((s) => s.label)],
  ["profile w sieci (adresy)", socials.map((s) => s.href)],
])("%s nie powtarzają się", (_name, values) => {
  expect(values.length).toBeGreaterThan(0);
  expect(values.filter((v, i) => values.indexOf(v) !== i)).toEqual([]);
});

test("żaden tekst na stronie nie jest pusty ani nie ma podwójnych spacji", () => {
  const texts: string[] = [];
  const collect = (value: unknown) => {
    if (typeof value === "string") texts.push(value);
    else if (value && typeof value === "object") Object.values(value).forEach(collect);
  };
  [about, brand, contact, contactSection, cta, faq, hero, navLinks, offer, pricing, process, socials].forEach(collect);

  expect(texts.length).toBeGreaterThan(50);
  expect(texts.filter((t) => !t.trim() || t !== t.trim() || / {2}/.test(t))).toEqual([]);
});

test("dane kontaktowe są spójne i poprawnie sformatowane", () => {
  const digits = contact.phoneDisplay.replace(/\D/g, "");
  expect(digits).toHaveLength(9);
  expect(contact.phoneHref).toBe(`tel:+48${digits}`);
  expect(contact.whatsapp).toBe(`https://wa.me/48${digits}`);
  expect(contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  for (const url of [contact.whatsapp, contact.messenger, ...socials.map((s) => s.href)])
    expect(url).toMatch(/^https:\/\/\S+$/);
});

test("linki nawigacji i przycisk CTA to kotwice, a CTA prowadzi do sekcji z menu", () => {
  for (const { href } of navLinks) expect(href).toMatch(/^#[a-z-]+$/);
  expect(navLinks.map((l) => l.href)).toContain(cta.href);
});

test("cena podana w FAQ zgadza się z cennikiem", () => {
  const mentions = faq.items.flatMap((i) => i.answer.match(/\d+(?=\s*zł)/g) ?? []);
  expect(mentions.length).toBeGreaterThan(0);
  expect(new Set(mentions)).toEqual(new Set([pricing.amount]));
});

test("index.html: język, tytuł, opis i adres kanoniczny", () => {
  expect(page.documentElement.lang).toBe("pl");
  expect(page.title).toContain(brand.name);
  expect(page.title).toContain("matematyki");
  expect(meta('meta[name="description"]')).toContain(`${pricing.amount} zł`);
  expect(meta('meta[name="viewport"]')).toContain("width=device-width");
  expect(meta('meta[name="robots"]')).toBe("index, follow");

  const canonical = page.querySelector('link[rel="canonical"]')!.getAttribute("href")!;
  expect(canonical).toMatch(/^https:\/\/[^/]+\/$/);
  expect(meta('meta[property="og:url"]')).toBe(canonical);
  expect(meta('meta[property="og:title"]')).not.toBe("");
  expect(meta('meta[property="og:description"]')).not.toBe("");
  expect(meta('meta[property="og:locale"]')).toBe("pl_PL");
  expect(page.querySelector("#root")).toBeTruthy();
  expect(page.querySelector('script[type="module"]')!.getAttribute("src")).toBe("/src/main.tsx");
});

test("index.html: dane strukturalne zgadzają się z danymi strony", () => {
  const ld = JSON.parse(page.querySelector('script[type="application/ld+json"]')!.textContent!);
  const canonical = page.querySelector('link[rel="canonical"]')!.getAttribute("href");

  expect(ld["@context"]).toBe("https://schema.org");
  expect(ld.name).toContain(brand.name);
  expect(ld.url).toBe(canonical);
  expect(ld.telephone).toBe(contact.phoneHref.replace("tel:", ""));
  expect(ld.email).toBe(contact.email);
  expect(ld.makesOffer.price).toBe(pricing.amount);
  expect(ld.makesOffer.priceCurrency).toBe("PLN");
  expect(ld.image).toBe(meta('meta[property="og:image"]'));
});

test("index.html: ikona, obraz udostępniania i profile rel=me wskazują istniejące zasoby", () => {
  const canonical = page.querySelector('link[rel="canonical"]')!.getAttribute("href")!;
  expect(publicFiles).toContain(page.querySelector('link[rel="icon"]')!.getAttribute("href"));
  expect(publicFiles).toContain("/" + meta('meta[property="og:image"]').replace(canonical, ""));

  const known = [contact.messenger, ...socials.map((s) => s.href)];
  const me = [...page.querySelectorAll('link[rel="me"]')].map((l) => l.getAttribute("href"));
  expect(me.length).toBeGreaterThan(0);
  expect(me.filter((href) => !known.includes(href!))).toEqual([]);
});

test("pliki publiczne: regulamin, polityka prywatności i robots.txt", () => {
  expect(publicFiles).toEqual(expect.arrayContaining(["/terms.md", "/privacy.md", "/robots.txt"]));
  for (const doc of [terms, privacy]) {
    expect(doc.trimStart()).toMatch(/^# \S/);
    expect(doc.length).toBeGreaterThan(300);
    expect(doc).not.toMatch(/lorem ipsum|TODO|\[\s*\]\(/i);
  }
  expect(robots).toMatch(/User-agent: \*/);
  expect(robots).not.toMatch(/Disallow: *\//);
});
