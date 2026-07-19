import React from "react";
import { useState } from "react";
import "./PasteCard.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const PasteCard = ({ pasteList, search, setPasteList }) => {
  //////////////////// State to track which paste was just copied
  const [copiedId, setCopiedId] = useState(null);

  const filteredPastes = pasteList.filter((paste) => {
    const matchesTitle = paste.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesContent = paste.content
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesTitle || matchesContent;
  });
  //////////////Handeler to delete a paste/////////
  function handleDelete(id) {
    const updatedPastes = pasteList.filter((paste) => paste.id !== id);
    setPasteList(updatedPastes);
  }

  return (
    <div className="paste-list-container">
      {filteredPastes.map((paste) => {
        const readableDate = new Date(paste.id).toDateString();

        return (
          <div className="paste-card" key={paste.id}>
            <div className="paste-card-header">
              <h3 className="paste-title">{paste.title}</h3>
              <span className="paste-date">{readableDate}</span>
            </div>

            <p className="paste-content">{paste.content}</p>

            <div className="paste-card-actions">
              <button className="card-btn">View</button>
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
                  // timeout function to set the button back to "Copy" after 2 seconds
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
