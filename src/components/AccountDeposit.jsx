import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import AppConstants from "../config/AppConstants";
import "../css/AccountDeposit.css";

function AccountDeposit() {

    const navigate = useNavigate();
    const location = useLocation();
    const account = location.state?.result;

    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    if (!account) {
        return (
            <div className="deposit-container">
                <h3>Account details not found.</h3>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        );
    }

    const handleDeposit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!amount || Number(amount) <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                AppConstants.TRANSACTION_SERVICE.DEPOSIT_API + account.accountNumber,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: amount
                    })
                }
            );

            const data = await response.json();

            if (data.statusCode === 200) {
                setErrorMessage(data.message);
                setTimeout(() => {
                    navigate(-1);
                }, 3000);

            } else {
                setErrorMessage(data.message);
                setTimeout(() => {
                }, 3000);
            }

        } catch (error) {
            setErrorMessage(AppConstants.ERROR_MESSAGES.SERVER_DOWN);
            setTimeout(() => {
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deposit-container">

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft /> Back
            </button>

            <h2>Deposit Amount</h2>

            {message && (<div className="success-message">{message} </div>)}

            {errorMessage && (<div className="error-message">{errorMessage} </div>)}

            <div className="account-card">

                <FaUserCircle size={70} color="#0d6efd" />

                <h3>
                    {account.firstName} {account.lastName}
                </h3>

                <p>
                    <strong>Account Number :</strong> {account.accountNumber}
                </p>

                <p>
                    <strong>Available Balance :</strong> ₹ {account.availBalance}
                </p>

            </div>

            <form onSubmit={handleDeposit}>

                <div className="form-group">

                    <label>Deposit Amount</label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter deposit amount"
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Depositing..." : "Deposit"}
                </button>

            </form>

        </div>
    );
}

export default AccountDeposit;