import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/view");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="mb-3 w-50 mx-auto">
      <h2 className="text-success mb-4">Login</h2>
      <div>
      <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      </div>
      <button className="btn btn-success btn-lg" onClick={login}>Login</button>
      <br /><br />
      <p className="custom-text">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
