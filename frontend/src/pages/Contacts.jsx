import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    question: "How long does it take to get a response?",
    answer: "We typically respond within 24 hours during business days.",
  },
  {
    question: "Can I customize a tour?",
    answer:
      "Yes! Contact us with your preferences and we'll tailor a tour to your needs.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, we provide special rates for groups of 5 or more. Please inquire directly.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="contact-page container py-5">
        <h1 className="text-center mb-5">Contact Us</h1>

        {/* Contact Info + Form */}
        <div className="row align-items-start mb-5">
          <div className="col-md-4 contact-info-card" data-aos="fade-right">
            <h3 className="mb-4">Get in Touch</h3>
            <div className="info-item">
              <FaPhone /> <span>+1 (555) 123-4567</span>
            </div>
            <div className="info-item">
              <FaEnvelope /> <span>info@tripora.com</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt /> <span>123 Adventure St, Travel City, USA</span>
            </div>
            <div className="info-item">
              <FaClock /> <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
            </div>

            <div className="social-links mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="col-md-8" data-aos="fade-left">
            {submitted && (
              <div className="alert alert-success mb-3">
                Thank you! We’ll get back to you within 24 hours.
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="contact-form shadow-sm p-4 rounded bg-white"
            >
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map + FAQ Side by Side */}
        <div className="row align-items-start mt-5 map-faq-section">
          <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
            <div className="map-container rounded shadow-sm">
              <iframe
                title="Tripora Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789!2d-122.41941508468144!3d37.77492927975981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c1234567%3A0xabcdef123456789!2s123%20Adventure%20St%2C%20San%20Francisco!5e0!3m2!1sen!2sus!4v1698321234567"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="col-md-6" data-aos="fade-left">
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <div className="accordion">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item mb-3">
                  <div
                    className={`faq-question ${openFaq === index ? "active" : ""}`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    {faq.question}
                  </div>
                  <div
                    className={`faq-answer ${openFaq === index ? "show" : ""}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;
