import React from "react";
import { motion } from "framer-motion";
import Layout from "../components/test/Layout";
import CommitStats from "../components/about/CommitStats";
import DoubleScrollingLogos from "../components/DoubleScrollingLogos";
import "../scss/pages/About.scss";

const profiles = [
  {
    name: "Ludwig Engelhardt",
    role: "Front End / Back End",
    github: "https://github.com/L-Engelhardt-Lette",
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
    className="p-4 flex flex-col items-center bg-white bg-opacity-75 rounded-lg shadow-md"
  >
    <img
      src={`${github}.png`}
      alt={`${name}'s GitHub`}
      className="w-24 h-24 rounded-full"
    />
    <h3 className="mt-4 text-lg font-semibold text-black">{name}</h3>
    <p className="text-gray-700">{role}</p>
  </motion.div>
);

const AboutSection = () => (
  <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-70"></div>
    <h1 id="TeamTitle" className="relative z-10">
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
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <motion.div
          className="snap-start h-screen bg-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AboutSection />
        </motion.div>
        <motion.div
          className="snap-start h-screen bg-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-5 md:p-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-5">Section 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              bibendum magna. Sed in felis ac nisi pretium consequat vel ac
              nisi. Morbi at nisi et urna pulvinar sollicitudin. Vestibulum
              elementum augue ut est fermentum, nec vestibulum lectus
              pellentesque.
            </p>
            <p>
              Proin non sapien nec ex gravida interdum ut non orci. Fusce id
              eros a lorem vestibulum lacinia vel id enim. Morbi vel ultricies
              libero. Nam efficitur a ex non auctor. Sed vestibulum diam eu
              magna posuere, non lacinia sapien maximus. Vestibulum scelerisque
              sit amet orci sit amet malesuada.
            </p>
          </div>
          <DoubleScrollingLogos />
        </motion.div>
        <motion.div
          className="snap-start h-screen bg-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-5 md:p-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-5">Section 2</h2>
            <p>
              Duis tempus libero eget magna luctus, eu placerat sapien
              efficitur. Proin id enim id libero accumsan sollicitudin nec in
              orci. Nullam gravida dui eget ex pellentesque, non mattis ligula
              aliquam. Donec sed sapien ipsum. Aliquam condimentum metus eu nisi
              auctor, nec interdum arcu pulvinar.
            </p>
            <p>
              Curabitur tincidunt metus id sem ultricies, at auctor ligula
              lacinia. Proin posuere urna sit amet enim ultricies, sed efficitur
              libero scelerisque. Nullam vehicula eros non elit congue, vitae
              interdum magna ultricies. Nam venenatis diam id justo maximus, ac
              bibendum risus pretium.
            </p>
          </div>
          <CommitStats />
        </motion.div>
        <motion.div
          className="snap-start h-screen bg-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-5 md:p-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-5">Section 3</h2>
            <p>
              Vestibulum lacinia, elit nec condimentum varius, leo mauris
              efficitur urna, in pharetra metus tortor sed ex. In hac habitasse
              platea dictumst. Proin rutrum consequat malesuada. Fusce sodales
              quam in felis volutpat, sit amet interdum neque condimentum.
            </p>
            <p>
              Morbi vehicula felis et purus fermentum congue. Praesent semper
              magna sit amet commodo lobortis. Cras pellentesque lacus a justo
              ultricies, at ullamcorper arcu ultricies. Integer nec sagittis
              risus, eu efficitur est.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default AboutPage;
