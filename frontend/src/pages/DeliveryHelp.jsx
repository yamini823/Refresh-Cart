import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Support.css";

function DeliveryHelp() {
  const navigate = useNavigate();

  return (
    <div className="support-page">
      <div className="support-container">
        <div className="support-hero">
          <div className="hero-left">
            <button className="back-btn" onClick={() => navigate("/support")} style={{marginBottom: "20px", background: "none", border: "none", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", color: "#16a34a", fontWeight: "600"}}>
              ← Back to Support
            </button>
            <h1>Delivery & Tracking</h1>
            <p>Learn more about our blazing fast delivery timings and tracking.</p>
            <button className="add-btn" style={{marginTop: "20px", padding: "12px 24px"}} onClick={() => navigate("/orders")}>Track Your Live Orders</button>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/2769/2769339.png" alt="Delivery" />
        </div>
        
        <div className="faq-section" style={{marginTop: "40px"}}>
          <div className="faq-box">
            <div className="faq-question">
              <h3>How long does delivery take?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              We pride ourselves on our 10-30 minute delivery window for most locations. Depending on your distance and weather conditions, this may vary slightly.
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>Is there a delivery fee?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              A standard delivery fee of ₹20 applies to all orders to ensure swift and safe handling of your groceries.
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>Can I change my delivery address after ordering?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              Once an order is confirmed and dispatched, you cannot change the address. Please ensure your address is accurate during checkout.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DeliveryHelp;
