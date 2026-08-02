import { useState } from "react";
import "../css/CreateAccount.css";
import AppConstants from "../config/AppConstants.js";

function CreateAccount() {

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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(account)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Server Error");
        }

    };

    return (

        <div className="create-container">

            <form className="create-box" onSubmit={createAccount}>

                <h2>Create Bank Account</h2>

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