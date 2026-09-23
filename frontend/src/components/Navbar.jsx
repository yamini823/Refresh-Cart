import "../styles/Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Search } from "lucide-react";

function Navbar({
  darkMode = false,
  setDarkMode = () => {}
}) {

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [localSearch, setLocalSearch] = useState("");

  // Sync search state with the query param "q" when on search page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    if (location.pathname === "/search") {
      setLocalSearch(query);
    } else {
      setLocalSearch("");
    }
  }, [location]);

  // CHECK LOGIN
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    setIsLoggedIn(!!userStr);
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (err) {
        console.error(err);
      }
      fetchCartCount();
    } else {
      setCurrentUser(null);
    }
    // listen for cart updates
    const handler = () => fetchCartCount();
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [location]);

  const fetchCartCount = async () => {
    try {
      const res = await API.get("/cart");
      const validItems = res.data.filter(
        (item) => item && item.productId && item.productId.name && item.productId._id
      );
      const totalUnits = validItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalUnits);
      // Trigger badge animation
      const badge = document.querySelector('.cart-badge');
      if (badge) {
        badge.classList.add('badge-animate');
        setTimeout(() => badge.classList.remove('badge-animate'), 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStateChange"));
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  const categories = [
    { name: "Fruits", emoji: "🍎" },
    { name: "Vegetables", emoji: "🥬" },
    { name: "Dairy", emoji: "🥛" },
    { name: "Bakery", emoji: "🍞" },
    { name: "Snacks", emoji: "🍿" },
    { name: "Beverages", emoji: "🥤" },
    { name: "Household", emoji: "🧹" }
  ];

  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="logo"
        onClick={() => isLoggedIn ? navigate("/dashboard") : navigate("/")} >
        <img src="/logo.png" alt="logo" />
        <h2>Refresh Cart</h2>
      </div>

      {/* LOGIN AFTER NAVBAR */}
      {isLoggedIn ? (
        <>
          {/* SEARCH */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search groceries..."
              className="search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>

          {/* NAV LINKS */}
          <div className="nav-links">
            <span 
              className={location.pathname === "/dashboard" || location.pathname === "/" ? "active-nav" : ""}
              onClick={() => navigate("/dashboard")} 
            >
              Home
            </span>
            <div className="dropdown-container">
              <span 
                className={location.pathname === "/categories" ? "active-nav" : ""}
                onClick={() => navigate("/categories")} 
              >
                Categories
              </span>
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => navigate("/search")}>
                  🛍 All Products
                </div>
                {categories.map((cat, idx) => (
                  <div 
                    key={idx} 
                    className="dropdown-item" 
                    onClick={() => navigate(`/search?category=${encodeURIComponent(cat.name)}`)}
                  >
                    {cat.emoji} {cat.name}
                  </div>
                ))}
              </div>
            </div>
            <span 
              className={location.pathname === "/orders" ? "active-nav" : ""}
              onClick={() => navigate("/orders")} 
            >
              Orders
            </span>
            <span 
              className={location.pathname === "/deals" ? "active-nav" : ""}
              onClick={() => navigate("/deals")} 
            >
              Deals
            </span>
            <span 
              className={location.pathname === "/wishlist" ? "active-nav" : ""}
              onClick={() => navigate("/wishlist")}
            >
              Wishlist
            </span>
            <span 
              className={location.pathname === "/cart" ? "active-nav" : ""}
              onClick={() => navigate("/cart")} 
            >
              <span className="cart-icon">
                🛒
                {cartCount >= 0 && <span className="cart-badge">{cartCount}</span>}
              </span>
            </span>
            {currentUser?.email?.toLowerCase() === import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase() && (
              <span 
                className={location.pathname.startsWith("/admin") ? "active-nav" : ""}
                onClick={() => navigate("/admin")}
              >
                Admin
              </span>
            )}
 
            <span onClick={handleLogout}>
              Logout
            </span>
            <div className="profile-link"
              onClick={() => navigate("/profile")} >
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" className="profile-avatar"/>
            </div>

            {/* DARK MODE */}
            <span onClick={() => setDarkMode(!darkMode)} >
              {darkMode ? "☀️" : "🌙"}
            </span>
          </div>
        </>
      ) : (
        /* BEFORE LOGIN */
        <div className="auth-buttons">
          <button className="login-btn"
            onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="signup-btn"
            onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;