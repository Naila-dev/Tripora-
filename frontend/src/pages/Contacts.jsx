// src/pages/Contact.jsx
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./style.css";

const faqs = [
  {
    question: "How long does it take to get a response?",
    answer: "We typically respond within 24 hours during business days."
  },
  {
    question: "Can I customize a tour?",
    answer: "Yes! Contact us with your preferences and we'll tailor a tour to your needs."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes, we provide special rates for groups of 5 or more. Please inquire directly."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page container">
      <h1 className="mb-4 text-center">Contact Us</h1>

      <div className="row">
        {/* Contact info */}
        <div className="col-md-4 contact-info">
          <div className="info-item mb-3">
            <FaPhone /> <span>+1 (555) 123-4567</span>
          </div>
          <div className="info-item mb-3">
            <FaEnvelope /> <span>info@tripora.com</span>
          </div>
          <div className="info-item mb-3">
            <FaMapMarkerAlt /> <span>123 Adventure St, Travel City, USA</span>
          </div>
          <div className="social-links mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>

        {/* Contact form */}
        <div className="col-md-8">
          {submitted && <div className="alert alert-success">Thank you! We will get back to you within 24 hours.</div>}
          <form onSubmit={handleSubmit} className="contact-form">
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
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="map mt-5 mb-5">
        <iframe
          title="Tripora Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789!2d-122.41941508468144!3d37.77492927975981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c1234567%3A0xabcdef123456789!2s123%20Adventure%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1698321234567"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="mb-4 text-center">Frequently Asked Questions</h2>
        <div className="accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item mb-3">
              <div 
                className="faq-question" 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {faq.question}
              </div>
              {openFaq === index && (
                <div className="faq-answer mt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

