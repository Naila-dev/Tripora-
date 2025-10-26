import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../components/AuthContext";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await api.get(`/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      }
    };
    fetchTour();
  }, [id]);

  const handleBookNow = () => {
    if (isAuthenticated) {
      // User is logged in, proceed to booking page (we can build this next)
      alert(`Redirecting to booking page for ${tour.title}...`);
      // navigate(`/booking/${id}`);
    } else {
      // User is not logged in, redirect to login page
      navigate('/login', { state: { from: `/tours/${id}` } });
    }
  };

  if (!tour) return <p className="text-center mt-5">Loading tour details...</p>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={tour.image}
            alt={tour.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>{tour.title}</h2>
          <p className="text-muted">{tour.location}</p>
          <p>{tour.description}</p>
          <h4 className="text-success fw-bold">${tour.price}</h4>
          <p>Duration: {tour.duration}</p>
          <button className="btn btn-success w-100 mt-3" onClick={handleBookNow}>Book Tour</button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
