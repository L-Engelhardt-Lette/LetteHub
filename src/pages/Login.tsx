import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/projectSelect");
      } else {
        setLoginError("Invalid login credentials.");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-backgroundlight dark:bg-backgrounddark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-foregrounddark dark:bg-foregroundlight p-8 max-w-md w-full rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-UnageoBold text-center text-primary dark:text-primarydark mb-6">
          Login
        </h1>
        <div className="mb-4">
          <label className="block text-primary dark:text-primarydark mb-2 font-UnageoRegular">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-backgroundlight text-foregroundlight dark:bg-backgrounddark dark:text-foregrounddark rounded-lg border border-borderlight dark:border-borderdark focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-primary dark:text-primarydark mb-2 font-UnageoRegular">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 bg-backgroundlight text-foregroundlight dark:bg-backgrounddark dark:text-foregrounddark rounded-lg border border-borderlight dark:border-borderdark focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-primary text-primarycontent rounded-lg font-UnageoBold hover:bg-primarydark dark:bg-primarydark transition"
        >
          Login
        </button>
        <div className="text-center mt-4 text-copydark dark:text-copylight font-MonaspaceNeonRegular">
          Don't have an account?
          <a
            href="/signup"
            className="text-secondary dark:text-secondarydark ml-2 hover:underline"
          >
            Create one here
          </a>
        </div>
        {loginError && <p className="text-error mt-2 text-sm">{loginError}</p>}
      </form>
    </motion.div>
  );
};

export default Login;
