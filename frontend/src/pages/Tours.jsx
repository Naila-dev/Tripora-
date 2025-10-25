import React, { useEffect, useState } from "react";
import axios from "axios";

function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tours")
      .then(res => setTours(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Tours</h2>
      <div className="row">
        {tours.map(tour => (
          <div key={tour._id} className="col-md-4 mb-3">
            <div className="card h-100">
              <img src={tour.image || "https://via.placeholder.com/300"} className="card-img-top" alt={tour.title} />
              <div className="card-body">
                <h5>{tour.title}</h5>
                <p>{tour.location}</p>
                <p>${tour.price}</p>
                <a href={`/tours/${tour._id}`} className="btn btn-primary w-100">View</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tours;
