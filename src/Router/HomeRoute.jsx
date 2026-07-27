import React, { useState } from "react";
import CreatePaste from "../Components/CreatePaste";
import PasteCard from "../Components/PasteCard";
import FilterBar from "../Components/FilterBar";

const HomeRoute = ({ search, setSearch, pasteList, setPasteList }) => {
  /////State for hold the active filters
  const [activeFilters, setActiveFilters] = useState({
    sortBy: "default",
    colorCode: "all",
    showFav: false,
  });

  ////////function to catch the filter data when "go" is clicked
  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  ///////Creating a temporary array that is filtered and sorted
  const filteredAndSortedPastes = pasteList
    .filter((paste) => {
      // Check Color
      const matchesColor =
        activeFilters.colorCode === "all" ||
        paste.colorCode === activeFilters.colorCode;

      // Checking for favourite status///////
      const matchesFav = !activeFilters.showFav || paste.isFavourite === true;

      return matchesColor && matchesFav;
    })
    .sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;

      if (
        activeFilters.sortBy === "newest" ||
        activeFilters.sortBy === "default"
      ) {
        return timeB - timeA;
      }
      if (activeFilters.sortBy === "oldest") {
        return timeA - timeB;
      }
      if (activeFilters.sortBy === "a-z") {
        return (a.title || "").localeCompare(b.title || ""); // A to Z
      }
      return 0;
    });

  return (
    <>
      <CreatePaste
        search={search}
        setSearch={setSearch}
        pasteList={pasteList}
        setPasteList={setPasteList}
      />

      <hr
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          margin: "40px auto",
          maxWidth: "900px",
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
        <FilterBar onApplyFilters={handleApplyFilters} />
      </div>
      <PasteCard
        pasteList={filteredAndSortedPastes}
        search={search}
        setPasteList={setPasteList}
      />
    </>
  );
};

export default HomeRoute;
