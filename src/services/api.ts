import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Set the base URL
  timeout: 10000, // Set a timeout limit
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-app-token": "anyware-task",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token dynamically if available
    const token = localStorage.getItem("anyware-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login...");
      localStorage.removeItem("anyware-token");
      window.location.href = "/login";
    } else if (error.response?.status === 500) {
      console.error("Server Error - Try again later.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
