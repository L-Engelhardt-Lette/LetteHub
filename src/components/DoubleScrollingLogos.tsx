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

const DoubleScrollingLogos = () => {
  return (
    <section className="bg-white py-4">
      <div className="flex overflow-hidden">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
      <div className="flex overflow-hidden mt-4">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>
    </section>
  );
};

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: JSX.Element;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ Icon, href }: { Icon: IconType; href: string }) => {
  return (
    <a
      href={href}
      rel="nofollow"
      target="_blank"
      className="w-16 md:w-24 h-16 md:h-24 flex justify-center items-center hover:bg-slate-200 text-black transition-colors"
    >
      <Icon className="text-4xl md:text-5xl" />
    </a>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={SiTypescript} href="https://www.typescriptlang.org/" />
    <LogoItem Icon={GrMysql} href="https://www.mysql.com/" />
    <LogoItem Icon={FaReact} href="https://reactjs.org/" />
    <LogoItem Icon={SiJavascript} href="https://www.javascript.com/" />
    <LogoItem Icon={SiXampp} href="https://www.apachefriends.org/index.html" />
    <LogoItem Icon={VscVscode} href="https://code.visualstudio.com/" />
    <LogoItem
      Icon={FaHtml5}
      href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5"
    />
    <LogoItem Icon={SiVite} href="https://vitejs.dev/" />
    <LogoItem Icon={FaNode} href="https://nodejs.org/" />
    <LogoItem Icon={SiExpress} href="https://expressjs.com/" />
  </>
);

const LogoItemsBottom = () => (
  <>
    <LogoItem
      Icon={FaCss3}
      href="https://developer.mozilla.org/en-US/docs/Web/CSS"
    />
    <LogoItem Icon={RiTailwindCssFill} href="https://tailwindcss.com/" />
    <LogoItem Icon={BsFiletypeScss} href="https://sass-lang.com/" />
    <LogoItem Icon={BsFiletypeJson} href="https://www.json.org/json-en.html" />
    <LogoItem
      Icon={BsFiletypeTsx}
      href="https://www.typescriptlang.org/docs/handbook/jsx.html"
    />
    <LogoItem
      Icon={SiAdobeillustrator}
      href="https://www.adobe.com/products/illustrator.html"
    />
    <LogoItem Icon={FaGithub} href="https://github.com/" />
    <LogoItem
      Icon={FaMarkdown}
      href="https://daringfireball.net/projects/markdown/"
    />
    <LogoItem Icon={AiOutlineOpenAI} href="https://www.openai.com/" />
    <LogoItem Icon={DiScrum} href="https://www.scrum.org/" />
  </>
);

export default DoubleScrollingLogos;
