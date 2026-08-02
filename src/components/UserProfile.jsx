import React, { useEffect, useState } from "react";
import AppConstants from "../config/AppConstants";
import { useNavigate } from "react-router-dom";
import "../css/UserProfile.css";

function UserProfile() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        const username = localStorage.getItem("username");

        console.log("Username :", username);

        const url = AppConstants.USER_SERVICE.PROFILE_FETCH + username;

        console.log("URL :", url);
        try {

            const response = await fetch(
                AppConstants.USER_SERVICE.PROFILE_FETCH + username
            );

            const data = await response.json();

            if (data.statusCode === 200) {
                setProfile(data.result);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="profile-container">

            <div className="profile-box">

                <h2>👤 My Profile</h2>

                <div className="profile-row">
                    <span className="profile-label">UserName</span>
                    <span className="profile-value">{profile.userName}</span>
                </div>

                <div className="profile-row">
                    <span className="profile-label">First Name</span>
                    <span className="profile-value">{profile.firstName}</span>
                </div>

                <div className="profile-row">
                    <span className="profile-label">Last Name</span>
                    <span className="profile-value">{profile.lastName}</span>
                </div>

                <div className="profile-row">
                    <span className="profile-label">Email Id</span>
                    <span className="profile-value">{profile.emailId}</span>
                </div>

                <div className="profile-row">
                    <span className="profile-label">Mobile Number</span>
                    <span className="profile-value">{profile.mobileNo}</span>
                </div>

                <div className="profile-row">
                    <span className="profile-label">Role</span>
                    <span className="profile-value">{profile.role}</span>
                </div>

                <button
                    className="profile-btn"
                    onClick={() => navigate("/account-search")}
                >
                    ← Back to Dashboard
                </button>

            </div>

        </div>
    );
}

export default UserProfile;