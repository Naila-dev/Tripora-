// frontend/src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/tripora", // ✅ Adjust if your backend URL is different
});

// 🧠 Automatically attach token from localStorage for every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Automatically refresh token if expired
API.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 and that it's not a retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as a retry
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // No refresh token available, log out the user
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post("http://localhost:5000/tripora/auth/refresh", { refreshToken });
        localStorage.setItem("token", data.token);
        originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        return API(originalRequest); // Retry the original request with the new token
      } catch (refreshErr) {
        // Refresh failed, clear storage and redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
