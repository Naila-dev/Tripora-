// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react"; // useState will be used by other hooks
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaArrowUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import TourCard from "../components/TourCard";
import AuthModals from "../components/AuthModals";
import "./FeaturedTours.css";
import api from "../api";
import { NavLink } from "react-router-dom";

// Home Page Component
const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

  // Featured Tours Carousel Auto-Slide Effect
  useEffect(() => {
    const carouselElement = document.getElementById('featuredToursCarousel');
    if (!carouselElement || filteredTours.length === 0) return;

    const carouselInner = carouselElement.querySelector('.carousel-inner');
    if (!carouselInner) return;

    let intervalId;

    const setupCarousel = () => {
      
      // Initialize Bootstrap Carousel (even if we manually control sliding)

      // new bootstrap.Carousel(carouselElement, {
      //   interval: false, // We will handle sliding manually
      //   wrap: false,
      // });

      const firstCard = carouselInner.querySelector('.carousel-item');
      if (!firstCard) return;

      // Calculate card width including margin/gap (assuming 1rem = 16px)
      const cardStyle = window.getComputedStyle(firstCard);
      const cardWidth = firstCard.offsetWidth + parseFloat(cardStyle.marginRight);
      
      if (cardWidth === 0) return; // Exit if the card has no width yet

      let scrollPosition = 0;
      const totalContentWidth = carouselInner.scrollWidth;
      const visibleWidth = carouselInner.offsetWidth;

      // Only start auto-slide if there are more cards than can fit in view
      if (totalContentWidth <= visibleWidth) return;

      const slide = () => {
        scrollPosition += cardWidth;
        // If we've scrolled past the end, reset to 0
        // The condition ensures we loop smoothly without showing empty space
        if (scrollPosition >= totalContentWidth - visibleWidth + cardWidth) {
          scrollPosition = 0;
        }
        carouselInner.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      };

      intervalId = setInterval(slide, 3000);
    };

    // Use a small timeout to ensure elements are rendered and have dimensions
    const timeoutId = setTimeout(setupCarousel, 100);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [filteredTours]); // Re-run if filteredTours changes

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className="hero"
      >
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={`${process.env.PUBLIC_URL}/images/herovideo.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
            <div id="featuredToursCarousel" className="carousel slide">
              <div className="carousel-inner">
                {filteredTours.slice(0, 12).map((tour, index) => (
                  <div key={tour._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
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
        #featuredToursCarousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 1rem;
        }
        #featuredToursCarousel::-webkit-scrollbar {
          display: none;
        }
        .carousel-item {
          flex: 0 0 calc(100% / 3 - 1rem);
          scroll-snap-align: start;
        }
        @media (max-width: 768px) {
          .carousel-item {
            flex: 0 0 90%;
          }
        }
      `}</style>

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



{/* About section */}
<section className="about-preview py-4 bg-light">
  <div className="container d-flex flex-column flex-md-row align-items-center">
    
    <div
      className="col-md-6 mb-4 mb-md-0 d-flex flex-column justify-content-center text-white"
      style={{ backgroundColor: "#f9f9f9", padding: "50px", borderRadius: "4px" }}
    >
      <h2 className="fw-bold mb-3">About Tripora</h2>
      <p>
        We believe travel should inspire, educate, and connect. At Tripora, we
        craft immersive experiences that let you explore the world with purpose
        and comfort.
      </p>
      <a href="/about" className="btn-about bg-light text-success">
        Read More
      </a>
    </div>

    <div className="col-md-6 text-center">
      <img
        src={`${process.env.PUBLIC_URL}/images/view1.jpg`}
        alt="About Tripora"
        className="img-fluid rounded shadow"
        style={{ height: "400px", objectFit: "cover" }}
      />
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
                <img src={`${process.env.PUBLIC_URL}/images/testimonial1.jpg`} alt="Traveler 1" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Tripora made my vacation seamless and unforgettable."</p>
                <h6 className="fw-bold mt-3">— Sarah M., USA</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src={`${process.env.PUBLIC_URL}/images/testimonial2.jpg`} alt="Traveler 2" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Best travel company I've ever used! Professional and fun."</p>
                <h6 className="fw-bold mt-3">— Daniel K., Kenya</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src={`${process.env.PUBLIC_URL}/images/testimonial3.jpg`} alt="Traveler 3" className="rounded-circle mb-3" width="100" height="100" />
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
                <img src={`${process.env.PUBLIC_URL}/images/aboutp1.jpg`} className="img-fluid rounded-top" alt="Travel Tips" />
                <div className="blog-content">
                  <h5>Travel Tips for Africa</h5>
                  <p>Essential advice to make your African adventures smooth and memorable.</p>
                  <NavLink to="/blog" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="blog-card">
                <img src={`${process.env.PUBLIC_URL}/images/aboutp1.jpg`} className="img-fluid rounded-top" alt="Top Destinations" />
                <div className="blog-content">
                  <h5>Top Destinations 2025</h5>
                  <p>Explore trending travel spots that should be on your bucket list this year.</p>
                  <NavLink to="/blog" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="blog-card">
                <img src={`${process.env.PUBLIC_URL}/images/aboutp1.jpg`} className="img-fluid rounded-top" alt="Packing Essentials" />
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

      <button
        onClick={scrollToTop} className="back-to-top-btn" > <FaArrowUp /> </button>

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
