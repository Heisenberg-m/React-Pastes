import React, { useState } from "react";
import "./CreatePaste.css";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../FirebaseConfig/FirebaseConfig";
import toast from "react-hot-toast";

const CreatePaste = ({ search, setSearch, pasteList, setPasteList }) => {
  const [newPaste, setNewPaste] = useState({
    title: "",
    content: "",
    colorCode: "red",
  });

  // Handler for adding a new paste
  const HandleAddPaste = async () => {
    if (!newPaste.title || !newPaste.content) {
      toast.error("Error adding paste, please fill all fields");
      return;
    }

    const CreateNewPaste = {
      createdAt: Timestamp.now(),
      title: newPaste.title,
      content: newPaste.content,
      isFavourite: false,
      colorCode: newPaste.colorCode, // Save the chosen color to the database!
      userId: auth.currentUser.uid,
    };

    try {
      const docRef = await addDoc(collection(db, "Pastes"), CreateNewPaste);
      //Updating List and adding the id manually
      // so that it is update in the local state for delete and edit functionality
      setPasteList([...pasteList, { id: docRef.id, ...CreateNewPaste }]);

      // Clear fields and reset color
      setNewPaste({ title: "", content: "", colorCode: "red" });

      toast.success("Paste created successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("There was an error saving your paste.");
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
        <div className="action-row">
          <select
            className="color-select"
            value={newPaste.colorCode}
            onChange={(e) =>
              setNewPaste({ ...newPaste, colorCode: e.target.value })
            }
            title="Choose a color tag"
          >
            <option value="red">🔴</option>
            <option value="green">🟢</option>
            <option value="blue">🔵</option>
            <option value="yellow">🟡</option>
            <option value="purple">🟣</option>
            <option value="orange">🟠</option>
          </select>

          <button className="glow-btn" onClick={HandleAddPaste}>
            Create
          </button>
        </div>
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
