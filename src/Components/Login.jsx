import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../FirebaseConfig/FirebaseConfig";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.code);

      toast.error("Invalid email or password. Please try again.");

      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);

    try {
      await signInWithPopup(auth, googleProvider);

      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      console.error("Google Login error:", error.code);

      toast.error("Failed to sign in with Google. Please try again.");

      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000);
    }
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
          <button type="submit" className="auth-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <div className="button-container">
          <button
            type="button"
            className="auth-btn outline"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
          >
            Sign in with Google
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
