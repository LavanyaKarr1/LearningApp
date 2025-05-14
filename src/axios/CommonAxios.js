import axios from "axios";
import ApiUrls from "../API-urls/api-urls";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";


const commonAxios = axios.create({
    baseURL: ApiUrls.contextURL,
});




// Add a request interceptor to attach the token to every request
commonAxios.interceptors.request.use(
    (config) => {
        console.log(" Interceptor Triggered for:", config.url);

        if (config.url.includes("login") || config.url.includes("register") || config.url.includes("changePassword")) {
            console.log("Skipping token for:", config.url);
            return config; // Skip token for login
        }

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, blocking request.");
            return Promise.reject({ message: "No token found" });
        }

        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token added:", token);

        return config;
    },
    (error) => {
        console.error("Request Interceptor Error:", error);
        return Promise.reject(error);
    }
);


// Response Interceptor to handle 401 Unauthorized errors globally
commonAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Swal.fire({
                text: "Your session has expired! Please log in again.",
                icon: "info"
            })
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login
        }
        return Promise.reject(error);
    }
);
export default commonAxios;
