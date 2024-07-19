import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ExampleContent3 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Flexibel und Intuitiv
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 dark:text-foreground-dark md:text-2xl">
        Unsere Projektplanung ist dynamisch und agil, angepasst an die sich
        ständig verändernden Marktbedingungen. Wir setzen auf flexible
        Strategien und diskrete Partnerschaften, um optimale Ergebnisse zu
        erzielen. Unsere Plattform ist intuitiv gestaltet, so dass selbst ohne
        Vorkenntnisse eine einfache Bedienung möglich ist.
      </p>
      <p className="mb-8 text-xl text-neutral-600 dark:text-foreground-dark md:text-2xl">
        Dies ermöglicht es jedem Teammitglied, schnell produktiv zu werden und
        sich auf das Wesentliche zu konzentrieren – die erfolgreiche Umsetzung
        unserer Projekte.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        <Link to="/projectSelect">Start your journey</Link>
        <FiArrowRight className="inline" />
      </button>
    </div>
  </div>
);

export default ExampleContent3;
