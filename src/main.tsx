import "./css/tailwind/tailwind.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Loader from "./components/loader/Loader.tsx";
import { ToastContainer } from "react-toastify";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
