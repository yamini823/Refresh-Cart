import "./Profile.css";



import Footer from "../components/Footer";

import API from "../api/axios";



import {
  useState,
  useEffect
} from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate =
    useNavigate();



  const [ordersCount,
    setOrdersCount] =
      useState(0);

  const [wishlistCount,
    setWishlistCount] =
      useState(0);

  const [cartCount,
    setCartCount] =
      useState(0);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(() => {

    fetchCounts();

  }, []);

  // FETCH COUNTS

  const fetchCounts =
    async () => {

      try {

        // ORDERS

        const ordersRes =
          await API.get(
            "/orders"
          );

        setOrdersCount(
          ordersRes.data.length
        );

        // WISHLIST

        const wishlistRes =
          await API.get(
            "/wishlist"
          );

        setWishlistCount(
          wishlistRes.data.length
        );

        // CART

        const cartRes =
          await API.get(
            "/cart"
          );

        setCartCount(
          cartRes.data.length
        );

      } catch (error) {

        console.log(error);

      }

};

  // LOGOUT

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="profile-page">



      <div className="profile-container">

        {/* TOP */}

        <div className="profile-top-card">

          <div className="profile-left">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
            />

            <div>

              <h1>

                {
                  user.name ||
                  "User"
                }

              </h1>

              <p>

                {
                  user.email ||
                  "No Email"
                }

              </p>

            </div>

          </div>

        <button
  className="edit-profile-btn"
  onClick={() => navigate("/edit-profile")}
>
  Edit Profile
</button>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <h2>

              {
                ordersCount
              }

            </h2>

            <p>

              Orders

            </p>

          </div>

          <div className="stat-card">

            <h2>

              {
                wishlistCount
              }

            </h2>

            <p>

              Wishlist

            </p>

          </div>

          <div className="stat-card">

            <h2>

              {
                cartCount
              }

            </h2>

            <p>

              Cart Items

            </p>

          </div>

        </div>

        {/* OPTIONS */}

        <div className="profile-options">

          <div
            className="option-card"

            onClick={() =>
              navigate("/orders")
            }
          >

            <span>📦</span>

            <div>

              <h3>

                My Orders

              </h3>

              <p>

                Track your orders

              </p>

            </div>

          </div>

          <div
            className="option-card"

            onClick={() =>
              navigate("/wishlist")
            }
          >

            <span>❤️</span>

            <div>

              <h3>

                Wishlist

              </h3>

              <p>

                Saved products

              </p>

            </div>

          </div>

          <div
            className="option-card"

            onClick={() =>
              navigate("/cart")
            }
          >

            <span>🛒</span>

            <div>

              <h3>

                My Cart

              </h3>

              <p>

                View cart items

              </p>

            </div>

          </div>
<div

  className="option-card"

  onClick={() =>
    navigate("/addresses")
  }

>

            <span>📍</span>

            <div>

              <h3>

                Saved Address

              </h3>

              <p>

                Manage addresses

              </p>

            </div>

          </div>
<div

  className="option-card"

  onClick={() =>
    navigate("/support")
  }

>

            <span>🎧</span>

            <div>

              <h3>

                Help & Support

              </h3>

              <p>

                Customer support

              </p>

            </div>

          </div>

          <div

            className="option-card logout-card"

            onClick={handleLogout}

          >

            <span>🚪</span>

            <div>

              <h3>

                Logout

              </h3>

              <p>

                Sign out account

              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Profile;