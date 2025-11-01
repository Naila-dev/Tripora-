// frontend/src/components/BookingModal.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import '../styles/bookingModal.css'; // We will create this file

const BookingModal = ({ tour, onClose, onLoginClick }) => {
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('You must be logged in to book.');
      return;
    }
    setIsLoading(true);
    setMessage('');

    try {
      // 1. Create booking in backend
      const bookingRes = await API.post('/bookings', { tourId: tour._id });

      // 2. Trigger M-Pesa payment
      await API.post('/payments', {
        amount: tour.price,
        phone,
        bookingId: bookingRes.data.booking._id
      });

      setMessage('Booking successful! Check your phone for the M-Pesa payment prompt.');
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      console.error(err);
      setMessage('Booking failed: ' + (err.response?.data?.message || 'Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal-close" onClick={onClose}>&times;</button>
        <h3 className="fw-bold mb-3">Book Your Adventure</h3>

        {/* Tour Summary */}
        <div className="tour-summary card mb-4">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={tour.image} alt={tour.title} className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{tour.title}</h5>
                <p className="card-text text-muted">{tour.location}</p>
                <p className="card-text fw-bold text-success fs-5">Ksh {tour.price}</p>
              </div>
            </div>
          </div>
        </div>

        {user ? (
          <form onSubmit={handleBooking}>
            <p>Confirm your booking details below. Payment will be initiated via M-Pesa.</p>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">M-Pesa Phone Number</label>
              <input
                id="phone"
                type="tel"
                className="form-control"
                placeholder="e.g., 254712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
              {isLoading ? 'Processing...' : `Pay Ksh ${tour.price} & Book Now`}
            </button>
            {message && <p className={`mt-3 small ${message.includes('failed') ? 'text-danger' : 'text-success'}`}>{message}</p>}
          </form>
        ) : (
          <div className="text-center alert alert-warning">
            <h4>Please Log In</h4>
            <p>You need to be logged in to book a tour.</p>
            <button className="btn btn-primary" onClick={onLoginClick}>
              Login to Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;