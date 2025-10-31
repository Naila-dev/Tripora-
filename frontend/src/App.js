// frontend/src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TourList from "./pages/ToursList";
import SingleTour from "./pages/SingleTour";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import Tours from "./pages/Tours";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/global.css";
import AdminLogin from "./pages/AdminLogin";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tours/:id" element={<SingleTour />} />
        <Route path="/tours-list" element={<TourList />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
