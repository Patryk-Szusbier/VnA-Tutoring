import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type TermsModalProps = {
  onClose: () => void;
  type: "terms" | "privacy";
};

export default function TermsModal({ onClose, type }: TermsModalProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(type === "terms" ? "/terms.md" : "/privacy.md")
      .then((res) => {
        // Hosting SPA potrafi zwrócić index.html zamiast 404 – nie renderujemy go jako treści
        if (!res.ok || res.headers.get("content-type")?.includes("text/html"))
          throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => !cancelled && setContent(text))
      .catch((err) => {
        console.error(err);
        if (!cancelled)
          setContent("Nie udało się wczytać dokumentu. Spróbuj ponownie później.");
      });
    return () => {
      cancelled = true;
    };
  }, [type]);

  // Fokus trafia do okna, a po zamknięciu wraca tam, skąd je otwarto.
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={type === "terms" ? "Regulamin" : "Polityka prywatności"}
      className="fixed inset-0 z-50 bg-dark/80 flex items-center justify-center px-4"
    >
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl border border-grayish p-6 bg-dark text-text">
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-grayish text-text2 text-2xl hover:border-text2 transition-colors"
          aria-label="Zamknij"
        >
          ×
        </button>

        <div className="prose prose-invert max-w-none pt-12 text-text [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-text2 [&_h1]:text-3xl [&_h2]:text-2xl [&_h2]:py-4 [&_h3]:text-xl [&_h3]:py-4">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
