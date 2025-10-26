import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contacts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {/* You can add more routes here for about, blog, contact etc. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;