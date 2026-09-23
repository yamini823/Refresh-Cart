import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from "lucide-react";
import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      route: "/admin",
    },
    {
      name: "Products",
      icon: <Package size={20} />,
      route: "/admin/products",
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={20} />,
      route: "/admin/orders",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      route: "/admin/users",
    },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">🟢</div>
        <h2>Refresh Cart</h2>
        <span className="badge">Admin Panel</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const isActive = path === item.route;
          return (
            <div
              key={item.name}
              className={`menu-item ${isActive ? "active" : ""}`}
              onClick={() => navigate(item.route)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="menu-item return-btn" onClick={() => navigate("/dashboard")}>
          <span className="menu-icon">
            <ArrowLeft size={20} />
          </span>
          <span className="menu-text">Back to Store</span>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
