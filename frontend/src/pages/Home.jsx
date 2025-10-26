import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlaneDeparture, FaSearch } from "react-icons/fa";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import TourCard from "../components/TourCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage] = useState(6);

  useEffect(() => {
    AOS.init({ duration: 1000 });


    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/tripora/tours");
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current tours
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div id="home-section" className="site-wrap">
      <header className={`navbar site-navbar site-navbar-target ${scrolled ? "scrolled" : ""}`} role="banner">
        <div className="container">
          <div className="row align-items-center position-relative">
            <div className="col-3">
              <div className="site-logo d-flex align-items-center gap-2">
                <FaPlaneDeparture size={28} color="#0d6efd" />
                <a
                  href="/"
                  className="logo-text text-decoration-none"
                >
                  Tripora
                </a>
              </div>
            </div>
            <div className="col-9 text-right">
              <nav
                className="site-navigation text-right ml-auto d-none d-lg-block"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav ml-auto">
                  <li className="active"><a href="/" className="nav-link">Home</a></li>
                  <li><a href="/about" className="nav-link">About</a></li>
                  <li><a href="/trips" className="nav-link">Trips</a></li>
                  <li><a href="/blog" className="nav-link">Blog</a></li>
                  <li><a href="/contact" className="nav-link">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    <section
  className="hero text-center d-flex align-items-center justify-content-center"
  style={{ 
    background: "url('/images/hero2.jpg') center/cover no-repeat",
    height: "80vh",
    position: "relative"
  }}
>
  <div className="overlay"></div>
  <div className="content text-white">
    <h1 className="display-4 fw-bold" data-aos="fade-up">
      Discover Your Next Adventure
    </h1>
    <p className="lead" data-aos="fade-up" data-aos-delay="100">
      Book amazing tours and travel packages worldwide
    </p>
    <div
      className="search-form-wrap"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search for a destination..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <a href="#tours" className="btn btn-primary">
        Search
      </a>
    </div>
  </div>
</section>

    {/* Highlights */}
    <section className="highlights container">
      <h2>Popular Tours</h2>
      {loading ? (
        <p>Loading tours...</p>
      ) : (
        <div className="tours-grid">
          {currentTours.length > 0 ? (
            currentTours.map((tour) => <TourCard key={tour._id} tour={tour} />)
          ) : (
            <div className="no-tours-found">
              <FaSearch size={50} className="text-muted mb-3" />
              <h4 className="mt-3">No Tours Found</h4>
              <p className="text-muted">
                We couldn't find any tours matching your search. Try a
                different keyword.
              </p>
              <button className="btn btn-outline-primary mt-2" onClick={() => setSearchTerm("")}>Clear Search</button>
            </div>
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
    {/* Testimonials */}
    <section className="testimonials">
      <h2>What Our Travelers Say</h2>
      <p>“Tripora made my vacation seamless and memorable!”</p>
    </section>
    {/* Footer */}
    <footer className="site-footer bg-light">
      <div className="container text-center pt-5">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} All rights reserved | Made with{" "}
          <i className="icon-heart text-danger" aria-hidden="true"></i> by{" "}
          <a href="https://colorlib.com" target="_blank" rel="noreferrer">
            Colorlib
          </a>
        </p>
      </div>
    </footer>
    </div>
  );
};

export default HomePage;
