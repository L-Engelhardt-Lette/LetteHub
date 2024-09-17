import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { BsFillCloudyFill, BsStarFill } from "react-icons/bs";

const DarkModeToggle = ({
  mode,
  setMode,
}: {
  mode: "light" | "dark";
  setMode: Dispatch<SetStateAction<"dark" | "light">>;
}) => {
  return (
    <button
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className={`p-1 w-14 rounded-full flex shadow-sm relative bg-gradient-to-b ${
        mode === "light"
          ? "justify-end from-blue-500 to-sky-300"
          : "justify-start from-indigo-600 to-indigo-400"
      }`}
    >
      <Thumb mode={mode} />
      {mode === "light" && <Clouds />}
      {mode === "dark" && <Stars />}
    </button>
  );
};

const Thumb = ({ mode }: { mode: "light" | "dark" }) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.75,
        type: "spring",
      }}
      className="h-5 w-5 rounded-full overflow-hidden shadow-md relative"
    >
      <div
        className={`absolute inset-0 ${
          mode === "dark"
            ? "bg-slate-100"
            : "animate-pulse bg-gradient-to-tr from-amber-300 to-yellow-500 rounded-full"
        }`}
      />
      {mode === "light" && <SunCenter />}
      {mode === "dark" && <MoonSpots />}
    </motion.div>
  );
};

const SunCenter = () => (
  <div className="absolute inset-1 rounded-full bg-amber-300" />
);

const MoonSpots = () => (
  <>
    <motion.div
      initial={{ x: -2, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="w-1 h-1 rounded-full bg-slate-300 absolute right-1.5 bottom-1"
    />
    <motion.div
      initial={{ x: -2, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="w-2 h-2 rounded-full bg-slate-300 absolute left-1 bottom-2"
    />
    <motion.div
      initial={{ x: -2, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="w-1 h-1 rounded-full bg-slate-300 absolute right-1 top-1"
    />
  </>
);

const Stars = () => {
  return (
    <>
      <motion.span
        animate={{
          scale: [0.75, 1, 0.75],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeIn",
        }}
        className="text-slate-300 text-[4px] absolute right-2 top-1"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.75, 1],
          opacity: [0.5, 0.25, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeIn",
        }}
        style={{ rotate: "-45deg" }}
        className="text-slate-300 text-[6px] absolute right-1 top-2"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.5, 1],
          opacity: [1, 0.5, 1],
        }}
        style={{ rotate: "45deg" }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeIn",
        }}
        className="text-slate-300 absolute right-3 top-3 text-[5px]"
      >
        <BsStarFill />
      </motion.span>
    </>
  );
};

const Clouds = () => {
  return (
    <>
      <motion.span
        animate={{
          x: [-5, -3.75, -2.5, -1.25, 0],
          opacity: [0, 1, 0.75, 1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="text-white text-[4px] absolute left-3 top-1"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-2.5, 0, 2.5, 5, 7.5], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 0.5,
        }}
        className="text-white text-[5px] absolute left-1 top-2"
      >
        <BsFillCloudyFill />
      </motion.span>
    </>
  );
};

export default DarkModeToggle;
