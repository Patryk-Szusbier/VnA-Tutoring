import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "motion/react";
import { ToastContainer, toast } from "react-toastify"; // Importowanie
import "react-toastify/dist/ReactToastify.css"; // Importowanie stylów dla toasta

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px", amount: 0.3 });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      () => {
        setSuccess(true);
        toast.success("Wiadomość została wysłana!");
        form.current?.reset();
      },
      (error) => {
        toast.error("Wystąpił błąd. Spróbuj ponownie.");
        console.error("Email error:", error.text);
        setSuccess(false);
      }
    );
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
            required
            className="w-full p-3 rounded bg-grayish border-b-3 border-r-3 border-1
          border-accent placeholder-text"
          />
          <input
            type="email"
            name="email"
            placeholder="Twój email"
            required
            className="w-full p-3 rounded bg-grayish border-b-3 border-r-3 border-1
          border-accent placeholder-text"
          />
          <textarea
            name="message"
            placeholder="Wiadomość"
            rows={5}
            required
            className="w-full p-3 rounded bg-grayish border-b-3 border-r-3 border-1
          border-accent placeholder-text"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-orange-600 text-dark py-2 px-4 rounded font-semibold transition"
          >
            Wyślij wiadomość
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
