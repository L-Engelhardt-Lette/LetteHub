import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/ProjectSelect";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Service";
import ProjectSelect from "../pages/ProjectSelect";
import NotFound from "../pages/NotFound";
import WebsiteHeader from "../components/WebsiteHeader"; // Import the header

const AppRoutes = () => (
  <Router>
    <WebsiteHeader /> {/* Place the header here */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projectSelect" element={<ProjectSelect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
