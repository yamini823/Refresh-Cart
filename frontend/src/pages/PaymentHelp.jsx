import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Support.css"; 

function PaymentHelp() {
  const navigate = useNavigate();

  return (
    <div className="support-page">
      <div className="support-container">
        <div className="support-hero">
          <div className="hero-left">
            <button className="back-btn" onClick={() => navigate("/support")} style={{marginBottom: "20px", background: "none", border: "none", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", color: "#16a34a", fontWeight: "600"}}>
              ← Back to Support
            </button>
            <h1>Payments Help</h1>
            <p>Information on supported payment methods and resolving issues.</p>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3592/3592782.png" alt="Payments" />
        </div>
        
        <div className="faq-section" style={{marginTop: "40px"}}>
          <div className="faq-box">
            <div className="faq-question">
              <h3>What payment methods are supported?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              We support Cash on Delivery (COD), UPI (GPay, PhonePe, Paytm), and Credit/Debit Cards (Visa, Mastercard, RuPay).
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>My payment failed, but the amount was deducted. What should I do?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              If your payment failed but the amount was deducted, it will be automatically refunded to your original payment method within 5-7 business days. Please contact support if the issue persists.
            </p>
          </div>
          <div className="faq-box">
            <div className="faq-question">
              <h3>Can I change my payment method after placing an order?</h3>
            </div>
            <p className="faq-answer" style={{display: "block"}}>
              Currently, you cannot change the payment method once an order is placed. If you need to, please cancel the order and place a new one.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentHelp;
