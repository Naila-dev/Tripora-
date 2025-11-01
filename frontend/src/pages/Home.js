import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import api from "../api"; // Assuming api.js is in src/

// Home Page Component
const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Removed AOS to prevent reference error
  // useEffect(() => {
  //   AOS.init({ duration: 1000 });
  // }, []);

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,       // show 3 tours at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return ( // This should be inside HomePage
    <div className="homepage">
      {/* Hero Section */}
      <section
        className="hero"
      >
  <img
    src={`${process.env.PUBLIC_URL}/images/hero1.jpeg`}
    alt="Hero"
    className="hero-image"
  />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Adventure Tours for the Bold Traveler</h1>
          <p>
            Explore curated tours and travel packages worldwide.
          </p>
          <div className="hero-search">
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
    <section className="featured-tours py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-success">Featured Tours</h2>
        {filteredTours && filteredTours.length > 0 ? (
          <Slider {...settings}>
            {filteredTours.slice(0, 6).map((tour) => (
              <div key={tour._id} className="p-3">
                <div className="card h-100 shadow-sm">
                  <img
                    src={tour.image || "https://via.placeholder.com/300x200"}
                    className="card-img-top"
                    alt={tour.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{tour.title}</h5>
                    <p className="card-text text-muted">{tour.location}</p>
                    <p className="card-text fw-bold text-success">Ksh {tour.price}</p>
                    <NavLink to={`/tours/${tour._id}`} className="btn btn-primary btn-sm">
                      View Details
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center">Loading featured tours...</p>
        )}
      </div>
    </section>

{/* services section */}

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
        src={`${process.env.PUBLIC_URL}/images/picnicdate.jpg`}
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
          <h3>1K+</h3>
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
          <h3>2+</h3>
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
                <img src={`${process.env.PUBLIC_URL}/images/testimonial1.jpeg`} alt="Traveler 1" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Tripora made my vacation seamless and unforgettable."</p>
                <h6 className="fw-bold mt-3">— Sarah M., USA</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src={`${process.env.PUBLIC_URL}/images/testimonial2.jpeg`} alt="Traveler 2" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Best travel company I've ever used! Professional and fun."</p>
                <h6 className="fw-bold mt-3">— Daniella Kariuki, Kenya</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src={`${process.env.PUBLIC_URL}/images/familia.jpeg`} alt="Traveler 3" className="rounded-circle mb-3" width="100" height="100" />
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
                <img src={`${process.env.PUBLIC_URL}/images/migration.jpeg`} className="img-fluid rounded-top" alt="Travel Tips" />
                <div className="blog-content">
                  <h5>Travel Tips for Africa</h5>
                  <p>Essential advice to make your African adventures smooth and memorable.</p>
                  <NavLink to="/" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="blog-card">
                <img src={`${process.env.PUBLIC_URL}/images/sailboat-9597523_1280.jpg`} className="img-fluid rounded-top" alt="Top Destinations" />
                <div className="blog-content">
                  <h5>Top Destinations 2025</h5>
                  <p>Explore trending travel spots that should be on your bucket list this year.</p>
                  <NavLink to="/" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="blog-card">
                <img src={`${process.env.PUBLIC_URL}/images/tourist-carrying-luggage.jpg`} className="img-fluid rounded-top" alt="Packing Essentials" />
                <div className="blog-content">
                  <h5>Packing Essentials</h5>
                  <p>Smart packing tips to help you travel light and stress-free anywhere.</p>
                  <NavLink to="/" className="btn btn-primary btn-sm">Read More</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <button onClick={scrollToTop} className="back-to-top-btn">
  ↑ {/* or <FaArrowUp /> if using react-icons */}
</button>

    </div>
  );
};

export default HomePage;
