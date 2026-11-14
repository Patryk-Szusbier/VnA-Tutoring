import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import App from "./App";

async function renderApp() {
  const view = render(<App />);
  // sekcje i stopka ładują się leniwie
  await waitFor(
    () => {
      for (const id of ["AboutMe", "Offert", "HowIWork", "Contact"])
        expect(view.container.querySelector("#" + id)).not.toBeNull();
      expect(view.container.querySelector("footer")).not.toBeNull();
    },
    { timeout: 10000 },
  );
  return view;
}

test("każdy link kotwicowy w nawigacji i stopce wskazuje istniejącą sekcję", async () => {
  const { container } = await renderApp();
  const anchors = [...container.querySelectorAll('a[href^="#"]')];

  expect(anchors.length).toBeGreaterThan(5);
  const broken = anchors
    .map((a) => a.getAttribute("href")!)
    .filter((href) => !container.querySelector(`[id="${href.slice(1)}"]`));
  expect(broken).toEqual([]);
}, 20000);

test("linki zewnętrzne otwierane w nowej karcie mają rel=noopener noreferrer", async () => {
  const { container } = await renderApp();
  const external = [...container.querySelectorAll('a[target="_blank"]')];

  expect(external.length).toBe(4);
  for (const a of external) {
    expect(a.getAttribute("href")).toMatch(/^https:\/\//);
    expect(a.getAttribute("rel")).toBe("noopener noreferrer");
  }
}, 20000);

test("stopka otwiera właściwy dokument w modalu, a zamknięcie go usuwa", async () => {
  const fetchMock = vi.fn(
    async () =>
      new Response("# Polityka", {
        headers: { "content-type": "text/markdown" },
      }),
  );
  vi.stubGlobal("fetch", fetchMock);
  await renderApp();

  expect(screen.queryByRole("dialog")).toBeNull();
  expect(fetchMock).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole("button", { name: "Polityka Prywatności" }));
  await screen.findByRole("dialog", {}, { timeout: 10000 });
  expect(fetchMock).toHaveBeenCalledWith("/privacy.md");

  fireEvent.click(screen.getByRole("button", { name: "Zamknij" }));
  expect(screen.queryByRole("dialog")).toBeNull();
}, 20000);

test("menu mobilne rozwija się i zwija po wyborze pozycji", async () => {
  await renderApp();
  const toggle = screen.getByRole("button", { name: "Menu" });
  const nav = toggle.closest("nav")!;
  const count = () => nav.querySelectorAll('a[href="#Offert"]').length;

  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(count()).toBe(1);

  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  expect(count()).toBe(2);

  fireEvent.click(nav.querySelectorAll('a[href="#Offert"]')[1]);
  expect(count()).toBe(1);
}, 20000);
