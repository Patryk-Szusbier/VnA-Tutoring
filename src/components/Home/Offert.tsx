import { useRef } from "react";
import { motion, useInView } from "framer-motion"; // poprawiona ścieżka importu
import Card from "../Card/Card";
import cardsData from "../../assets/CardData.json";

export default function OffertSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    margin: "50px",
    amount: 0.3, // nawet 0.0 na próbę
  });

  return (
    <section
      ref={ref}
      id="Offert"
      className={`w-full py-20 transition-all duration-1000 ${
        inView ? "bg-gradient-to-r from-grayish to-dark" : "bg-dark"
      } scroll-mt-16 md:scroll-mt-36`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-accent"
        >
          Oferta korepetycji
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-xl text-text2 mb-10"
        >
          Wybierz usługę idealnie dopasowaną do Twoich potrzeb
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {cardsData.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + idx * 0.1,
              }}
              className="h-full"
            >
              <Card title={c.title} message={c.message} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
