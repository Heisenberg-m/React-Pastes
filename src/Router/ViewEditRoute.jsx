import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Components/CreatePaste.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";
import toast from "react-hot-toast";
import { generateSummary, generateTitleSuggestion } from "../utils/openai";

// Minimum word counts required/////////////////
const MIN_WORDS_FOR_TITLE = 30;
const MIN_WORDS_FOR_SUMMARY = 100;

////Cooldoen timer/////
const COOLDOWN_SECONDS = 60;

//////counts words in a block of text/////////
const countWords = (text) => {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).length;
};

const ViewEditRoute = ({ pasteList, setPasteList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPaste, setCurrentPaste] = useState({ title: "", content: "" });

  ///////AI feature state////////
  const [aiSummary, setAiSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isTitleLoading, setIsTitleLoading] = useState(false);

  //////// Cooldown state////////////////
  const [titleCooldown, setTitleCooldown] = useState(0);
  const [summaryCooldown, setSummaryCooldown] = useState(0);
  const titleIntervalRef = useRef(null);
  const summaryIntervalRef = useRef(null);

  // Starts a 60-second countdown ///////////
  const startCooldown = (setCooldown, intervalRef) => {
    setCooldown(COOLDOWN_SECONDS);
    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /////////// Stop the timers if the user navigates away mid-countdown//////////////
  useEffect(() => {
    return () => {
      if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
      if (summaryIntervalRef.current) clearInterval(summaryIntervalRef.current);
    };
  }, []);

  const wordCount = countWords(currentPaste.content);
  const canGenerateTitle = wordCount >= MIN_WORDS_FOR_TITLE;
  const canGenerateSummary = wordCount >= MIN_WORDS_FOR_SUMMARY;

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

  ////Handler to suggest a title using AI/////////////////
  const handleSuggestTitle = async () => {
    // If there's already a title, double check before overwriting it
    if (currentPaste.title.trim() !== "") {
      const confirmReplace = window.confirm(
        "This will replace your current title with an AI suggestion. Continue?",
      );
      if (!confirmReplace) return;
    }

    setIsTitleLoading(true);
    try {
      const result = await generateTitleSuggestion(currentPaste.content);
      if (result.success) {
        setCurrentPaste({ ...currentPaste, title: result.message });
        toast.success("Title suggestion added — feel free to edit it!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("AI title suggestion error: ", error);
      toast.error("Something went wrong while generating a title.");
    } finally {
      setIsTitleLoading(false);
      startCooldown(setTitleCooldown, titleIntervalRef);
    }
  };

  ////Handler to generate a summary using AI/////////////////
  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    setAiSummary("");
    try {
      const result = await generateSummary(currentPaste.content);
      if (result.success) {
        setAiSummary(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("AI summary error: ", error);
      toast.error("Something went wrong while generating the summary.");
    } finally {
      setIsSummaryLoading(false);
      startCooldown(setSummaryCooldown, summaryIntervalRef);
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
        <div className="action-row">
          <button
            className="glow-btn"
            onClick={handleSuggestTitle}
            disabled={!canGenerateTitle || isTitleLoading || titleCooldown > 0}
            title={
              titleCooldown > 0
                ? `Please wait ${titleCooldown}s before trying again`
                : !canGenerateTitle
                  ? `Write at least ${MIN_WORDS_FOR_TITLE} words to unlock this`
                  : ""
            }
          >
            {isTitleLoading
              ? "Thinking..."
              : titleCooldown > 0
                ? `Wait ${titleCooldown}s`
                : "✨ Suggest Title"}
          </button>
          <button className="glow-btn" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
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

      <div className="action-row ai-row">
        <button
          className="glow-btn"
          onClick={handleGenerateSummary}
          disabled={
            !canGenerateSummary || isSummaryLoading || summaryCooldown > 0
          }
          title={
            summaryCooldown > 0
              ? `Please wait ${summaryCooldown}s before trying again`
              : !canGenerateSummary
                ? `Write at least ${MIN_WORDS_FOR_SUMMARY} words to unlock this`
                : ""
          }
        >
          {isSummaryLoading
            ? "Summarizing..."
            : summaryCooldown > 0
              ? `Wait ${summaryCooldown}s`
              : "✨ Generate Summary"}
        </button>
        <span className="word-counter">
          {wordCount} / {MIN_WORDS_FOR_SUMMARY} words
        </span>
      </div>

      {aiSummary && (
        <div className="ai-summary-box">
          <strong>AI Summary</strong>
          <p>{aiSummary}</p>
        </div>
      )}
    </div>
  );
};

export default ViewEditRoute;
