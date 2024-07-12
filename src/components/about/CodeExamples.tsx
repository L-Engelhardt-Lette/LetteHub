import { motion, useInView } from "framer-motion";
import React from "react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";

type FeatureType = {
  id: number;
  callout: string;
  title: string;
  description: string;
  contentPosition: "l" | "r";
  Icon: IconType;
  code: string;
};

const initialFeatures: FeatureType[] = [
  {
    id: 1,
    callout: "Initialize Project",
    title: "Funktion zur Initialisierung eines Projekts",
    description:
      "Diese Funktion richtet die anfängliche Konfiguration und die Parameter für ein neues Projekt in der Anwendung ein.",
    contentPosition: "r",
    Icon: FiEye,
    code: `function initializeProject(name: string, description: string, startDate: Date): Project {
  const newProject: Project = {
    id: generateUniqueId(),
    name,
    description,
    startDate,
    tasks: [],
    status: 'Not Started'
  };
  return newProject;
}`,
  },
  {
    id: 2,
    callout: "Parallax Text",
    title: "Parallax-Textinhalt",
    description:
      "Diese Komponente zeigt einen Textinhaltabschnitt mit einem Parallax-Scrolling-Effekt unter Verwendung von React und Framer Motion.",
    contentPosition: "l",
    Icon: FiSearch,
    code: `import { motion } from 'framer-motion';
import React from 'react';

const TextParallaxContentExample = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="parallax-text-content"
    >
      <h1>Parallax Text Effekt</h1>
      <p>
        Dieser Text verwendet einen Parallax-Scrolling-Effekt, um ein
        ansprechendes Benutzererlebnis zu schaffen.
      </p>
    </motion.div>
  );
};

export default TextParallaxContentExample;`,
  },
  {
    id: 3,
    callout: "Project View",
    title: "Projektansichtstabelle",
    description:
      "Diese Komponente zeigt eine Tabellenansicht von Projekten, zeigt deren Details an und ermöglicht die Interaktion mit jedem Projektelement.",
    contentPosition: "r",
    Icon: FiPlay,
    code: `import React from 'react';

const ProjectViewTableBeta = ({ projects }) => {
  return (
    <table className="project-view-table">
      <thead>
        <tr>
          <th>Projektname</th>
          <th>Beschreibung</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectViewTableBeta;`,
  },
];

const CodeExample = () => {
  return (
    <>
      <SwapColumnFeatures features={initialFeatures} />
    </>
  );
};

const SwapColumnFeatures = ({ features }: { features: FeatureType[] }) => {
  const [featureInView, setFeatureInView] = useState<FeatureType>(features[0]);

  return (
    <section className="relative mx-auto max-w-7xl">
      <SlidingFeatureDisplay featureInView={featureInView} />

      {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
      <div className="-mt-[100vh] hidden md:block" />

      {features.map((s) => (
        <Content
          key={s.id}
          featureInView={s}
          setFeatureInView={setFeatureInView}
          {...s}
        />
      ))}
    </section>
  );
};

const SlidingFeatureDisplay = ({
  featureInView,
}: {
  featureInView: FeatureType;
}) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-2/5 rounded-xl p-8"
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content = ({
  setFeatureInView,
  featureInView,
}: {
  setFeatureInView: Dispatch<SetStateAction<FeatureType>>;
  featureInView: FeatureType;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className="rounded-full bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white">
            {featureInView.callout}
          </span>
          <p className="my-3 text-5xl font-bold">{featureInView.title}</p>
          <p className="text-slate-600">{featureInView.description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={featureInView} />
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature = ({ featureInView }: { featureInView: FeatureType }) => {
  return (
    <motion.div
      initial={{ height: "24rem" }}
      animate={{ height: "auto" }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-xl bg-slate-800 shadow-xl"
    >
      <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="p-4">
        <p className="font-mono text-sm text-slate-200">
          <span className="text-green-300">~</span>
          <code className="block bg-slate-800 p-4 rounded mt-2 whitespace-pre-line">
            {featureInView.code}
          </code>
        </p>
      </div>

      <span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700">
        <featureInView.Icon />
      </span>
    </motion.div>
  );
};

export default CodeExample;
