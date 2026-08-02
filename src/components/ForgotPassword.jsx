import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/ForgotPassword.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AppConstants from "../config/AppConstants.js";
import { FaArrowLeft } from "react-icons/fa";

function ForgotPassword() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setErrorMessage("");

        const forgotRequest = {
            userName,
            password
        };

        try {

            const response = await fetch(AppConstants.USER_SERVICE.CHANGE_PASSWORD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(forgotRequest)
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setErrorMessage(data.message);
                setPassword("");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(AppConstants.ERROR_MESSAGES.SERVER_DOWN);
        }
    };
    return (

        <div className="login-container">

            <div className="login-box">

                <button
                    type="button"
                    className="back-btn"
                    onClick={() => navigate("/login")}
                >
                    <FaArrowLeft /> Back
                </button>

                <h2>Reset Password</h2>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Existing Username</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Please Enter Your Existing Username"
                            required
                        /></div>

                    <div className="form-group">

                        <label>New Password</label>

                        <div className="password-container">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Please Enter New Password"
                                required
                            />

                            <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>

                        </div>

                    </div>

                    <button type="submit">
                        Update Password
                    </button>

                    <div className="register-link">
                        Already remember your password ?
                        <Link to="/login"> Back to Login</Link>
                    </div>

                    <div className="register-link">
                        Forgot your username ?
                        <Link to="/forgot-username"> Recover Username</Link>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default ForgotPassword;