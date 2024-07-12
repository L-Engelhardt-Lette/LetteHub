// src/App.tsx
import React, { useState, useEffect } from "react";
import "./scss/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebsiteHeader from "./components/WebsiteHeader";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Projects from "./pages/ProjectSelect";
import { AuthProvider } from "./components/auth/authContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import "./styles.scss";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
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
