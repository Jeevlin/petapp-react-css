import React, { useState } from "react";
import "./login.css";
import image from "../assets/pet.jpg";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api.js/petApi";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, message } = await login(email, password);
      localStorage.setItem("authToken", token);
      setSuccess(message);
      setError("");
      props.onLogin();
      navigate("/navbar");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="login">
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <div className="login-container">
          {/* Left side */}
          <div className="login-box">
            <h1 className="login-title">Pet Store Admin Login</h1>

            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />

            <div className="forgot-container">
              <Link to="/forgot" className="forgotpwd">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-button">
              Log in
            </button>
          </div>

          {/* Right side */}
          <div className="image-box">
            <img src={image} alt="Pet Store" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
