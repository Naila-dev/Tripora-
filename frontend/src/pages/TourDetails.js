// frontend/src/pages/TourDetails.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import API from '../api'; // centralized API

export default function TourDetails({ onBookNowClick }) {
    const { id } = useParams();
    const [tour, setTour] = useState(null);

    console.log('TourDetails received onBookNowClick:', onBookNowClick);

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
        <div className="tour-details-page">
            {/* Hero Image Section */}
            <section className="tour-hero" style={{ 
                backgroundImage: `url(${tour.image || 'https://via.placeholder.com/1200x500'})`,
                position: 'relative' // Ensure the overlay is contained
            }}>
                <div className="hero-overlay" style={{
                    position: 'absolute', // Position relative to the section
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}></div>
                <div className="hero-content text-white text-center">
                    <h1 className="display-4 fw-bold">{tour.title}</h1>
                    <p className="lead">{tour.location}</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        <h2 className="fw-bold mb-3">About the Tour</h2>
                        <p className="text-muted">{tour.description}</p>
                        {/* You can add more sections here like Itinerary, Highlights, etc. */}
                    </div>
                    <div className="col-lg-4">
                        <div className="booking-card card shadow-lg p-3 position-sticky" style={{ top: '100px' }}>
                            <div className="card-body text-center">
                                <h3 className="fw-bold text-success mb-3">Ksh {tour.price}</h3>
                                <p className="text-muted">per person</p>
                                <button 
                                    className="btn btn-primary btn-lg w-100" 
                                    onClick={() => onBookNowClick(tour)}
                                >
                                    Book Now
                                </button>
                                <hr className="my-4" />
                                <p className="small"><strong>Duration:</strong> {tour.duration}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
