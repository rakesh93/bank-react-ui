import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppConstants from "../config/AppConstants.js";
import { FaArrowLeft } from "react-icons/fa";

function ForgotUserName() {

    const navigate = useNavigate();
    const [mobileNo, setMobileNo] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setErrorMessage("");

        const forgotUserNameRequest = {
            mobileNo
        };

        try {

            const response = await fetch(AppConstants.USER_SERVICE.GET_USERNAME + mobileNo, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                navigate("/username-detail", { state: data });
            } else {
                setErrorMessage(data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage("Server is Down.Please try again later.");
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
                <h2>Forgot Username</h2>
                {message && <p className="success-message">{message}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="mobileNo">Registered Mobile Number:</label>
                        <input
                            type="text"
                            id="mobileNo"
                            value={mobileNo}
                            placeholder="Please Enter Your Registered Mobile Number"
                            maxLength={10}
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setMobileNo(value);
                            }}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default ForgotUserName;
