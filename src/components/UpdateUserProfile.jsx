import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AppConstants from "../config/AppConstants";

function UpdateUserProfile() {

    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const username = location.state?.username;

    const [profile, setProfile] = useState({
        username: "",
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNo: ""
    });

    useEffect(() => {
        if (username) {
            fetchUser();
        }
    }, [username]);

    const fetchUser = async () => {

        try {
            const response = await fetch(
                AppConstants.USER_SERVICE.PROFILE_FETCH + username
            );

            const data = await response.json();
            if (data.statusCode === 200) {
                setProfile(data.result);
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(AppConstants.ERROR_MESSAGES.SERVER_DOWN);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setErrorMessage("");
        try {

            const response = await fetch(
                AppConstants.USER_SERVICE.PROFILE_UPDATE + username,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(profile)
                }
            );

            const data = await response.json();
            if (data.statusCode === 200) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate("/user-profile");
                }, 4000);
            } else {
                setErrorMessage(data.message);
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

                <h2>Update Profile</h2>

                {message && (<div className="success-message">{message} </div>)}

                {errorMessage && (<div className="error-message">{errorMessage} </div>)}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.userName}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="emailId"
                            value={profile.emailId}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNo"
                            value={profile.mobileNo}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserProfile;