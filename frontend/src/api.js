// frontend/src/api/api.js
import axios from 'axios';

// Create a centralized Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/tripora', // <-- base URL of your backend
});

// Optional: attach token automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    // Check for 401 and that it's not a retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // Handle case where there is no refresh token
        return Promise.reject(error);
      }

      try {
        // Use a temporary axios instance for the refresh request to avoid interceptor recursion
        const { data } = await axios.post('http://localhost:5000/tripora/auth/refresh', { refreshToken });
        localStorage.setItem('token', data.token);
        // Update the header for the original request and future requests
        API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
        return API(originalRequest);
      } catch (refreshErr) {
        // Refresh failed, clear tokens and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Or show a login modal
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
