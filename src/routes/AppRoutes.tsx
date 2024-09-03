import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Impressum from "../pages/Impressum";
import Services from "../pages/Service";
import ProjectSelect from "../pages/ProjectSelect";
import ProjectDetail from "../pages/ProjectDetail";
import NotFound from "../pages/NotFound";
import WebsiteHeader from "../components/navbar/WebsiteHeader";
import User from "../pages/User";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Signup from "../pages/signup";

const AppRoutes: React.FC = () => (
  <Router>
    <WebsiteHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route
        path="/projectSelect"
        element={
          <PrivateRoute>
            <ProjectSelect />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:projectId"
        element={
          <PrivateRoute>
            <ProjectDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
