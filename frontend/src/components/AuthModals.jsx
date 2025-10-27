import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../api";
import "./AuthModals.css";

const AuthModals = ({ isLoginOpen, isRegisterOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(isLoginOpen);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Sync internal modal state with props (if triggered externally)
  React.useEffect(() => {
    if (isLoginOpen) setIsLogin(true);
    if (isRegisterOpen) setIsLogin(false);
  }, [isLoginOpen, isRegisterOpen]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      setSuccessMessage("Account created successfully! Please log in.");
      setTimeout(() => setIsLogin(true), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // No modal open
  if (!isLoginOpen && !isRegisterOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal card shadow-lg p-4">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {isLogin ? (
          <>
            <h4 className="text-center mb-3 text-success">Login to Tripora</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <div className="d-grid">
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

              <p className="text-center mt-3 small">
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => {
                    setIsLogin(false);
                    setError(null);
                    setSuccessMessage("");
                  }}
                >
                  Register here
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h4 className="text-center mb-3 text-success">Create an Account</h4>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <div className="d-grid">
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>

              <p className="text-center mt-3 small">
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => {
                    setIsLogin(true);
                    setError(null);
                    setSuccessMessage("");
                  }}
                >
                  Login here
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModals;
