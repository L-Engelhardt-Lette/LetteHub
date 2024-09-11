import "./css/tailwind/tailwind.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Loader from "./components/loader/Loader.tsx";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
