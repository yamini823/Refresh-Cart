import "./Checkout.css";


import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import toast from "react-hot-toast";
import API from "../api/axios";

function Checkout() {

  const navigate = useNavigate();

  const cartItems =
    (JSON.parse(
      localStorage.getItem(
        "checkoutItems"
      )
    ) || []).filter(
      item => item && item.productId && item.productId.name && item.productId._id
    );

  const total = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  const [paymentMethod,
    setPaymentMethod] =
    useState("cod");

  const [address, setAddress] = useState({
    name:"",
    mobile:"",
    address:"",
    city:"",
    pincode:"",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: ""
  });

  const handlePaymentChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your basket is empty.");
      return;
    }

    const { name, mobile, address: addr, city, pincode } = address;
    if (!name || !mobile || !addr || !city || !pincode) {
      toast.error("Please fill all delivery details.");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Please enter a valid 6-digit PIN code.");
      return;
    }

    try {
      const finalTotal = Number(total) - 40 + 20;
      
      const orderData = {
        items: cartItems.map((item) => ({
          name: item.productId?.name,
          image: item.productId?.image,
          price: item.productId?.price,
          quantity: item.quantity,
          productId: item.productId?._id,
        })),
        total: finalTotal,
        paymentMethod,
        address,
        status: paymentMethod === "cod" ? "Pending" : "Processing"
      };

      if (paymentMethod === "cod") {
        await API.post("/orders", orderData);
        
        await API.delete("/cart/clear");
        localStorage.removeItem("checkoutItems");
        localStorage.removeItem("checkoutTotal");

        toast.success("Order placed successfully 🎉");
        window.dispatchEvent(new Event("cartUpdated"));
        navigate("/orders");
      } else {
        // Razorpay Flow
        const res = await loadRazorpayScript();
        if (!res) {
          toast.error("Razorpay SDK failed to load. Check your connection.");
          return;
        }

        const { data: createOrderData } = await API.post("/payment/create-order", orderData);
        if (!createOrderData.success) {
          toast.error("Failed to initiate payment.");
          return;
        }

        const options = {
          key: createOrderData.key_id,
          amount: createOrderData.order.amount,
          currency: "INR",
          name: "Refresh Cart",
          description: "Grocery Order",
          order_id: createOrderData.order.id,
          handler: async function (response) {
            try {
              const verifyData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: createOrderData.dbOrderId
              };

              const { data: verifyRes } = await API.post("/payment/verify", verifyData);
              if (verifyRes.success) {
                await API.delete("/cart/clear");
                localStorage.removeItem("checkoutItems");
                localStorage.removeItem("checkoutTotal");
                toast.success("Payment successful! Order placed 🎉");
                window.dispatchEvent(new Event("cartUpdated"));
                navigate("/orders");
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (err) {
              console.error(err);
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: address.name,
            contact: address.mobile
          },
          theme: {
            color: "#16a34a"
          },
          modal: {
            ondismiss: async function () {
              try {
                await API.post("/payment/cancel", { dbOrderId: createOrderData.dbOrderId });
              } catch (e) {}
              toast.error("Payment cancelled.");
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          toast.error(response.error.description);
        });
        rzp.open();
      }

    } catch (error) {
      console.log(error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (

    <div className="checkout-page">



      <div className="checkout-wrapper">

        {/* LEFT */}

        <div className="checkout-left">

          <h1 className="checkout-title">

            Checkout

          </h1>

          {/* ADDRESS */}

          <div className="checkout-card">

            <div className="card-title">

              📍 Delivery Address

            </div>

            <div className="input-row">

              <input
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                onChange={
                  handleChange
                }
              />

            </div>

            <textarea
              placeholder="House / Street / Area"
              name="address"
              onChange={
                handleChange
              }
            />

            <div className="input-row">

              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                placeholder="Pincode"
                name="pincode"
                onChange={
                  handleChange
                }
              />

            </div>

            <div className="safe-box">

              ✅ Your address is safe with us

            </div>

          </div>

          {/* PAYMENT */}

          <div className="checkout-card">

            <div className="card-title">

              💳 Payment Method

            </div>

            {/* COD */}

            <div
              className={
                paymentMethod ===
                "cod"

                  ? "payment-box active"

                  : "payment-box"
              }

              onClick={() =>
                setPaymentMethod(
                  "cod"
                )
              }
            >

              <div>

                <h3>

                  Cash on Delivery

                </h3>

                <p>

                  Pay when order arrives

                </p>

              </div>

              <input
                type="radio"
                checked={
                  paymentMethod ===
                  "cod"
                }
                readOnly
              />

            </div>

            {/* UPI */}

            <div
              className={
                paymentMethod ===
                "upi"

                  ? "payment-box active"

                  : "payment-box"
              }

              onClick={() =>
                setPaymentMethod(
                  "upi"
                )
              }
            >

              <div>
                <h3>UPI Payment</h3>
                <p>GPay / PhonePe / Paytm</p>
              </div>
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                readOnly
              />
            </div>
            {/* CARD */}
            <div
              className={paymentMethod === "card" ? "payment-box active" : "payment-box"}
              onClick={() => setPaymentMethod("card")}
            >
              <div>
                <h3>Credit / Debit Card</h3>
                <p>Secure card payment</p>
              </div>

              <input
                type="radio"
                checked={
                  paymentMethod ===
                  "card"
                }
                readOnly
              />

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="checkout-right">

          <div className="summary-card">

            <h2>

              Order Summary

            </h2>

            {cartItems.map(
              (item,index) => {
                if (!item.productId) return null;
                return (
                <div
                  className="summary-product"
                  key={index}
                >

                  <img
                    src={
                      item.productId?.image
                    }
                    alt=""
                  />

                  <div>

                    <h4>

                      {
                        item.productId?.name
                      }

                    </h4>

                    <p>

                      Qty:
                      {" "}
                      {
                        item.quantity
                      }

                    </p>

                  </div>

                  <span>

                    ₹{
                      item.productId
                        ?.price *
                      item.quantity
                    }

                  </span>

                </div>

              )}
            )}

            <hr />

            <div className="price-line">

              <span>
                MRP Total
              </span>

              <span>
                ₹{total}
              </span>

            </div>

            <div className="price-line green">

              <span>
                Discount
              </span>

              <span>
                -₹40
              </span>

            </div>

            <div className="price-line">

              <span>
                Delivery Fee
              </span>

              <span>
                ₹20
              </span>

            </div>

            <div className="pay-box">

              <span>

                To Pay

              </span>

              <h1>

                ₹{
                  Number(total)
                  - 40 + 20
                }

              </h1>

            </div>

            <div className="delivery-box">

              ⚡ Delivery in 10 mins

            </div>

            <button
              className="place-btn"
              onClick={
                handlePlaceOrder
              }
            >

              Place Order →

            </button>

            <button
              className="continue-btn"
              onClick={() =>
                navigate("/")
              }
            >

              ← Continue Shopping

            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Checkout;