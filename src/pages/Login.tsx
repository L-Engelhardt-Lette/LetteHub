import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useNotification } from "../hooks/useNotification"; // Import the custom notification hook

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const { addNotification } = useNotification(); // Use the notification hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );

      // Handle successful login
      if (response.status === 200 || response.status === 201) {
        const { token } = response.data;
        if (token) {
          // Store the token securely in localStorage
          localStorage.setItem("token", token);

          // Add success notification
          addNotification("Login successful!", "success");

          // Redirect to the project selection page
          navigate("/projectSelect");
        } else {
          setLoginError("Failed to retrieve login token. Please try again.");
          addNotification(
            "Failed to retrieve login token. Please try again.",
            "error"
          );
        }
      }
    } catch (error: any) {
      // Handle errors from the API or network
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid login credentials.");
        addNotification("Invalid login credentials.", "error"); // Add error notification
      } else if (error.response) {
        setLoginError("An error occurred. Please try again later.");
        addNotification("An error occurred. Please try again later.", "error"); // Add error notification
      } else if (error.request) {
        setLoginError(
          "No response from the server. Please check your network."
        );
        addNotification(
          "No response from the server. Please check your network.",
          "error"
        ); // Add error notification
      } else {
        setLoginError("An unexpected error occurred. Please try again.");
        addNotification(
          "An unexpected error occurred. Please try again.",
          "error"
        ); // Add error notification
      }
    } finally {
      setLoading(false); // Stop loading after request completes
      setFormData({ ...formData, password: "" }); // Clear password field after submission
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
            required
            disabled={loading} // Disable input when loading
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
            required
            disabled={loading} // Disable input when loading
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-primary text-primarycontent rounded-lg font-UnageoBold hover:bg-primarydark dark:bg-primarydark transition"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Logging in..." : "Login"}
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
