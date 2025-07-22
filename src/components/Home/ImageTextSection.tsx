  import { motion } from "framer-motion";
  import { useEffect, useRef, useState } from "react";

  type ImageTextSectionProps = {
    title: string;
    content: string;
    image: string;
    imageAlt?: string;
    imagePosition?: "left" | "right";
    id: string;
    animation?: "normal" | "up";
  };

  const ImageTextSection: React.FC<ImageTextSectionProps> = ({
    title,
    content,
    image,
    imageAlt = "Image",
    imagePosition = "right",
    id,
    animation = "normal",
  }) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        {
          rootMargin: "-20% 0px",
          threshold: 0.3,
        }
      );

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, []);

    const isImageLeft = imagePosition === "left";
    const animationstart = animation === "normal";

    return (
      <section
        ref={ref}
        id={id}
        className={`w-full py-20 transition-all duration-1000 scroll-mt-36 ${
          inView ? "bg-gradient-to-r from-grayish to-dark" : "bg-dark"
        } text-text2`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Obrazek po lewej */}
          {isImageLeft && (
            <motion.div
              initial={{ x: -200, y: animationstart ? 0 : -200, opacity: 0 }}
              animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 md:mr-10"
            >
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-80 md:h-80 object-cover rounded-3xl shadow-lg mx-auto md:mx-0"
              />
            </motion.div>
          )}

          {/* Tekst */}
          <motion.div
            initial={{
              x: isImageLeft ? 200 : -200,
              y: animationstart ? 0 : -200,
              opacity: 0,
            }}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.3, delay: 0.2 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 sm:mb-6 text-accent">
              {title}
            </h2>
            <p className="text-sm  md:text-xl leading-relaxed">{content}</p>
          </motion.div>

          {/* Obrazek po prawej */}
          {!isImageLeft && (
            <motion.div
              initial={{ x: 200, y: animationstart ? 0 : -200, opacity: 0 }}
              animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-10"
            >
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-80 md:h-80 object-cover rounded-3xl shadow-lg mx-auto md:mx-0"
              />
            </motion.div>
          )}
        </div>
      </section>
    );
  };

  export default ImageTextSection;
