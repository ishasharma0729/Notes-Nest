import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function AddNote() {
    const [note, setNote] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!note.trim()) return;
        await addDoc(collection(db, "notes"), { text: note });
        navigate("/view");
    };

    return (
        <div>
              <h1 className="text-white display-3 my-4" >Add Notes</h1>
            <textarea
                 className="form-control white-placeholder"
                placeholder="Write your note here..."
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
            <button className="btn btn-success btn-lg" onClick={handleSubmit}>Save Note</button>
        </div>
    );
}
