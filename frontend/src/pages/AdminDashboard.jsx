import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import { Users, Package, ShoppingBag, DollarSign, Calendar, RefreshCw } from "lucide-react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch general stats
      const statsRes = await API.get("/admin/stats");
      setStats(statsRes.data);

      // Fetch recent orders
      const ordersRes = await API.get("/orders");
      // Take top 5 recent orders
      setRecentOrders(ordersRes.data.slice(0, 5));
    } catch (error) {
      console.log("Error fetching admin dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p className="subtitle">Real-time statistics & activity</p>
          </div>
          <button className="refresh-btn" onClick={fetchStats} disabled={loading}>
            <RefreshCw size={16} className={loading ? "spin" : ""} />
            Refresh
          </button>
        </header>

        {loading ? (
          <div className="admin-loader">Loading stats...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="card-info">
                  <h3>Total Users</h3>
                  <h2>{stats.totalUsers}</h2>
                </div>
                <div className="card-icon">
                  <Users size={28} />
                </div>
              </div>

              <div className="stat-card green">
                <div className="card-info">
                  <h3>Total Products</h3>
                  <h2>{stats.totalProducts}</h2>
                </div>
                <div className="card-icon">
                  <Package size={28} />
                </div>
              </div>

              <div className="stat-card orange">
                <div className="card-info">
                  <h3>Total Orders</h3>
                  <h2>{stats.totalOrders}</h2>
                </div>
                <div className="card-icon">
                  <ShoppingBag size={28} />
                </div>
              </div>

              <div className="stat-card red">
                <div className="card-info">
                  <h3>Revenue</h3>
                  <h2>₹{stats.revenue}</h2>
                </div>
                <div className="card-icon">
                  <DollarSign size={28} />
                </div>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="dashboard-content-layout">
              <div className="dashboard-section-card">
                <div className="section-header">
                  <h2>Recent Orders</h2>
                  <span className="badge">Latest Activity</span>
                </div>
                <div className="table-wrapper">
                  {recentOrders.length === 0 ? (
                    <p className="no-data">No orders placed yet.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order._id}>
                            <td className="font-mono text-sm">{order._id.substring(order._id.length - 8)}</td>
                            <td>{order.address?.name || "Customer"}</td>
                            <td>{order.items?.length || 0} items</td>
                            <td className="font-semibold">₹{order.total}</td>
                            <td>
                              <span className={`status-badge ${order.status?.toLowerCase() || "processing"}`}>
                                {order.status || "Processing"}
                              </span>
                            </td>
                            <td>
                              <div className="date-cell">
                                <Calendar size={14} />
                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;