import React, { useState } from "react";
import "./PasteCard.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";
import { useNavigate } from "react-router-dom";

// 1. Define our beautiful theme colors
const themeColors = {
  red: "rgb(255, 87, 87)",
  green: "rgb(0, 230, 118)",
  blue: "rgb(41, 121, 255)",
  yellow: "rgb(255, 234, 0)",
  purple: "rgb(213, 0, 249)",
  orange: "rgb(255, 145, 0)",
};

const PasteCard = ({ pasteList, search, setPasteList }) => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  // HomeRoute already filters this, but keeping this here acts as a great safety net!
  const filteredPastes = pasteList.filter((paste) => {
    const matchesTitle = paste.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesContent = paste.content
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesTitle || matchesContent;
  });

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Pastes", id));
      const updatedPastes = pasteList.filter((paste) => paste.id !== id);
      setPasteList(updatedPastes);
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete the paste. Please try again.");
    }
  };

  const markFavourite = async (id) => {
    try {
      const pasteToUpdate = pasteList.find((paste) => paste.id === id);

      await updateDoc(doc(db, "Pastes", id), {
        isFavourite: !pasteToUpdate.isFavourite,
      });

      const updatedPastes = pasteList.map((paste) =>
        paste.id === id ? { ...paste, isFavourite: !paste.isFavourite } : paste,
      );

      setPasteList(updatedPastes);
    } catch (error) {
      console.error("Error updating favourite status:", error);
      alert("Failed to update favourite status. Please try again.");
    }
  };

  return (
    <div className="paste-list-container">
      {filteredPastes.map((paste) => {
        const readableDate = paste.createdAt?.toDate().toDateString();

        // 2. Grab the color based on the paste's data, default to a subtle grey if missing
        const cardColor =
          themeColors[paste.colorCode] || "rgba(255, 255, 255, 0.2)";

        return (
          <div
            className="paste-card"
            key={paste.id}
            // 3. We pass the color as a CSS variable so the stylesheet can use it!
            style={{ "--card-color": cardColor }}
          >
            <div className="paste-card-header">
              {/* 4. Group the dot and the title together */}
              <div className="title-group">
                <span className="status-dot"></span>
                <h3 className="paste-title">{paste.title}</h3>
              </div>

              <div className="header-right">
                <span className="paste-date">{readableDate}</span>
                <button
                  className={`star-btn ${paste.isFavourite ? "favourited" : ""}`}
                  onClick={() => markFavourite(paste.id)}
                  title={paste.isFavourite ? "Unfavourite" : "Favourite"}
                >
                  {paste.isFavourite ? "★" : "☆"}
                </button>
              </div>
            </div>

            <p className="paste-content">{paste.content}</p>

            <div className="paste-card-actions">
              <button
                className="card-btn"
                onClick={() => navigate(`/paste/${paste.id}`)}
              >
                View
              </button>

              <button
                className="card-btn-delete"
                onClick={() => handleDelete(paste.id)}
              >
                Delete
              </button>

              <CopyToClipboard
                text={paste.content}
                onCopy={() => {
                  setCopiedId(paste.id);
                  setTimeout(() => {
                    setCopiedId(null);
                  }, 2000);
                }}
              >
                <button className="card-btn outline">
                  {copiedId === paste.id ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PasteCard;
