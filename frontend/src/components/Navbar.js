import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-blue-600">Tripora</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/register">Sign up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
