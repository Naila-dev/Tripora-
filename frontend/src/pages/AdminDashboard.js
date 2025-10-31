// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/tripora"; // Make sure this matches your backend

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    duration: "",
    image: "",
  });
  const [error, setError] = useState("");

  // Load all tours
  const loadTours = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/tours`);
      setTours(data);
    } catch (err) {
      console.error("Failed to load tours:", err.response?.data || err.message);
    }
  };

  // Handle form submission to add tour
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!form.title || !form.description || !form.location || !form.price || !form.duration) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const payload = { ...form, price: Number(form.price) }; // Ensure price is a number
      await axios.post(`${API_BASE}/tours`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Reset form & error
      setForm({ title: "", description: "", location: "", price: "", duration: "", image: "" });
      setError("");
      loadTours();
    } catch (err) {
      console.error("Add tour failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add tour.");
    }
  };

  // Delete tour
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/tours/${id}`);
      loadTours();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to delete tour.");
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-success text-center">Admin Tour Manager</h2>

      {/* Form to add a new tour */}
      <form className="row g-3 mb-5" onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div className="col-md-6" key={key}>
            <input
              type={key === "price" ? "number" : "text"}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="form-control"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        {error && <p className="text-danger mt-2">{error}</p>}
        <button className="btn btn-success mt-3 w-25 mx-auto">Add Tour</button>
      </form>

      {/* List of tours */}
      <div className="row">
        {tours.map((tour) => (
          <div className="col-md-4 mb-4" key={tour._id}>
            <div className="card shadow-sm border-0 p-3">
              <h5 className="fw-bold">{tour.title}</h5>
              <p className="small text-muted">{tour.location}</p>
              <p>${tour.price}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(tour._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
