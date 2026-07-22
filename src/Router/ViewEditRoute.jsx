import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Components/CreatePaste.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";

const ViewEditRoute = ({ pasteList, setPasteList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPaste, setCurrentPaste] = useState({ title: "", content: "" });

  /////////////////// Find the paste when the component renders
  useEffect(() => {
    const foundPaste = pasteList.find((paste) => paste.id === id);
    if (foundPaste) {
      setCurrentPaste(foundPaste);
    }
  }, [id, pasteList]);

  ////Handler to update paste/////////////////
  const handleUpdate = async () => {
    if (!currentPaste.title || !currentPaste.content) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      const pasteRef = doc(db, "Pastes", id);
      await updateDoc(pasteRef, {
        title: currentPaste.title,
        content: currentPaste.content,
      });

      const updatedPasteList = pasteList.map((paste) =>
        paste.id === id
          ? {
              ...paste,
              title: currentPaste.title,
              content: currentPaste.content,
            }
          : paste,
      );

      setPasteList(updatedPasteList);
      navigate("/");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  if (!currentPaste.title && !currentPaste.content) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>Loading paste...</p>
    );
  }

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          className="title-input"
          value={currentPaste.title}
          onChange={(e) =>
            setCurrentPaste({ ...currentPaste, title: e.target.value })
          }
        />
        <button className="glow-btn" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>

      <div className="textarea">
        <textarea
          className="content-input"
          rows="15"
          value={currentPaste.content}
          onChange={(e) =>
            setCurrentPaste({ ...currentPaste, content: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default ViewEditRoute;
