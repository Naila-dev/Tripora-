import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <header className="navbar site-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo d-flex align-items-center gap-2">
        <img src="/images/logos/logo192.png" alt="Tripora Logo" className="logo-image" />
          <NavLink to="/" className="logo-text text-decoration-none">
            Tripora<span>Tours</span>
          </NavLink>
        </div>

        
        <nav className="d-none d-lg-block">
          <ul className="nav-list d-flex align-items-center gap-4">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/tours">Tours</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            {isAuthenticated ? (
              <>
                <li><span className="nav-user">Hi, {user.name}</span></li>
                <li><button onClick={logout} className="nav-btn">Logout</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/register" className="nav-btn">Register</NavLink></li>
                <li><NavLink to="/login" className="nav-btn">Login</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;