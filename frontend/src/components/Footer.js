// frontend/src/components/Footer.js
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer py-5">
      <div className="container">
        <div className="row">

          {/* Left Section */}
          <div className="col-md-4 mb-4">
            <img
              src={`${process.env.PUBLIC_URL}./images/logo.png`}
              alt="Tripora Logo"
              className="footer-logo mb-2"
            />
            <h5 className="site-name">Tripora Tours</h5>
            <p className="tagline">
              Discover, Explore, Travel – Your Adventure Starts Here
            </p>
          </div>

          {/* Links Section */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              {/* <li><NavLink to="/tours">Tours</NavLink></li> */}
              <NavLink to="/tours-list">Tours</NavLink>
              {/* <li><NavLink to="/blog">Blog</NavLink></li> */}
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

        </div>

        <hr />

        <div className="row mt-3">
          <div className="col-md-6">
            <p>&copy; {new Date().getFullYear()} Tripora. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <NavLink to="/terms" className="footer-policy">Terms of Service</NavLink> | 
            <NavLink to="/privacy" className="footer-policy">Privacy Policy</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
