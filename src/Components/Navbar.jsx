import React from "react";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/FirebaseConfig";
import toast from "react-hot-toast";

const Navbar = ({ search, setSearch, user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out: ", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="navbar">
      <h3 id="logo">DropCode</h3>
      {user && (
        <div className="nav-actions">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            placeholder="🔍 Search..."
          />
          <button id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
