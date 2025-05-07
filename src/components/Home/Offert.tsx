// src/components/OffertSection/OffertSection.jsx
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Card from "../Card/Card";
import cardsData from "../../assets/CardData.json";

export default function OffertSection() {
  const ref = useRef<HTMLElement>(null);
  // inView stanie się true, gdy 20% sekcji znajdzie się w viewport
  const inView = useInView(ref, { margin: "-20% 0px", amount: 0.3 });

  return (
    <section ref={ref} id="oferta" className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-2 text-accent"
        >
          Oferta korepetycji
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text2 mb-12"
        >
          Wybierz usługę idealnie dopasowaną do Twoich potrzeb
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {cardsData.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + idx * 0.1,
              }}
            >
              <Card title={c.title} message={c.message} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
