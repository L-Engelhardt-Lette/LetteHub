import { motion } from "framer-motion";
import {
  SiTypescript,
  SiJavascript,
  SiXampp,
  SiVite,
  SiExpress,
  SiAdobeillustrator,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import {
  FaReact,
  FaCss3,
  FaHtml5,
  FaNode,
  FaGithub,
  FaMarkdown,
} from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BsFiletypeScss, BsFiletypeJson, BsFiletypeTsx } from "react-icons/bs";
import { VscVscode } from "react-icons/vsc";
import { AiOutlineOpenAI } from "react-icons/ai";
import { DiScrum } from "react-icons/di";
import { IconType } from "react-icons";
import React from "react";

const logosTop = [
  { Icon: SiTypescript, href: "https://www.typescriptlang.org/" },
  { Icon: GrMysql, href: "https://www.mysql.com/" },
  { Icon: FaReact, href: "https://reactjs.org/" },
  { Icon: SiJavascript, href: "https://www.javascript.com/" },
  { Icon: SiXampp, href: "https://www.apachefriends.org/index.html" },
  { Icon: VscVscode, href: "https://code.visualstudio.com/" },
  {
    Icon: FaHtml5,
    href: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
  },
  { Icon: SiVite, href: "https://vitejs.dev/" },
  { Icon: FaNode, href: "https://nodejs.org/" },
  { Icon: SiExpress, href: "https://expressjs.com/" },
];

const logosBottom = [
  { Icon: FaCss3, href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { Icon: RiTailwindCssFill, href: "https://tailwindcss.com/" },
  { Icon: BsFiletypeScss, href: "https://sass-lang.com/" },
  { Icon: BsFiletypeJson, href: "https://www.json.org/json-en.html" },
  {
    Icon: BsFiletypeTsx,
    href: "https://www.typescriptlang.org/docs/handbook/jsx.html",
  },
  {
    Icon: SiAdobeillustrator,
    href: "https://www.adobe.com/products/illustrator.html",
  },
  { Icon: FaGithub, href: "https://github.com/" },
  {
    Icon: FaMarkdown,
    href: "https://daringfireball.net/projects/markdown/",
  },
  { Icon: AiOutlineOpenAI, href: "https://www.openai.com/" },
  { Icon: DiScrum, href: "https://www.scrum.org/" },
];

const DoubleScrollingLogos = () => (
  <section className="bg-backgroundlight dark:bg-backgrounddark py-4 relative overflow-hidden max-w-screen-lg mx-auto">
    <FadeOverlay position="left" />
    <div className="flex overflow-hidden">
      {Array.from({ length: 3 }).map((_, idx) => (
        <TranslateWrapper key={`top-${idx}`}>
          <LogoItems logos={logosTop} />
        </TranslateWrapper>
      ))}
    </div>
    <div className="flex overflow-hidden mt-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <TranslateWrapper key={`bottom-${idx}`} reverse>
          <LogoItems logos={logosBottom} />
        </TranslateWrapper>
      ))}
    </div>
    <FadeOverlay position="right" />
  </section>
);

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: JSX.Element;
  reverse?: boolean;
}) => (
  <motion.div
    initial={{ translateX: reverse ? "-100%" : "0%" }}
    animate={{ translateX: reverse ? "0%" : "-100%" }}
    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
    className="flex gap-4 px-2 min-w-full"
  >
    {children}
  </motion.div>
);

const LogoItem = ({ Icon, href }: { Icon: IconType; href: string }) => (
  <a
    href={href}
    rel="nofollow"
    target="_blank"
    className="w-16 md:w-20 h-16 md:h-20 flex justify-center items-center hover:bg-primarylight text-foregroundlight dark:text-foregrounddark transition-colors"
  >
    <Icon className="text-4xl md:text-5xl" />
  </a>
);

const LogoItems = ({
  logos,
}: {
  logos: { Icon: IconType; href: string }[];
}) => (
  <>
    {logos.map(({ Icon, href }, idx) => (
      <LogoItem key={idx} Icon={Icon} href={href} />
    ))}
  </>
);

const FadeOverlay = ({ position }: { position: "left" | "right" }) => (
  <div
    className={`absolute top-0 ${
      position === "left" ? "left-0" : "right-0"
    } h-full w-16 pointer-events-none bg-gradient-to-${
      position === "left" ? "r" : "l"
    } from-backgroundlight dark:from-backgrounddark`}
  />
);

export default DoubleScrollingLogos;
