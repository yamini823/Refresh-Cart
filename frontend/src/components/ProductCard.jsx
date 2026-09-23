import "./ProductCard.css";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("1kg");
  const [wishlisted, setWishlisted] = useState(false);
  // Sync wishlist status on mount
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const res = await API.get("/wishlist");
        const ids = res.data.map(item => item.productId?._id);
        if (ids.includes(item._id)) {
          setWishlisted(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlistStatus();
  }, [item._id]);

  const getPrice = () => {
    if (weight === "250g") return Math.floor(item.price / 4);
    if (weight === "500g") return Math.floor(item.price / 2);
    return item.price;
  };

  const getOldPrice = () => {
    if (weight === "250g") return Math.floor(item.oldPrice / 4);
    if (weight === "500g") return Math.floor(item.oldPrice / 2);
    return item.oldPrice;
  };

  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: item._id,
        quantity: 1,
        weight,
        price: getPrice(),
      });
      toast.success("Added to cart 🛒");
      // Dispatch event so Navbar updates cart count
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    try {
      if (wishlisted) {
        // Remove from wishlist
        await API.delete(`/wishlist/${item._id}`);
        setWishlisted(false);
        toast.success("Removed from wishlist 💔");
      } else {
        await API.post("/wishlist", { productId: item._id });
        setWishlisted(true);
        toast.success("Added to wishlist ❤️");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card product-card">
      {item.offer && <div className="offer-tag">{item.offer}</div>}
      <img
        src={item.image}
        alt={item.name}
        className="product-image"
        onClick={() => navigate(`/product/${item._id}`)}
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400";
        }}
      />
      <p className="brand">{item.brand}</p>
      <h3 className="product-name" onClick={() => navigate(`/product/${item._id}`)}>{item.name}</h3>
      <div className="rating">⭐ {item.rating}</div>
      <select
        className="weight-select"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      >
        <option value="250g">250 g</option>
        <option value="500g">500 g</option>
        <option value="1kg">1 kg</option>
      </select>
      <div className="price-row">
        <h2>₹{getPrice()}</h2>
        {getOldPrice() && <span>₹{getOldPrice()}</span>}
      </div>
      <div className="button-row">
        <button
          className={`wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist();
          }}
          title="Add to Wishlist"
        >
          <Heart fill={wishlisted ? "#ef4444" : "transparent"} color="#ef4444" size={20} />
        </button>
        <button className="cart-btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;