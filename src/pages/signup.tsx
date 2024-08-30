import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    // Handle form submission
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
            className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Re-enter Password:</label>
          <input
            type="password"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
            className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-gray-100 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
        <div className="text-center mt-4 text-gray-400">
          Already have an account?
          <Link to="/login" className="text-blue-400 ml-2 hover:underline">
            Login here
          </Link>
        </div>
        {signupError && (
          <p className="text-red-500 text-xs mt-2">{signupError}</p>
        )}
      </form>
    </motion.div>
  );
};

export default Signup;
