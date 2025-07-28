import { useRef, useEffect, useState, lazy } from "react";
import Card from "../Card/Card";
import cardsData from "../../assets/CardData.json";

// Lazy load framer-motion
const LazyMotionDiv = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.div }))
);
const LazyMotionH2 = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.h2 }))
);
const LazyMotionH3 = lazy(() =>
  import("framer-motion").then((mod) => ({ default: mod.motion.h3 }))
);

export default function OffertSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: "50px",
        threshold: 0.3,
      }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="Offert"
      className={`w-full py-20 transition-all duration-1000 ${
        inView ? "bg-gradient-to-r from-grayish to-dark" : "bg-dark"
      } scroll-mt-16 md:scroll-mt-36`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <LazyMotionH2
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-accent"
        >
          Oferta korepetycji
        </LazyMotionH2>

        <LazyMotionH3
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-xl lg:text-2xl text-text2 mb-10 lg:mb-16"
        >
          Wybierz usługę idealnie dopasowaną do Twoich potrzeb
        </LazyMotionH3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {cardsData.map((c, idx) => (
            <LazyMotionDiv
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
            </LazyMotionDiv>
          ))}
        </div>
      </div>
      <div
        className={`flex justify-center items-center mt-6 transition-opacity duration-700 `}
      >
        <div className="relative rotating-border-wrapper rounded-2xl p-2 mx-2 sm:mx-4 pulse-smooth">
          <p></p>
          <p className="relative z-10 text-2xl md:text-3xl font-extrabold text-white rounded-xl shadow-lg px-6 py-4 text-center">
            <span className="text-accent">PROMOCJA</span> <br />
            Cena: <span className="text-accent">90zł</span> / 60 minut
          </p>
        </div>
      </div>
    </section>
  );
}
