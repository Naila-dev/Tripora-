// frontend/src/pages/ToursList.js
import React, { useEffect, useState } from "react";
import API from "../api";
import TourCard from "../components/TourCard";

const ToursList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await API.get("/tours");
        setTours(data);
      } catch (error) {
        console.error("Error loading tours:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <section className="container py-5">
      <h2 className="fw-bold text-center mb-5 text-success">Explore Our Tours</h2>
      <div className="row">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <p className="text-center text-muted">No tours available</p>
        )}
      </div>
    </section>
  );
};

export default ToursList;
