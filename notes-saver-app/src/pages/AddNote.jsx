
import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { generateSummary } from "../cohere";

export default function AddNote() {
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSummary = async () => {
    if (!note.trim()) return;
    setLoading(true);
    try {
      const summaryResult = await generateSummary(note);
      setSummary(summaryResult);
    } catch (err) {
      alert("Error generating summary: " + err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!note.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        text: note,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      alert(" Note saved successfully!");
      navigate("/view");
    } catch (err) {
      alert("Error saving note: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-white display-3 my-4">Add Notes</h1>

      <textarea
        className="form-control white-placeholder"
        placeholder="Write your note here..."
        rows="8"
        style={{
          minHeight: "200px",
          width: "100%",
          backgroundColor: "#2f2f2f",
          color: "white",
          border: "1px solid #555",
        }}
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          setSummary("");
        }}
      ></textarea>

      <br />
      <button className="btn btn-info me-2" onClick={handleSummary} disabled={loading}>
        {loading ? "Summarizing..." : "Show Summary"}
      </button>

      <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Note"}
      </button>

      {summary && (
        <>
          <hr className="text-secondary" />
          <p className="text-info fw-bold mt-4">AI Summary:</p>
          <p className="text-info">{summary}</p>
        </>
      )}
    </div>
  );
}




