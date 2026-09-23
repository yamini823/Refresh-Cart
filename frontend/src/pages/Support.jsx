
import "./Support.css";


import Footer from "../components/Footer";

import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function Support() {

  const navigate =
    useNavigate();

  const [openFAQ,
    setOpenFAQ] =
      useState(null);

  const faqs = [

    {
      question:
        "How can I track my order?",

      answer:
        "Go to My Orders page to track your delivery status in real-time.",
    },

    {
      question:
        "What payment methods are available?",

      answer:
        "We support Cash on Delivery, UPI, Cards and Net Banking.",
    },

    {
      question:
        "How do I return a product?",

      answer:
        "You can request return within 24 hours after delivery.",
    },

    {
      question:
        "What are delivery timings?",

      answer:
        "Most orders are delivered within 10-30 minutes.",
    },

  ];

  return (

    <div className="support-page">

     

      <div className="support-container">

        {/* HERO */}

        <div className="support-hero">

          <div className="hero-left">

            <h1>

              We're here to help you!

            </h1>

            <p>

              Have questions or need assistance?
              Our support team is ready 24/7.

            </p>

           <div className="quick-help">

  <h3>Quick Help</h3>

  <div className="quick-help-grid">

   <div
  className="quick-card"
  onClick={() => navigate("/orders")}
>
  <span>📦</span>
  <p>Track Order</p>
</div>

<div
  className="quick-card"
  onClick={() => navigate("/payment-help")}
>
  <span>💳</span>
  <p>Payments</p>
</div>

<div
  className="quick-card"
  onClick={() => navigate("/delivery-help")}
>
  <span>🚚</span>
  <p>Delivery</p>
</div>

<div
  className="quick-card"
  onClick={() => navigate("/deals")}
>
  <span>🏷️</span>
  <p>Offers</p>
</div>

<div
  className="quick-card"
  onClick={() => navigate("/returns")}
>
  <span>🔄</span>
  <p>Returns</p>
</div>

<div
  className="quick-card"
  onClick={() => navigate("/profile")}
>
  <span>👤</span>
  <p>Account</p>
</div>

  </div>

</div>

          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/6815/6815043.png"
            alt=""
          />

        </div>

        {/* CONTACT SUPPORT */}

        <h2 className="section-title">
  Contact Support
</h2>

<div
  id="contact-support"
  className="support-grid"
>

          {/* CALL */}

          <a
            href="tel:+918143574652"
            className="support-card"
          >

            <span>📞</span>

            <h3>

              Call Support

            </h3>

            <p>

              +91 8143574652

            </p>

            <small>

              Mon - Sun, 8AM - 10PM

            </small>

          </a>

          {/* WHATSAPP */}

          <a
            href="https://wa.me/918143574652"
            target="_blank"
            rel="noreferrer"
            className="support-card"
          >

            <span>💬</span>

            <h3>

              WhatsApp Chat

            </h3>

            <p>

              Chat with us

            </p>

            <small>

              Usually replies instantly

            </small>

          </a>

          {/* EMAIL */}

          <a
            href="mailto:support@refreshcart.com"
            className="support-card"
          >

            <span>📧</span>

            <h3>

              Email Support

            </h3>

            <p>

              support@refreshcart.com

            </p>

            <small>

              Reply within 24 hrs

            </small>

          </a>

          {/* LIVE CHAT */}

          <div
            className="support-card"
            onClick={() =>
              navigate("/live-chat")
            }
          >

            <span>🟢</span>

            <h3>

              Live Chat

            </h3>

            <p>

              Chat Now

            </p>

            <small>

              Available 24/7

            </small>

          </div>

        </div>

        {/* FAQ */}

        <div className="faq-top">

          <h2 className="section-title">

            Frequently Asked Questions

          </h2>

          <button>

            View All FAQs

          </button>

        </div>

        <div className="faq-section">

          {faqs.map((faq,index)=>(

            <div
              className="faq-box"
              key={index}
            >

              <div
                className="faq-question"
                onClick={() =>
                  setOpenFAQ(
                    openFAQ === index
                    ? null
                    : index
                  )
                }
              >

                <h3>

                  {faq.question}

                </h3>

                <span>

                  {
                    openFAQ === index
                    ? "−"
                    : "+"
                  }

                </span>

              </div>

              {openFAQ === index && (

                <p className="faq-answer">

                  {faq.answer}

                </p>

              )}

            </div>

          ))}

        </div>

        {/* MORE HELP */}

        <h2 className="section-title">

          More Help

        </h2>

        <div className="more-help-grid">

          <div
            className="more-help-card"
            onClick={() =>
              navigate("/order-help")
            }
          >

            <div>

              <span>📦</span>

              <h3>

                Order Issues

              </h3>

              <p>

                Need help with your order?

              </p>

            </div>

            <h1>

              ›

            </h1>

          </div>

          <div
            className="more-help-card"
            onClick={() =>
              navigate("/payment-help")
            }
          >

            <div>

              <span>💳</span>

              <h3>

                Payment Issues

              </h3>

              <p>

                Facing payment problems?

              </p>

            </div>

            <h1>

              ›

            </h1>

          </div>

          <div
            className="more-help-card"
            onClick={() =>
              navigate("/returns")
            }
          >

            <div>

              <span>🔄</span>

              <h3>

                Returns & Refunds

              </h3>

              <p>

                Learn about refund policy

              </p>

            </div>

            <h1>

              ›

            </h1>

          </div>

          <div
            className="more-help-card"
            onClick={() =>
              navigate("/store-info")
            }
          >

            <div>

              <span>🏪</span>

              <h3>

                Store Information

              </h3>

              <p>

                About our services

              </p>

            </div>

            <h1>

              ›

            </h1>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="bottom-support">

          <div>

            <h2>

              Still need help?

            </h2>

            <p>

              Our support team is always ready.

            </p>

          </div>

          <button>

            Contact Support

          </button>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Support;
