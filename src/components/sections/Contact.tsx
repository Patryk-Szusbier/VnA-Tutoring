import { useRef, useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { contact, contactSection } from "../../data/site";
import Section from "../ui/Section";
import { validate } from "./contactValidation";
import type { Errors, Field } from "./contactValidation";

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

type Status = "idle" | "sending" | "sent" | "failed";

const fields: { name: Field; label: string; type?: string; autoComplete?: string; maxLength: number }[] = [
  { name: "name", label: "Imię i nazwisko", autoComplete: "name", maxLength: 100 },
  { name: "email", label: "Adres e-mail", type: "email", autoComplete: "email", maxLength: 254 },
  { name: "message", label: "Wiadomość", maxLength: 5000 },
];

const channels = [
  { label: `Zadzwoń: ${contact.phoneDisplay}`, href: contact.phoneHref, Icon: Phone },
  { label: "Napisz na WhatsAppie", href: contact.whatsapp, Icon: MessageCircle, external: true },
  { label: "Napisz na Messengerze", href: contact.messenger, Icon: MessageCircle, external: true },
  { label: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
];

const inputClass =
  "mt-2 block w-full rounded-xl border border-grayish bg-grayish px-4 py-3 text-base text-text2 transition-colors focus:border-accent aria-[invalid=true]:border-accent";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current || status === "sending") return;

    const data = new FormData(form.current);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const found = validate(values);
    setErrors(found);
    const firstInvalid = fields.find((f) => found[f.name]);
    if (firstInvalid) {
      setStatus("idle");
      form.current.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus("sending");
    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      () => {
        form.current?.reset();
        setStatus("sent");
      },
      (error) => {
        console.error("Email error:", error?.text ?? error);
        setStatus("failed");
      },
    );
  };

  return (
    <Section id="kontakt" title={contactSection.title} intro={contactSection.intro}>
      <div className="grid gap-12 md:grid-cols-2">
        <ul className="space-y-3">
          {channels.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex min-h-14 items-center gap-4 rounded-2xl border border-grayish px-5 py-3 font-semibold text-text2 transition-colors hover:border-accent"
              >
                <Icon aria-hidden="true" size={20} className="shrink-0 text-accent" />
                <span className="min-w-0 break-words">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <form ref={form} onSubmit={onSubmit} noValidate aria-label="Formularz kontaktowy">
          <div className="space-y-5">
            {fields.map((field) => {
              const error = errors[field.name];
              const common = {
                id: `contact-${field.name}`,
                name: field.name,
                required: true,
                maxLength: field.maxLength,
                autoComplete: field.autoComplete,
                "aria-invalid": error ? true : undefined,
                "aria-describedby": error ? `contact-${field.name}-error` : undefined,
                className: inputClass,
              };
              return (
                <div key={field.name}>
                  <label htmlFor={common.id} className="font-semibold text-text2">
                    {field.label}
                  </label>
                  {field.name === "message" ? (
                    <textarea rows={5} {...common} />
                  ) : (
                    <input type={field.type ?? "text"} {...common} />
                  )}
                  {error && (
                    <p id={`contact-${field.name}-error`} className="mt-2 text-accent">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-dark transition-colors duration-200 hover:bg-text2 disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
          </button>

          <p role="status" className="mt-4 min-h-6 text-text2">
            {status === "sent" && "Wiadomość wysłana."}
            {status === "failed" &&
              `Nie udało się wysłać wiadomości. Spróbuj ponownie albo zadzwoń: ${contact.phoneDisplay}.`}
          </p>
        </form>
      </div>
    </Section>
  );
}
