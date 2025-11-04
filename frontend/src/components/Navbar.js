import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css'; // Import the new CSS file

export default function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="navbar-container">
      {/* Left Side */}
      <NavLink to="/" className="navbar-brand">
        <img src="images/logo.png" alt="Tripora Logo" className="navbar-logo" />
        <span className="navbar-title">Tripora</span> Tours
      </NavLink>

      {/* Right Side */}
      <div className="navbar-right">
        <ul className="navbar-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>cd ba
          <li><NavLink to="/tours-list">Tours</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        <div className="navbar-auth">
          <button onClick={onLoginClick} className="btn btn-outline-success">Login</button>
          <button onClick={onRegisterClick} className="btn btn-success">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}