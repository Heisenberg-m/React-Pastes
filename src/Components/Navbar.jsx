import { useState } from "react";
import "./Navbar.css";
const Navbar = ({ search, setSearch }) => {
  return (
    <div className="navbar">
      <h3 id="logo">DropCode</h3>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="search"
        placeholder="🔍 Search..."
      />
    </div>
  );
};

export default Navbar;
