import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import { beforeEach, expect, test, vi } from "vitest";
import Contact from "./Contact";
import { validate } from "./contactValidation";

vi.mock("@emailjs/browser", () => ({ default: { sendForm: vi.fn() } }));
const sendForm = vi.mocked(emailjs.sendForm);

const field = (label: string) =>
  screen.getByLabelText(label) as HTMLInputElement | HTMLTextAreaElement;
function fill(email = "jan@example.com") {
  fireEvent.change(field("Imię i nazwisko"), { target: { value: "Jan Kowalski" } });
  fireEvent.change(field("Adres e-mail"), { target: { value: email } });
  fireEvent.change(field("Wiadomość"), { target: { value: "Proszę o kontakt" } });
}
const submit = () => fireEvent.submit(field("Wiadomość").closest("form")!);
const button = (name: string) => screen.getByRole("button", { name }) as HTMLButtonElement;

beforeEach(() => {
  sendForm.mockReset();
});

test("wysyła dane formularza, pokazuje potwierdzenie i czyści pola", async () => {
  sendForm.mockResolvedValue({ status: 200, text: "OK" });
  render(<Contact />);
  fill();
  submit();

  expect(sendForm).toHaveBeenCalledOnce();
  const sent = new FormData(sendForm.mock.calls[0][2] as HTMLFormElement);
  expect(Object.fromEntries(sent)).toEqual({
    name: "Jan Kowalski",
    email: "jan@example.com",
    message: "Proszę o kontakt",
  });

  expect(await screen.findByText("Wiadomość wysłana.")).toBeTruthy();
  expect(field("Wiadomość").value).toBe("");
});

test("puste i błędne pola nie są wysyłane, a błędy są powiązane z polami", () => {
  render(<Contact />);
  submit();

  expect(sendForm).not.toHaveBeenCalled();
  expect(screen.getByText("Podaj imię i nazwisko.")).toBeTruthy();
  expect(screen.getByText("Napisz, w czym mogę pomóc.")).toBeTruthy();
  const name = field("Imię i nazwisko");
  expect(name.getAttribute("aria-invalid")).toBe("true");
  expect(document.getElementById(name.getAttribute("aria-describedby")!)!.textContent).toBe(
    "Podaj imię i nazwisko.",
  );
  expect(document.activeElement).toBe(name);

  fill("to-nie-jest-email");
  submit();
  expect(sendForm).not.toHaveBeenCalled();
  expect(screen.getByText(/Podaj adres e-mail/)).toBeTruthy();
  expect(screen.queryByText("Podaj imię i nazwisko.")).toBeNull();
});

test("validate akceptuje poprawne dane i odrzuca same spacje", () => {
  expect(validate({ name: "Jan", email: "jan@example.com", message: "Cześć" })).toEqual({});
  expect(Object.keys(validate({ name: " ", email: "a@b", message: "  " }))).toEqual([
    "name",
    "email",
    "message",
  ]);
});

test("przy błędzie wysyłki pokazuje komunikat i nie kasuje wpisanej treści", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  sendForm.mockRejectedValue({ status: 500, text: "internal detail" });
  render(<Contact />);
  fill();
  submit();

  expect(await screen.findByText(/Nie udało się wysłać wiadomości/)).toBeTruthy();
  expect(screen.queryByText(/internal detail/)).toBeNull();
  expect(field("Wiadomość").value).toBe("Proszę o kontakt");
  await waitFor(() => expect(button("Wyślij wiadomość").disabled).toBe(false));
});

test("blokuje wielokrotną wysyłkę, dopóki poprzednia trwa", async () => {
  let resolve!: (v: { status: number; text: string }) => void;
  sendForm.mockReturnValue(new Promise((r) => (resolve = r)));
  render(<Contact />);
  fill();
  submit();
  submit();
  submit();

  expect(sendForm).toHaveBeenCalledOnce();
  expect(button("Wysyłanie…").disabled).toBe(true);

  resolve({ status: 200, text: "OK" });
  await screen.findByRole("button", { name: "Wyślij wiadomość" });
});
