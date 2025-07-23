
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "notes"));
    const allNotes = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((note) => note.userId === currentUser.uid);
    setNotes(allNotes);
    setLoading(false);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {!loading && notes.length > 0 ? (
        <>
          <h2 className="text-light mb-4">All Notes</h2>
          {notes.map((note) => (
            <div
              className="note mb-4 p-3 rounded"
              key={note.id}
              style={{
                backgroundColor: "#2f2f2f",
                border: "1px solid #555",
              }}
            >
              <p className="text-white fw-bold mb-1">Note:</p>
              <p className="text-white">{note.text}</p>

              <div className="mt-2">
                <Link to={`/edit/${note.id}`} className="btn btn-outline-light btn-sm me-2">
                  Edit
                </Link>
                <button className="btn btn-outline-danger btn-sm me-2" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => navigate(`/edit/${note.id}`)}
                >
                  AI Summary
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        !loading && <h2 className="text-white display-3 my-4">Happy Noting 😊</h2>
      )}
    </div>
  );
}
