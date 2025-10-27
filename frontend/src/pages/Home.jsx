import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlaneDeparture, FaBars, FaTimes, FaArrowUp, FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import "./FeaturedTours.css";
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
    (tour) =>
      tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="homepage">
     <header className={`navbar site-navbar ${scrolled ? "scrolled" : ""}`}>
  <div className="container d-flex justify-content-between align-items-center">

    {/* Logo */}
    <div className="logo d-flex align-items-center gap-2">
      <FaPlaneDeparture size={26} />
      <NavLink to="/" className="logo-text text-decoration-none">
        Tripora<span>Tours</span>
      </NavLink>
    </div>

    {/* Desktop Nav */}
    <nav className="d-none d-lg-block">
      <ul className="nav-list d-flex align-items-center gap-4">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/tours">Tours</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/register" className="nav-btn">Register</NavLink></li>
        <li><NavLink to="/login" className="nav-btn">Login</NavLink></li>
      </ul>
    </nav>

    {/* Mobile Menu Toggle */}
    <button className="mobile-toggle d-lg-none" onClick={() => setMenuOpen(!menuOpen)}>
      <FaBars />
    </button>
  </div>

  {/* Mobile Menu */}
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
        <li><NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink></li>
        <li><NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
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

      {/* Tour Listings */}
      <section className="tours-section">
        <div className="container">
          {loading ? (
            <p>Loading tours...</p>
          ) : (
            <>
              <div className="row">
                {currentTours.map((tour) => (
                  <div key={tour._id} className="col-md-4">
                    <div className="tour-card">
                      <img src={`/images/${tour.image}`} alt={tour.name} />
                      <div className="card-body">
                        <h5>{tour.name}</h5>
                        <p>{tour.description}</p>
                        <span className="price">${tour.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <div className="pagination">
                  {Array.from({ length: Math.ceil(filteredTours.length / toursPerPage) }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`btn btn-outline-primary mx-1 ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* USPs / Value Proposition */}
      <section className="usp-section py-5 text-center">
        <div className="container">
          <h2 className="usp-title mb-5">Why Travelers Love <span>Tripora</span></h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4 col-sm-6">
              <div className="usp-card">
                <i className="bi bi-globe2 icon"></i>
                <h5>Authentic Experiences</h5>
                <p>Travel with local guides who bring destinations to life.</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="usp-card">
                <i className="bi bi-calendar-check icon"></i>
                <h5>Hassle-Free Booking</h5>
                <p>Instant confirmations and smooth itinerary management.</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="usp-card">
                <i className="bi bi-stars icon"></i>
                <h5>Exclusive Access</h5>
                <p>Discover hidden gems and premium experiences unavailable elsewhere.</p>
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
                <img src="/images/testimonial1.jpg" alt="Traveler 1" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Tripora made my vacation seamless and unforgettable."</p>
                <h6 className="fw-bold mt-3">— Sarah M., USA</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src="/images/testimonial2.jpg" alt="Traveler 2" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Best travel company I've ever used! Professional and fun."</p>
                <h6 className="fw-bold mt-3">— Daniel K., Kenya</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src="/images/testimonial3.jpg" alt="Traveler 3" className="rounded-circle mb-3" width="100" height="100" />
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