import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader/Loader";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import Navbar from "./components/navbar/Navbar";
import { DarkModeProvider } from "./context/DarkModeContext";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Homepage = lazy(() => import("./pages/Homepage"));
const ProjectSelect = lazy(() => import("./pages/project/ProjectSelect"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <Suspense fallback={<Loader />}>
          <Navbar />
          {/* Layout */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/impressum" element={<Impressum />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/project-select" element={<ProjectSelect />} />{" "}
              {/* Corrected path */}
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </DarkModeProvider>
    </AuthProvider>
  );
};

export default App;
