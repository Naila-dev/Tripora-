//frontend/src/pages/About.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavLink } from "react-router-dom";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-page">
      

  {/* Hero Section */}
{/* Hero Section */}
<section className="about-hero position-relative">
  <video
    className="hero-video"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    // poster={`${process.env.PUBLIC_URL}/images/hero2.jpeg`}  // fallback image before play
  >
    <source src={`${process.env.PUBLIC_URL}/images/herovedio.mp4`} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="hero-overlay"></div>

  <div className="hero-content text-center text-white position-absolute top-50 start-50 translate-middle">
    <h1 className="display-4 fw-bold">About Tripora</h1>
    <p className="lead fonts-text text-black" >Discover our story, mission, and the people behind your adventures</p>
  </div>
</section>



  <section className="container py-5">
    <div className="row align-items-center">
      <div className="col-md-6">
        <h2 className="fw-bold text-success mb-4">Our Story</h2>
        <p className="lead text-muted">
          Tripora was founded out of a passion for travel and a frustration with
          the lack of authentic experiences available to tourists. Our mission is
          to connect travelers with meaningful adventures while supporting local
          communities and sustainable tourism.
        </p>
        <button className="btn-read-more">Read More</button>
      </div>

      <div className="col-md-6 text-center">
        <img
          src="/images/antelopes.jpeg"
          alt="Our Story"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      </div>
    </div>
  </section>


      <section className="mission-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-success mb-5">Our Mission, Vision & Values</h2>
          <div className="row g-4">
            {/* Mission */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4">
                <h4 className="fw-bold mb-3 text-primary">Mission</h4>
                <p className="text-muted">
                  To deliver seamless, enriching, and sustainable travel experiences
                  that connect people to cultures and nature around the world.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4">
                <h4 className="fw-bold mb-3 text-primary">Vision</h4>
                <p className="text-muted">
                  To be the most trusted travel brand recognized for innovation,
                  authenticity, and meaningful adventures that inspire global
                  discovery.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4">
                <h4 className="fw-bold mb-3 text-primary">Core Values</h4>
                <ul className="list-unstyled text-muted">
                  <li>✔ Sustainability and eco-awareness</li>
                  <li>✔ Authentic cultural experiences</li>
                  <li>✔ Respect for local communities</li>
                  <li>✔ Integrity and customer care</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="team-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-success mb-5">Meet the Team</h2>
          <div className="row g-4">
            {/* Member 1 */}

            <div className="col-md-4">
              <div className="team-card p-4 shadow-sm rounded">
                <img
                  src="/images/teamg2.jpeg"
                  alt="Founder"
                  className="team-member-img mb-3"
                />
                <h5 className="fw-bold">Faith Njambi</h5>
                <p className="text-muted mb-1">Founder & CEO</p>
                <p className="small text-secondary">
                  Loves exploring remote destinations and sharing unique travel
                  experiences with the world.
                </p>
              </div>
            </div>

            {/* Member 2 */}
            <div className="col-md-4">
              <div className="team-card p-4 shadow-sm rounded">
                <img
                  src="/images/team1.jpeg"
                  alt="Tour Guide"
                  className="team-member-img mb-3"
                />
                <h5 className="fw-bold">John wasike</h5>
                <p className="text-muted mb-1">Lead Tour Guide</p>
                <p className="small text-secondary">
                  Passionate about wildlife and cultural immersion, guiding travelers
                  to hidden gems and authentic adventures.
                </p>
              </div>
            </div>

           {/* Member 3 */}
            <div className="col-md-4">
              <div className="team-card p-4 shadow-sm rounded">
                <img
                  src="/images/teamg3.jpeg"
                  alt="Tour Guide"
                  className="team-member-img mb-3"
                />
                <h5 className="fw-bold">Feliciah Felicity</h5>
                <p className="text-muted mb-1">Lead Tour Guide</p>
 <p className="small text-secondary">
                  Ensures seamless logistics and outstanding service to keep every
                  traveler’s journey stress-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* Testimonials */}
      <section className="testimonials py-5 text-center">
        <div className="container">
          <h2 className="mb-4 fw-bold">What Our Travelers Say</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/testimonial1.jpeg" alt="Traveler 1" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Tripora made my vacation seamless and unforgettable."</p>
                <h6 className="fw-bold mt-3">— Sarah M., USA</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src="/images/testimonial2.jpeg" alt="Traveler 2" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Best travel company I've ever used! Professional and fun."</p>
                <h6 className="fw-bold mt-3">— Daniel K., Kenya</h6>
                <div className="stars">★★★★★</div>
              </div>
              <div className="carousel-item">
                <img src="/images/familia.jpeg" alt="Traveler 3" className="rounded-circle mb-3" width="100" height="100" />
                <p className="lead fst-italic">"Every detail was perfectly planned. Highly recommend Tripora!"</p>
                <h6 className="fw-bold mt-3">— Amina R., Canada</h6>
                <div className="stars">★★★★★</div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Unique Selling Points
      <section className="container py-5">
        <h2 className="mb-4">Why Choose Tripora?</h2>
        <ul className="list-unstyled">
          <li>✔ Local guides for authentic experiences</li>
          <li>✔ Exclusive access to hidden destinations</li>
          <li>✔ Sustainable and responsible travel practices</li>
          <li>✔ Personalized itineraries for every traveler</li>
        </ul>
      </section> */}

      {/* Call to Action */}
      <section className="text-center py-5 bg-primary text-black">
        <h3>Ready to start your next adventure?</h3>
        <NavLink to="/TourList" className="btn btn-light text-black btn-lg mt-3">Explore Tours</NavLink>
      </section>

    </div>

    
  );
};

export default About;
