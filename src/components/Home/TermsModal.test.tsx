import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import TermsModal from "./TermsModal";

function mockFetch(body: string, init: ResponseInit = {}) {
  const fn = vi.fn(async () => new Response(body, init));
  vi.stubGlobal("fetch", fn);
  return fn;
}
const md = { headers: { "content-type": "text/markdown" } };
const errorText = /Nie udało się wczytać dokumentu/;

test.each([
  ["terms", "/terms.md"],
  ["privacy", "/privacy.md"],
] as const)("typ %s pobiera %s i renderuje markdown", async (type, url) => {
  const fetchMock = mockFetch("# Tytuł dokumentu\n\nTreść", md);
  render(<TermsModal type={type} onClose={() => {}} />);

  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading.textContent).toBe("Tytuł dokumentu");
  expect(fetchMock).toHaveBeenCalledWith(url);
});

test("nie wykonuje HTML ani adresów javascript: z treści markdown (XSS)", async () => {
  mockFetch(
    'Start\n\n<img src="x" onerror="alert(1)">\n\n<script>alert(1)</script>\n\n[klik](javascript:alert(1))',
    md,
  );
  const { container } = render(<TermsModal type="terms" onClose={() => {}} />);

  const link = await screen.findByText("klik");
  expect(container.querySelector("img")).toBeNull();
  expect(container.querySelector("script")).toBeNull();
  expect(link.getAttribute("href") ?? "").not.toContain("javascript:");
});

test("odpowiedź 404 pokazuje komunikat zamiast treści błędu", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  mockFetch("Not Found – wewnętrzny komunikat serwera", { status: 404 });
  render(<TermsModal type="privacy" onClose={() => {}} />);

  expect(await screen.findByText(errorText)).toBeTruthy();
  expect(screen.queryByText(/wewnętrzny komunikat/)).toBeNull();
});

test("fallback SPA (index.html z kodem 200) nie jest renderowany jako dokument", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  mockFetch("<!DOCTYPE html><div id=root>aplikacja</div>", {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
  render(<TermsModal type="terms" onClose={() => {}} />);

  expect(await screen.findByText(errorText)).toBeTruthy();
  expect(screen.queryByText(/aplikacja/)).toBeNull();
});

test("błąd sieci nie wywraca komponentu", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
  render(<TermsModal type="terms" onClose={() => {}} />);

  expect(await screen.findByText(errorText)).toBeTruthy();
});

test("zamyka się przyciskiem i klawiszem Escape, inne klawisze ignoruje", async () => {
  mockFetch("# T", md);
  const onClose = vi.fn();
  render(<TermsModal type="terms" onClose={onClose} />);
  await screen.findByRole("heading", { level: 1 });

  expect(screen.getByRole("dialog").getAttribute("aria-modal")).toBe("true");
  fireEvent.keyDown(document, { key: "Enter" });
  expect(onClose).not.toHaveBeenCalled();

  fireEvent.keyDown(document, { key: "Escape" });
  fireEvent.click(screen.getByRole("button", { name: "Zamknij" }));
  expect(onClose).toHaveBeenCalledTimes(2);
});
