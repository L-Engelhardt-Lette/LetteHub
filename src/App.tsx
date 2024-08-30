// src/App.tsx

import React, { useState, useEffect } from "react";
import "./scss/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebsiteHeader from "./components/navbar/WebsiteHeader";
import Loader from "./components/Loader";
import Projects from "./pages/ProjectSelect";
import { AuthProvider } from "./components/auth/AuthContext"; // Make sure this path is correct
import PrivateRoute from "./routes/PrivateRoute"; // Ensure this path is correct
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./styles.scss";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {loading ? (
          <Loader />
        ) : (
          <>
            <WebsiteHeader />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/projects"
                element={
                  <PrivateRoute>
                    <Projects />
                  </PrivateRoute>
                }
              />
              {/* Add more routes as needed */}
            </Routes>
          </>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
