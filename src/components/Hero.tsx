import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/2358cb3e-9c7a-45cb-a238-54c2aaeb94c6/files/c60963d4-020b-443c-9778-147968ccd8ef.jpg"
          alt="Крым — природа и море"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-6 uppercase leading-tight">
          Сайт учителей биологии Республики Крым
        </h1>
        <p className="text-base md:text-xl max-w-2xl mx-auto px-6 opacity-90 leading-relaxed">
          Методические материалы, программы повышения квалификации и актуальные документы для педагогов Республики Крым
        </p>
        <a
          href="#materials"
          className="inline-block mt-8 border border-white text-white px-8 py-3 uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
        >
          Перейти к материалам
        </a>
      </div>
    </div>
  );
}