import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar({ onLoginClick, onRegisterClick }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side */}
        <div className="navbar-left">
          <img src="./images/logo.png" alt="Tripora Logo" className="navbar-logo" />
          <h1 className="navbar-title">Tripora <span>Tours</span></h1>
        </div>

        {/* Right side */}
        <div className="navbar-right">
          <div className="navbar-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/tours-list">Tours</NavLink>
            {/* <Link to="/blog">Blog</Link> */}
            <NavLink to="/contact">Contacts</NavLink>
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <span className="navbar-username">Hello, {user.name}</span>
                <button onClick={logout} className="btn btn-outline">Logout</button>
              </>
            ) : (
              <>
                <button onClick={onRegisterClick} className="btn btn-accent">Sign Up</button>
                <button onClick={onLoginClick} className="btn btn-outline">Login</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
