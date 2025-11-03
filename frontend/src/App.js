// frontend/src/App.js
import React, { useState, useEffect } from "react";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/global.css";
import "./styles/authModal.css"; // Ensure modal styles are global
import AdminLogin from "./pages/AdminLogin";
import BookingModal from "./components/BookingModal";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [tourForBooking, setTourForBooking] = useState(null);

  const openBookingModal = (tour) => {
    setTourForBooking(tour);
    setIsBookingOpen(true);
  };

  // Close all modals when navigating
  useEffect(() => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsBookingOpen(false);
  }, [Route]);

  return (
    <>
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tours/:id" element={<TourDetails onBookNowClick={openBookingModal} />} />
        <Route path="/tour-card" element={<TourCard />} />
        <Route path="/tours-list" element={<TourList />} />
        <Route path="/tour-form" element={<TourForm />} />
        <Route path="/login/admin" element={<AdminLogin />} />
      </Routes>
      <Footer />

      {/* Authentication Modals */}
      {(isLoginOpen || isRegisterOpen) && (
        <div className="auth-modal-overlay" onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(false); }}>
          <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(false); }}>&times;</button>
            {isLoginOpen && <Login onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} onSuccess={() => setIsLoginOpen(false)} />}
            {isRegisterOpen && <Register onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} onSuccess={() => setIsRegisterOpen(false)} />}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && tourForBooking && (
        <BookingModal
          tour={tourForBooking}
          onClose={() => setIsBookingOpen(false)}
          onLoginClick={() => { setIsBookingOpen(false); setIsLoginOpen(true); }}
        />
      )}
    </>
  );
}

export default App;
