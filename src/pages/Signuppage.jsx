import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
} from "firebase/firestore";

import { app } from "../firebase";
import '../styles/signup.css';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const db = getFirestore(app);

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const createUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Update user profile with additional details
            await updateProfile(user, {
                displayName: displayName,
            });

            // Add user data to Firestore
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                email: email,
                displayName: displayName,
            });

            alert("Registration successful!");

            // Reset form fields
            setEmail("");
            setPassword("");
            setDisplayName("");
        } catch (error) {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
                alert("Email address is already in use!");
            } else {
                alert(errorMessage);
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="title-container-welcome">
                <span className="app-name-welcome">LESSION PLANNING ASSISTEN</span>
            </div>

            <div className="login-form">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                    placeholder="Enter your Email here"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                    placeholder="Enter your Password here"
                />

                <input
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    type="text"
                    required
                    placeholder="Enter your Name here"
                />

                <button className="signup-btn-login-page" onClick={createUser}>
                    Sign Up
                </button>
                <Link to="/sign-in" className='welcome-buttons'> Already registered? </Link>
            </div>
        </div>
    );
};

export default SignupPage;
