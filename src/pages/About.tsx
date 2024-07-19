import React from "react";
import { motion } from "framer-motion";
import Layout from "../components/test/Layout";
import CommitStats from "../components/about/CommitStats";
import DoubleScrollingLogos from "../components/DoubleScrollingLogos";
import CodeExample from "../components/about/CodeExamples";

import "../scss/pages/About.scss";

const profiles = [
  {
    name: "Ludwig Engelhardt",
    role: "Front End / Back End",
    github: "https://github.com/LudwigLEDE",
  },
  {
    name: "Ole Herold",
    role: "Front End",
    github: "https://github.com/OleHerold",
  },
  {
    name: "Nick Bodinus",
    role: "Back End",
    github: "https://github.com/Nbdnus",
  },
  {
    name: "Luca Krickl",
    role: "Back End / Databank",
    github: "https://github.com/LucaKrickl",
  },
];

const ProfileCard = ({
  name,
  role,
  github,
}: {
  name: string;
  role: string;
  github: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-4 flex flex-col items-center bg-primary-light bg-opacity-75 rounded-lg shadow-md"
  >
    <img
      src={`${github}.png`}
      alt={`${name}'s GitHub`}
      className="w-24 h-24 rounded-full"
    />
    <h3 className="mt-4 text-lg font-semibold text-primary-content font-UnageoBold">
      {name}
    </h3>
    <p className="text-secondary-content font-UnageoRegular">{role}</p>
  </motion.div>
);

const AboutSection = () => (
  <section className="relative flex flex-col items-center justify-center min-h-screen bg-background-dark text-foreground-dark">
    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-background-dark opacity-70"></div>
    <h1
      id="TeamTitle"
      className="relative z-10 text-primary-content font-MonaspaceNeonRegular"
    >
      Our Team
    </h1>
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-lg p-4">
      {profiles.map((profile) => (
        <ProfileCard key={profile.name} {...profile} />
      ))}
    </div>
  </section>
);

function AboutPage() {
  return (
    <Layout>
      <div className="snap-y snap-proximity overflow-y-scroll h-screen">
        <motion.div
          className="snap-start h-screen bg-background-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AboutSection />
        </motion.div>
        <motion.div
          className="snap-start h-screen bg-foreground-dark place-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-5 md:p-20 text-center max-w-screen-md mx-auto text-copy">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-primary font-UnageoBold">
              Technologien und Ansätze
            </h2>
            <p className="text-lg text-copy-light font-UnageoRegular">
              Unser Projekt ist eine moderne Webanwendung, die verschiedene
              Technologien nutzt, um eine effiziente und benutzerfreundliche
              Plattform zu bieten. Wir setzen <strong>TypeScript</strong> und{" "}
              <strong>React</strong> für robuste und wiederverwendbare
              UI-Komponenten ein. <strong>SCSS</strong> und{" "}
              <strong>Tailwind CSS</strong> sorgen für schnelles und effizientes
              Styling. Die serverseitige Logik wird mit <strong>Node.js</strong>{" "}
              und <strong>Express</strong> umgesetzt, während{" "}
              <strong>MySQL</strong> zur Datenspeicherung dient.{" "}
              <strong>Vite</strong> ermöglicht schnelle Builds, und{" "}
              <strong>XAMPP</strong> dient als lokaler Entwicklungsserver.
              Unsere Entwicklung erfolgt in <strong>VS Code</strong>, und{" "}
              <strong>GitHub</strong> wird für die Zusammenarbeit genutzt. Zur
              Dokumentation verwenden wir <strong>Markdown</strong>, und{" "}
              <strong>JSON</strong> wird für den Datenaustausch verwendet.{" "}
              <strong>Adobe Illustrator</strong> nutzen wir für Design-Assets,
              und <strong>Scrum</strong> organisiert unsere
              Entwicklungsprozesse. Diese Technologien ermöglichen uns, eine
              robuste und ansprechende Webanwendung zu entwickeln.
            </p>
          </div>
          <DoubleScrollingLogos />
        </motion.div>
        <motion.div
          className="snap-start h-screen bg-foreground-light flex items-center place-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-5 md:p-20 text-center max-w-screen-md mx-auto text-copy">
            <h2 className="text-2xl md:text-4xl font-bold mb-5 text-secondary font-UnageoBold">
              LetteHub Projektübersicht
            </h2>
            <p className="font-UnageoRegular">
              Das LetteHub-Repository ist darauf ausgelegt, eine React-Anwendung
              mit TypeScript und Vite einzurichten und eine optimierte
              Entwicklungsumgebung mit Hot Module Replacement und
              ESLint-Integration für verbesserte Codequalität bereitzustellen.
              Dieses Setup ist ideal für die Erstellung skalierbarer und
              wartbarer Anwendungen.
            </p>
            <p className="font-UnageoRegular">
              Zu den Hauptmerkmalen gehören Konfigurationen für erweiterte
              Typüberprüfung und schnelle Aktualisierungsmöglichkeiten. Die
              Projektstruktur umfasst Verzeichnisse wie `BACKEND`, `public` und
              `src` sowie wesentliche Konfigurationsdateien. Dieses Repository
              dient als robuste Grundlage für moderne Webentwicklungsprojekte.
            </p>
            <CommitStats />
          </div>
        </motion.div>
        <CodeExample /> {/* Adding the Example component here */}
      </div>
    </Layout>
  );
}

export default AboutPage;
