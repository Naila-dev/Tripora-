// frontend/src/pages/Tours.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours");
        setTours(res.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-success">Our Tours</h2>
      <div className="row">
        {tours.map((tour) => {
          const imgSrc = tour.image || "/images/default.jpg"; // Load from public folder
          return (
            <div key={tour._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={imgSrc}
                  alt={tour.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-success">{tour.title}</h5>
                  <p className="card-text text-muted">{tour.location}</p>
                  <p className="card-text small">{tour.description}</p>
                  <p className="fw-bold">Price: ${tour.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tours;

