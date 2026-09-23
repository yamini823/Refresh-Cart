import "./ProductDetails.css";


import Footer from "../components/Footer";

import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import API from "../api/axios";
import toast from "react-hot-toast";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [mainImage, setMainImage] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity,
      });
      toast.success("Added to cart 🛒");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  const handleBuyNow = async () => {
    await addToCart();
    navigate("/cart");
  };

  useEffect(() => {

    API.get(`/products/${id}`)

      .then((res) => {

        setProduct(res.data);

        setMainImage(

          res.data.images?.[0]
          ||
          res.data.image

        );

      })

      .catch((err) => {

        console.log(err);

      });

  }, [id]);

  if (!product) {

    return <h1>Loading...</h1>;

  }

  return (

    <div className="details-page">



      <div className="details-container">

        {/* LEFT */}

        <div className="details-left">

          <div className="main-image-box">

            <img
              src={mainImage}
              alt=""
            />

            <span className="offer-badge">

              {product.offer}

            </span>

          </div>

          <div className="thumbnail-row">

            {(product.images ||
              [product.image]).map(
              (img, index) => (

                <img

                  key={index}

                  src={img}

                  alt=""

                  className={
                    mainImage === img
                      ? "thumb active-thumb"
                      : "thumb"
                  }

                  onClick={() =>
                    setMainImage(img)
                  }
                />

              )
            )}

          </div>

        </div>

        {/* RIGHT */}

        <div className="details-right">

          <p className="brand">

            {product.brand}

          </p>

          <h1>

            {product.name}

          </h1>

          <div className="rating">

            ⭐ {product.rating}

          </div>

          <div className="price-row">

            <span className="new-price">

              ₹{product.price}

            </span>

            <del>

              ₹{product.oldPrice}

            </del>

          </div>

          <p className="description">

            {product.description}

          </p>

          <div className="stock">

            ✅ In Stock

          </div>

          <div className="delivery">

            🚚 Free Delivery

          </div>

          <div className="qty-box">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
            >
              -
            </button>

            <span>

              {quantity}

            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>

          </div>

          <div className="details-buttons">

            <button className="cart-btn" onClick={addToCart}>

              🛒 Add To Cart

            </button>

            <button className="buy-btn" onClick={handleBuyNow}>

              Buy Now

            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default ProductDetails;