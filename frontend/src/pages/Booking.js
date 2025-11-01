import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function BookingForm({ tourId }) {
    const { token } = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            // 1. Create booking in backend
            const bookingRes = await axios.post('http://localhost:5000/api/bookings', {
                tour: tourId
            }, { headers: { Authorization: `Bearer ${token}` } });

            // 2. Trigger M-Pesa payment
            const paymentRes = await axios.post('http://localhost:5000/api/payment', {
                amount:  bookingRes.data.tour?.price || 1000, // fallback
                phone
            }, { headers: { Authorization: `Bearer ${token}` } });

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
