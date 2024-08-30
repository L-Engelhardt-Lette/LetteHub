import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [signupError, setSignupError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(""); // Reset error message

    if (formData.password !== formData.repassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token); // Store the token in localStorage
        localStorage.setItem("userId", response.data.userId); // Store the user ID
        navigate("/projectSelect"); // Redirect to the project page
      } else {
        setSignupError("Signup failed. Please try again.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setSignupError(error.response?.data?.error || "Signup failed.");
      } else {
        setSignupError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="signup">
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
        <div className="input-container">
          <label htmlFor="repassword">Re-enter Password:</label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
          />
        </div>
        {signupError && <p className="error">{signupError}</p>}
        <button type="submit" className="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
