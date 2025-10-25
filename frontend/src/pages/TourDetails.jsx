import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tours/${id}`)
      .then(res => setTour(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!tour) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container mt-5">
      <img src={tour.image} className="img-fluid mb-4" alt={tour.title} />
      <h2>{tour.title}</h2>
      <p><strong>Location:</strong> {tour.location}</p>
      <p><strong>Price:</strong> ${tour.price}</p>
      <p>{tour.description}</p>
      <button className="btn btn-success">Book Now</button>
    </div>
  );
}

export default TourDetail;
    at Mongoose.connect (D:\End_Project1\tripora\backend\node_modules\mongoose\lib\mongoose.js:450:15)
    at Object.<anonymous> (D:\End_Project1\tripora\backend\server.js:14:10)
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Make sure this is at the top

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// In your main server logic, call connectDB
connectDB();

// ... rest of your server setup (Express, routes, etc.)
