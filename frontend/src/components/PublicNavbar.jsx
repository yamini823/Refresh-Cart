import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function PublicNavbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="logo" />
        <h2>Refresh Cart</h2>
      </div>

      <div className="right-section">
        <div className="auth-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>

          <button
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>

        <span
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </span>
      </div>
    </div>
  );
}

export default PublicNavbar;