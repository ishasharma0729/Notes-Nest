
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AddNote from "./pages/AddNote";
import ViewNotes from "./pages/ViewNotes";
import EditNote from "./pages/EditNote";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./AuthContext";

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <Router>
      <div className="container">
        <h1 className="text-center text-white fw-bold display-3 my-4">Notes Saver</h1>

        {/* ✅ Show buttons only if user is logged in */}
        {currentUser ? (
          <div className="d-flex justify-content-center align-items-center mb-4">
            <Link className="btn btn-outline-light me-2" to="/">Add Note</Link>
            <Link className="btn btn-outline-light me-2" to="/view">View Notes</Link>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </div>
        ) : null}

        {/* ✅ Show Login and Signup buttons only when not logged in */}
        {!currentUser && (
          <div className="d-flex justify-content-center align-items-center mb-4">
            <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-light me-2" to="/signup">Sign Up</Link>
          </div>
        )}

        {/* ✅ Route Protection */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={currentUser ? <AddNote /> : <Navigate to="/login" />} />
          <Route path="/view" element={currentUser ? <ViewNotes /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={currentUser ? <EditNote /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


