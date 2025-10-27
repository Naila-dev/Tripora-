import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaBars, FaPlaneDeparture } from "react-icons/fa";
import "./Navbar.css"; // Create separate CSS for navbar styling

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar site-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="logo d-flex align-items-center gap-2">
          <FaPlaneDeparture size={26} />
          <NavLink to="/" className="logo-text text-decoration-none">
            Tripora<span>Tours</span>
          </NavLink>
        </div>

        {/* Desktop menu */}
        <nav className="d-none d-lg-block">
          <ul className="nav-list d-flex align-items-center gap-4">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/tours">Tours</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><button onClick={onRegisterClick} className="nav-btn">Register</button></li>
            <li><button onClick={onLoginClick} className="nav-btn">Login</button></li>
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button className="mobile-toggle d-lg-none" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </div>

      {/* Mobile menu */}
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
            <li>
              <button
                onClick={() => { setMenuOpen(false); onRegisterClick(); }}
                className="nav-btn"
              >
                Register
              </button>
            </li>
            <li>
              <button
                onClick={() => { setMenuOpen(false); onLoginClick(); }}
                className="nav-btn"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
