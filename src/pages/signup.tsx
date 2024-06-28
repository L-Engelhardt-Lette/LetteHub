// src/Signup.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/pages/LoginAndCreateUser.scss";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "", // Changed confirmPassword to repassword
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      validationErrors.repassword = "Passwords do not match"; // Validation check

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO: Send signup request to your backend API here.

    navigate("/login");
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
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
        {/* ... (Repeat similar input fields for email, password, and repassword) ... */}
        <button type="submit">Sign Up</button>
      </form>
      <p className="new-account-notice">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
