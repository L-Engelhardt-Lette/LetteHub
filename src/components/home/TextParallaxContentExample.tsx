import React, { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMG_PADDING = 12;

const DarkGridHero = lazy(() => import("../DarkGridHero"));
const ExampleContent1 = lazy(() => import("./content/ExampleContent1"));
const ExampleContent2 = lazy(() => import("./content/ExampleContent2"));
const ExampleContent3 = lazy(() => import("./content/ExampleContent3"));

const TextParallaxContentExample = () => {
  return (
    <div className="bg-backgroundlight dark:bg-backgrounddark text-foregroundlight dark:text-foregrounddark">
      <Suspense fallback={<div>Loading...</div>}>
        <DarkGridHero />
        <ExampleContent1 />
        <TextParallaxContent
          imgUrl="/img/HQLetteHub.png"
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
      </Suspense>
    </div>
  );
};

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      className="px-3"
      style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}
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
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl bg-cover bg-center h-[calc(100vh-24px)] top-3"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity }}
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
      style={{ y, opacity }}
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

export default TextParallaxContentExample;
