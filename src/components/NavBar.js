// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import '../App.css';


const NavBar = () => {
    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut();
            window.location.href = "/signin";
        } catch (err) {
            console.error("Error signing out", err);
        }
    };

    return (
        <div className="navbar">
            <Link to="/" className="active">Home</Link>
            <Link to="/add-bill">Add Bill</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
            <button onClick={handleSignOut} style={{float: "right", backgroundColor: "#333", color: "white", border: "none", padding: "14px 20px", cursor: "pointer"}}>Sign Out</button>
        </div>
    );
};

export default NavBar;
