import "./Orders.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      const validOrders = res.data.map(order => {
        const validItems = (order.items || []).filter(
          item => item && item.name && item.price !== undefined
        );
        const recalcTotal = validItems.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0) + 20; // adding 20 for delivery as seen in Checkout
        return {
          ...order,
          items: validItems,
          total: recalcTotal > 20 ? recalcTotal : order.total
        };
      }).filter(order => order.items.length > 0);
      setOrders(validOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const reorderItems = async (orderId) => {
    try {
      await API.post(`/orders/${orderId}/reorder`);
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Items added to cart 🛒");
      navigate("/cart");
    } catch (error) {
      console.log("Reorder error:", error);
      toast.error(error?.response?.data?.message || "Failed to reorder. Please try again.");
    }
  };

  const handleRating = (orderId, star) => {
    setRating((prev) => ({ ...prev, [orderId]: star }));
    toast.success(`Rated ${star} stars ⭐`);
  };

  const getStatusColor = (status) => {
    if (!status) return {};
    const s = status.toLowerCase();
    if (s === "delivered") return { background: "#dcfce7", color: "#16a34a" };
    if (s === "processing") return { background: "#fef3c7", color: "#d97706" };
    if (s === "cancelled") return { background: "#fee2e2", color: "#dc2626" };
    return { background: "#dbeafe", color: "#2563eb" };
  };

  return (
    <div className="orders-page">
      <div className="orders-container">

        {/* TOP HEADER */}
        <div className="orders-top">
          <div>
            <h1>My Orders</h1>
            <p>Track and manage your grocery orders</p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <div className="empty-orders">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="No orders"
            />
            <h2>No Orders Yet</h2>
            <p>Start shopping to see your orders here!</p>
          </div>
        )}

        {/* ORDER CARDS */}
        {orders.map((order) => (
          <div className="order-card" key={order._id}>

            {/* CARD HEADER */}
            <div className="order-header">
              <div className="order-id-section">
                <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                <p className="order-date">
                  📅 {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="right-header">
                <span className="status" style={getStatusColor(order.status)}>
                  {order.status || "Pending"}
                </span>
                <span className="order-total">₹{order.total}</span>
                <span className="payment-tag">{order.paymentMethod}</span>
              </div>
            </div>

            {/* PRODUCT ITEMS */}
            <div className="products-grid">
              {order.items?.map((item, index) => (
                <div className="product-box" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className="product-box-info">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <span>₹{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTIONS BAR */}
            <div className="order-buttons">
              {/* STAR RATING */}
              <div className="rating-box">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= (rating[order._id] || 0) ? "star active-star" : "star"}
                    onClick={() => handleRating(order._id, star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <button className="outline-btn" onClick={() => setSelectedOrder(order)}>
                📄 View Details
              </button>

              <button className="green-btn" onClick={() => reorderItems(order._id)}>
                🔁 Reorder
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selectedOrder && (
        <div className="details-modal" onClick={() => setSelectedOrder(null)}>
          <div className="details-card" onClick={(e) => e.stopPropagation()}>
            <h2>📦 Order Details</h2>

            <p><strong>Order ID:</strong> #{selectedOrder._id.slice(-6).toUpperCase()}</p>
            <p><strong>Status:</strong> {selectedOrder.status || "Pending"}</p>
            <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Total:</strong> ₹{selectedOrder.total}</p>

            <h3>🏠 Delivery Address</h3>
            <p>{selectedOrder.address?.fullName}</p>
            <p>{selectedOrder.address?.street}</p>
            <p>{selectedOrder.address?.city}</p>

            <button
              className="green-btn"
              style={{ marginTop: "24px", width: "100%" }}
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Orders;