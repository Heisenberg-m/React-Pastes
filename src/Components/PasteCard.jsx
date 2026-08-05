import React, { useState, useEffect } from "react";
import "./PasteCard.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const themeColors = {
  red: "rgb(255, 87, 87)",
  green: "rgb(0, 230, 118)",
  blue: "rgb(41, 121, 255)",
  yellow: "rgb(255, 234, 0)",
  purple: "rgb(213, 0, 249)",
  orange: "rgb(255, 145, 0)",
};

const PasteCard = ({ pasteList, setPasteList, search }) => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [filteredPastes, setFilteredPastes] = useState(pasteList);

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = pasteList.filter((paste) => {
        const matchesTitle = paste.title
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesContent = paste.content
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchesTitle || matchesContent;
      });

      setFilteredPastes(results);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, pasteList]);

  // Delete handler
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

  // Favourite handler
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
        const cardColor =
          themeColors[paste.colorCode] || "rgba(255, 255, 255, 0.2)";

        return (
          <div
            className="paste-card"
            key={paste.id}
            style={{ "--card-color": cardColor }}
          >
            <div className="paste-card-header">
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
                  setTimeout(() => setCopiedId(null), 2000);
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
