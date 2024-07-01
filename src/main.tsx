import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import "./css/index.css";
import "./css/style.css";

// Get the root container
const container = document.getElementById("root");

if (container) {
  // Create a root
  const root = createRoot(container);

  // Initial render
  root.render(
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
