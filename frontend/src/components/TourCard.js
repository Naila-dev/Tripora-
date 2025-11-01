// frontend/src/components/TourCard.js
import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={tour.image || "/images/default-tour.jpg"}
        className="card-img-top"
        alt={tour.title}
        style={{ height: "220px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold">{tour.title}</h5>
        <p className="text-muted">{tour.location}</p>
        <p className="fw-bold text-success">Ksh {tour.price}</p>
        <div className="mt-auto">
          <Link to={`/tours/${tour._id}`} className="btn btn-outline-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
