import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-0">
        <img
          src={tour.image || "/images/default-tour.jpg"}
          className="card-img-top"
          alt={tour.title}
          style={{ height: "220px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="fw-bold">{tour.title}</h5>
          <p className="text-muted">{tour.location}</p>
          <p className="fw-bold text-success">${tour.price}</p>
          <Link to={`/TourDetails/${tour._id}`} className="btn btn-outline-success btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
