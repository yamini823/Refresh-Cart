import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import toast from "react-hot-toast";
import { Calendar, MapPin, CreditCard, ShoppingCart, Search, X, Loader } from "lucide-react";
import "./AdminDashboard.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const statusOptions = ["Processing", "Packed", "Shipped", "Delivered", "Cancelled"];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders list");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order status updated to "${newStatus}"! 📦`);
      // Update local state without hitting API again
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status");
    }
  };

  // Filter orders by ID or customer name
  const filteredOrders = orders.filter(
    (order) =>
      order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Orders Management</h1>
            <p className="subtitle">Track statuses, verify shipments, and manage payments</p>
          </div>
        </header>

        {/* Filter controls */}
        <div className="table-actions-bar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search orders by Order ID, customer, status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X size={16} className="clear-icon" onClick={() => setSearchQuery("")} />
            )}
          </div>
        </div>

        {loading ? (
          <div className="admin-loader">
            <Loader size={36} className="spin" />
            <p>Loading orders list...</p>
          </div>
        ) : (
          <div className="dashboard-section-card">
            <div className="table-wrapper">
              {filteredOrders.length === 0 ? (
                <p className="no-data">No orders found.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Details</th>
                      <th>Items Purchased</th>
                      <th>Summary</th>
                      <th>Status Update</th>
                      <th>Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id}>
                        {/* Order ID */}
                        <td className="order-id-cell">
                          <span className="font-mono text-sm font-semibold text-slate-800">
                            #{order._id.substring(order._id.length - 8)}
                          </span>
                        </td>
                        
                        {/* Customer & Address Details */}
                        <td>
                          <div className="customer-info-cell">
                            <span className="customer-name">{order.address?.name || "Customer"}</span>
                            <span className="customer-phone">{order.address?.mobile || "No Contact"}</span>
                            <div className="customer-address">
                              <MapPin size={12} style={{ flexShrink: 0 }} />
                              <span>
                                {order.address?.address}, {order.address?.city} - {order.address?.pincode}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Items */}
                        <td>
                          <div className="items-cell">
                            {order.items?.map((item, index) => (
                              <div key={index} className="order-item-row">
                                <span className="item-name">• {item.name}</span>
                                <span className="item-qty">x {item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Order Total & Payment Method */}
                        <td>
                          <div className="summary-cell">
                            <span className="order-total-price font-semibold">₹{order.total}</span>
                            <span className="pay-method-badge">
                              <CreditCard size={12} />
                              {order.paymentMethod?.toUpperCase() || "COD"}
                            </span>
                          </div>
                        </td>

                        {/* Status Select */}
                        <td>
                          <select
                            className={`status-select ${order.status?.toLowerCase() || "processing"}`}
                            value={order.status || "Processing"}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            {statusOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Order Date */}
                        <td>
                          <div className="date-cell">
                            <Calendar size={14} />
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;