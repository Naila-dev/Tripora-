// src/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import Pagination from "../components/Pagination";
import Header from "../components/Navbar";
import Footer from "../components/Footer";


const blogPosts = [
  {
    id: 1,
    slug: "kayaking-adventures-alaska",
    title: "Kayaking Adventures in Alaska",
    category: "Adventure",
    image: "/images/beach2.jpeg",
    excerpt: "Explore Alaska’s wild rivers and glaciers on a thrilling kayaking tour with our expert guides.",
  },
  {
    id: 2,
    slug: "family-friendly-safari-destinations",
    title: "Top 10 Family-Friendly Safari Destinations",
    category: "Family",
    image: "/images/savannah2.jpeg",
    excerpt: "Discover the best safaris suitable for families, with tips for a smooth adventure.",
  },
  {
    id: 3,
    slug: "packing-tips-backpackers",
    title: "Packing Tips for Backpackers",
    category: "Tips",
    image: "/images/familia.jpeg",
    excerpt: "Maximize your backpack space and travel efficiently with these essential tips.",
  },
  {
    id: 4,
    slug: "best-winter-destinations-adventure",
    title: "Best Winter Destinations for Adventure",
    category: "Adventure",
    image: "/images/antelopes.jpeg",
    excerpt: "Explore thrilling winter destinations and enjoy snow activities across the globe.",
  },
  // add more posts as needed
];

const categories = ["All", "Adventure", "Family", "Tips"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    document.title = "Blog - Tripora";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Read our latest travel stories, tips, and guides.');
  }, []);

  return (
    <>
      <Header />
      <div className="blog-page">

      {/* Hero Section */}
      <section
        className="blog-hero"
        style={{ backgroundImage: `url(/images/blog-hero.jpg)` }}
        data-aos="fade-in"
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 data-aos="fade-up">Tripora Blog</h1>
          <p className="lead" data-aos-delay="100" data-aos="fade-up">
            Travel stories, tips, and inspiration
          </p>
        </div>
      </section>

      <div className="container">
        {/* Category Filters */}
        <div className="categories text-center mb-5" data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-outline-primary mx-1 ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="row g-4 blog-grid">
          {currentPosts.map((post) => (
            <div key={post.id} className="col-md-4" data-aos="fade-up">
              <div className="card h-100">
                <img src={post.image} className="card-img-top" alt={post.title} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="btn btn-link p-0">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          toursPerPage={postsPerPage}
          totalTours={filteredPosts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
