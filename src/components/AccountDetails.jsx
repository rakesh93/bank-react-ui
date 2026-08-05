import { useLocation, useNavigate } from "react-router-dom";
import "../css/AccountDetails.css";

function AccountDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const account = location.state?.result;

    const logout = () => {
        navigate("/account-search");
    };

    if (!account) {
        return <h2>No Account Details Found</h2>;
    }

    return (

        <div className="details-container">

            <button className="logout-btn" onClick={logout}>🚪 Logout</button>

            <div className="details-card">

                <div className="card-header">

                    <h2>🏦 Account Details</h2>

                    <p>Customer Information</p>

                </div>

                <div className="card-body">

                    <table>

                        <tbody>

                            <tr>
                                <td>Account Number</td>
                                <td>{account.accountNumber}</td>
                            </tr>

                            <tr>
                                <td>First Name</td>
                                <td>{account.firstName}</td>
                            </tr>

                            <tr>
                                <td>Last Name</td>
                                <td>{account.lastName}</td>
                            </tr>

                            <tr>
                                <td>Account Type</td>
                                <td>{account.accountType}</td>
                            </tr>

                            <tr>
                                <td>Mobile Number</td>
                                <td>{account.mobileNumber}</td>
                            </tr>

                            <tr>
                                <td>Aadhar Number</td>
                                <td>{account.aadharNumber}</td>
                            </tr>

                            <tr>
                                <td>Available Balance</td>
                                <td>₹ {account.availBalance?.toFixed(2)}</td>
                            </tr>

                            <tr>
                                <td>Status</td>
                                <td>
                                    <span className={account.isActive ? "active" : "inactive"}>
                                        {account.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                    <div className="action-buttons">

                        <button>Deposit</button>

                        <button>Withdraw</button>

                        <button>Transfer</button>

                        <button>Transactions</button>

                    </div>

                </div>

            </div>

        </div>

    )
};
export default AccountDetails;