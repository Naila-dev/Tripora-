// frontend/src/pages/AdminLogin.js
import React, { useState, useContext, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminLogin = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in and is an admin, redirect to the dashboard
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      if (data.user.role !== "admin") {
        setError("Access denied: Not an admin");
        return;
      }
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4 text-success">Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-danger small">{error}</p>}
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
