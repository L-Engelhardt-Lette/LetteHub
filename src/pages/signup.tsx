import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/pages/LoginAndCreateUser.scss";
import axios from "axios";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    vorname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    vorname: "",
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
      vorname: "",
      email: "",
      password: "",
      repassword: "",
    };
    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.vorname.trim()) validationErrors.vorname = "Vorname is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";
    if (formData.password !== formData.repassword)
      validationErrors.repassword = "Passwords do not match";

    if (Object.keys(validationErrors).some(key => validationErrors[key])) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", {
        name: formData.name,
        vorname: formData.vorname,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
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
          <label htmlFor="vorname">Vorname:</label>
          <input
            type="text"
            id="vorname"
            name="vorname"
            value={formData.vorname}
            onChange={handleChange}
          />
          {errors.vorname && <p className="error">{errors.vorname}</p>}
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
        <button type="submit" className="submit">Sign Up</button>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Signup;
