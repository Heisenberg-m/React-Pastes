import React, { useState } from "react";
import "./PasteCard.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const PasteCard = ({ pasteList, search, setPasteList }) => {
  const navigate = useNavigate();

  ///////// State to track which paste was just copied
  const [copiedId, setCopiedId] = useState(null);

  ///Filter the pastes based on the search input
  const filteredPastes = pasteList.filter((paste) => {
    const matchesTitle = paste.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesContent = paste.content
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesTitle || matchesContent;
  });

  /////Handler to delete a paste
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
  /////Handler to mark favourite

  const markFavourite = async (id) => {
    try {
      const pasteToUpdate = pasteList.find((paste) => paste.id === id);

      //////Update Firestore data here
      await updateDoc(doc(db, "Pastes", id), {
        isFavourite: !pasteToUpdate.isFavourite,
      });

      /////Updating the local state specifically for this paste
      //so that we can render it in the UI
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
        return (
          <div className="paste-card" key={paste.id}>
            <div className="paste-card-header">
              <h3 className="paste-title">{paste.title}</h3>
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
