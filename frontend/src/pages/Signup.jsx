import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

import API from "../api/axios";

import "./Signup.css";

import ReCAPTCHA from "react-google-recaptcha";

import {
  GoogleLogin
} from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

function Signup() {

  const navigate = useNavigate();

  const [captchaValue, setCaptchaValue] =
    useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSignup = async (e) => {

    e.preventDefault();

    if (!captchaValue) {

      alert("Please complete the robot verification first.");

      return;

    }

    setIsLoading(true);

    try {

      const response = await API.post(
        "/auth/signup",
        formData
      );

      console.log(response.data);

      // SAVE EMAIL
      localStorage.setItem(
        "email",
        formData.email
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        })
      );

      alert("OTP sent successfully to your email.");

      navigate("/verify-otp", {
        state: { type: "signup" },
      });

    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Signup Failed";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }

  };

  return (

    <div className="signup-page">

      {/* SIGNUP CARD */}

      <div className="signup-container">

        <div className="signup-card">

          <img
            src="/logo.png"
            alt="logo"
            className="card-logo"
          />

          <h2>
            Create Account
          </h2>

          <p>
            Join RefreshCart for fresh deals!
          </p>

          <form onSubmit={handleSignup}>

            {/* NAME */}

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* EMAIL */}

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* CAPTCHA */}

            <div className="captcha-box">

              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(value) =>
                  setCaptchaValue(value)
                }
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="verify-btn"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send Verification Code"}
            </button>

          </form>

          {/* OR */}

          <div className="or-divider">

            <span></span>

            <p>OR</p>

            <span></span>

          </div>

          {/* GOOGLE LOGIN */}

          <div className="google-box">

            <GoogleLogin

              onSuccess={(
                credentialResponse
              ) => {

                const user = jwtDecode(
                  credentialResponse.credential
                );

                localStorage.setItem(
                  "user",
                  JSON.stringify(user)
                );

                navigate("/dashboard");

                window.location.reload();

              }}

              onError={() => {

                console.log(
                  "Login Failed"
                );

              }}

            />

          </div>

          {/* BOTTOM TEXT */}

          <p className="bottom-text">

            Already have an account?{" "}

            <span
              onClick={() =>
                navigate("/login")
              }
            >
              Log In
            </span>

          </p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Signup;