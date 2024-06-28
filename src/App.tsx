import React, { useState } from "react";
import "./scss/App.scss";
import WebsiteHeader from "./components/WebsiteHeader";
import TestTaskUi from "./components/test/TestTaskUi";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: "Project Alpha",
      persons: ["Alice", "Bob"],
      progress: 75,
      finishDate: "2024-07-15",
      description: "Important project with a tight deadline.",
    },
    {
      name: "Website Redesign",
      persons: ["Charlie"],
      progress: 30,
      finishDate: "2024-08-01",
      description: "Update the company website look and feel.",
    },
    // Add more tasks as needed...
  ]);

  return (
    <>
      <WebsiteHeader />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
      <div>
        <h1>Task Overview</h1>
        {tasks.map((task, index) => (
          <TestTaskUi key={index} task={task} />
        ))}
      </div>
    </>
  );
}

export default App;
