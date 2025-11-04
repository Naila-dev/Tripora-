import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/navbar.css'; // Import the new CSS file

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const { user, logout } = useContext(AuthContext);
  const firstName = user?.name?.split(' ')[0];

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
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/tours-list">Tours</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        {user ? (
          <div className="navbar-auth">
            <span className="navbar-user-greeting">Hi, {firstName}</span>
            <button onClick={logout} className="btn btn-outline-success">Logout</button>
          </div>
        ) : (
          <div className="navbar-auth">
            <button onClick={onLoginClick} className="btn btn-outline-success">Login</button>
            <button onClick={onRegisterClick} className="btn btn-success">Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
}