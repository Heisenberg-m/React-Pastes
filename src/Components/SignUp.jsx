import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../FirebaseConfig/FirebaseConfig";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.code);

      toast.error("Failed to create account. Email may already be in use.");

      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Google Signup error:", error.code);

      toast.error("Failed to sign up with Google. Please try again.");

      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000);
    }
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
          <button type="submit" className="auth-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="auth-btn outline"
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
          >
            Sign up with Google
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
