import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import Logo from "../../assets/VH_logo2.png";
export default function Navbar() {
  const [hidePhone, setHidePhone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHidePhone(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="
    fixed 
    left-1/2 top-4 
    z-50 
    w-4/5 
    -translate-x-1/2 
    bg-grayish 
    shadow-md 
    rounded-xl 
    transition-all duration-300 
    
    border-b-2 border-r border-accent
  "
    >
      <div className="flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <a href="#Home">
          <div className="flex items-center space-x-2">
            <img
              src={Logo} // <- Podmień na właściwy adres
              alt="logo"
              className="w-8 h-8 md:w-16 md:h-16"
            />
            <div className="text-sm leading-4">
              <p className=" text-text2 text-xl md:text-3xl font-semibold ">
                Vanessa Heckel
              </p>
              <p className="text-text text-base md:text-sm">Korepetycje</p>
            </div>
          </div>
        </a>
        {/* Telefon na środku */}
        <div
          className={`absolute left-1/2 md:left-1/2 md:transform md:-translate-x-1/2 transform transition-opacity duration-300 ${
            hidePhone ? "opacity-30" : "opacity-100"
          } flex items-center space-x-2 text-accent cursor-pointer`}
        >
          <Phone size={20} className="md:!h-8 md:!w-8" />
          <span className="font-medium text-m md:text-5xl ">737 457 125</span>
        </div>

        {/* Desktopowe menu */}

        <ul className="hidden md:flex space-x-6 text-xl font-semibold text-text2">
          <a href="#AboutMe">
            <li className="hover:text-accent cursor-pointer transition-colors">
              O mnie
            </li>
          </a>
          <a href="#Offert">
            <li className="hover:text-accent cursor-pointer transition-colors">
              Oferta
            </li>
          </a>

          <a href="#Contact">
            <li className="hover:text-accent cursor-pointer transition-colors">
              Kontakt
            </li>
          </a>
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-text focus:outline-none"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-grayish border-t border-accent">
          <ul className="flex flex-col space-y-2 py-4 px-6 text-text2 text-lg font-medium">
            <li className="hover:text-accent cursor-pointer transition-colors">
              Oferta
            </li>
            <li className="hover:text-accent cursor-pointer transition-colors">
              O mnie
            </li>
            <li className="hover:text-accent cursor-pointer transition-colors">
              Kontakt
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
