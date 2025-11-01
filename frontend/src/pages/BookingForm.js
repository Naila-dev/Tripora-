// frontend/src/pages/Booking.js
import { useState } from 'react';
import API from '../api'; // ✅ centralized API

export default function BookingForm({ tourId }) {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            // 1. Create booking in backend
            const bookingRes = await API.post('/bookings', { tourId }); // token auto-added

            // 2. Trigger M-Pesa payment
            await API.post('/payments', {
                amount: bookingRes.data.tour?.price || 1000,
                phone
            });
            // The paymentRes variable was unused, so we can just await the call.

            setMessage('Booking successful! Check your phone for M-Pesa prompt.');
        } catch (err) {
            console.error(err);
            setMessage('Booking failed: ' + err.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleBooking}>
            <h3>Book this tour</h3>
            <input 
                placeholder="Enter your phone number" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
            />
            <button type="submit">Book & Pay</button>
            {message && <p>{message}</p>}
        </form>
    );
}
