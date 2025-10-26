import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
    
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="about-hero"
        data-aos="fade-in"
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold" data-aos="fade-up">About Tripora</h1>
          <p className="lead">Discover our story, mission, and the people behind your adventures</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="container py-5">
        <h2 className="mb-4">Our Story</h2>
        <p>
          Tripora was founded out of a passion for travel and a frustration with the lack of authentic experiences available to tourists. Our mission is to connect travelers with meaningful adventures while supporting local communities and sustainable tourism.
        </p>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="mb-4">Mission, Vision & Values</h2>
          <p><strong>Mission:</strong> To provide unforgettable, hassle-free travel experiences worldwide.</p>
          <p><strong>Vision:</strong> To become the most trusted and innovative tour operator for global adventurers.</p>
          <p><strong>Core Values:</strong> Sustainability, authenticity, exceptional service, and cultural respect.</p>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="container py-5">
        <h2 className="mb-4">Meet the Team</h2>
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <img src="/images/team1.jpg" alt="Founder" className="team-member-img rounded-circle mb-3" />
            <h5>Jane Doe</h5>
            <p>Founder & CEO | Loves exploring remote destinations and sharing unique travel experiences.</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <img src="/images/team2.jpg" alt="Tour Guide" className="team-member-img rounded-circle mb-3" />
            <h5>John Smith</h5>
            <p>Lead Tour Guide | Passionate about wildlife and cultural immersion, guiding travelers to hidden gems.</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <img src="/images/team3.jpg" alt="Operations" className="team-member-img rounded-circle mb-3" />
            <h5>Emily Chen</h5>
            <p>Operations Manager | Ensures smooth experiences and top-notch customer support.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="mb-4">What Our Travelers Say</h2>
          <blockquote className="blockquote">
            <p>“Tripora made my vacation seamless and memorable! The guides were knowledgeable and the experiences were authentic.”</p>
            <footer className="blockquote-footer">Anna K., Traveler</footer>
          </blockquote>
          <blockquote className="blockquote mt-3">
            <p>“I loved every moment of my safari. Tripora exceeded my expectations in every way.”</p>
            <footer className="blockquote-footer">Mark R., Explorer</footer>
          </blockquote>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="container py-5">
        <h2 className="mb-4">Why Choose Tripora?</h2>
        <ul className="list-unstyled">
          <li>✔ Local guides for authentic experiences</li>
          <li>✔ Exclusive access to hidden destinations</li>
          <li>✔ Sustainable and responsible travel practices</li>
          <li>✔ Personalized itineraries for every traveler</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center py-5 bg-primary text-white">
        <h3>Ready to start your next adventure?</h3>
        <NavLink to="/tours" className="btn btn-light btn-lg mt-3">Explore Tours</NavLink>
      </section>

      {/* Footer */}
      <footer className="site-footer bg-dark text-white py-5">
        <div className="container text-center">
          <p>Follow us on social media</p>
          <div className="social-links mb-3">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2"><FaInstagram /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} Tripora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
