// frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const token = localStorage.getItem("token"); // admin token
  const [userPhone, setUserPhone] = useState(""); // store admin/test phone number

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, []);

  // ✅ Fetch all tours
  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tripora/tours");
      setTours(res.data);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  // ✅ Fetch all bookings (admin)
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tripora/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // ✅ Add new tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/tripora/tours", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      setFormData({ title: "", description: "", price: "", image: "" });
      fetchTours();
    } catch (err) {
      console.error("Error adding tour:", err);
    }
  };

  // ✅ Delete tour
  const handleDeleteTour = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tripora/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTours();
    } catch (err) {
      console.error("Error deleting tour:", err);
    }
  };

  // ✅ Trigger M-Pesa payment (STK push)
  const handlePayment = async (bookingId, amount, phone) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/tripora/payments/stkpush",
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
      <button onClick={() => setShowForm(true)}>Add Tour</button>
      {showForm && (
        <div className="overlay">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <input
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
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
          <p>Price: {tour.price}</p>
          <img src={tour.image} alt={tour.title} width={200} />
          <button onClick={() => handleDeleteTour(tour._id)}>Delete</button>
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
          <button
            onClick={() =>
              handlePayment(b._id, b.tour?.price || 1000, userPhone)
            }
          >
            Trigger Payment
          </button>
        </div>
      ))}

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        form {
          background: #fff;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .tour-item,
        .booking-item {
          border: 1px solid #ddd;
          padding: 1rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
