// frontend/src/Signup.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/pages/LoginAndCreateUser.scss";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({
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

    setErrors({
      name: "",
      email: "",
      password: "",
      repassword: "",
    });

    const validationErrors: typeof errors = {
      name: "",
      email: "",
      password: "",
      repassword: "",
    };

    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";
    if (formData.password !== formData.repassword)
      validationErrors.repassword = "Passwords do not match";

    if (Object.keys(validationErrors).some((key) => validationErrors[key])) {
      setErrors(validationErrors);
      return;
    }

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password
      );
      if (success) {
        navigate("/login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSignupError(error.message || "Error registering user");
      } else {
        setSignupError("Unknown error occurred during registration");
      }
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        return true;
      } else {
        setSignupError("User registration failed");
        return false;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setSignupError(error.response.data?.error || "Failed to register user");
      } else if (error instanceof Error) {
        setSignupError(error.message);
      } else {
        setSignupError("Unknown error occurred during registration");
      }
      return false;
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-title">Sign Up</h1>
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
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
        <div className="input-container">
          <label htmlFor="repassword">Re-enter Password:</label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
          />
          {errors.repassword && <p className="error">{errors.repassword}</p>}
        </div>
        {signupError && <p className="error">{signupError}</p>}
        <button type="submit" className="submit">
          Sign Up
        </button>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Signup;
