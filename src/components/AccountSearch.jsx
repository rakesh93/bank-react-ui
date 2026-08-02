import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AccountSearch.css";
import Login from "./Login";
import AppConstants from "../config/AppConstants.js";
import { FaUserCircle } from "react-icons/fa";

function AccountSearch() {

    const [accountNumber, setAccountNumber] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, []);
    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage("");
        setErrorMessage("");
        if (accountNumber.trim() === "") {
            setErrorMessage("Please enter Account Number");
            return;
        }

        try {
            const response = await fetch(AppConstants.ACCOUNT_SERVICE.SEARCH_API + accountNumber
                ,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await response.json();
            console.log("API Response :", data);
            if (response.ok && data.statusCode === 200) {
                navigate("/account-details", {
                    state: data
                });

            } else {
                setErrorMessage(data.message);
                setTimeout(() => {
                    setAccountNumber("");
                    setErrorMessage("");
                }, 3000);
            }

        } catch (error) {
            setErrorMessage(AppConstants.ERROR_MESSAGES.SERVER_DOWN);
            setTimeout(() => {
                setAccountNumber("");
                setErrorMessage("");
            }, 3000);
        }
    };

    return (

        <div className="search-container">
            <div className="dashboard-header">

                <div className="welcome-user">
                    👋 Welcome to iLearn Bank Service
                </div>

                <div className="profile-section">

                    <div
                        className="profile-info"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <FaUserCircle className="profile-icon" />

                        <span className="profile-name">
                            {username}
                        </span>

                        <span className="arrow">
                            ▼
                        </span>
                    </div>

                    {showMenu && (
                        <div className="profile-dropdown">
                            <div onClick={() => navigate("/user-profile")}>👤 My Profile</div>
                            <div onClick={() => navigate("/update-profile")}>✏️ Update Profile</div>
                            <div onClick={() => navigate("/change-password")}>🔒 Change Password</div>
                            <div onClick={() => navigate("/login")}>🚪 Logout</div>
                        </div>
                    )}
                </div>

            </div>
            <div className="search-box">

                <h2>🏦 Bank Account Search</h2>
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

                <input
                    type="text"
                    id="accountNumber"
                    value={accountNumber}
                    placeholder="Please Enter Account Number"
                    maxLength={10}
                    onChange={(e) =>
                        setAccountNumber(e.target.value.replace(/\D/g, ""))
                    }
                    required
                />

                <button onClick={handleSearch}>
                    Search Account
                </button>

                <hr className="divider" />

                <button
                    className="create-btn"
                    onClick={() => navigate("/create-account")}
                >
                    Create New Account
                </button>

            </div>

        </div>
    );
}



export default AccountSearch;