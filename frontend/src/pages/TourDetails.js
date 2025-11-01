// frontend/src/pages/TourDetails.js
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import API from '../api'; // centralized API
import { AuthContext } from '../context/AuthContext';
import BookingForm from './BookingForm'; // corrected import

export default function TourDetails() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await API.get(`/tours/${id}`); // token auto-added
                setTour(res.data);
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };
        fetchTour();
    }, [id]);

    if (!tour) return <p>Loading...</p>;

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8">
                    <img 
                        src={tour.image || 'https://via.placeholder.com/800x500'} 
                        alt={tour.title} 
                        className="img-fluid rounded shadow-lg mb-4"
                    />
                    <h1 className="fw-bold mb-3">{tour.title}</h1>
                    <p className="lead text-muted">{tour.description}</p>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title fw-bold">Tour Details</h4>
                            <hr />
                            <p><strong>Location:</strong> {tour.location}</p>
                            <p><strong>Duration:</strong> {tour.duration}</p>
                            <h3 className="fw-bold text-success my-3">Price: ${tour.price}</h3>
                            <hr />
                            {token ? (
                                <BookingForm tourId={tour._id} />
                            ) : (
                                <div className="alert alert-warning">
                                    Please <Link to="/login">log in</Link> to book this tour.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
