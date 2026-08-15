import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AppConstants from "../config/AppConstants";
import { FaArrowLeft } from "react-icons/fa";

function ChangePassword() {

    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");
        setErrorMessage("");

        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        
        const request = {
            oldPassword,
            newPassword
        };

        try {
            const response = await fetch(
                AppConstants.USER_SERVICE.NEW_PASSWORD_CHANGE + username,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(request)
                }
            );

            const data = await response.json();

            if (data.statusCode === 200) {

                setMessage(data.message);
                setOldPassword("");
                setNewPassword("");

                setTimeout(() => {
                    navigate("/account-search");
                }, 3000);

            } else {

                setErrorMessage(data.message);
                setOldPassword("");
                setNewPassword("");

                setTimeout(() => {
                    setErrorMessage("");
                }, 4000);
            }

        } catch (error) {
            setErrorMessage(AppConstants.ERROR_MESSAGES.SERVER_DOWN);
        }

    };

    return (

        <div className="profile-container">

            <div className="profile-box">

                <button
                    className="back-btn"
                    onClick={() => navigate("/account-search")}>
                    <FaArrowLeft /> Back
                </button>

                <h2>🔒 Change Password</h2>

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

                        <label>Existing Password</label>
                        <div className="password-container">

                            <input
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Please Enter Your Existing Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />

                            <span
                                className="eye-icon"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <div className="password-container">

                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Please Enter Your New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />

                            <span
                                className="eye-icon"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <button type="submit">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;