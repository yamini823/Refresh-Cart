import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Deals from "./pages/Deals";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import SearchPage from "./pages/SearchPage";
import EditProfile from "./pages/EditProfile";
import Addresses from "./pages/Addresses";
import AddAddress from "./pages/AddAddress";
import LiveChat from "./pages/LiveChat";
import Support from "./pages/Support";
import PaymentHelp from "./pages/PaymentHelp";
import DeliveryHelp from "./pages/DeliveryHelp";
import Returns from "./pages/Returns";
import StoreInfo from "./pages/StoreInfo";
import OrderHelp from "./pages/OrderHelp";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AIChatbot from "./components/AIChatbot";
import Navbar from "./components/Navbar";
import PublicNavbar from "./components/PublicNavbar";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("user")
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("loginStateChange", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("loginStateChange", handleAuthChange);
    };
  }, []);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const hideNavbarRoutes = [
    "/verify-otp"
  ];

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div className="app-wrapper">

      {!hideNavbarRoutes.includes(location.pathname) && (
        isLoggedIn ? (
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        ) : (
          <PublicNavbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )
      )}

      <Toaster 
        toastOptions={{
          style: {
            fontSize: '16px',
            padding: '16px',
            borderRadius: '8px',
            fontWeight: '500',
          },
          duration: 3000,
        }} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/live-chat" element={<LiveChat />} />

        <Route path="/payment-help" element={<ProtectedRoute><PaymentHelp /></ProtectedRoute>} />
        <Route path="/delivery-help" element={<ProtectedRoute><DeliveryHelp /></ProtectedRoute>} />
        <Route path="/returns" element={<ProtectedRoute><Returns /></ProtectedRoute>} />
        <Route path="/store-info" element={<ProtectedRoute><StoreInfo /></ProtectedRoute>} />
        <Route path="/order-help" element={<ProtectedRoute><OrderHelp /></ProtectedRoute>} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <Addresses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-address"
          element={
            <ProtectedRoute>
              <AddAddress />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      </Routes>

      <AIChatbot />
    </div>
  );
}

export default App;