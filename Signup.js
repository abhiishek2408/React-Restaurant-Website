import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SignupStyle.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profileImg: null,
  });

  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImg: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError({ ...error, confirmPassword: "Passwords do not match" });
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    try {
      const response = await fetch("http://localhost/backend/signup.php", {
        method: "POST",
        body: submitData,
      });
      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
      } else {
        setError(data.errors || { apiError: "Unknown error occurred." });
      }
    } catch (error) {
      setError({ apiError: "An error occurred during registration: " + error.message });
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

        <a href="#menu" className="btn">
          Explore Our Menu
        </a>
      </div>

      <div className="right-panel">
        <div className="form-panel">
          <div className="form-content">
            <h2>Sign up</h2>
            <p>Create an account to start your journey with us.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-group input-half">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {error.username && <div className="error">{error.username}</div>}
                </div>

                <div className="input-group input-half">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {error.email && <div className="error">{error.email}</div>}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group input-half">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {error.password && <div className="error">{error.password}</div>}
                </div>
                <div className="input-group input-half">
                  <label htmlFor="confirm_password">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {error.confirmPassword && (
                    <div className="error">{error.confirmPassword}</div>
                  )}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group input-half">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group input-half">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group input-half">
                  <label htmlFor="bio">Bio:</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group input-half">
                  <label htmlFor="profile_img">Profile Image:</label>
                  <input
                    type="file"
                    name="profileImg"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {error.profileImg && <div className="error">{error.profileImg}</div>}
                </div>
              </div>

              <button type="submit" className="continue-btn">Register</button>
            </form>

            {error.apiError && <div className="error">{error.apiError}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <p className="signin-link">
            Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
