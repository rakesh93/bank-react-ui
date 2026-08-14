const USER_SERVICE_BASE_URL = "http://localhost:8081/userservice/";
const ACCOUNT_SERVICE_BASE_URL = "http://localhost:8083/accountservice/";
const AUTH_SERVICE_BASE_URL = "http://localhost:8082/authservice/";
const TRANSACTION_SERVICE_BASE_URL = "http://localhost:8084/transactionservice/";

const AppConstants = {

    AUTH_SERVICE: {
        LOGIN_URL: AUTH_SERVICE_BASE_URL + "login"
    },

    USER_SERVICE: {
        REGISTER_API: USER_SERVICE_BASE_URL + "create",
        CHANGE_PASSWORD: USER_SERVICE_BASE_URL + "updateForgotPassword",
        GET_USERNAME: USER_SERVICE_BASE_URL + "getUserName/",
        PROFILE_FETCH: USER_SERVICE_BASE_URL + "getProfile/",
        PROFILE_UPDATE: USER_SERVICE_BASE_URL + "updateProfile/",
        NEW_PASSWORD_CHANGE: USER_SERVICE_BASE_URL + "updateNewPassword/"
    },

    ACCOUNT_SERVICE: {
        SEARCH_API: ACCOUNT_SERVICE_BASE_URL + "getAccount/",
        CREATE_API: ACCOUNT_SERVICE_BASE_URL + "createAccount"
    },

    TRANSACTION_SERVICE: {
        DEPOSIT_API: TRANSACTION_SERVICE_BASE_URL + "deposit/",
        WITHDRAW_API: TRANSACTION_SERVICE_BASE_URL + "withdraw/",
        TRANSFER_API: TRANSACTION_SERVICE_BASE_URL + "transfer",
        TRANSACTION_HISTORY_API: TRANSACTION_SERVICE_BASE_URL + "transactionList/"
    },

    ERROR_MESSAGES: {
        SERVER_DOWN: "Server is Down.Please try again later."
    }

};

export default AppConstants;