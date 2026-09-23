import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import API from "../api/axios";


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSendOtp = async (e) => {

    e.preventDefault();

    setIsLoading(true);

    try {

      const response = await API.post(
        "/auth/login",
        {
          email: formData.email,
        }
      );

      console.log(response.data);

      // SAVE EMAIL
      localStorage.setItem(
        "email",
        formData.email
      );

      // SAVE TOKEN
      if (response?.data?.token) {

        localStorage.setItem(
          "token",
          response.data.token
        );

      }

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
        })
      );

      alert("OTP sent successfully to your email.");

      navigate("/verify-otp", {
        state: { type: "login" },
      });

    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Login Failed";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }

  };

  return (

    <div className="login-page">



      <div className="login-container single-login">

        <div className="login-right">

          <div className="auth-container">

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Enter your email to receive OTP
            </p>

            <form onSubmit={handleSendOtp}>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>

            </form>

            <p className="bottom-text">

              Don't have an account?

              <span
                className="link"
                onClick={() =>
                  navigate("/signup")
                }
              >
                Sign Up
              </span>

            </p>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Login;