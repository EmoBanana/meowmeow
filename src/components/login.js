import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  //Hardcoded phone numbers and merchant IDs for testing purposes
  //Each phone number is mapped to a merchant ID
  //In a real application, this data would be fetched from a server
  const phoneToMerchantMap = {
    "0109450225": "0c2d7",
    "01156388248": "3b7f0",
  };

  //No means of signing up yet for this prototype
  //In a real application, this would be a form to collect user information
  const handleSignUp = () => {
    alert("Feature Invalid: Sign Up feature is not available yet.");
  };

  //Only phone number "0109450225" and "01156388248" are recognized
  //In a real application, this would be checked against a database
  const handleSendOtp = () => {
    if (!phoneNumber.trim()) {
      alert("Please enter a valid phone number");
      return;
    }
    if (!phoneToMerchantMap[phoneNumber]) {
      alert("Phone number not recognized");
      return;
    }
    alert(`OTP code sent to ${phoneNumber}`);
    setOtpSent(true);
  };

  const handleLogin = () => {
    if (!otpSent) {
      alert("Please request an OTP first");
      return;
    }

    if (!otp.trim()) {
      alert("Please enter the OTP code");
      return;
    }

    //Navigate to respective chat page based on the merchant ID
    const merchantId = phoneToMerchantMap[phoneNumber];
    if (merchantId) {
      alert("Login successful!");
      navigate(`/chat/${merchantId}`);
    } else {
      alert("Phone number not recognized");
    }
  };

  //Hardcode to navigate to first merchant page for testing purposes
  //In a real application, this would be replaced with actual authentication logic
  const handleGoogleLogin = () => {
    alert("Google login clicked");
    navigate("/chat/0c2d7");
  };

  //Hardcode to navigate to first merchant page for testing purposes
  //In a real application, this would be replaced with actual authentication logic
  const handleFacebookLogin = () => {
    alert("Facebook login clicked");
    navigate("/chat/0c2d7");
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h1 className="login-title">Login</h1>
        <p className="signup-text">
          Don't have an account?{" "}
          <span className="link-text" onClick={handleSignUp}>
            Sign Up
          </span>
        </p>

        <div className="input-group">
          <label>Phone Number</label>
          <div className="phone-input-group">
            <input
              type="text"
              placeholder="0123456789"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button className="otp-button" onClick={handleSendOtp}>
              Request OTP
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>OTP</label>
          <input
            type="password"
            placeholder="******"
            value={otp}
            disabled={!otpSent}
            onChange={(e) => setOtp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div className="remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>

        <div className="divider">OR</div>

        <button className="social-button" onClick={handleGoogleLogin}>
          <img src="google.png" alt="Google" />
          Continue with Google
        </button>

        <button className="social-button" onClick={handleFacebookLogin}>
          <img className="facebook" src="/facebook.png" alt="Facebook" />
          Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
