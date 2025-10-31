// frontend/src/components/AdminDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../api'; // Use the central api instance

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const token = localStorage.getItem("token");
  const [userPhone, setUserPhone] = useState("");

  // Fetch tours
  const fetchTours = useCallback(async () => {
    try {
      const res = await api.get('/tours');
      setTours(res.data);
    } catch (err) {
      console.error("Error fetching tours:", err);
      alert("Failed to fetch tours");
    }
  }, []);

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    if (!token) return;
    try {
      const res = await api.get('/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to fetch bookings");
    }
  }, [token]);

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, [fetchTours, fetchBookings]);

  // Add new tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Admin token missing. Please login first.");
    if (!formData.title || !formData.description || !formData.price) {
      return alert("Please fill in all required fields.");
    }

    try {
      await api.post('/tours', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Tour added successfully!");
      setShowForm(false);
      setFormData({ title: "", description: "", price: "", image: "" });
      fetchTours();
    } catch (err) {
      console.error("Error adding tour:", err);
      alert("Error adding tour: " + (err.response?.data?.message || err.message));
    }
  };

  // Delete tour
  const handleDeleteTour = async (id) => {
    if (!token) return alert("Admin token missing.");
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await api.delete(`/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Tour deleted successfully!");
      fetchTours();
    } catch (err) {
      console.error("Error deleting tour:", err);
      alert("Failed to delete tour");
    }
  };

  // Trigger M-Pesa payment
  const handlePayment = async (bookingId, amount, phone) => {
    if (!token) return alert("Admin token missing.");
    if (!phone) return alert("Please enter a phone number.");
    try {
      const res = await api.post(
        '/payments/stkpush',
        { bookingId, amount, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Payment triggered successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Payment failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Add Tour */}
      <button className="btn-add" onClick={() => setShowForm(true)}>Add Tour</button>
      {showForm && (
        <div className="overlay">
          <form onSubmit={handleSubmit} className="tour-form">
            <h2>Add New Tour</h2>
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <div className="form-buttons">
              <button type="submit" className="btn-save">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Tours List */}
      <h2>Tours</h2>
      {tours.length === 0 && <p>No tours available.</p>}
      {tours.map((tour) => (
        <div key={tour._id} className="tour-item">
          <h3>{tour.title}</h3>
          <p>{tour.description}</p>
          <p>Price: ${tour.price}</p>
          <img src={tour.image || "/images/default.jpg"} alt={tour.title} width={200} />
          <button onClick={() => handleDeleteTour(tour._id)} className="btn-delete">Delete</button>
        </div>
      ))}

      {/* Bookings List */}
      <h2>Bookings</h2>
      <input
        placeholder="Enter phone number"
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
      />
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map((b) => (
        <div key={b._id} className="booking-item">
          <p>User: {b.user?.name || b.userEmail}</p>
          <p>Tour: {b.tour?.title}</p>
          <p>Status: {b.paymentStatus}</p>
          <button onClick={() => handlePayment(b._id, b.tour?.price || 1000, userPhone)} className="btn-pay">
            Trigger Payment
          </button>
        </div>
      ))}

      {/* CSS Styling */}
      <style jsx>{`
        .admin-dashboard {
          padding: 2rem;
          background: #f9f9f9;
          color: #111; /* dark font */
          font-family: Arial, sans-serif;
        }
        h1, h2 {
          color: #111;
        }
        button {
          cursor: pointer;
        }
        .btn-add, .btn-save, .btn-cancel, .btn-delete, .btn-pay {
          padding: 0.5rem 1rem;
          margin: 0.25rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .btn-add { background: #28a745; color: #111 }
        .btn-save { background: #007bff; color: #111 }
        .btn-cancel { background: #6c757d; color: #111 }
        .btn-delete { background: #dc3545; color: #111 }
        .btn-pay { background: #17a2b8; color: #111 }

        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000;
        }
        .tour-form {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 400px;
          color: #111;
        }
        .tour-form input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        .form-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .tour-item, .booking-item {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 1rem;
          margin: 1rem 0;
          background: #fff;
          color: #111;
        }
        img {
          border-radius: 4px;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
