import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader/Loader";
import Signin from "./pages/Register";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        {/* Notification System */}
        <ToastContainer />
        <Suspense fallback={<Loader />}>
          {/* Routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signin />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer autoClose={2000} />
      </div>
    </AuthProvider>
  );
};

export default App;
