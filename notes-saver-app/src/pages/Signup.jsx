import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/view");
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div className="mb-3 w-50 mx-auto">
      <h2 className="text-success mb-4">Sign Up</h2>
      
      <input type="email"  className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      
      <button className="btn btn-success btn-lg" onClick={signup}>Sign Up</button>

      <br /><br />
      <p className="custom-text">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
