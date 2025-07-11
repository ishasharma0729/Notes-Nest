import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Added loading state

  const fetchNotes = async () => {
    setLoading(true); // Start loading
    const snapshot = await getDocs(collection(db, "notes"));//notes is name of the collection
    setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false); // Done loading
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes(); // Refresh after delete
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes on mount
  }, []);

  return (
    <div>
      {!loading && notes.length > 0 ? (
        <>
          <h2 className="text-light mb-4">All Notes</h2>
          {notes.map((note) => (
            <div className="note mb-3" key={note.id}>
              <p className="text-white">{note.text}</p>
              <Link
                to={`/edit/${note.id}`}
                className="btn btn-outline-light btn-sm me-2"
              >
                Edit
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </>
      ) : (
        !loading && (
          <h2 className="text-white display-3 my-4">Happy Noting 😊</h2>
        )
      )}
    </div>
  );
}

