// src/components/AboutMe/AboutMe.jsx
import React from "react";
import MyPhoto from "../../assets/108.jpg";
export default function AboutMe() {
  return (
    <section id="omnie" className="w-4/5 mx-auto py-20">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Lewa kolumna: zdjęcie */}
        <div className="flex-shrink-0">
          <img
            src={MyPhoto} // ← podmień na prawdziwą ścieżkę
            alt="Vanessa Heckel"
            className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-4xl shadow-lg"
          />
        </div>

        {/* Prawa kolumna: tekst */}
        <div className="flex-1 text-text">
          <h2 className="text-3xl font-bold text-accent mb-4">O mnie</h2>
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
        </div>
      </div>
    </section>
  );
}
