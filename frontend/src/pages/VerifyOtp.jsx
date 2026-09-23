import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import "./VerifyOtp.css";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

const type = location.state?.type;
  const email = localStorage.getItem("email");
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );
console.log(response.data);

localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(
    response.data.user
  )
);

window.dispatchEvent(new Event("loginStateChange"));

      alert("OTP Verified");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Invalid OTP";
      alert(errorMessage);
    }
  };

  return (
    <div className="verify-page">
     

      <div className="verify-container">
        <div className="verify-card">
          <img  src="/logo.png" alt="logo" className="card-logo"  />

         <h2>
  {type === "login"
    ? "Welcome Back"
    : "Create Account"}
</h2>
          <p className="subtitle">
          {
  type === "login"
    ? "Enter the login OTP"
    : "Verify your email"
}
          </p>

          <p className="otp-message">
            We've sent a 6-digit code to{" "}
            <span>{email}</span>
          </p>

          <form onSubmit={handleVerifyOtp}>

            <label>Enter OTP</label>

            <input
              type="text"
              placeholder="* * * * * *"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />

            <button
              type="submit"
              className="verify-btn"
            >
              {
  type === "login"
    ? "Verify & Log In"
    : "Verify & Create Account"
}
            </button>

          </form>

          <p
            className="change-text"
            onClick={() => navigate("/signup")}
          >
            Change email
          </p>

          <p className="bottom-text">
            Already have an account?{" "}

            <span onClick={() => navigate("/login")}>
              Log In
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default VerifyOtp;