import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader/Loader";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import Navbar from "./components/navbar/Navbar";

// Lazy load pages
const ConetentContainer = lazy(() => import("./pages/ConetentContainer"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <Navbar />
        {/* Layout */}
        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<ConetentContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/impressum" element={<Impressum />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
