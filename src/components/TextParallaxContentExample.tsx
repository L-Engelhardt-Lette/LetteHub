import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import DarkGridHero from "./DarkGridHero";

const IMG_PADDING = 12;

const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <DarkGridHero />

      {/* Use the DarkGridHero component here */}
      <ExampleContent />
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Einfach"
        heading="Digital."
      >
        <ExampleContent2 />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Agile Projektplanung"
        heading="mit einfacher Bedienung."
      >
        <ExampleContent3 />
      </TextParallaxContent>
    </div>
  );
};

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Willkommen bei LetteHub
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Ihrem perfekten Ort für die Organisation und Strukturierung von
        Projekten. Bei uns finden Sie das Werkzeug, das Ihnen hilft, den
        Überblick zu behalten und gleichzeitig erstklassige Arbeit zu
        garantieren.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Mit LetteHub können Sie Ihre kreativen Ideen in geordnete Bahnen lenken
        und Ihre Projekte effizient zum Erfolg führen.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowRight className="inline" />
      </button>
    </div>
  </div>
);
const ExampleContent2 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Einfach. Digital. Teamarbeit.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        LetteHub revolutioniert die Teamarbeit durch seine digitale Plattform,
        die Papier und Post-its obsolet macht. Steigern Sie Ihre Effizienz und
        reduzieren Sie gleichzeitig Ihren ökologischen Fußabdruck.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Mit LetteHub setzen Sie auf eine transparente, nachhaltige und
        zukunftsweisende Arbeitsweise.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowRight className="inline" />
      </button>
    </div>
  </div>
);
const ExampleContent3 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Flexibel und Intuitiv
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Unsere Projektplanung ist dynamisch und agil, angepasst an die sich
        ständig verändernden Marktbedingungen. Wir setzen auf flexible
        Strategien und diskrete Partnerschaften, um optimale Ergebnisse zu
        erzielen. Unsere Plattform ist intuitiv gestaltet, so dass selbst ohne
        Vorkenntnisse eine einfache Bedienung möglich ist.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Dies ermöglicht es jedem Teammitglied, schnell produktiv zu werden und
        sich auf das Wesentliche zu konzentrieren – die erfolgreiche Umsetzung
        unserer Projekte.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowRight className="inline" />
      </button>
    </div>
  </div>
);

export default TextParallaxContentExample;
