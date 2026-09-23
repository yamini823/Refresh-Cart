import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Support.css";

function StoreInfo() {
  const navigate = useNavigate();

  return (
    <div className="support-page">
      <div className="support-container">
        <div className="support-hero">
          <div className="hero-left">
            <button className="back-btn" onClick={() => navigate("/support")} style={{marginBottom: "20px", background: "none", border: "none", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", color: "#16a34a", fontWeight: "600"}}>
              ← Back to Support
            </button>
            <h1>Store Information</h1>
            <p>Learn more about Refresh Cart operations and policies.</p>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/862/862856.png" alt="Store Info" />
        </div>
        
        <div className="faq-section" style={{marginTop: "40px"}}>
          <div className="faq-box">
            <div className="faq-question">
              <h3>What are your operating hours?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              We operate 24/7 in most metro areas. You can place an order at any time, and we will deliver it within our promised timeframe.
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>How can I partner with Refresh Cart?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              We're always looking for suppliers and delivery partners! Please reach out to us at partners@refreshcart.com.
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>Where are your stores located?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              Refresh Cart operates through dark stores across the country to ensure hyper-local 10-minute delivery, so we do not have traditional walk-in retail stores.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StoreInfo;
