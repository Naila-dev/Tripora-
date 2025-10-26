import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tripora/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      }
    };
    fetchTour();
  }, [id]);

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
          <button className="btn btn-success w-100 mt-3">Book Tour</button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
