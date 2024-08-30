import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/pages/LoginAndCreateUser.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store the token in localStorage
        localStorage.setItem("userId", response.data.userId); // Store the user ID
        navigate("/projectSelect"); // Redirect to the project page
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setLoginError(error.response?.data?.error || "Login failed.");
      } else {
        setLoginError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Login</h1>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {loginError && <p className="error">{loginError}</p>}
        <button type="submit" className="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
