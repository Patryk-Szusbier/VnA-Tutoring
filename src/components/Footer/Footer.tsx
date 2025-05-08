import { Facebook, Instagram, Globe } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Logo from "../../assets/VH_logo2.png";
import AnimatedSeparator from "../utils/Separator";

export default function Footer() {
  return (
    <footer className="bg-dark text-text py-8 ">
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-4 gap-6  pt-5">
        {/* 1. Logo / nazwa */}
        <a href="#Home">
          <div className="cursor-pointer">
            <img
              src={Logo}
              alt="Logo Vanessa Heckel"
              className="w-12 h-12 mb-2"
            />
            <p className="text-text2 text-3xl font-semibold">Vanessa Heckel</p>
            <p className="text-m">Korepetycje</p>
          </div>
        </a>
        {/* 2. Nawigacja */}
        <div>
          <h3 className="text-text2 font-semibold mb-2 text-2xl">Nawigacja</h3>
          <ul className="space-y-1">
            <li>
              <a href="#Offert" className="hover:text-accent transition-colors">
                Oferta
              </a>
            </li>
            <li>
              <a
                href="#AboutMe"
                className="hover:text-accent transition-colors"
              >
                O mnie
              </a>
            </li>
            <li>
              <a
                href="#kontakt"
                className="hover:text-accent transition-colors"
              >
                Kontakt
              </a>
            </li>
            <li>
              <a
                href="/Warunki_uzytkowania_BLIK_imoje.docx.pdf"
                target="_blank"
                className="hover:text-accent transition-colors"
              >
                Warunki użytkowania
              </a>
            </li>
          </ul>
        </div>

        {/* 3. Kontakt */}
        <div>
          <h3 className="text-text2 font-semibold mb-2 text-2xl">Kontakt</h3>
          <p className="flex items-center space-x-2 text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ff9a00"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h2l.4 2M7 13h10l1-5H6l1 5zm0 0l-.4 2m0 0H3m4 0h10"
              />
            </svg>
            <span className="font-medium">737 457 125</span>
          </p>
          <p className="text-xs mt-1">kontakt@vanessa.com</p>
        </div>

        {/* 4. Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-2 text-2xl">
            Znajdź mnie
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100013915864426"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Facebook className="h-8 w-8 text-text hover:text-accent" />
            </a>
            <a
              href="https://www.instagram.com/djvanessa.pl/#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Instagram className="h-8 w-8 text-text hover:text-accent" />
            </a>
            <a
              href="https://www.tiktok.com/@djvanessa_djaro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTiktok className="h-8 w-8 text-text hover:text-accent" />
            </a>
            <a
              href="https://djvanessa-djaro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Globe className="h-8 w-8 text-text hover:text-accent" />
            </a>
          </div>
        </div>
      </div>

      {/* Dolna stopka */}
      <div className="  pt-4 text-center text-xs ">
        <AnimatedSeparator />
        <p className="pt-5">
          © {new Date().getFullYear()} Patryk Szusbier. Wszelkie prawa
          zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
