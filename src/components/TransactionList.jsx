import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AppConstants from "../config/AppConstants.js";
import "../css/TransactionList.css";

function TransactionList() {

    const navigate = useNavigate();
    const location = useLocation();

    const account = location.state?.result;
    const token = localStorage.getItem("token");
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (account?.accountNumber) {
            loadTransactions();
        }

    }, [account]);

    const loadTransactions = async () => {

        setLoading(true);
        setErrorMessage("");

        try {

            const response = await fetch(
                AppConstants.TRANSACTION_SERVICE.TRANSACTION_HISTORY_API
                + account.accountNumber,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log("Transaction Response:", data);

            if (data.statusCode === 200) {
                setTransactions(data.result || []);
            } else {
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(
                AppConstants.ERROR_MESSAGES.SERVER_DOWN
            );

        } finally {
            setLoading(false);
        }
    };

    if (!account) {

        return (
            <div className="transaction-container">

                <div className="transaction-box">

                    <h2>Account Details Not Found</h2>

                    <button
                        className="back-btn"
                        onClick={() => navigate("/account-search")}
                    >
                        <FaArrowLeft /> Back
                    </button>

                </div>

            </div>
        );
    }

    return (

        <div className="transaction-container">

            <div className="transaction-box">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft /> Back
                </button>

                <h2>📋 Transaction History</h2>

                <div className="account-info">

                    <span>
                        Account Number:
                    </span>

                    <strong>
                        {account.accountNumber}
                    </strong>
                    <div>
                    <span>
                        Available Balance:
                    </span>

                    <strong>
                        {" ₹ " + account.availBalance}
                    </strong>
                </div>
            </div>

            {loading && (
                <div className="loading-message">
                    Loading transactions...
                </div>
            )}

            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}

            {!loading &&
                !errorMessage &&
                transactions.length === 0 && (

                    <div className="no-data">
                        No transactions found.
                    </div>

                )}

            {!loading &&
                transactions.length > 0 && (

                    <div className="table-container">

                        <table className="transaction-table">

                            <thead>

                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                    <th>Transaction Date</th>
                                </tr>

                            </thead>

                            <tbody>

                                {transactions.map((transaction) => (

                                    <tr key={transaction.transactionId}>

                                        <td>
                                            {transaction.transactionId}
                                        </td>

                                        <td>
                                            <span
                                                className={`transaction-type ${transaction.transactionType?.toLowerCase()
                                                    }`}
                                            >
                                                {transaction.transactionType}
                                            </span>
                                        </td>

                                        <td className="amount">
                                            ₹ {transaction.amount}
                                        </td>

                                        <td>
                                            ₹ {transaction.availableAmount}
                                        </td>

                                        <td>
                                            {transaction.transactionDate}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

        </div>

        </div >
    );
}

export default TransactionList;