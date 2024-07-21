import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Layout from "../components/test/Layout";
import DoubleScrollingLogos from "../components/DoubleScrollingLogos";
import "../scss/pages/About.scss";

const AboutSection = lazy(() => import("../components/about/AboutSection"));
const CommitStats = lazy(() => import("../components/about/CommitStats"));
const CodeExample = lazy(() => import("../components/about/CodeExamples"));

function AboutPage() {
  return (
    <Layout>
      <div className="overflow-y-scroll h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <motion.div
            className="h-screen bg-backgroundlight dark:bg-backgrounddark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AboutSection />
          </motion.div>
          <motion.div
            className="h-screen bg-backgroundlight dark:bg-backgrounddark flex items-center place-content-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="p-5 md:p-20 text-center max-w-screen-md mx-auto text-foregroundlight dark:text-foregrounddark">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-primary font-UnageoBold">
                Technologien und Ansätze
              </h2>
              <p className="text-lg text-foregroundlight dark:text-foregrounddark font-UnageoRegular">
                Unser Projekt ist eine moderne Webanwendung, die verschiedene
                Technologien nutzt, um eine effiziente und benutzerfreundliche
                Plattform zu bieten. Wir setzen <strong>TypeScript</strong> und{" "}
                <strong>React</strong> für robuste und wiederverwendbare
                UI-Komponenten ein. <strong>SCSS</strong> und{" "}
                <strong>Tailwind CSS</strong> sorgen für schnelles und
                effizientes Styling. Die serverseitige Logik wird mit{" "}
                <strong>Node.js</strong> und <strong>Express</strong> umgesetzt,
                während <strong>MySQL</strong> zur Datenspeicherung dient.{" "}
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
              <DoubleScrollingLogos />
            </div>
          </motion.div>
          <motion.div
            className="h-screen bg-backgroundlight dark:bg-backgrounddark flex items-center place-content-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="p-5 md:p-20 text-center max-w-screen-md mx-auto text-foregroundlight dark:text-foregrounddark">
              <h2 className="text-2xl md:text-4xl font-bold mb-5 text-secondary dark:text-secondarylight font-UnageoBold">
                LetteHub Projektübersicht
              </h2>
              <p className="font-UnageoRegular">
                Das LetteHub-Repository ist darauf ausgelegt, eine
                React-Anwendung mit TypeScript und Vite einzurichten und eine
                optimierte Entwicklungsumgebung mit Hot Module Replacement und
                ESLint-Integration für verbesserte Codequalität bereitzustellen.
                Dieses Setup ist ideal für die Erstellung skalierbarer und
                wartbarer Anwendungen.
              </p>
              <p className="font-UnageoRegular">
                Zu den Hauptmerkmalen gehören Konfigurationen für erweiterte
                Typüberprüfung und schnelle Aktualisierungsmöglichkeiten. Die
                Projektstruktur umfasst Verzeichnisse wie `BACKEND`, `public`
                und `src` sowie wesentliche Konfigurationsdateien. Dieses
                Repository dient als robuste Grundlage für moderne
                Webentwicklungsprojekte.
              </p>
              <CommitStats />
            </div>
          </motion.div>
          <CodeExample />
        </Suspense>
      </div>
    </Layout>
  );
}

export default AboutPage;
