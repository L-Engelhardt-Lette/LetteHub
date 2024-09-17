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
      className={`p-0.5 w-5 h-3 rounded-full flex shadow-sm relative bg-gradient-to-b ${
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
      className="h-2 w-2 rounded-full overflow-hidden shadow-sm relative"
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
  <div className="absolute inset-0.25 rounded-full bg-amber-300" />
);

const MoonSpots = () => (
  <>
    <motion.div
      initial={{ x: -0.25, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.25 }}
      className="w-0.25 h-0.25 rounded-full bg-slate-300 absolute right-0.25 bottom-0.25"
    />
    <motion.div
      initial={{ x: -0.25, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.25 }}
      className="w-0.25 h-0.25 rounded-full bg-slate-300 absolute left-0.1 bottom-0.5"
    />
    <motion.div
      initial={{ x: -0.25, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.25 }}
      className="w-0.25 h-0.25 rounded-full bg-slate-300 absolute right-0.25 top-0.25"
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
        className="text-slate-300 text-[2px] absolute right-1 top-0.25"
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
        className="text-slate-300 text-[3px] absolute right-0.5 top-0.5"
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
        className="text-slate-300 absolute right-0.75 top-1 text-[2.5px]"
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
          x: [-1.25, -0.94, -0.62, -0.31, 0],
          opacity: [0, 1, 0.75, 1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="text-white text-[2px] absolute left-0.75 top-0.1"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{
          x: [-0.62, 0, 0.62, 1.25, 1.87],
          opacity: [0, 1, 0.75, 1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 0.5,
        }}
        className="text-white text-[2.5px] absolute left-0.25 top-0.5"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{
          x: [-0.43, 0, 0.43, 0.87, 1.31],
          opacity: [0, 1, 0.75, 1, 0],
        }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
        }}
        className="text-white absolute left-0.5 top-0.75 text-[2px]"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{
          x: [-0.94, 0, 0.94, 1.87, 2.81],
          opacity: [0, 1, 0.75, 1, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          delay: 0.75,
        }}
        className="text-white absolute text-[1.5px] left-0.87 top-0.5"
      >
        <BsFillCloudyFill />
      </motion.span>
    </>
  );
};

export default DarkModeToggle;
