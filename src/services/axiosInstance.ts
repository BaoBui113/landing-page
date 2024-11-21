import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    "content-type": "application/json",
  },
  timeout: 60000,
});

// Before request is sent to server
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// After response was sent by server
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check for 401 status (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("access_token");
      Cookies.remove("access_token");
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
