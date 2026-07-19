import React, { useState } from "react";
import "./CreatePaste.css";

const CreatePaste = ({ search, setSearch, pasteList, setPasteList }) => {
  // const [pasteList, setPasteList] = useState([]);
  const [newPaste, setNewPaste] = useState({
    title: "",
    content: "",
  });

  const HandleAddPaste = () => {
    if (!newPaste.title || !newPaste.content) {
      alert("Error adding paste, please fill all fields");
      return;
    }

    const CreateNewPaste = {
      id: Date.now(),
      title: newPaste.title,
      content: newPaste.content,
    };

    setPasteList([...pasteList, CreateNewPaste]);
    setNewPaste({ title: "", content: "" });
  };

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          className="title-input"
          placeholder="Title of your snippet..."
          value={newPaste.title}
          onChange={(e) => setNewPaste({ ...newPaste, title: e.target.value })}
        />
        <button className="glow-btn" onClick={HandleAddPaste}>
          Create Paste
        </button>
      </div>

      <div className="textarea">
        <textarea
          className="content-input"
          placeholder="Paste your code or text here..."
          rows="15"
          value={newPaste.content}
          onChange={(e) =>
            setNewPaste({ ...newPaste, content: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default CreatePaste;
