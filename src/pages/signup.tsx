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
    <div className="login">
      {" "}
      {/* Changed className to "login" for consistency */}
      <form onSubmit={handleSubmit} className="form">
        {" "}
        {/* Added className "form" */}
        <h1 className="form-title">Sign Up</h1>{" "}
        {/* Added className "form-title" */}
        <div className="input-container">
          {" "}
          {/* Added className "input-container" */}
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
          {" "}
          {/* Added className "input-container" */}
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
          {" "}
          {/* Added className "input-container" */}
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
          {" "}
          {/* Added className "input-container" */}
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
        <button type="submit" className="submit">
          Sign Up
        </button>{" "}
        {/* Added className "submit" */}
        <p className="signup-link">
          {" "}
          {/* Changed className to "signup-link" */}
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Signup;
