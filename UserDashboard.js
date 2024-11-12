import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Home"; // Import necessary components
import About from "./About";
import Profile from "./Profile";
import Cart from "./Cart";
import Order from "./Order";
import BookTable from "./BookOccasion";
import EventBook from "./EventBook";
import "./UserDashboardStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const location = useLocation();
  const [user, setUser] = useState(
    location.state?.user || JSON.parse(localStorage.getItem("user"))
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation after logout
  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#logindropdown") &&
        !event.target.closest("#loginButton")
      ) {
        setIsDropdownOpen(false);
      }
      if (
        !event.target.closest("#profiledropdown") &&
        !event.target.closest("#profile-content")
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // if (!user) {
  //   return <div>No user data found.</div>;
  // }

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/backend/logout.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again later.");
    }
  };

  return (
    <div>
      {/* {user ? (
       <>
         <h1>Welcome, {user.username}!</h1>
         <h1>user_id: {user.user_id}</h1>
         <h1>Role: {user.role}</h1>
         <h1>Email: {user.email}</h1>
         <h1>Bio: {user.bio}</h1>
         <h1>Phone: {user.phone}</h1>
         
      </>
      ) : (
        <h1>Welcome, Guest!</h1>
       )}  */}

      <nav>
        <div className="hamburger" id="hamburgerMenu">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <h1>Bistrofy</h1>

        <div className="nav-links">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/order">Menu</Link>
            </li>
            <li>
              <Link to="/eventbook">Book</Link>
            </li>
            
            <li>
              <Link
                id="loginButton"
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                Login
              </Link>
              {isDropdownOpen && (
                <div className="dropdown show" id="logindropdown">
                  <Link to="/login">Signin</Link>
                  <Link to="/signup">Signup</Link>
                  <Link to="/logout" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </li>
            
            <li>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'white', fontSize: '24px' }} />
        </Link>
      </li>

          </ul>
        </div>

        <div
          className="profile-container"
          id="profile-content"
          onClick={toggleProfileDropdown}
        >
          <img
            src="https://cdn.vectorstock.com/i/500p/96/75/gray-scale-male-character-profile-picture-vector-51589675.jpg"
            alt="User"
            className="profile-picture"
          />

          {isProfileDropdownOpen && (
            <div className="dropdown show" id="profiledropdown">
              <Link to="/profile" id="profile-page">
                View Profile
              </Link>
              <Link to="/order-history">Order History</Link>
              <Link to="/reservations">My Reservations</Link>
              <Link to="/logout" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Render Sub-routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order" element={<Order />} />
        <Route path="/booktable" element={<BookTable />} />
        <Route path="/eventbook" element={<EventBook />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
