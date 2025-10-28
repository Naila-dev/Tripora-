// frontend/src/pages/Tours.jsx
import { useEffect, useState } from "react";
import TourCard from "../components/TourCard";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get("/tours");
        setTours(res.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTours();
  }, []);

  
  if (loading) return <p className="text-center mt-5">Loading tours...</p>;

  return (
    <div className="container py-4" style={{ paddingTop: '120px' }}>
      <h2 className="text-center mb-4">Available Tours</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <p>No tours available.</p>
        )}
      </div>
    </div>
  );
};

export default Tours;
