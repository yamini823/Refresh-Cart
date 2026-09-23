import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] =useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] =  useState("");
  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("All");

  const [
    showAllRecommended,
    setShowAllRecommended
  ] = useState(false);

  const [
    showAllDeals,
    setShowAllDeals
  ] = useState(false);

  const [
    showAllPopular,
    setShowAllPopular
  ] = useState(false);

  const categoriesList = [
    { name: "All", emoji: "🛍", route: "/search", color: "#f8fafc", border: "#cbd5e1" },
    { name: "Fruits", emoji: "🍎", route: "/search?category=Fruits", color: "#fef2f2", border: "#fca5a5" },
    { name: "Vegetables", emoji: "🥬", route: "/search?category=Vegetables", color: "#f0fdf4", border: "#86efac" },
    { name: "Dairy", emoji: "🥛", route: "/search?category=Dairy", color: "#eff6ff", border: "#93c5fd" },
    { name: "Bakery", emoji: "🍞", route: "/search?category=Bakery", color: "#fffbeb", border: "#fcd34d" },
    { name: "Snacks", emoji: "🍿", route: "/search?category=Snacks", color: "#fdf4ff", border: "#d8b4fe" },
    { name: "Beverages", emoji: "🥤", route: "/search?category=Beverages", color: "#ecfdf5", border: "#6ee7b7" },
    { name: "Household", emoji: "🧹", route: "/search?category=Household", color: "#f8fafc", border: "#cbd5e1" }
  ];

  /* USER */

  let user = { name: "User" };

  try {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      user = JSON.parse(storedUser);

    }

  } catch (error) {

    localStorage.removeItem("user");

  }

  /* FETCH PRODUCTS */

  useEffect(() => {

    API.get("/products")

      .then((res) => {

        setProducts(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  
 
  /* FILTER PRODUCTS */

  const filteredProducts =

    products.filter((product) => {

      const matchesSearch =

        product.name
          .toLowerCase()

          .includes(
            search.toLowerCase()
          );

      const matchesCategory =

        selectedCategory === "All"

          ||

        product.category ===
        selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  /* PRODUCTS */

  const recommendedProducts = products
    .filter(p => parseFloat(p.rating) >= 4.5)
    .slice(0, showAllRecommended ? products.length : 4);

  const dealProducts = products
    .filter(p => p.offer && p.offer !== "")
    .slice(0, showAllDeals ? products.length : 4);

  const popularProducts = products
    .filter(p => parseFloat(p.rating) >= 4.0)
    .slice(0, showAllPopular ? products.length : 4);

  
  return (

    <div
      className={
        darkMode
          ? "home dark"
          : "home"
      }
    >

 
      {/* WELCOME */}



      <div className="welcome">

        <h1>
          Hello,
          {user?.name} 👋
        </h1>

        <p>
          What are you looking
          for today?
        </p>

      </div>

      {/* CATEGORIES */}

      <div className="categories-section">

        <h2>
          Shop by Category
        </h2>

        <div className="categories">

          {categoriesList.map((cat, idx) => (
            <div
              key={idx}
              className="category-card"
              style={{ background: cat.color, borderColor: cat.border }}
              onClick={() => navigate(cat.route)}
            >
              <div className="category-icon">{cat.emoji}</div>
              <p>{cat.name}</p>
            </div>
          ))}

        </div>

      </div>

      {/* RECOMMENDED */}

      <div className="section">

        <div className="section-header">

          <div>
            <h2 className="section-title">
              Recommended For You
            </h2>
            <p className="section-subtitle">
              Top-rated items (4.5+ ★)
            </p>
          </div>

          {products.filter(p => parseFloat(p.rating) >= 4.5).length > 4 && (
            <button className="view-all-btn" onClick={() => setShowAllRecommended(!showAllRecommended)}>
              {showAllRecommended ? "Show Less" : "View All"}
            </button>
          )}

        </div>

        <div className="products">

          {recommendedProducts.map(
            (product) => (

            <ProductCard
              key={product._id}
              item={product}
            />

            )
          )}

        </div>

      </div>

      {/* TODAY DEALS */}

      <div className="section">

        <div className="section-header">

          <div>
            <h2 className="section-title">
              🔥 Today's Deals
            </h2>
            <p className="section-subtitle">
              Exclusive discounts and bundle offers
            </p>
          </div>

          {products.filter(p => p.offer && p.offer !== "").length > 4 && (
            <button className="view-all-btn" onClick={() => setShowAllDeals(!showAllDeals)}>
              {showAllDeals ? "Show Less" : "View All"}
            </button>
          )}

        </div>

        <div className="products">

          {dealProducts.map(
            (product) => (

             <ProductCard
              key={product._id}
              item={product}
             />

            )
          )}

        </div>

      </div>

      {/* POPULAR */}

      <div className="section">

        <div className="section-header">

          <div>
            <h2 className="section-title">
              ⭐ Popular Products
            </h2>
            <p className="section-subtitle">
              Most loved items by customers (4.0+ ★)
            </p>
          </div>

          {products.filter(p => parseFloat(p.rating) >= 4.0).length > 4 && (
            <button className="view-all-btn" onClick={() => setShowAllPopular(!showAllPopular)}>
              {showAllPopular ? "Show Less" : "View All"}
            </button>
          )}

        </div>

        <div className="products">

          {popularProducts.map(
            (product) => (

             <ProductCard
              key={product._id}
              item={product}
             />

            )
          )}

        </div>

      </div>

    </div>

  );
}

export default Dashboard;