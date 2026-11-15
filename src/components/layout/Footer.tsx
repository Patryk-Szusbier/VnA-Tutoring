import Logo from "../../assets/VH_logo2.webp";
import { brand, contact, navLinks, socials } from "../../data/site";

type FooterProps = {
  onModalOpen: (type: "terms" | "privacy") => void;
};

const linkClass = "inline-block py-1 transition-colors hover:text-accent";

export default function Footer({ onModalOpen }: FooterProps) {
  return (
    <footer className="border-t border-grayish">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-7 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-md"
              loading="lazy"
            />
            <div className="leading-snug">
              <p className="font-display text-xl font-semibold text-text2">
                {brand.name}
              </p>
              <p>{brand.studio}</p>
            </div>
          </div>
          <p className="mt-1 text-md">Korepetycje z matematyki online</p>
        </div>

        <nav aria-label="Stopka">
          <h2 className="text-xl font-semibold">Na stronie</h2>
          <ul className="mt-1 columns-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xl font-semibold">Kontakt</h2>
          <ul className="mt-1">
            <li>
              <a href={contact.phoneHref} className={linkClass}>
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className={`${linkClass} break-all`}
              >
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Vanessa w sieci</h2>
          <ul className="mt-1">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-grayish">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-2 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {/* Rok z buildu może różnić się od bieżącego tuż po Nowym Roku. */}
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {brand.name}, {brand.studio}
          </p>
          <div className="flex flex-wrap gap-x-6">
            <button
              type="button"
              onClick={() => onModalOpen("terms")}
              className={linkClass}
            >
              Regulamin
            </button>
            <button
              type="button"
              onClick={() => onModalOpen("privacy")}
              className={linkClass}
            >
              Polityka prywatności
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
