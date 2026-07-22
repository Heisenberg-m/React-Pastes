import React from "react";
import CreatePaste from "../Components/CreatePaste";
import PasteCard from "../Components/PasteCard";

const HomeRoute = ({ search, setSearch, pasteList, setPasteList }) => {
  return (
    <>
      <CreatePaste
        search={search}
        setSearch={setSearch}
        pasteList={pasteList}
        setPasteList={setPasteList}
      />
      <PasteCard
        pasteList={pasteList}
        search={search}
        setPasteList={setPasteList}
      />
    </>
  );
};

export default HomeRoute;
