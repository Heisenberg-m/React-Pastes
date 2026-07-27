import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({ onApplyFilters }) => {
  const [sortBy, setSortBy] = useState("default");
  const [colorCode, setColorCode] = useState("all");
  const [showFav, setShowFav] = useState(false);

  const handleGoClick = () => {
    onApplyFilters({
      sortBy,
      colorCode,
      showFav,
    });
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-section">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="default">Default</option>
          <option value="newest">Date Created (Newest)</option>
          <option value="oldest">Date Created (Oldest)</option>
          <option value="a-z">Alphabetical (A-Z)</option>
        </select>
      </div>
      <div className="filter-section">
        <label htmlFor="colorCode">Color:</label>
        <select
          id="colorCode"
          value={colorCode}
          onChange={(e) => setColorCode(e.target.value)}
          className="filter-select"
        >
          <option value="all">⚪ All</option>
          <option value="red">🔴</option>
          <option value="green">🟢</option>
          <option value="blue">🔵</option>
          <option value="yellow">🟡</option>
          <option value="purple">🟣</option>
          <option value="orange">🟠</option>
        </select>
      </div>
      <div className="filter-section checkbox-section">
        <label className="fav-label">
          <input
            type="checkbox"
            checked={showFav}
            onChange={(e) => setShowFav(e.target.checked)}
          />
          ⭐ Show Fav
        </label>
      </div>
      <button className="glow-btn filter-btn" onClick={handleGoClick}>
        Go
      </button>
    </div>
  );
};

export default FilterBar;
