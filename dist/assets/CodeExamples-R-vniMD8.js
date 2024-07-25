import{j as e,r,g as s,F as l,E as c,I as d}from"./index-_oXKQ1ms.js";import{u as m}from"./use-in-view-CFPQp5im.js";import"./resolve-element-Ex3QWR4Z.js";const x=[{id:1,callout:"Initialize Project",title:"Funktion zur Initialisierung eines Projekts",description:"Diese Funktion richtet die anfängliche Konfiguration und die Parameter für ein neues Projekt in der Anwendung ein.",contentPosition:"r",Icon:l,code:`function initializeProject(name: string, description: string, startDate: Date): Project {
  const newProject: Project = {
    id: generateUniqueId(),
    name,
    description,
    startDate,
    tasks: [],
    status: 'Not Started'
  };
  return newProject;
}`},{id:2,callout:"Parallax Text",title:"Parallax-Textinhalt",description:"Diese Komponente zeigt einen Textinhaltabschnitt mit einem Parallax-Scrolling-Effekt unter Verwendung von React und Framer Motion.",contentPosition:"l",Icon:c,code:`import { motion } from 'framer-motion';
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

export default TextParallaxContentExample;`},{id:3,callout:"Project View",title:"Projektansichtstabelle",description:"Diese Komponente zeigt eine Tabellenansicht von Projekten, zeigt deren Details an und ermöglicht die Interaktion mit jedem Projektelement.",contentPosition:"r",Icon:d,code:`import React from 'react';

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

export default ProjectViewTableBeta;`}],y=()=>e.jsx(e.Fragment,{children:e.jsx(u,{features:x})}),u=({features:t})=>{const[n,a]=r.useState(t[0]);return e.jsxs("section",{className:"relative mx-auto max-w-7xl",children:[e.jsx(p,{featureInView:n}),e.jsx("div",{className:"-mt-[100vh] hidden md:block"}),t.map(i=>e.jsx(h,{featureInView:i,setFeatureInView:a,...i},i.id))]})},p=({featureInView:t})=>e.jsx("div",{style:{justifyContent:t.contentPosition==="l"?"flex-end":"flex-start"},className:"pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex",children:e.jsx(s.div,{layout:!0,transition:{type:"spring",stiffness:400,damping:25},className:"h-fit w-2/5 rounded-xl p-8",children:e.jsx(o,{featureInView:t})})}),h=({setFeatureInView:t,featureInView:n})=>{const a=r.useRef(null),i=m(a,{margin:"-150px"});return r.useEffect(()=>{i&&t(n)},[i]),e.jsx("section",{ref:a,className:"relative z-0 flex h-fit md:h-screen",style:{justifyContent:n.contentPosition==="l"?"flex-start":"flex-end"},children:e.jsxs("div",{className:"grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8",children:[e.jsxs(s.div,{initial:{opacity:0,y:25},whileInView:{opacity:1,y:0},transition:{duration:.5,ease:"easeInOut"},children:[e.jsx("span",{className:"rounded-full bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white",children:n.callout}),e.jsx("p",{className:"my-3 text-5xl font-bold",children:n.title}),e.jsx("p",{className:"text-slate-600",children:n.description})]}),e.jsx(s.div,{initial:{opacity:0,y:25},whileInView:{opacity:1,y:0},transition:{duration:.5,ease:"easeInOut"},className:"mt-8 block md:hidden",children:e.jsx(o,{featureInView:n})})]})})},o=({featureInView:t})=>e.jsxs(s.div,{initial:{height:"24rem"},animate:{height:"auto"},transition:{duration:.5},className:"relative w-full rounded-xl bg-slate-800 shadow-xl",children:[e.jsxs("div",{className:"flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3",children:[e.jsx("div",{className:"h-3 w-3 rounded-full bg-red-500"}),e.jsx("div",{className:"h-3 w-3 rounded-full bg-yellow-500"}),e.jsx("div",{className:"h-3 w-3 rounded-full bg-green-500"})]}),e.jsx("div",{className:"p-4",children:e.jsxs("p",{className:"font-mono text-sm text-slate-200",children:[e.jsx("span",{className:"text-green-300",children:"~"}),e.jsx("code",{className:"block bg-slate-800 p-4 rounded mt-2 whitespace-pre-line",children:t.code})]})})]});export{y as default};
