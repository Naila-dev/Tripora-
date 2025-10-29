// frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", price: "", image: "" });

  const token = localStorage.getItem("token"); // admin token

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, []);

  // Fetch all tours
  const fetchTours = async () => {
    const res = await axios.get("/tripora/tours");
    setTours(res.data);
  };

  // Fetch all bookings (admin)
  const fetchBookings = async () => {
    const res = await axios.get("/tripora/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(res.data);
  };

  // Add new tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/tripora/tours", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setShowForm(false);
    fetchTours();
    setFormData({ title: "", description: "", price: "", image: "" });
  };

  // Trigger M-Pesa payment (STK push)
  const handlePayment = async (bookingId, amount, phone) => {
    try {
      const res = await axios.post(
        "/tripora/payments/stkpush",
        { bookingId, amount, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Payment triggered!");
      console.log(res.data);
    } catch (err) {
      alert("❌ Payment failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add Tour */}
      <button onClick={() => setShowForm(true)}>Add Tour</button>
      {showForm && (
        <div className="overlay">
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Tours List */}
      <h2>Tours</h2>
      {tours.map((tour) => (
        <div key={tour._id}>
          <h3>{tour.title}</h3>
          <p>{tour.description}</p>
          <p>Price: {tour.price}</p>
          <img src={tour.image} alt={tour.title} width={200} />
          <button onClick={() => handleDeleteTour(tour._id)}>Delete</button>
        </div>
      ))}

      {/* Bookings List */}
      <h2>Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id}>
          <p>User: {b.user?.name || b.userEmail}</p>
          <p>Tour: {b.tour?.title}</p>
          <p>Status: {b.paymentStatus}</p>
          <button onClick={() => handlePayment(b._id, b.tour?.price || 1000, userPhone)}>Trigger Payment</button>
        </div>
      ))}

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex; justify-content: center; align-items: center;
        }
        form {
          background: #fff;
          padding: 2rem;
          display: flex; flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}

