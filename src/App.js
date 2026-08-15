import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountSearch from "./components/AccountSearch";
import AccountDetails from "./components/AccountDetails";
import CreateAccount from "./components/CreateAccount";
import ForgotPassword from "./components/ForgotPassword";
import ForgotUserName from "./components/ForgotUserName";
import ForgotUserNameDetail from "./components/ForgotUserNameDetail";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile";
import PasswordChange from "./components/PasswordChange";
import AccountDeposit from "./components/AccountDeposit";
import AccountWithdraw from "./components/AccountWithdraw";
import TransferBalance from "./components/TransferBalance";
import TransactionList from "./components/TransactionList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-search" element={<AccountSearch />} />
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path="/create-account"  element={<CreateAccount />} />
        <Route path="/forgot-password"  element={<ForgotPassword />} />
        <Route path="/forgot-username"  element={<ForgotUserName />} />
        <Route path="/username-detail"  element={<ForgotUserNameDetail />} />
        <Route path="/user-profile"  element={<UserProfile />} />
        <Route path="/update-profile"  element={<UpdateUserProfile />} />
        <Route path="/change-password"  element={<PasswordChange />} />
        <Route path="/account-deposit" element={<AccountDeposit/>} />
        <Route path="/account-withdraw" element={<AccountWithdraw/>} />
        <Route path="/transfer" element={<TransferBalance/>} />
        <Route path="/transactionList" element={<TransactionList/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;