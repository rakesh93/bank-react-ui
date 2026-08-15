import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateAccount.css";
import AppConstants from "../config/AppConstants.js";
import { FaArrowLeft } from "react-icons/fa";


function CreateAccount() {

    const navigate = useNavigate();
    const [message] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token = localStorage.getItem("token");

    const [account, setAccount] = useState({
        firstName: "",
        lastName: "",
        accountType: "Saving",
        accountNumber: "",
        aadharNumber: "",
        mobileNumber: ""
    });

    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        });
    };

    const createAccount = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(AppConstants.ACCOUNT_SERVICE.CREATE_API,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(account)
                }
            );

            const data = await response.json();

            if (data.statusCode === 200) {
                setErrorMessage(data.message);
                setTimeout(() => {
                    navigate("/account-search");
                }, 3000);

            } else {
                setErrorMessage(data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }

        } catch (error) {
            setErrorMessage(AppConstants.ERROR_MESSAGES.SERVER_DOWN);
        }

    };

    return (

        <div className="create-container">

            <form className="create-box" onSubmit={createAccount}>

                {<div className="back-link" onClick={() => navigate("/account-search")}>  ← Back  </div>}

                <h2>Create Bank Account</h2>

                {message && (<div className="success-message">{message} </div>)}

                {errorMessage && (<div className="error-message">{errorMessage} </div>)}

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                />

                <select
                    name="accountType"
                    onChange={handleChange}
                >
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <input
                    type="text"
                    name="aadharNumber"
                    placeholder="Aadhar Number"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                />

                <button type="submit">
                    Create Account
                </button>

            </form>

        </div>

    );

}

export default CreateAccount;