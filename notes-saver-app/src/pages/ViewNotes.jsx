// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { Link } from "react-router-dom";

// export default function ViewNotes() {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true); // 👈 Added loading state

//   const fetchNotes = async () => {
//     setLoading(true); // Start loading
//     const snapshot = await getDocs(collection(db, "notes"));//notes is name of the collection
//     setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     setLoading(false); // Done loading
//   };
  
//   const deleteNote = async (id) => {
//     await deleteDoc(doc(db, "notes", id));
//     fetchNotes(); // Refresh after delete
//   };

//   useEffect(() => {
//     fetchNotes(); // Fetch notes on mount
//   }, []);

//   return (
//     <div>
//       {!loading && notes.length > 0 ? (
//         <>
//           <h2 className="text-light mb-4">All Notes</h2>
//           {notes.map((note) => (
//             <div className="note mb-3" key={note.id}>
//               <p className="text-white">{note.text}</p>
//               <Link
//                 to={`/edit/${note.id}`}
//                 className="btn btn-outline-light btn-sm me-2"
//               >
//                 Edit
//               </Link>
//               <button
//                 className="btn btn-outline-danger btn-sm"
//                 onClick={() => deleteNote(note.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </>
//       ) : (
//         !loading && (
//           <h2 className="text-white display-3 my-4">Happy Noting 😊</h2>
//         )
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { generateSummary } from "../cohere";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "notes"));
    const allNotes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setNotes(allNotes);

    // Generate summaries for all notes (not stored in DB)
    const summariesTemp = {};
    for (const note of allNotes) {
      if (note.text.length > 20) { // basic check
        const summary = await generateSummary(note.text);
        summariesTemp[note.id] = summary;
      }
    }
    setSummaries(summariesTemp);
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
            <div className="note mb-4 p-3 rounded" key={note.id} style={{ backgroundColor: '#2f2f2f', border: '1px solid #555' }}>
              
              <p className="text-white fw-bold mb-1">Note:</p>
              <p className="text-white">{note.text}</p>

              {summaries[note.id] && (
                <>
                  <hr className="text-secondary" />
                  <p className="text-info fw-bold mb-1">AI Summary:</p>
                  <p className="text-info">{summaries[note.id]}</p>
                </>
              )}

              <div className="mt-2">
                <Link to={`/edit/${note.id}`} className="btn btn-outline-light btn-sm me-2">
                  Edit
                </Link>
                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteNote(note.id)}>
                  Delete
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

