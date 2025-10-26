import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card" data-aos="fade-up">
      <img src={tour.image} alt={tour.title} className="card-img-top" />
      <div className="card-body p-3">
        <h5 className="card-title fw-bold">{tour.title}</h5>
        <p className="card-text text-muted">{tour.location}</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-bold mb-0">${tour.price}</p>
          <Link to={`/tours/${tour._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;