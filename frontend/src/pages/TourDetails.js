// frontend/src/pages/TourDetails.js
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import BookingForm from '../components/Bookings';

export default function TourDetailsPage() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchTour = async () => {
            const res = await axios.get(`http://localhost:5000/tripora/tours/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setTour(res.data);
        };
        fetchTour();
    }, [id, token]);

    if (!tour) return <p>Loading...</p>;

    return (
        <div>
            <h2>{tour.title}</h2>
            <p>{tour.description}</p>
            <p>Location: {tour.location}</p>
            <p>Duration: {tour.duration}</p>
            <p>Price: ${tour.price}</p>
            {token && <BookingForm tourId={tour._id} />}
        </div>
    );
}
