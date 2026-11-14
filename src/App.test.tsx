import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import App from "./App";
import { contact, faq, hero, navLinks, pricing } from "./data/site";

test("hero pokazuje nagłówek i wezwanie do kontaktu", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(hero.titleLines.join(" "));
  const cta = screen.getAllByRole("link", { name: "Umów się na zajęcia" });
  expect(cta.length).toBeGreaterThan(1);
  for (const link of cta) expect(link.getAttribute("href")).toBe("#kontakt");
});

test("każdy link kotwicowy wskazuje istniejącą sekcję", () => {
  const { container } = render(<App />);
  const anchors = [...container.querySelectorAll('a[href^="#"]')];

  expect(anchors.length).toBeGreaterThan(navLinks.length);
  const broken = anchors
    .map((a) => a.getAttribute("href")!)
    .filter((href) => !container.querySelector(`[id="${href.slice(1)}"]`));
  expect(broken).toEqual([]);
});

test("linki zewnętrzne otwierane w nowej karcie mają rel=noopener noreferrer", () => {
  const { container } = render(<App />);
  const external = [...container.querySelectorAll('a[target="_blank"]')];

  expect(external.length).toBe(6);
  for (const a of external) {
    expect(a.getAttribute("href")).toMatch(/^https:\/\//);
    expect(a.getAttribute("rel")).toBe("noopener noreferrer");
  }
});

test("cena, telefon i pytania pochodzą z danych strony", () => {
  const { container } = render(<App />);
  expect(container.querySelector("#cennik")!.textContent).toContain(pricing.amount);
  expect(container.querySelectorAll(`a[href="${contact.phoneHref}"]`).length).toBeGreaterThanOrEqual(3);
  expect(container.querySelectorAll("#faq details").length).toBe(faq.items.length);
});

test("stopka otwiera właściwy dokument w modalu, a zamknięcie go usuwa", async () => {
  const fetchMock = vi.fn(
    async () =>
      new Response("# Polityka", { headers: { "content-type": "text/markdown" } }),
  );
  vi.stubGlobal("fetch", fetchMock);
  render(<App />);

  expect(screen.queryByRole("dialog")).toBeNull();
  const opener = screen.getByRole("button", { name: "Polityka prywatności" });
  opener.focus();
  fireEvent.click(opener);
  await screen.findByRole("dialog", {}, { timeout: 10000 });
  expect(fetchMock).toHaveBeenCalledWith("/privacy.md");
  expect(document.activeElement).toBe(screen.getByRole("button", { name: "Zamknij" }));

  fireEvent.click(screen.getByRole("button", { name: "Zamknij" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.activeElement).toBe(opener);
}, 20000);

test("menu mobilne rozwija się, zwija po wyborze pozycji i po Escape", () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: "Menu" });
  const nav = toggle.closest("header")!;
  const count = () => nav.querySelectorAll('a[href="#oferta"]').length;

  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(count()).toBe(1);

  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  expect(count()).toBe(2);

  fireEvent.click(nav.querySelectorAll('a[href="#oferta"]')[1]);
  expect(count()).toBe(1);

  fireEvent.click(toggle);
  fireEvent.keyDown(document, { key: "Escape" });
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
});

test("nawigacja podkreśla link sekcji widocznej podczas przewijania", () => {
  const tops: Record<string, number> = {};
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
    return { top: tops[this.id] ?? 5000 } as DOMRect;
  });
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(10000);
  render(<App />);
  const current = () =>
    [...document.querySelectorAll('header [aria-current="location"]')].map((a) => a.textContent);

  // W Hero pasek pokazuje przycisk CTA, poza nim zamienia go na telefon.
  const headerLinks = (href: string) => document.querySelectorAll(`header a[href="${href}"]`).length;
  fireEvent.scroll(window);
  expect(current()).toEqual([]);
  expect([headerLinks("#kontakt"), headerLinks(contact.phoneHref)]).toEqual([2, 1]);

  Object.assign(tops, { oferta: -400, zajecia: 100 });
  fireEvent.scroll(window);
  expect(current()).toEqual(["Zajęcia"]);
  expect([headerLinks("#kontakt"), headerLinks(contact.phoneHref)]).toEqual([1, 2]);

  tops["o-mnie"] = 50;
  fireEvent.scroll(window);
  expect(current()).toEqual(["O mnie"]);
  vi.restoreAllMocks();
});
