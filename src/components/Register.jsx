import { useState } from "react";
import "../css/Register.css";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [user, setUser] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "",
        emailId: "",
        mobileNo: ""
    });

    const isFormValid =
        user.userName.trim() !== "" &&
        user.password.trim() !== "" &&
        user.firstName.trim() !== "" &&
        user.lastName.trim() !== "" &&
        user.emailId.trim() !== "" &&
        user.mobileNo.trim() !== "" &&
        user.role.trim() !== "";

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const registerUser = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch("http://localhost:8081/userservice/create", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            });
            
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setUser({
                    userName: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                    role: "",
                    emailId: "",
                    mobileNo: ""
                });

            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Server Error");

        }

    };

    return (

        <div className="register-container">

            <div className="register-box">

                <h2>User Registration</h2>

                {message && (
                    <div className={messageType === "success" ? "success-message" : "error-message"}>
                        {message}
                    </div>
                )}

                <form onSubmit={registerUser}>

                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={user.userName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="emailId"
                        placeholder="Email"
                        value={user.emailId}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="mobileNo"
                        placeholder="Mobile Number"
                        value={user.mobileNo}
                        onChange={handleChange}
                        required
                    />

                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={user.role || ""}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Role --</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                    </div>

                    <button
                        type="submit" disabled={!isFormValid}
                    >
                        Register
                    </button>
                    <div className="register-link">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </div>
                </form>

            </div>

        </div>

    );

}

export default Register;