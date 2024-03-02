import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase";
import logo from '../images/logo.png';
import '../styles/signin.css';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [unauthTxt, setUnauthTxt] = useState(false);
    const [resetMessage, setResetMessage] = useState(null);
    const navigate = useNavigate();

    const signinUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => navigate("/page"))
            .catch((err) => {
                setUnauthTxt(true);
                console.error(err);
            });
    };

    const resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setResetMessage('Password reset link has been sent to your email.');
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-email') {
                    setResetMessage('Please enter a valid email address.');
                } else if (errorCode === 'auth/user-not-found') {
                    setResetMessage('User not found. Please register or check your email.');
                } else {
                    console.error("Error sending password reset email:", error);
                    setResetMessage('Please enter a valid email address.');
                }
            });
    };

    return (
        <div className="signin-page">
            <div className="title-container-welcome">
                {/* <img
                    src={logo.png}
                    alt="App Logo"
                    className="logo"
                /> */}
                <div className="spacer"></div>
                <span className="app-name-welcome">WELCOME TO LESSION PLANNING ASSISTEN</span>
            </div>

            <div className="login-form">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email here"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter your password here"
                />
                <button className="signin-btn-login-page" onClick={signinUser}>Login</button>
                <Link to="/sign-up" className='welcome-buttons'>Create new account</Link>

                {/* Add a "Forgot Password" link */}
                <p className="forgot-password-link" onClick={() => resetPassword()}>
                    Forgot Password? Reset it here.
                </p>

                {/* Display reset message */}
                {resetMessage && <p className="reset-message">{resetMessage}</p>}
                
                {unauthTxt && <p className="wrong-pass-prompt">Wrong password!</p>}
            </div>
        </div>
    );
}

export default SigninPage;
