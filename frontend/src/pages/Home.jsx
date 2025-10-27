import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaTimes } from "react-icons/fa";
import { FaPlaneDeparture, FaBars, FaArrowUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import TourCard from "../components/TourCard";
import "./FeaturedTours.css";
import api from "../api";
import { NavLink } from "react-router-dom";

// Home Page Component
const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Handle scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await api.get("/tours");
        setTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = tours.filter(
    (tour) =>
      tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AuthModals = ({ isLoginOpen, isRegisterOpen, onClose }) => (
  <>
    {isLoginOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Login</h3>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )}
    {isRegisterOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Register</h3>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )}
  </>
);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="homepage">
      {/* Navbar */}
      <header className={`navbar site-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo d-flex align-items-center gap-2">
            <FaPlaneDeparture size={26} />
            <NavLink to="/" className="logo-text text-decoration-none">
              Tripora<span>Tours</span>
            </NavLink>
          </div>
          <nav className="d-none d-lg-block">
            <ul className="nav-list d-flex align-items-center gap-4">
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/tours">Tours</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li><button onClick={() => setIsRegisterOpen(true)} className="nav-btn">Register</button></li>
              <li><button onClick={() => setIsLoginOpen(true)} className="nav-btn">Login</button></li>
            </ul>
          </nav>
          <button className="mobile-toggle d-lg-none" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
        </div>
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
              <li><button onClick={() => { setMenuOpen(false); setIsRegisterOpen(true); }} className="nav-btn">Register</button></li>
              <li><button onClick={() => { setMenuOpen(false); setIsLoginOpen(true); }} className="nav-btn">Login</button></li>
            </ul>
          </div>
        )}
      </header>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero1.jpeg)`,
        }}
      >
        <div className="hero-content">
          <h1 data-aos="fade-up">Adventure Tours for the Bold Traveler</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            Explore curated tours and travel packages worldwide.
          </p>
          <div className="hero-search" data-aos="fade-up" data-aos-delay="200">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </section>

      {/* Featured Tours Carousel */}
      <section className="featured-carousel py-4">
        <div className="container">
          {filteredTours && filteredTours.length > 0 ? (
            <div id="featuredToursCarousel">
              <div className="carousel-track">
                {filteredTours.slice(0, 12).map((tour, index) => (
                  <div key={tour._id} className="carousel-item">
                    <TourCard tour={tour} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">No featured tours available.</p>
          )}
        </div>
      </section>

      <style>{`
        /* --- Efficient CSS-based Carousel --- */
        #featuredToursCarousel {
          overflow: hidden; /* Hide the parts of the track that are off-screen */
          position: relative;
          width: 100%;
        }
        .carousel-track {
          display: flex;
          gap: 1rem; /* Creates space between cards */
          /* The magic: an infinite linear animation */
          animation: scroll 40s linear infinite;
        }
        /* Pause the animation on hover for better UX */
        #featuredToursCarousel:hover .carousel-track {
          animation-play-state: paused;
        }
        /* Define the scrolling animation */
        @keyframes scroll {
          0% { transform: translateX(0); }
          /* Scroll by the width of 6 cards (250px card + 1rem gap) */
          100% { transform: translateX(calc(-266px * 6)); }
        }
        .carousel-item {
          flex-shrink: 0; /* Prevent cards from shrinking */
          width: 250px; /* Define a fixed width for each card */
        }
        @media (max-width: 768px) {
          .carousel-item {
            width: 80%; /* Use a percentage for smaller screens */
          }
        }
      `}</style>

      <button
        onClick={scrollToTop}
        className="scroll-top-btn"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#198754",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          cursor: "pointer",
        }}
      >
        <FaTimes />
      </button> {/* This seems to be a scroll-to-top button, but it's outside the main div. Let's move it. */}
    

      <section className="services-section py-5">
  <div className="container text-center">
    <h2 className="mb-4 fw-bold text-success">Our Services</h2>
    <div className="row">
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="service-card">
          <i className="bi bi-geo-alt-fill service-icon"></i>
          <h5>Top Destinations</h5>
          <p>Explore breathtaking destinations curated for every traveler.</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="service-card">
          <i className="bi bi-calendar-check service-icon"></i>
          <h5>Custom Tours</h5>
          <p>Tailor-made tours designed to suit your preferences.</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="service-card">
          <i className="bi bi-people-fill service-icon"></i>
          <h5>Group Packages</h5>
          <p>Enjoy special rates for families, friends, or corporate retreats.</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="service-card">
          <i className="bi bi-headset service-icon"></i>
          <h5>24/7 Support</h5>
          <p>We’re always available to assist you during your journey.</p>
        </div>
      </div>
    </div>
  </div>
</section>



{/*  about section */}
      <section className="about-preview py-4 bg-light">
  <div className="container d-flex flex-column flex-md-row align-items-center">
    <div className="col-md-6 mb-4 mb-md-0">
      <h2 className="fw-bold mb-3 text-success">About Tripora</h2>
      <p>
        We believe travel should inspire, educate, and connect. At Tripora, we 
        craft immersive experiences that let you explore the world with purpose 
        and comfort.
      </p>
      <a href="/about" className="btn-about">Read More</a>
    </div>
    <div className="col-md-6 text-center">
      <img src="/images/view1.jpg" alt="About Tripora" className="img-fluid rounded shadow height='400px' width='400px' "/>
    </div>
  </div>
</section>


<section className="why-choose-us text-center py-5">
  <div className="container">
    <h2 className="mb-5 fw-bold text-success">Why Choose Tripora</h2>
    <div className="row">
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="stat-card">
          <h3>10K+</h3>
          <p>Happy Travelers</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="stat-card">
          <h3>50+</h3>
          <p>Global Destinations</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="stat-card">
          <h3>11/2+</h3>
          <p>Years of Experience</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-6 mb-4">
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Customer Support</p>
        </div>
      </div>
    </div>
  </div>
</section>


   {/* Testimonials */}
      <section className="testimonials py-5 text-center">
        <div className="container">
          <h2 className="mb-4 fw-bold">What Our Travelers Say</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/testimonial1.jpeg" alt="Traveler 1" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Tripora made my vacation seamless and unforgettable."</p>
                <h6 className="fw-bold mt-3">— Sarah M., USA</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src="/images/testimonial2.jpeg" alt="Traveler 2" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Best travel company I've ever used! Professional and fun."</p>
                <h6 className="fw-bold mt-3">— Daniel K., Kenya</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src="/images/familia.jpeg" alt="Traveler 3" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Every detail was perfectly planned. Highly recommend Tripora!"</p>
                <h6 className="fw-bold mt-3">— Amina R., Canada</h6>
                <div className="stars">★★★★★</div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Blog Highlights */}
      <section className="blog-section py-5">
        <div className="container text-center">
          <h2 className="blog-title mb-5">
            Latest From Our <span>Blog</span>
          </h2>

          <div className="row g-4">
            <div className="col-md-4 col-sm-6">
              <div className="blog-card">
                <img src="/images/aboutp1.jpg" className="img-fluid rounded-top" alt="Travel Tips" />
                <div className="blog-content">
                  <h5>Travel Tips for Africa</h5>
                  <p>Essential advice to make your African adventures smooth and memorable.</p>
                  <NavLink to="/blog" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="blog-card">
                <img src="/images/aboutp1.jpg" className="img-fluid rounded-top" alt="Top Destinations" />
                <div className="blog-content">
                  <h5>Top Destinations 2025</h5>
                  <p>Explore trending travel spots that should be on your bucket list this year.</p>
                  <NavLink to="/blog" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="blog-card">
                <img src="/images/aboutp1.jpg" className="img-fluid rounded-top" alt="Packing Essentials" />
                <div className="blog-content">
                  <h5>Packing Essentials</h5>
                  <p>Smart packing tips to help you travel light and stress-free anywhere.</p>
                  <NavLink to="/blog" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     <footer className="footer text-center text-md-start py-4">
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-3">
        <h5 className="text-success fw-bold">Tripora</h5>
        <p>Your trusted partner for unforgettable adventures.</p>
      </div>
      <div className="col-md-4 mb-3">
        <h6>Quick Links</h6>
        <ul className="list-unstyled">
          <li><NavLink to="/" className="footer-link">Home</NavLink></li>
          <li><NavLink to="/tours" className="footer-link">Tours</NavLink></li>
          <li><NavLink to="/blog" className="footer-link">Blog</NavLink></li>
          <li><NavLink to="/about" className="footer-link">About</NavLink></li>
          <li><NavLink to="/contact" className="footer-link">Contact</NavLink></li>
        </ul>
      </div>
      <div className="col-md-4 mb-3">
        <h6>Contact</h6>
        <p>Email: info@tripora.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
      </div>
    </div>
    <hr />
    <p className="mb-0 text-center">&copy; {new Date().getFullYear()} Tripora. All rights reserved.</p>
  </div>
</footer>
      <button
        onClick={scrollToTop}
        className={`back-to-top-btn ${scrolled ? "visible" : ""}`}
      >
        <FaArrowUp />
      </button>

  {/* Existing sections below (Services, About, Why Choose Us, Testimonials, Blog, Footer) */}
      {/* Your original code for these sections remains unchanged */}

      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onClose={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(false);
        }}
      />
    </div>
  );
};

export default HomePage;
