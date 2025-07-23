

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { generateSummary } from "../cohere";

export default function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const docRef = doc(db, "notes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setNote(docSnap.data().text);
    };
    fetchNote();
  }, [id]);

  const updateNote = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", id), { text: note });
      alert("Note updated successfully!");
      navigate("/view");
    } catch (err) {
      alert("Error updating note: " + err.message);
    }
    setLoading(false);
  };

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

  return (
    <div>
      <h1 className="text-white display-3 my-4">Edit Note</h1>

      <textarea
        className="form-control white-placeholder"
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

      <button className="btn btn-outline-light" onClick={updateNote} disabled={loading}>
        {loading ? "Updating..." : "Update"}
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

