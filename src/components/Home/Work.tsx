import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Photo from "../../assets/ImageWork.webp";
function Work() {
  // referencja do sekcji
  const ref = useRef(null);
  // flaga widoczności
  const inView = useInView(ref, { margin: "-20% 0px", amount: 0.3 });

  return (
    <section
      ref={ref}
      id="HowIWork"
      className={`w-full py-20 transition-all duration-1000 ${
        inView ? "bg-gradient-to-r from-grayish to-dark" : "bg-dark"
      } text-text2`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Tekst po lewej stronie */}
        <motion.div
          initial={{ x: -200, y: -200, opacity: 0 }}
          animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, easing: "ease-out" }}
          className="w-full md:w-1/2 text-lg leading-relaxed "
        >
          <h2 className="text-xl md:text-4xl font-bold mb-6 text-accent">
            Jak pracuję
          </h2>
          <p className="text-xm md:text-xl leading-relaxed">
            Zajęcia odbywają się w formie wideo-lekcji online, co pozwala uczyć
            się w komfortowych warunkach (np. w domu). Korzystam z
            interaktywnych narzędzi (tablica, prezentacje, screen sharing), aby
            wizualnie przedstawiać zagadnienia i sprawnie rozwiązywać zadania.
            Dbam o przyjazną atmosferę, zachęcam do zadawania pytań i tłumaczę
            tematy krok po kroku. Dzięki indywidualnemu podejściu lekcje są w
            pełni dostosowane do Twojego tempa pracy i stylu nauki.
          </p>
        </motion.div>

        {/* Obrazek po prawej stronie z marginesem */}

        <motion.div
          initial={{ x: 200, y: -200, opacity: 0 }}
          animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, easing: "ease-out" }}
          className="w-1/2  md:w-1/3 mt-8 md:mt-0 md:ml-10 hidden md:block"
        >
          <motion.img
            src={Photo}
            alt="Jak pracuję"
            loading="lazy"
            className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-4xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Work;
