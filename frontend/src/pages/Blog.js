// frontend/src/pages/Blog.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css"; // We will create this file next

// Dummy data for blog posts - replace with API call later
const allPosts = [
  {
    id: 1,
    title: "Travel Tips for Your First African Safari",
    image: "/images/migration.jpeg",
    author: "Jane Doe",
    date: "October 26, 2023",
    excerpt: "An African safari is a dream for many. Here are some essential tips to make your first experience smooth, safe, and absolutely unforgettable.",
    category: "Travel Tips",
    tags: ["Safari", "Africa", "Planning"],
  },
  {
    id: 2,
    title: "Top 5 Destinations to Visit in 2025",
    image: "/images/sailboat-9597523_1280.jpg",
    author: "John Smith",
    date: "October 22, 2023",
    excerpt: "The world is opening up again! Discover the top trending travel spots that should be on your bucket list for the upcoming year.",
    category: "Destinations",
    tags: ["Travel", "2025", "Bucket List"],
  },
  {
    id: 3,
    title: "A Culinary Journey Through Coastal Kenya",
    image: "/images/picnicdate.jpg",
    author: "Amina Yusuf",
    date: "October 18, 2023",
    excerpt: "From Swahili dishes to fresh seafood, the Kenyan coast offers a rich tapestry of flavors. Join us on a delicious adventure.",
    category: "Food & Culture",
    tags: ["Food", "Kenya", "Culture"],
  },
  {
    id: 4,
    title: "Packing Essentials for a Tropical Getaway",
    image: "/images/tourist-carrying-luggage.jpg",
    author: "David Lee",
    date: "October 15, 2023",
    excerpt: "Packing light doesn't mean leaving essentials behind. Here’s our guide to smart packing for your next trip to the tropics.",
    category: "Travel Tips",
    tags: ["Packing", "Tips", "Beach"],
  },
  {
    id: 5,
    title: "The Great Migration: A Witness to Nature's Grandeur",
    image: "/images/migration.jpeg",
    author: "John Smith",
    date: "October 12, 2023",
    excerpt: "Witnessing the great wildebeest migration in the Maasai Mara is a once-in-a-lifetime experience. Here's how to plan your trip.",
    category: "Destinations",
    tags: ["Migration", "Kenya", "Wildlife"],
  },
  {
    id: 6,
    title: "Sustainable Tourism: How to Travel Responsibly",
    image: "/images/sailboat-9597523_1280.jpg",
    author: "Amina Yusuf",
    date: "October 10, 2023",
    excerpt: "Learn how your travel choices can make a positive impact on the environment and local communities. Be a part of the change.",
    category: "Travel Tips",
    tags: ["Sustainability", "Eco-friendly", "Responsible Travel"],
  },
];

const BlogPage = () => {
  const [posts, setPosts] = useState(allPosts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setPosts(filtered);
  }, [searchTerm]);

  return (
    <div className="blog-page">
      {/* Blog Hero Section */}
      <section className="blog-hero text-center text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">Tripora Blog</h1>
          <p className="lead">Stories, tips, and inspiration for the modern traveler.</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row">
          {/* Blog Posts Column */}
          <div className="col-lg-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="blog-post-card card mb-4 shadow-sm border-0">
                  <img src={post.image} className="card-img-top" alt={post.title} />
                  <div className="card-body">
                    <div className="card-meta mb-2">
                      <span className="text-muted">{post.date}</span> |{" "}
                      <span className="text-primary fw-bold">{post.category}</span>
                    </div>
                    <h2 className="card-title h4">{post.title}</h2>
                    <p className="card-text">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="btn btn-outline-success">
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found matching your search.</p>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="col-lg-4">
            <div className="blog-sidebar">
              {/* Search Widget */}
              <div className="sidebar-widget card p-3 mb-4 shadow-sm border-0">
                <h5 className="widget-title mb-3">Search</h5>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-success" type="button">
                    Go
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              <div className="sidebar-widget card p-3 mb-4 shadow-sm border-0">
                <h5 className="widget-title mb-3">Categories</h5>
                <ul className="list-unstyled">
                  <li><a href="#!">Travel Tips</a> (2)</li>
                  <li><a href="#!">Destinations</a> (1)</li>
                  <li><a href="#!">Food & Culture</a> (1)</li>
                  <li><a href="#!">Adventure</a> (0)</li>
                </ul>
              </div>

              {/* Recent Posts Widget */}
              <div className="sidebar-widget card p-3 mb-4 shadow-sm border-0">
                <h5 className="widget-title mb-3">Recent Posts</h5>
                <ul className="list-unstyled">
                  {allPosts.slice(0, 3).map(post => (
                     <li key={post.id} className="mb-2">
                       <Link to={`/blog/${post.id}`}>{post.title}</Link>
                     </li>
                  ))}
                </ul>
              </div>

              {/* Tags Widget */}
              <div className="sidebar-widget card p-3 mb-4 shadow-sm border-0">
                <h5 className="widget-title mb-3">Tags</h5>
                <div className="tag-cloud">
                  <a href="#!" className="tag">Safari</a>
                  <a href="#!" className="tag">Kenya</a>
                  <a href="#!" className="tag">Beach</a>
                  <a href="#!" className="tag">Food</a>
                  <a href="#!" className="tag">Planning</a>
                  <a href="#!" className="tag">Culture</a>
                  <a href="#!" className="tag">Bucket List</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
