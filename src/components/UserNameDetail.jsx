import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import "../css/UserNameDetail.css";

function UserNameDetail() {
    const location = useLocation();
    const navigate = useNavigate();

    const message = location.state?.message || "";

    // Extract username from the message
    const match = message.match(/UserName is (\w+)/);
    const userName = match ? match[1] : "";

    return (
        <div className="username-page">
            <div className="username-card">

                <FaUserCircle className="user-icon" />

                <h2>UserName Retrieved Successfully</h2>

                <p className="info-text">
                    Your Registered UserName is
                </p>

                <div className="username-box">
                    {userName}
                </div>

                <button
                    className="login-btn"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </button>

            </div>
        </div>
    );
}

export default UserNameDetail;