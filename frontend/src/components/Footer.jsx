import "../styles/footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>🛒 RefreshCart</h2>
          <p>
            Fresh groceries delivered to your doorstep.
            Quality products at the best prices.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Deals</p>
          <p>My Orders</p>
        </div>

        <div className="footer-contact">
          <h3>Contact Support</h3>
          <p>📞 1-800-REFRESH-CART</p>
          <p>✉ {import.meta.env.VITE_ADMIN_EMAIL}</p>
          <p>Available 24/7</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 RefreshCart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;