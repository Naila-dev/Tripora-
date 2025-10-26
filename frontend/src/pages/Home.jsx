import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlaneDeparture, FaTwitter, FaFacebookF, FaInstagram, FaArrowUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import { FaBars, FaTimes } from "react-icons/fa";


import TourCard from "../components/TourCard";
import Pagination from "../components/Pagination";
import api from "../api";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await api.get("/tours");
        setTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = tours.filter(
    t =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="site-wrap">
      {/* Navigation */}
      <header className={`navbar site-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo d-flex align-items-center gap-2">
            <FaPlaneDeparture size={28} />
            <NavLink to="/" className="logo-text text-decoration-none">Tripora</NavLink>
          </div>
          <nav className="d-none d-lg-block">
            <ul className="nav-list d-flex gap-4">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/tours">Tours</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
          <button className="mobile-toggle d-lg-none" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu d-lg-none">
          <button onClick={() => setMenuOpen(false)} className="close-menu-btn">
            <FaTimes size={24} />
          </button>
          <ul>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
            <li><NavLink to="/tours" onClick={() => setMenuOpen(false)}>Tours</NavLink></li>
            <li><NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
          </ul>
        </div>
      )}

      {/* Hero */}
      <section
        className="hero d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: `url(/images/hero2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <div className="hero-content text-white">
          <h1 data-aos="fade-up">Adventure Tours for the Bold Traveler</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            Explore curated tours and travel packages worldwide.
          </p>
          <div className="hero-search mt-3" data-aos="fade-up" data-aos-delay="200">
            <input
              type="text"
              className="form-control"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary mt-2">Search</button>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="highlights container py-5">
        <h2 className="mb-4">Popular Tours</h2>
        {loading ? (
          <p>Loading tours...</p>
        ) : (
          <div className="row g-4">
            {currentTours.length > 0 ? (
              currentTours.map(t => <TourCard key={t._id} tour={t} />)
            ) : (
              <p>No tours found</p>
            )}
          </div>
        )}
        <Pagination
          toursPerPage={toursPerPage}
          totalTours={filteredTours.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </section>

      {/* USPs / Value Proposition */}
      <section className="usp py-5 bg-light text-center">
        <h2>Why Choose Tripora?</h2>
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <h5>Authentic Experiences</h5>
            <p>Travel with guides who know the culture and history intimately.</p>
          </div>
          <div className="col-md-4">
            <h5>Hassle-Free Booking</h5>
            <p>All logistics handled so you can focus on the adventure.</p>
          </div>
          <div className="col-md-4">
            <h5>Exclusive Access</h5>
            <p>Visit hidden gems and unique sites unavailable elsewhere.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5 text-center">
        <h2>What Our Travelers Say</h2>
        <p>“Tripora made my vacation seamless and memorable!”</p>
      </section>

      {/* Blog Highlights */}
      <section className="blog py-5 container">
        <h2>Latest From Our Blog</h2>
        <div className="row g-4 mt-3">
          <div className="col-md-4">
            <img src="/images/aboutp1.jpg" className="img-fluid rounded" alt="Blog post"/>
            <h5 className="mt-2">Travel Tips for Africa</h5>
          </div>
          <div className="col-md-4">
            <img src="/images/aboutp1.jpg" className="img-fluid rounded" alt="Blog post"/>
            <h5 className="mt-2">Top Destinations 2025</h5>
          </div>
          <div className="col-md-4">
            <img src="/images/aboutp1.jpg" className="img-fluid rounded" alt="Blog post"/>
            <h5 className="mt-2">Packing Essentials</h5>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Tripora</h5>
              <p>Your gateway to unforgettable adventures.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/tours">Tours</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <div className="d-flex gap-2">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white"><FaTwitter /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white"><FaFacebookF /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white"><FaInstagram /></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            &copy; {new Date().getFullYear()} Tripora. All rights reserved.
          </div>
        </div>
      </footer>

      {scrolled && (
        <button onClick={scrollToTop} className="back-to-top-btn">
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default HomePage;
