import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../pages/style.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo d-flex align-items-center">
          <FaPlaneDeparture size={28} color="#0d6efd" className="me-2 fly" />
          <span className="brand">Tripora</span>
        </div>
        <ul className="nav-links d-flex gap-4 mb-0">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tours">Tours</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="cta-buttons d-flex gap-2">
            <button className="btn btn-outline-primary">Sign Up</button>
          <button className="btn btn-outline-primary">Login</button>
          <button className="btn btn-primary">Book Now</button>
        </div>
      </div>
    </nav>
  );
}
