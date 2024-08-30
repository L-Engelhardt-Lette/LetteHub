import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/pages/LoginAndCreateUser.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
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

    const validationErrors: typeof errors = {
      email: "",
      password: "",
    };
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).some((key) => validationErrors[key])) {
      setErrors(validationErrors);
      return;
    }

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/user");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message || "Error logging in");
      } else {
        setLoginError("Unknown error occurred");
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post<{ token: string }>(
        "http://localhost:3001/login",
        { email, password }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        return true;
      } else {
        setLoginError("Invalid email or password");
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("Unknown error occurred during login");
      }
      return false;
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
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {loginError && <p className="error">{loginError}</p>}
        <button type="submit" className="submit">
          Login
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Create one here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
