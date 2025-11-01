// frontend/src/App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TourList from "./pages/ToursList";
import TourForm from "./pages/TourForm";
import TourDetails from "./pages/TourDetails";
import TourCard from "./components/TourCard";
import Home from "./pages/Home";
import About from "./pages/About";
import BlogPage from "./pages/Blog";
import Contact from "./pages/Contacts";
// import Tours from "./pages/Tours";
import Booking from "./pages/BookingForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/global.css";
import AdminLogin from "./pages/AdminLogin";
function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />
      <Routes>
        <Route path="/" element={<Home isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/tours" element={<Tours />} /> */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/tour-card" element={<TourCard />} />
        <Route path="/tours-list" element={<TourList />} />
        <Route path="/tour-form" element={<TourForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
