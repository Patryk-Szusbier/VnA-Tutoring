import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy";
};

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isOpen) {
      const file = type === "terms" ? "/terms.md" : "/privacy.md";

      fetch(file)
        .then((res) => res.text())
        .then(setContent)
        .catch(console.error);
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl p-6 bg-dark text-text">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text2 text-3xl font-bold hover:scale-110 transition-transform p-2"
          aria-label="Zamknij"
        >
          ×
        </button>

        <div className="prose prose-invert max-w-none pt-12 text-text text-xm [&_h1]:font_bold [&_h1]:mb-4 [&_h1]:text-accent [&_h1]:text-center [&_h1]:text-3xl [&_h2]:text-2xl [&_h2]:py-4 [&_h3]:text-xl [&_h3]:py-4">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
