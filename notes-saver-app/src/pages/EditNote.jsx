import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  // doc.id is the unique ID automatically assigned by Firebase Firestore to that document when 
  //it was first added (e.g., when you called addDoc in AddNote.js). This ID is a string 
  //like "dsf8sdjfsdkljfh89".

  // This Firebase-generated id is then stored in your React component's notes state along 
  //with the note's text.
  useEffect(() => {
    const fetchNote = async () => {
      const docRef = doc(db, "notes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setNote(docSnap.data().text);
    };
    fetchNote();
  }, [id]);

  const updateNote = async () => {
    await updateDoc(doc(db, "notes", id), { text: note });
    navigate("/view");
  };

  return (
    <div>
        <h1 className="text-white display-3 my-4" >Edit Notes</h1>
     
      <textarea
                 className="form-control white-placeholder"
                rows="8"
                style={{
                    minHeight: '200px',
                    width: '100%',
                    backgroundColor: '#2f2f2f', // greyish
                    color: 'white',              // white text
                    border: '1px solid #555',    // subtle border
                }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>


      <br />
      <button className="btn btn-outline-light me-2" onClick={updateNote}>Update</button>
    </div>
  );
}
