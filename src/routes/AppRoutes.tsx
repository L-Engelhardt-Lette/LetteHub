import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Impressum from "../pages/Impressum";
import Services from "../pages/Service";
import ProjectDetail from "../pages/ProjectDetail";
import Signup from "../pages/signup";
import NotFound from "../pages/NotFound";
import WebsiteHeader from "../components/navbar/WebsiteHeader";
import User from "../pages/User";
import Login from "../pages/login";
import ProjectSelect from "../pages/ProjectSelect";

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <WebsiteHeader /> {/* The header remains visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/impressum" element={<Impressum />} />

        {/* Protected routes */}
        {isLoggedIn ? (
          <>
            <Route path="/projectSelect" element={<ProjectSelect />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/user" element={<User />} />
          </>
        ) : (
          <>
            {/* Redirect to login if trying to access protected routes */}
            <Route path="/projectSelect" element={<Navigate to="/login" />} />
            <Route
              path="/project/:projectId"
              element={<Navigate to="/login" />}
            />
            <Route path="/user" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Public routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/user" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/user" /> : <Signup />}
        />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
