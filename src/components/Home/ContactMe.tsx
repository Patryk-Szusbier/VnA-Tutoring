import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify"; // Importowanie
import "react-toastify/dist/ReactToastify.css"; // Importowanie stylów dla toasta
import { useInView } from "../../hooks/useInView";

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [ref, inView] = useInView<HTMLElement>("50px");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current || sending) return;

    setSending(true);
    emailjs
      .sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        () => {
          toast.success("Wiadomość została wysłana!");
          form.current?.reset();
        },
        (error) => {
          toast.error("Wystąpił błąd. Spróbuj ponownie.");
          console.error("Email error:", error?.text ?? error);
        },
      )
      .finally(() => setSending(false));
  };

  return (
    <section
      ref={ref}
      id="Contact"
      className={`
        w-full py-20 transition-all duration-1000 scroll-mt-36
        ${inView ? "bg-gradient-to-br from-grayish to-dark" : "bg-dark"}
        text-text2
      `}
    >
      <div className="max-w-xl mx-auto p-6  rounded-2xl shadow-lg ">
        <h2 className="text-4xl pb-5 text-accent font-bold mb-4 text-center">
          Kontakt
        </h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4 text-text2">
          <input
            type="text"
            name="name"
            placeholder="Imię i nazwisko"
            aria-label="Imię i nazwisko"
            maxLength={100}
            required
            className="w-full p-3 rounded bg-grayish border-b-3 border-r-3 border-1
          border-accent placeholder-text"
          />
          <input
            type="email"
            name="email"
            placeholder="Twój email"
            aria-label="Twój email"
            maxLength={254}
            required
            className="w-full p-3 rounded bg-grayish border-b-3 border-r-3 border-1
          border-accent placeholder-text"
          />
          <textarea
            name="message"
            placeholder="Wiadomość"
            aria-label="Wiadomość"
            rows={5}
            maxLength={5000}
            required
            className="w-full p-3 rounded bg-grayish border-b-3 border-r-3 border-1
          border-accent placeholder-text"
          />
          <button
            type="submit"
            disabled={sending}
            className="bg-accent hover:bg-orange-600 text-dark py-2 px-4 rounded font-semibold transition disabled:opacity-60"
          >
            {sending ? "Wysyłanie…" : "Wyślij wiadomość"}
          </button>
        </form>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
      />
    </section>
  );
}
