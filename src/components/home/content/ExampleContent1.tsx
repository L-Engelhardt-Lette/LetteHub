import React from "react";

const ExampleContent1 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Willkommen bei LetteHub
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-foregroundlight dark:text-foregrounddark md:text-2xl">
        Ihrem perfekten Ort für die Organisation und Strukturierung von
        Projekten. Bei uns finden Sie das Werkzeug, das Ihnen hilft, den
        Überblick zu behalten und gleichzeitig erstklassige Arbeit zu
        garantieren.
      </p>
      <p className="mb-8 text-xl text-foregroundlight dark:text-foregrounddark md:text-2xl">
        Mit LetteHub können Sie Ihre kreativen Ideen in geordnete Bahnen lenken
        und Ihre Projekte effizient zum Erfolg führen.
      </p>
    </div>
  </div>
);

export default ExampleContent1;
