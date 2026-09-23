import "./Deals.css";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import API from "../api/axios";

import Footer from "../components/Footer";

function Deals() {

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Fruits & Vegetables", "Dairy & Eggs", "Bakery", "Snacks", "Beverages"];

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await API.get("/products");
      setDeals(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter by category
  const filteredDeals = filter === "All"
    ? deals
    : deals.filter(item => item.category?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="deals-page">

      {/* HERO BANNER */}
      <div className="deals-hero">
        <div className="deals-hero-inner">
          <span className="deals-hero-tag">🔥 Limited Time</span>
          <h1>Deals &amp; Discounts</h1>
          <p>Unbeatable prices on your everyday grocery essentials</p>
          <div className="deals-stats">
            <div className="deal-stat">
              <strong>{deals.length}+</strong>
              <span>Products on Sale</span>
            </div>
            <div className="deal-stat-divider" />
            <div className="deal-stat">
              <strong>Up to 30%</strong>
              <span>Off Today</span>
            </div>
            <div className="deal-stat-divider" />
            <div className="deal-stat">
              <strong>⚡ 10 min</strong>
              <span>Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="deals-filter-bar">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ALL PRODUCTS */}
      <div className="deals-container">
        <div className="deals-header">
          <h2>
            {filter === "All" ? "All Products on Sale" : filter}
            <span className="deals-count">{filteredDeals.length} items</span>
          </h2>
        </div>

        {loading ? (
          <div className="deals-loader">Loading deals...</div>
        ) : filteredDeals.length === 0 ? (
          <div className="deals-empty">No products found in this category.</div>
        ) : (
          <div className="products">
            {filteredDeals.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Deals;