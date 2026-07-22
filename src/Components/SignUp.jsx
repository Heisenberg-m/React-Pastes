import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css"; // Using the same shared CSS

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering with:", formData);
    // Firebase Sign Up logic will go here
  };

  return (
    <div className="auth-main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Account</h2>

        <div className="input-container">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
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
            Sign Up
          </button>
        </div>

        <p className="toggle-text">
          Already have an account?{" "}
          <Link to="/login" className="toggle-link">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
