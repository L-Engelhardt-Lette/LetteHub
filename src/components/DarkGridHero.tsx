import React from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

// Constants
const GRID_BOX_SIZE = 64;

// Typings
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const DarkGridHero = () => {
  const { scrollYProgress } = useViewportScroll();

  // Calculate translateY based on scrollY
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0, -200] // Adjust the range and values as needed
  );

  // Calculate scale based on scrollY
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0.9] // Adjust the range and values as needed
  );

  // Calculate opacity for text fade in/out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1],
    [1, 0.5, 0] // Adjust the range and values as needed
  );

  return (
    <motion.section
      className="relative overflow-hidden bg-zinc-950 rounded-3xl"
      style={{
        height: `calc(100vh - 24px)`,
        margin: "12px",
        scale: scale,
        translateY: translateY,
      }}
    >
      <Content opacity={opacity} />
      <Beams translateY={translateY} />
      <GradientGrid />
    </motion.section>
  );
};

const Content = ({ opacity }: { opacity: any }) => {
  return (
    <motion.div
      style={{
        opacity: opacity,
        transition: "opacity 0.3s ease-in-out", // Smooth opacity transition
      }}
      className="relative z-20 mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 md:px-8 md:py-36 h-full"
    >
      <motion.div
        style={{
          opacity: opacity,
          transition: "opacity 0.3s ease-in-out", // Smooth opacity transition
        }}
        className="relative"
      >
        <GlowingChip>Exciting announcement 🎉</GlowingChip>
      </motion.div>
      <motion.h1
        style={{
          opacity: opacity,
          transition: "opacity 0.3s ease-in-out", // Smooth opacity transition
        }}
        className="mb-3 text-center text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-7xl lg:leading-tight"
      >
        LetteHub
      </motion.h1>
      <motion.p
        style={{
          opacity: opacity,
          transition: "opacity 0.3s ease-in-out", // Smooth opacity transition
        }}
        className="mb-9 max-w-2xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg md:text-lg md:leading-relaxed"
      >
        Build beautiful landing pages for your startups, clients, and side
        projects, without having to think about design.
      </motion.p>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.25, ease: "easeInOut", delay: 1 }}
        className="flex flex-col items-center gap-6 sm:flex-row"
      >
        <SplashButton className="flex items-center gap-2">
          Try it free
          <FiArrowRight />
        </SplashButton>
        <GhostButton className="rounded-md px-4 py-2 text-zinc-100">
          Learn more
        </GhostButton>
      </motion.div>
    </motion.div>
  );
};

const GlowingChip = ({ children }: { children: string }) => {
  return (
    <span className="relative z-10 mb-4 inline-block rounded-full border border-zinc-700 bg-zinc-900/20 px-3 py-1.5 text-xs text-zinc-50 md:mb-0">
      {children}
      <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-zinc-500/0 via-zinc-300 to-zinc-500/0" />
    </span>
  );
};

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const GhostButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-md px-4 py-2 text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const Beams = ({ translateY }: { translateY: any }) => {
  const beamPositions = Array.from(
    { length: 13 },
    (_, index) => index * GRID_BOX_SIZE
  );

  return (
    <>
      {beamPositions.map((top) => (
        <Beam key={top} top={top} translateY={translateY} />
      ))}
    </>
  );
};

const Beam = ({ top, translateY }: { top: number; translateY: any }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ opacity: [0, 1, 0], y: translateY }}
      transition={{
        ease: "easeInOut",
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
      }}
      style={{
        top: top,
        left: Math.floor(Math.random() * window.innerWidth),
      }}
      className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-blue-500/0 to-blue-500"
    />
  );
};

const GradientGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      className="absolute inset-0 z-0"
    >
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
        className="absolute inset-0 opacity-[1]"
      />
      <div className="absolute inset-0 bg-grid-gradient" />
    </motion.div>
  );
};

export default DarkGridHero;
