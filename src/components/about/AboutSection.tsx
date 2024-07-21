import React from "react";
import ProfileCard from "./ProfileCard";

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

const AboutSection = () => (
  <section className="relative flex flex-col items-center justify-center min-h-screen bg-backgrounddark text-foregrounddark">
    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-backgrounddark opacity-70"></div>
    <h1
      id="TeamTitle"
      className="relative z-10 text-primarycontent font-MonaspaceNeonRegular text-3xl md:text-5xl"
    >
      Our Team
    </h1>
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-screen-lg p-4">
      {profiles.map((profile) => (
        <ProfileCard key={profile.name} {...profile} />
      ))}
    </div>
  </section>
);

export default AboutSection;
