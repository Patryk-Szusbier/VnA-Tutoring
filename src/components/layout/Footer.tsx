import Logo from "../../assets/VH_logo2.webp";
import { brand, contact, navLinks, socials } from "../../data/site";

type FooterProps = {
  onModalOpen: (type: "terms" | "privacy") => void;
};

const linkClass = "inline-block py-1.5 transition-colors hover:text-text2";

export default function Footer({ onModalOpen }: FooterProps) {
  return (
    <footer className="border-t border-grayish">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <img src={Logo} alt="" width={48} height={48} className="h-12 w-12 rounded-md" loading="lazy" />
          <p className="mt-3 font-display text-xl font-semibold text-text2">{brand.name}</p>
          <p>{brand.studio}</p>
          <p className="mt-2">Korepetycje z matematyki online</p>
        </div>

        <nav aria-label="Stopka">
          <h2 className="text-base font-semibold">Na stronie</h2>
          <ul className="mt-3">
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
          <h2 className="text-base font-semibold">Kontakt</h2>
          <ul className="mt-3">
            <li>
              <a href={contact.phoneHref} className={linkClass}>
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold">Vanessa w sieci</h2>
          <ul className="mt-3">
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
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {brand.name}, {brand.studio}
          </p>
          <div className="flex flex-wrap gap-x-6">
            <button type="button" onClick={() => onModalOpen("terms")} className={linkClass}>
              Regulamin
            </button>
            <button type="button" onClick={() => onModalOpen("privacy")} className={linkClass}>
              Polityka prywatności
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
