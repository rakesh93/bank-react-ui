import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import AppConstants from "../config/AppConstants.js";
import "../css/TransferBalance.css";

function TransferBalance() {

    const navigate = useNavigate();
    const location = useLocation();

    const [toAccountNumber, setToAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const account = location.state?.result;
    const token = localStorage.getItem("token");
    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setErrorMessage("");

        if (!account?.accountNumber) {
            setErrorMessage("From account details not found.");
            return;
        }

        const transferRequest = {
            fromAccountNumber: account.accountNumber,
            toAccountNumber,
            amount: Number(amount)
        };

        setLoading(true);

        try {

            const response = await fetch(
                AppConstants.TRANSACTION_SERVICE.TRANSFER_API,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(transferRequest)
                }
            );

            const data = await response.json();

            console.log("Transfer Response:", data);

            if (data.statusCode === 200) {
                setMessage(data.message);
                setToAccountNumber("");
                setAmount("");
                setTimeout(() => {
                    navigate(-1);
                }, 3000);

            } else {

                setErrorMessage(data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }

        } catch (error) {
            setErrorMessage(
                AppConstants.ERROR_MESSAGES.SERVER_DOWN
            );

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="transfer-container">

            <div className="deposit-container">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft /> Back
                </button>

                <h2>💸 Transfer Money</h2>

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

                        <label>From Account</label>

                        <input
                            type="text"
                            value={account.accountNumber || ""}
                            readOnly
                            className="readonly-input"
                        />

                    </div>

                    <div className="form-group">

                        <label>Available Balance</label>
                        <input
                            type="text"
                            value={"₹ " + account.availBalance || ""}
                            readOnly
                            className="readonly-input"
                        />
                    </div>

                    <div className="form-group">

                        <label>To Account</label>

                        <input
                            type="text"
                            value={toAccountNumber}
                            placeholder="Enter Receiver Account Number"
                            maxLength={10}
                            inputMode="numeric"
                            onChange={(e) =>
                                setToAccountNumber(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            required
                        />

                    </div>

                    {/* Amount */}

                    <div className="form-group">

                        <label>Transfer Amount</label>

                        <input
                            type="number"
                            value={amount}
                            placeholder="Enter Transfer Amount"
                            min="1"
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={
                            !toAccountNumber ||
                            !amount ||
                            loading
                        }
                    >
                        {loading
                            ? "Processing..."
                            : "💸 Transfer Money"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default TransferBalance;