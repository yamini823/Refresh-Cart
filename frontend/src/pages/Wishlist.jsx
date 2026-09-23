import "./Wishlist.css";
import { useEffect, useState } from "react";
import API from "../api/axios";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

function Wishlist() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);
      toast.error("Removed from wishlist 💔");
      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    if (!productId) {
      toast.error("Product not available");
      return;
    }
    try {
      await API.post("/cart", { productId, quantity: 1 });
      toast.success("Added to cart 🛒");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">

        {/* TOP HEADER */}
        <div className="wishlist-top">
          <div>
            <h1>My Wishlist ❤️</h1>
            <p>Your saved grocery favourites</p>
          </div>
          <span className="wishlist-count-badge">{items.length} items</span>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <div className="wishlist-empty">
            <p>💝</p>
            <h2>Your Wishlist is Empty</h2>
            <p style={{ color: "var(--text-muted, #6b7280)", fontSize: "15px", marginTop: "8px" }}>
              Start saving products you love!
            </p>
            <button className="shop-now-btn" onClick={() => navigate("/search")}>
              Shop Now →
            </button>
          </div>
        )}

        {/* GRID */}
        <div className="wishlist-grid">
          {items.map((item) => {
            const product = item.productId;
            if (!product) return null;

            const discountPct = product.oldPrice
              ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
              : 20;

            return (
              <div className="wishlist-card" key={item._id}>

                {/* DISCOUNT BADGE */}
                <div className="wishlist-offer">{discountPct}% OFF</div>

                {/* IMAGE */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="wishlist-image"
                  onClick={() => navigate(`/product/${product._id}`)}
                />

                {/* CONTENT */}
                <div className="wishlist-content">
                  {product.brand && (
                    <p className="wishlist-brand">{product.brand}</p>
                  )}

                  <h2 onClick={() => navigate(`/product/${product._id}`)}>
                    {product.name}
                  </h2>

                  {/* RATING */}
                  {product.rating && (
                    <div className="wishlist-rating">
                      {"⭐".repeat(Math.round(product.rating))} &nbsp;
                      <span>{product.rating}</span>
                    </div>
                  )}

                  {/* PRICE */}
                  <div className="wishlist-price">
                    <h3>₹{product.price}</h3>
                    {product.oldPrice && <span>₹{product.oldPrice}</span>}
                  </div>

                  {/* DELIVERY */}
                  <p className="delivery-row">⚡ 10-min delivery</p>

                  {/* BUTTONS */}
                  <div className="wishlist-buttons">
                    <button
                      className="cart-btn"
                      onClick={() => addToCart(product._id)}
                    >
                      🛒 Add to Cart
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;