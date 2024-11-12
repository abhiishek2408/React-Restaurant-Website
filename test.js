import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Menu from "./Menu";
import Book from "./Book";
import Profile from "./Profile";
import './UserDashboardStyle.css';

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize user state from location or localStorage
  const [user, setUser] = useState(location.state?.user || JSON.parse(localStorage.getItem("user")));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prevState) => !prevState);

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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/backend/logout.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("user");
        setUser(null);
        navigate('/login');
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred while logging out. Please try again later.');
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Role: {user.role}</p>
        </>
      ) : (
        <h1>Welcome, Guest!</h1>
      )}

      <nav>
        <div className="hamburger" id="hamburgerMenu">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <h1>Bistrofy</h1>

        <div className="nav-links">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/book">Book</Link></li>

            {!user ? (
              <li>
                <Link id="loginButton" to="/login" onClick={(e) => { e.preventDefault(); toggleDropdown(); }}>
                  Login
                </Link>
                {isDropdownOpen && (
                  <div className="dropdown show" id="logindropdown">
                    <Link to="/login">Signin</Link>
                    <Link to="/signup">Signup</Link>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <div className="profile-container" id="profile-content" onClick={toggleProfileDropdown}>
                  <img
                    src="https://cdn.vectorstock.com/i/500p/96/75/gray-scale-male-character-profile-picture-vector-51589675.jpg"
                    alt="User"
                    className="profile-picture"
                  />
                  {isProfileDropdownOpen && (
                    <div className="dropdown show" id="profiledropdown">
                      <Link to="/profile" id="profile-page">View Profile</Link>
                      <Link to="/order-history">Order History</Link>
                      <Link to="/reservations">My Reservations</Link>
                      <Link to="/logout" onClick={handleLogout}>Logout</Link>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/book" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
