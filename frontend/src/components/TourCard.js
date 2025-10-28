import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  if (!tour) return null;

  // Ensure consistent image path
  const imgSrc = tour.image
    ? `/tripora/images/${tour.image.replace(/^images[\\/]/, "")}`
    : "/tripora/images/default.jpg";

  return (
    <div className="tour-card card h-100 shadow-sm" data-aos="fade-up">
      <img
        src={imgSrc}
        alt={tour.title || "Tour image"}
        className="card-img-top"
        style={{ objectFit: "cover", height: "200px" }}
        onError={(e) => {
          e.target.src = "/tripora/images/default.jpg";
        }}
      />

      <div className="card-body d-flex flex-column justify-content-between p-3">
        <div>
          <h5 className="card-title fw-bold text-truncate">
            {tour.title || "Untitled Tour"}
          </h5>
          <p className="card-text text-muted mb-2">
            {tour.location || "Unknown Location"}
          </p>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-bold text-success mb-0">
            ${tour.price || "N/A"}
          </p>
          <div className="d-flex gap-2">
            <Link to={`/tours/${tour._id}`} className="btn btn-outline-primary btn-sm">
              View
            </Link>
            <Link to={`/booking/${tour._id}`} className="btn btn-success btn-sm">
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
