import "./Categories.css";

import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Categories() {

  const navigate = useNavigate();

  const categories = [
    { emoji: "🍎", name: "Fruits", items: "120 Items", color: "#fef2f2", border: "#fca5a5" },
    { emoji: "🥛", name: "Dairy", items: "85 Items", color: "#eff6ff", border: "#93c5fd" },
    { emoji: "🍞", name: "Bakery", items: "60 Items", color: "#fffbeb", border: "#fcd34d" },
    { emoji: "🍿", name: "Snacks", items: "150 Items", color: "#fdf4ff", border: "#d8b4fe" },
    { emoji: "🥤", name: "Beverages", items: "90 Items", color: "#ecfdf5", border: "#6ee7b7" },
    { emoji: "🥬", name: "Vegetables", items: "100 Items", color: "#f0fdf4", border: "#86efac" },
    { emoji: "🧴", name: "Personal Care", items: "70 Items", color: "#fff1f2", border: "#fda4af" },
    { emoji: "🧹", name: "Household", items: "55 Items", color: "#f8fafc", border: "#cbd5e1" },
    { emoji: "🌾", name: "Grains & Masalas", items: "200 Items", color: "#fffbeb", border: "#fbbf24" },
  ];

  return (
    <div className="categories-page">

      {/* NAVBAR */}


      {/* HERO BANNER */}
      <div className="categories-hero">
        <div className="categories-hero-text">
          <h1>All Categories</h1>
          <p>Browse and discover fresh groceries by category</p>
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="categories-top">
        <div className="category-cards">
          {categories.map((cat, index) => (
            <div
              className="mini-card"
              key={index}
              style={{ background: cat.color, borderColor: cat.border }}
              onClick={() => navigate(`/search?category=${cat.name}`)}
            >
              <span>{cat.emoji}</span>
              <h3>{cat.name}</h3>
              <p>{cat.items}</p>
              <div className="mini-card-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Categories;