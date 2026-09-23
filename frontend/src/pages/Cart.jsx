import "./Cart.css";

import { useEffect, useState } from "react";

import API from "../api/axios";

import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  

  useEffect(() => {

    fetchCart();

  }, []);

  // FETCH CART

  const fetchCart = async () => {

    try {

      const res =
        await API.get("/cart");

      const validCart = res.data.filter(
        item => item && item.productId && item.productId.name && item.productId._id
      );

      setCartItems(validCart);

    } catch (error) {

      console.log(error);

    }

  };

  // UPDATE QUANTITY
  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;
    try {
      await API.put(`/cart/${id}`, { quantity: qty });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE ITEM
  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      toast.error("Removed from cart");
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL

  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +

        (
          item.productId?.price || 0
        ) * item.quantity,

      0
    );

  // CHECKOUT

  const handleCheckout = () => {

    const validItems = cartItems.filter(item => item.productId);

    if (validItems.length === 0) {
      toast.error("Your basket is empty! Please add some items first. 🛒");
      return;
    }

    localStorage.setItem(
      "checkoutItems",
      JSON.stringify(validItems)
    );

    localStorage.setItem(
      "checkoutTotal",
      totalPrice
    );

    toast.success(
      "Proceeding to checkout 🚀"
    );

    navigate("/checkout");

  };

  return (

    <div className="cart-page">

      {/* MAIN */}

      <div className="cart-container">

        {/* LEFT */}

        <div className="cart-left">

          {/* TITLE */}

          <div className="cart-header">

            <h1>

              Your Basket

            </h1>

            <span>

              {
                cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
              } items

            </span>

          </div>

         

          {/* ITEMS */}

          {cartItems.map((item) => {
            if (!item.productId) return null;
            return (
            <div
              className="cart-card"
              key={item._id}
            >

              {/* IMAGE */}

              <img
                src={
                  item.productId?.image
                }
                alt=""
                className="cart-image"
              />

              {/* INFO */}

              <div className="cart-info">

                <h2>

                  {
                    item.productId?.name
                  }

                </h2>

                <p>

                  1 kg

                </p>

                <div className="price-row">

                  <h3>

                    ₹{
                      item.productId?.price
                    }

                  </h3>

                  <span>

                    ₹{
                      item.productId
                        ?.oldPrice
                    }

                  </span>

                </div>

                <div className="offer">

                  {
                    item.productId
                      ?.offer
                  }

                </div>

              </div>

              {/* RIGHT */}

              <div className="cart-actions">

                {/* QUANTITY */}

                <div className="qty-box">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity - 1
                      )
                    }
                  >

                    −

                  </button>

                  <span>

                    {
                      item.quantity
                    }

                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity + 1
                      )
                    }
                  >

                    +

                  </button>

                </div>

                {/* REMOVE */}

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(
                      item._id
                    )
                  }
                >

                  🗑 Remove

                </button>

              </div>

            </div>
            );
          })}

        </div>

        {/* RIGHT */}

        <div className="cart-right">

          <div className="summary-card">

            <h2>

              Order Summary

            </h2>

            <div className="summary-row">

              <span>
                MRP Total
              </span>

              <span>
                ₹{totalPrice + 80}
              </span>

            </div>

            <div className="summary-row green">

              <span>
                Discount
              </span>

              <span>
                -₹80
              </span>

            </div>

            <div className="summary-row">

              <span>
                Delivery Fee
              </span>

              <span>
                ₹20
              </span>

            </div>

            <hr />

            <div className="summary-total">

              <span>
                To Pay
              </span>

              <h1>
                ₹{totalPrice}
              </h1>

            </div>

            {/* DELIVERY */}

            <div className="delivery-box">

              ⚡ Delivery in
              {" "}
              10 mins

            </div>

            {/* BUTTONS */}

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >

              Proceed to Checkout →

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

      {/* FOOTER */}

      <Footer />

    </div>

  );

}

export default Cart;