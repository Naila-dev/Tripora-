import { useEffect, useState } from "react";
import axios from "axios";
import TourCard from "../components/TourCard";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tripora/tours");
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
    <div className="container py-4">
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
