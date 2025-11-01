// frontend/src/pages/ToursList.js
import { useState, useEffect } from 'react';
import API from '../api';
import TourCard from '../components/TourCard'; // Import the TourCard component

export default function TourList() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await API.get('/tours'); // token auto-added
                setTours(res.data);
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };
        fetchTours();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">All Tours</h2>
            <div className="row">
                {tours.length === 0 ? (
                    <p className="text-center">No tours available.</p>
                ) : (
                    tours.map(tour => <TourCard key={tour._id} tour={tour} />)
                )}
            </div>
        </div>
    );
}
