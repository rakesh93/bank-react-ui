import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");

        const loginRequest = {
            userName: username,
            password: password
        };

        try {

            const response = await fetch("http://localhost:8082/authservice/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginRequest)
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                // Save JWT Token
                //localStorage.setItem("token", data.token);
                // Redirect to Dashboard
                navigate("/account-search");

            } else {

                alert(data.message);
            }

        } catch (error) {

            console.error(error);
            alert("Unable to connect to server.");

        }
    };

    const isFormValid =
        username.trim() !== "" &&
        password.trim() !== "";

    return (
        <div className="login-container">

            <div className="login-box">

                <h2>Admin Login</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Login
                    </button>

                    <div className="register-link">
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </div>

                </form>

            </div>

        </div>
    );
}

export default Login;