import { Link } from "react-router-dom";
import "../styles/navbar.css";


export default function Navbar() {
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
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/tourlist">Tours</Link>
            {/* <Link to="/blog">Blog</Link> */}
            <Link to="/contact">Contacts</Link>
          </div>

          <div className="navbar-auth">
            <Link to="/register" className="btn btn-accent">Sign Up</Link>
            <Link to="/login" className="btn btn-outline">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
