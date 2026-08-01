import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AppConstants from "../config/AppConstants.js";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const loginRequest = {
            userName: username,
            password: password
        };

        try {

            const response = await fetch(AppConstants.AUTH_SERVICE.LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginRequest)
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                localStorage.setItem("username", username);
                navigate("/account-search");
            } else {
                setErrorMessage(data.message);
                setUsername("");
                setPassword("");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }

        } catch (error) {
            setErrorMessage("Unable to connect to server.");
        }
    };

    const isFormValid =
        username.trim() !== "" &&
        password.trim() !== "";

    return (
        <>
            <div className="security-banner">
                <div className="security-text">
                    🔒 IMPORTANT SECURITY ALERT : Never or Don't share your Password, OTP, ATM PIN or CVV with anyone. iLearn Bank employees will never ask for your confidential information, Please Contact iLearn Bank Customer care at anytime we will happy to help you.
                </div>
            </div>
            <div className="login-container">

                <div className="login-box">

                    <h2>Welcome iLearn Bank Login</h2>

                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Username</label>

                            <input
                                type="text"
                                placeholder="Please Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <div className="password-container">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Please Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        <button
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Login
                        </button>

                        <div className="register-link">
                            If you forgot your password ?
                            <Link to="/forgot-password"> Reset Password</Link>
                        </div>

                        <div className="register-link">
                            If you forgot your username ?
                            <Link to="/forgot-username"> Recover Username</Link>
                        </div>

                        <div className="register-link">
                            Don't have an account?
                            <Link to="/register"> Register</Link>
                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}

export default Login;