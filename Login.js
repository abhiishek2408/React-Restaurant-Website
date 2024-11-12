import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './LoginStyle.css';
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.errors && data.errors.length > 0) {
          setError(data.errors.join(", "));
        } 
        
        else {
          
          localStorage.setItem("user", JSON.stringify(data));

          if (data.role === 'admin') {
            navigate('/admin', { state: { user: data } });
          } 
          
          else {
            navigate('/', { state: { user: data } });
           console.log(data.user_id+" "+data.username+" "+data.email+" "+data.address);
          }

        }
      } 
      
      else {
        const text = await response.text();
        console.error("Unexpected response format:", text);
        setError("Unexpected response format. Please try again.");
      }
    } 
    
    catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }

  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1>Welcome to Bistrofy</h1>
        <p>Your gateway to delicious culinary experiences.</p>
        <div className="icons">
          <div className="icon">🍲</div>
          <div className="icon">🍕</div>
          <div className="icon">🍹</div>
          <div className="icon">🍜</div>
        </div>
        <a href="/" className="btn">Explore Our Menu</a>
      </div>

      <div className="right-panel">
        <div className="form-panel">
          <div className="form-content">
            <h2>Log In</h2>
            <p>Log in to access your account and continue exploring delicious culinary experiences.</p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="continue-btn">Login</button>
            </form>

            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <p className="signin-link">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

