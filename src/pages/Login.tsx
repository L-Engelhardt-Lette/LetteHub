import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO: Send login request to your backend API here.

    navigate("/"); // Navigate to home on successful login.
  };

  return (
    <div className="login">
      <div className="centered-horizontally-div">
        <div className="centered-vertically-div">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="form">
            <div>
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
            <div>
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
            <button type="submit">Login</button>
          </form>
          <p className="new-account-notice">
            Don't have an account? <Link to="/signup">Create one here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
