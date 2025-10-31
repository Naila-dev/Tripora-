// frontend/src/pages/SingleTour.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const SingleTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await API.get(`/tours/${id}`);
        setTour(data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };
    fetchTour();
  }, [id]);

  if (!tour) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-5">
      <img
        src={tour.image || "/images/default-tour.jpg"}
        alt={tour.title}
        className="img-fluid rounded shadow mb-4"
        style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
      />
      <h2 className="fw-bold">{tour.title}</h2>
      <p className="text-muted">{tour.location}</p>
      <h5 className="text-success fw-bold">${tour.price}</h5>
      <p className="mt-3">{tour.description}</p>
    </div>
  );
};

export default SingleTour;
