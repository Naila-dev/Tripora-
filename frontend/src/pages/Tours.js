// // frontend/src/pages/Tours.js
// import React, { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';
// import api from "../api"; // Use the configured axios instance

// const Tours = () => {
//   const [tours, setTours] = useState([]);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const res = await api.get("/tours"); // Correctly call the /tours endpoint
//         setTours(res.data);
//       } catch (error) {
//         console.error("Error fetching tours:", error);
//       }
//     };
//     fetchTours();
//   }, [useLocation()]); // Re-fetch when the page location changes

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 fw-bold text-success">Our Tours</h2>
//       <div className="row">
//         {tours.map((tour) => {
//           // Simplify image source logic. Assume tour.image is a full URL.
//           // The onError handler will catch broken links.
//           const defaultImg = `${process.env.PUBLIC_URL}/images/default.jpg`;
//           return (
//             <div key={tour._id} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-sm border-0">
//                 <img
//                   src={tour.image || defaultImg}
//                   alt={tour.title}
//                   className="card-img-top"
//                   style={{ height: "250px", objectFit: "cover" }}
//                   onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title fw-bold text-success">{tour.title}</h5>
//                   <p className="card-text text-muted">{tour.location}</p>
//                   <p className="card-text small">{tour.description}</p>
//                   <p className="fw-bold">Price: ${tour.price}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Tours;
