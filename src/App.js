import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountSearch from "./components/AccountSearch";
import AccountDetails from "./components/AccountDetails";
import CreateAccount from "./components/CreateAccount";
import ForgotPassword from "./components/ForgotPassword";
import ForgotUserName from "./components/ForgotUserName";
import UserNameDetail from "./components/UserNameDetail";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile";

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
        <Route path="/username-detail"  element={<UserNameDetail />} />
        <Route path="/user-profile"  element={<UserProfile />} />
        <Route path="/update-profile"  element={<UpdateUserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;