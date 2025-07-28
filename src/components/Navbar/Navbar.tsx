import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import Logo from "../../assets/VH_logo2.webp";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-4/5 -translate-x-1/2 bg-grayish shadow-md rounded-xl transition-all duration-300 border-b-2 border-r border-accent">
      <div className="relative">
        {/* Główna belka */}
        <div className="flex items-center justify-between px-2 py-3 md:px-6 md:py-4 relative z-10">
          {/* Logo */}
          <a href="#Home">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="logo"
                className="xl:w-18 xl:h-18 lg:w-14 lg:h-14 md:w-8 md:h-8 w-10 h-10 rounded-2xl"
              />
              <div className="text-sm leading-4">
                <p className="text-text2 text-sm md:text-base lg:text-2xl xl:text-5xl font-semibold">
                  Vanessa Heckel
                </p>
                <p className="text-text text-xs md:text-base lg:text-lg xl:text-xl">
                  Korepetycje
                </p>
              </div>
            </div>
          </a>

          {/* Telefon */}
          <div
            className={`absolute left-1/2 md:left-2/3 md:transform md:-translate-x-1/2 transform transition-opacity duration-300 ${
              hidePhone ? "opacity-30" : "opacity-100"
            } flex items-center space-x-2 text-accent cursor-pointer `}
          >
            <Phone
              size={20}
              className="h-4 w-4 md:h-8 md:w-8 xl:h-10 xl:w-10 "
            />
            <span className="font-medium text-sm md:text-lg lg:text-2xl 2xl:text-3xl">
              737 457 125
            </span>
          </div>

          {/* Menu desktop */}
          <ul className="hidden 2xl:flex space-x-6 text-xl xl:text-3xl lg:text-xl font-semibold text-text2">
            <li className="hover:text-accent cursor-pointer transition-colors">
              <a href="#AboutMe">O mnie</a>
            </li>
            <li className="hover:text-accent cursor-pointer transition-colors">
              <a href="#Offert">Oferta</a>
            </li>
            <li className="hover:text-accent cursor-pointer transition-colors">
              <a href="#Contact">Kontakt</a>
            </li>
          </ul>

          {/* Przycisk menu */}
          <button
            className="2xl:hidden text-text focus:outline-none relative z-20 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={24} className="size-6 md:size-12" />
            ) : (
              <Menu size={24} className="size-6 md:size-12" />
            )}
          </button>
        </div>

        {/* Dropdown mobilny */}
        {menuOpen && (
          <div className="2xl:hidden absolute top-full left-0 w-full bg-grayish border-t border-accent shadow-md z-0">
            <ul className="flex flex-col space-y-2 py-4 px-6 text-text2 text-lg font-medium">
              <li className="hover:text-accent cursor-pointer transition-colors">
                <a href="#Offert" onClick={() => setMenuOpen(false)}>
                  Oferta
                </a>
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                <a href="#AboutMe" onClick={() => setMenuOpen(false)}>
                  O mnie
                </a>
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                <a href="#Contact" onClick={() => setMenuOpen(false)}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
