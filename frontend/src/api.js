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

export default API;


