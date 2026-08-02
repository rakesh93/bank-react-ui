const AppConstants = {

    AUTH_SERVICE: {
        LOGIN_URL: "http://localhost:8082/authservice/login"
    },

    USER_SERVICE: {
        REGISTER_API: "http://localhost:8081/userservice/create",
        CHANGE_PASSWORD: "http://localhost:8081/userservice/updatePassword",
        GET_USERNAME: "http://localhost:8081/userservice/getUserName/"
    },

    ACCOUNT_SERVICE: {
        SEARCH_API: "http://localhost:8083/accountservice/getAccount/",
        CREATE_API: "http://localhost:8083/accountservice/createAccount"
    }

};

export default AppConstants;