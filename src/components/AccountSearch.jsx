import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AccountSearch.css";
import Login from "./Login";
import AppConstants from "../config/AppConstants.js";

function AccountSearch() {

    const [accountNumber, setAccountNumber] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const logout = () => {
        navigate("/login");
    };

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, []);
    const handleSearch = async () => {

        if (accountNumber.trim() === "") {
            alert("Please enter Account Number");
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
                alert(data.message || "Account Not Found");
            }

        } catch (error) {
            console.error(error);
            alert("Unable to connect to server.");
        }

    };

    return (

        <div className="search-container">
            <div className="welcome-user">
                👋 Welcome, {username}
            </div>
            <div className="top-bar">

                <button className="logout-btn" onClick={logout}>
                    🚪 Logout
                </button>

            </div>
            <div className="search-box">

                <h2>🏦 Bank Account Search</h2>

                <input
                    type="text"
                    placeholder="Enter Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
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