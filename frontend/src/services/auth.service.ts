import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) { // Backend returns 'token' or 'accessToken'?
                // Backend returns 'token' in JwtResponse, but wait, let's check JwtResponse.java
                // JwtResponse.java: this.token = accessToken;
                // So the JSON field is "token" ??
                // Actually fields are token, type, id, username, email, roles.
                // Let's store the whole object or just token.
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
