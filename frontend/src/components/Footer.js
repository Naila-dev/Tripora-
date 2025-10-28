import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
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
            <p>Phone: +254 72123-4567</p>
            <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
          </div>
        </div>
        <hr />
        <p className="mb-0 text-center">&copy; {new Date().getFullYear()} Tripora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;