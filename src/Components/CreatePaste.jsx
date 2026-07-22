import React, { useState } from "react";
import "./CreatePaste.css";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";

const CreatePaste = ({ search, setSearch, pasteList, setPasteList }) => {
  const [newPaste, setNewPaste] = useState({
    title: "",
    content: "",
  });
  // Handler for adding a new paste
  const HandleAddPaste = async () => {
    if (!newPaste.title || !newPaste.content) {
      alert("Error adding paste, please fill all fields");
      return;
    }

    const CreateNewPaste = {
      createdAt: Timestamp.now(),
      title: newPaste.title,
      content: newPaste.content,
      isFavourite: false,
    };

    try {
      const docRef = await addDoc(collection(db, "Pastes"), CreateNewPaste);
      //Updating List and adding the id manually
      // so that it is update in the local state for delete and edit functionality
      setPasteList([...pasteList, { id: docRef.id, ...CreateNewPaste }]);
      //Clear the input fields
      setNewPaste({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error saving your paste.");
    }
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
