import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import "../css/UserNameDetail.css";

function ForgotUserNameDetail() {
    const location = useLocation();
    const navigate = useNavigate();

    const userName = location.state?.message || "";

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

export default ForgotUserNameDetail;