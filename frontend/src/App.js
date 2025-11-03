// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const [activeModal, setActiveModal] = useState(null); // 'login', 'register', or null
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [tourForBooking, setTourForBooking] = useState(null);
  const location = useLocation();

  const openBookingModal = (tour) => {
    setTourForBooking(tour);
    setIsBookingOpen(true);
  };

  // Close all modals when navigating
  useEffect(() => {
    setActiveModal(null);
    setIsBookingOpen(false);
  }, [location]);

  return (
    <>
      <Navbar 
        onLoginClick={() => setActiveModal('login')}
        onRegisterClick={() => setActiveModal('register')}
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
      {(activeModal === 'login' || activeModal === 'register') && (
        <div className="auth-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            {activeModal === 'login' && <Login onSwitchToRegister={() => setActiveModal('register')} onSuccess={() => setActiveModal(null)} />}
            {activeModal === 'register' && <Register onSwitchToLogin={() => setActiveModal('login')} onSuccess={() => setActiveModal(null)} />}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && tourForBooking && (
        <BookingModal
          tour={tourForBooking}
          onClose={() => setIsBookingOpen(false)}
          onLoginClick={() => { setIsBookingOpen(false); setActiveModal('login'); }}
        />
      )}
    </>
  );
}

export default App;
