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
            <h2 className="text-center mb-5 fw-bold text-success">All Our Tours</h2>
            <div className="row">
                {tours.length === 0 ? (
                    <p className="text-center">No tours available.</p>
                ) : (
                    tours.map(tour => (
                        <div key={tour._id} className="col-lg-4 col-md-6 mb-4">
                            <TourCard tour={tour} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
