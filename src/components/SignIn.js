// SignIn.js
import React, { useState } from "react";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate("/"); // Redirect to home page after successful sign-in
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p>{error}</p>}
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
