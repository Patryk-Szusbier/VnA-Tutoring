import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import { beforeEach, expect, test, vi } from "vitest";
import ContactForm from "./ContactMe";

vi.mock("@emailjs/browser", () => ({ default: { sendForm: vi.fn() } }));
const sendForm = vi.mocked(emailjs.sendForm);

function fill() {
  fireEvent.change(screen.getByLabelText("Imię i nazwisko"), {
    target: { value: "Jan Kowalski" },
  });
  fireEvent.change(screen.getByLabelText("Twój email"), {
    target: { value: "jan@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Wiadomość"), {
    target: { value: "Proszę o kontakt" },
  });
}
const message = () => screen.getByLabelText("Wiadomość") as HTMLTextAreaElement;
const submit = () => fireEvent.submit(message().closest("form")!);
const button = (name: string) =>
  screen.getByRole("button", { name }) as HTMLButtonElement;

// klamry celowo: wartość zwrócona z beforeEach byłaby wywołana jako teardown
beforeEach(() => {
  sendForm.mockReset();
});

test("wysyła dane formularza, pokazuje potwierdzenie i czyści pola", async () => {
  sendForm.mockResolvedValue({ status: 200, text: "OK" });
  render(<ContactForm />);
  fill();
  submit();

  expect(sendForm).toHaveBeenCalledOnce();
  const sent = new FormData(sendForm.mock.calls[0][2] as HTMLFormElement);
  expect(Object.fromEntries(sent)).toEqual({
    name: "Jan Kowalski",
    email: "jan@example.com",
    message: "Proszę o kontakt",
  });

  expect(await screen.findByText("Wiadomość została wysłana!")).toBeTruthy();
  expect(message().value).toBe("");
});

test("przy błędzie wysyłki pokazuje komunikat i nie kasuje wpisanej treści", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  sendForm.mockRejectedValue({ status: 500, text: "internal detail" });
  render(<ContactForm />);
  fill();
  submit();

  expect(
    await screen.findByText("Wystąpił błąd. Spróbuj ponownie."),
  ).toBeTruthy();
  // szczegóły błędu usługi nie trafiają do interfejsu
  expect(screen.queryByText(/internal detail/)).toBeNull();
  expect(message().value).toBe("Proszę o kontakt");
  // po błędzie można spróbować ponownie
  await waitFor(() => expect(button("Wyślij wiadomość").disabled).toBe(false));
});

test("blokuje wielokrotną wysyłkę, dopóki poprzednia trwa", async () => {
  let resolve!: (v: { status: number; text: string }) => void;
  sendForm.mockReturnValue(new Promise((r) => (resolve = r)));
  render(<ContactForm />);
  fill();
  submit();
  submit();
  submit();

  expect(sendForm).toHaveBeenCalledOnce();
  expect(button("Wysyłanie…").disabled).toBe(true);

  resolve({ status: 200, text: "OK" });
  await screen.findByRole("button", { name: "Wyślij wiadomość" });
});

test("pola są wymagane, walidowane i mają limity długości", () => {
  render(<ContactForm />);
  const email = screen.getByLabelText("Twój email") as HTMLInputElement;

  expect(email.type).toBe("email");
  expect(email.required).toBe(true);
  expect(message().required).toBe(true);
  expect(message().maxLength).toBe(5000);

  email.value = "to-nie-jest-email";
  expect(email.checkValidity()).toBe(false);
  email.value = "jan@example.com";
  expect(email.checkValidity()).toBe(true);
});
