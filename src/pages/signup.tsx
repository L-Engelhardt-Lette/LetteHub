import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios to make API requests

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [signupError, setSignupError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.repassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      // Make a POST request to the backend to register the user
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      // If registration is successful, navigate to the login page
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : error.message
      );
      setSignupError(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 dark:bg-gray-800 p-8 max-w-md w-full rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Sign Up
        </h1>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Confirm Password:</label>
          <input
            type="password"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-gray-100 rounded"
          />
        </div>
        {signupError && (
          <div className="mb-4 text-red-500 text-sm">{signupError}</div>
        )}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
          <Link to="/login" className="text-gray-400 text-sm">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default Signup;
