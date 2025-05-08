// src/components/AboutMe/AboutMe.jsx
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import MyPhoto from "../../assets/108.jpg";

export default function AboutMe() {
  // referencja do sekcji
  const ref = useRef(null);
  // flaga widoczności
  const inView = useInView(ref, { margin: "-20% 0px", amount: 0.3 });

  return (
    <section
      ref={ref}
      className={`
        w-full py-20 transition-all duration-1000
        ${inView ? "bg-gradient-to-tr from-grayish to-dark" : "bg-dark"}
        text-text2
      `}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-4">
        {/* Animowane zdjęcie */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, easing: "ease-out" }}
          className="w-full md:w-1/2"
        >
          <img
            src={MyPhoto}
            alt="Vanessa"
            className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-4xl shadow-lg"
          />
        </motion.div>

        {/* Animowany tekst */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, easing: "ease-out" }}
          className="w-full md:w-1/2 text-lg leading-relaxed "
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
            O mnie
          </h2>
          <p className="mb-4 leading-relaxed">
            Szukasz skutecznej i wygodnej formy nauki matematyki? Oferuję
            korepetycje z matematyki online dedykowane uczniom liceum i
            technikum.
          </p>
          <p className="leading-relaxed">
            Posiadam 2-letnie doświadczenie w udzielaniu korepetycji, dzięki
            czemu potrafię skutecznie przygotować do matury oraz pomóc z
            bieżącym materiałem szkolnym. Każde zajęcia prowadzę w sposób
            indywidualnie dopasowany do potrzeb ucznia, kładąc nacisk na
            zrozumienie trudnych zagadnień i stopniowe budowanie pewności
            siebie.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
