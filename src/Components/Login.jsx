import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css"; // Using the shared CSS

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData.email, formData.password);
    // Firebase Login logic will go here
  };

  return (
    <div className="auth-main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Welcome Back</h2>

        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            required
          />
        </div>

        <div className="button-container">
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </div>

        <p className="toggle-text">
          Don't have an account?{" "}
          <Link to="/signup" className="toggle-link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
