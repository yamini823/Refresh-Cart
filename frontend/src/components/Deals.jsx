import "../styles/deals.css";
import { useNavigate } from "react-router-dom";

function Deals() {
  const navigate = useNavigate();
  const deals = [
    {
      id: 1,
      name: "Organic Bananas",
      brand: "Nature's Best",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600",
      price: 249,
      oldPrice: 349,
      discount: "30% OFF",
      rating: 4.5,
      reviews: 234,
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      brand: "Berry Fresh",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600",
      price: 499,
      oldPrice: 699,
      discount: "28% OFF",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 3,
      name: "Sourdough Bread",
      brand: "Artisan Bakes",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
      price: 549,
      oldPrice: 699,
      discount: "21% OFF",
      rating: 4.8,
      reviews: 312,
    },
    {
      id: 4,
      name: "Chicken Breast",
      brand: "Premium Meats",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600",
      price: 899,
      oldPrice: 1199,
      discount: "25% OFF",
      rating: 4.4,
      reviews: 278,
    },
    {
      id: 5,
      name: "Avocados",
      brand: "Green Gold",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600",
      price: 199,
      oldPrice: 299,
      discount: "33% OFF",
      rating: 4.2,
      reviews: 345,
    },
    {
      id: 6,
      name: "Orange Juice",
      brand: "Sunrise",
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600",
      price: 449,
      oldPrice: 599,
      discount: "25% OFF",
      rating: 4.6,
      reviews: 432,
    },
  ];

  return (
    <div className="deals-section">
      <div className="deals-header">
        <h2>🔥 Today's Deals</h2>
        <span className="view-all">
          View All
        </span>
      </div>

      <div className="deals-grid">
        {deals.map((item) => (
          <div className="deal-card" key={item.id} onClick={() =>navigate("/signup")}>
            <div className="image-box">
              <img src={item.image} alt={item.name}/>
              <span className="discount"> {item.discount}</span>
            </div>

            <div className="deal-info">
              <p className="brand"> {item.brand}</p>
              <h3> {item.name} </h3>
              <div className="rating"> ⭐{item.rating} ({item.reviews})</div>
              <div className="price-box">
                <span className="new-price">  ₹{item.price}</span>
                <span className="old-price">  ₹{item.oldPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Deals;