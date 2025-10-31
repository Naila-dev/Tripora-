// frontend/src/api/api.js
import axios from "axios";

// Create an Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/tripora", // change to your deployed backend URL later
});
// Add a request interceptor to include token in headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

