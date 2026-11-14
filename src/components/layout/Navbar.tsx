import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "../../assets/VH_logo2.webp";
import { brand, contact, cta, navLinks } from "../../data/site";
import ButtonLink from "../ui/ButtonLink";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Scroll-spy: aktywna jest ostatnia sekcja, której góra minęła linię 30% wysokości okna.
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      // Min. 120px: kotwica ląduje ~104px od góry (scroll-padding), także w niskim oknie.
      const line = Math.max(window.innerHeight * 0.3, 120);
      let current = "";
      for (const { href } of navLinks) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top <= line) current = href;
      }
      // Ostatnia sekcja bywa za krótka, by dojść do linii, więc dół strony ją wymusza.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? navLinks[navLinks.length - 1].href : current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const linkState = (href: string) =>
    href === active
      ? "text-text2 underline decoration-accent decoration-2 underline-offset-8"
      : "text-text hover:text-text2";

  return (
    <header className="sticky top-0 z-40 border-b border-grayish bg-dark/90 backdrop-blur">
      <nav
        aria-label="Główna"
        className="mx-auto flex max-w-6xl items-center h-nav justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#start" className="flex shrink-0 items-center gap-3 rounded-lg">
          <img src={Logo} alt="" width={48} height={48} className="h-12 w-12 rounded-md" />
          {/* shortcut: na wąskich telefonach nazwę pokazuje samo logo, tekst zostaje dla czytników ekranu */}
          <span className="sr-only whitespace-nowrap leading-tight min-[30rem]:not-sr-only">
            <span className="block font-display text-xl font-semibold text-text2">
              {brand.name}
            </span>
            <span className="block">{brand.studio}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 whitespace-nowrap lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={link.href === active ? "location" : undefined}
                className={`py-2 text-lg transition-colors ${linkState(link.href)}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={contact.phoneHref}
            className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap font-semibold text-text2 transition-colors hover:text-accent md:hidden"
          >
            <Phone aria-hidden="true" size={18} />
            {contact.phoneDisplay}
          </a>
          {/* Stała szerokość: zamiana CTA na telefon po opuszczeniu Hero nie przesuwa menu. */}
          <div className="hidden w-50 whitespace-nowrap md:block">
            {active ? (
              <ButtonLink href={contact.phoneHref} className="w-full">
                <Phone aria-hidden="true" size={18} />
                {contact.phoneDisplay}
              </ButtonLink>
            ) : (
              <ButtonLink href={cta.href} className="w-full">
                {cta.label}
              </ButtonLink>
            )}
          </div>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-grayish text-text2 lg:hidden"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-grayish lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.href === active ? "location" : undefined}
                  className={`block py-3 text-lg ${linkState(link.href)}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3 md:hidden">
              <ButtonLink href={cta.href} onClick={() => setOpen(false)} className="w-full">
                {cta.label}
              </ButtonLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
