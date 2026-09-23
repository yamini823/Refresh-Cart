import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Support.css";

function OrderHelp() {
  const navigate = useNavigate();

  return (
    <div className="support-page">
      <div className="support-container">
        <div className="support-hero">
          <div className="hero-left">
            <button className="back-btn" onClick={() => navigate("/support")} style={{marginBottom: "20px", background: "none", border: "none", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", color: "#16a34a", fontWeight: "600"}}>
              ← Back to Support
            </button>
            <h1>Order Issues</h1>
            <p>Need help with your recent orders? Find quick solutions here.</p>
            <button className="add-btn" style={{marginTop: "20px", padding: "12px 24px"}} onClick={() => navigate("/orders")}>View My Orders</button>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png" alt="Order Help" />
        </div>
        
        <div className="faq-section" style={{marginTop: "40px"}}>
          <div className="faq-box">
            <div className="faq-question">
              <h3>My order has missing items.</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              If your delivery arrived with missing items, please go to your Orders page, find the order, and click "Report Issue" or contact our live chat. We will refund the missing items immediately.
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>My order is delayed.</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              We apologize for the delay. Sometimes traffic or weather can affect delivery times. Please use the live tracking link on your Orders page to see your rider's status.
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>I received damaged products.</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              We ensure top quality, but if items were damaged during transit, you can request a return directly from the Returns page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderHelp;
