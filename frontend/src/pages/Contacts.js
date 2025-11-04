// frontend/src/pages/Contacts.js
import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import "../styles/global.css";

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
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const form = useRef();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ submitting: false, success: false, error: 'Please enter a valid email address.' });
      return;
    }

    setFormStatus({ submitting: true, success: false, error: '' });

    // Replace with your actual EmailJS IDs
    const serviceID = 'service_bje8ayf';
    const templateID = 'template_ba6niy4';
    const publicKey = 'Muui3ftVfTtcadUcc';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        console.log('EmailJS Success:', result.text);
        setFormStatus({ submitting: false, success: true, error: '' });
        setFormData({ name: "", email: "", message: "" }); // Clear form
      }, (error) => {
        console.error('EmailJS Error:', error.text);
        setFormStatus({ submitting: false, success: false, error: 'Failed to send message. Please try again.' });
      });
  };

  return (
<div className="contact-page container py-5">

  <h1 className="text-center mb-5">Contact Us</h1>

  {/* Map + FAQ Side by Side */}
  <div className="row align-items-stretch mt-5 map-faq-section d-flex">
    {/* Map Column */}
    <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
      <div className="map-container rounded shadow-sm h-100">
        <iframe
          title="Tripora Location - Nairobi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.290310312357!2d36.730474815249115!3d-1.292065898011218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1072b9c8a9af%3A0x50f6ef3adff162e3!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1704012345678!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>

    {/* FAQ Column */}
    <div className="col-md-6 h-100" data-aos="fade-left">
      <div className="faq-section p-4 rounded shadow-sm bg-white h-100">
        <h2 className="mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item mb-3">
            <div
              className={`faq-question ${openFaq === index ? "active" : ""}`}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              {faq.question}
            </div>
            <div className={`faq-answer ${openFaq === index ? "show" : ""}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Contact Info + Form */}
  <div className="row align-items-stretch mb-5 d-flex mt-5">
    <div className="col-md-4 contact-info-card h-100" data-aos="fade-right">
      <h3 className="mb-4">Get in Touch</h3>
      <div className="info-item"><FaPhone /><span>+2547 98830662</span></div>
      <div className="info-item"><FaEnvelope /><span>njambifaith001@gmail.com</span></div>
      <div className="info-item"><FaMapMarkerAlt /><span>Nairobi, Kenya</span></div>
      <div className="info-item"><FaClock /><span>24/7 Available</span></div>
      <div className="social-links mt-4">
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
      </div>
    </div>

    <div className="col-md-8 h-100" data-aos="fade-left">
      {formStatus.success && (
        <div className="alert alert-success mb-3 h-100" role="alert">
          Thank you! We’ll get back to you within 24 hours.
        </div>
      )}
      {formStatus.error && (
        <div className="alert alert-danger mb-3 h-100" role="alert">
          {formStatus.error}
        </div>
      )}
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="contact-form shadow-sm p-4 rounded bg-white h-100"
      >
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="5" required />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={formStatus.submitting}>
          {formStatus.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  </div>

  {/* Call To Action */}
  <section className="text-center py-5 bg-primary text-black mt-5" data-aos="fade-up">
    <h3>Ready to start your next adventure?</h3>
    <NavLink to="/TourList" className="btn btn-light text-black btn-lg mt-3">
      Explore Tours
    </NavLink>
  </section>
</div>
  );
}

export default Contact;