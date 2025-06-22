import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./UserProfile";
import Cart from "./Cart";
import Order from "./Order";
import BookTable from "./BookTable";
import EventBook from "./EventBook";
import OrderHistory from "./OrderHistory";

const UserDashboard = () => {
  const routerLocation = useLocation();
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return (
        location.state?.user || JSON.parse(localStorage.getItem("user")) || null
      );
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      return null;
    }
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#logindropdown") &&
        !event.target.closest("#loginButton")
      )
        setIsDropdownOpen(false);
      if (
        !event.target.closest("#profiledropdown") &&
        !event.target.closest("#profile-content")
      )
        setIsProfileDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost/onlinerestro/backend/logout.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
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
      alert("An error occurred while logging out.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

const fetchLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
          .then((response) => response.json())
          .then((data) => {
            const address = data.address;
            const city = address.city || address.town || address.village || address.county;
            const country = address.country;

            const shortLocation = [city, country].filter(Boolean).join(", ");
            setLocation(shortLocation); // ✅ Now shows like "Mumbai, India"
          })
          .catch((error) => {
            console.error("Location fetch error:", error);
            setLocation("Location unavailable");
          });
      },
      () => alert("Unable to retrieve your location.")
    );
  } else {
    alert("Geolocation not supported by this browser.");
  }
};


  const styles = {
    nav: {
      backgroundColor: "#fff",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 30px",
      fontFamily: "Arial, sans-serif",
      borderBottom: "1px solid #ccc",
      position: "sticky",
      top: 0,
      zIndex: 999,
    },
    ul: {
      listStyle: "none",
      display: "flex",
      gap: "25px",
      margin: 0,
      padding: 0,
    },
    li: {
      fontSize: "1rem",
      fontWeight: 500,
      cursor: "pointer",
    },
    activeLink: {
      fontSize: "1rem",
      fontWeight: 600,
      borderBottom: "2px solid black",
      paddingBottom: "2px",
    },
    location: {
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#333",
    },
    profileContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
    },
dropdown: {
  position: "absolute",
  top: "100%",
  right: 90,
  minWidth: "180px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  zIndex: 999,
  padding: "12px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  transition: "all 0.3s ease-in-out",
  border: "1px solid #eaeaea",
},
    footer: {
      backgroundColor: "#fff",
      color: "#000",
      fontFamily: "Arial, sans-serif",
      paddingTop: "40px",
      borderTop: "1px solid #ddd",
    },
    footerContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: "0 20px",
      textAlign: "left",
    },
    footerSection: {
      flex: "1 1 250px",
      marginBottom: "20px",
      margin: "0 60px",
    },
    footerHeading: {
      fontSize: "18px",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    footerText: {
      fontSize: "14px",
      margin: "5px 0",
      color: "#333",
    },
    footerList: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
    footerLink: {
      color: "#000",
      textDecoration: "none",
      fontSize: "14px",
      lineHeight: "1.8",
    },
    socialIcons: {
      display: "flex",
      gap: "10px",
      fontSize: "24px",
    },
    socialLink: {
      textDecoration: "none",
      color: "#000",
    },
    footerBottom: {
      textAlign: "center",
      padding: "20px 10px",
      borderTop: "1px solid #ccc",
      fontSize: "13px",
    },


    socialIcons: {
  display: 'flex',
  gap: '12px',
  marginTop: '10px',
},

socialLink: {
  color: '#ff69b4',
  fontSize: '20px',
  textDecoration: 'none',
  transition: 'color 0.3s',
},

socialLinkHover: {
  color: '#d63384',
},

socialLink: {
  color: '#ff69b4',
  fontSize: '20px',
  transition: 'color 0.3s',
  textDecoration: 'none',
}


   
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.nav}>
        {/* <h1 style={{ fontFamily: "Arial", margin: 0 }}>Bistrofy</h1> */}
<h1 style={{ fontFamily: "Arial", margin: 0 }}>
  Bistro<span style={{ color: "#ff69b4" }}>fy</span>
</h1>



<select
  style={{
   width: 'fit-content',          // or a fixed small value like '40px'
    maxWidth: '170px',              // force upper limit
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#333',
    padding: 0,
    margin: 0,
   
    cursor: 'pointer',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }}
>
  <option value={location}>📍 {location}</option>
</select>


        <ul style={styles.ul}>
          {[
            { name: "Home", path: "/user" },
            { name: "About", path: "/user/about" },
            { name: "Menu", path: "/user/order" },
            { name: "Book", path: "/user/eventbook" },
          ].map((link) => (
            <li
              key={link.name}
              style={
                (routerLocation.pathname === "/user" && link.path === "/user") ||
                routerLocation.pathname.includes(link.path)
                  ? styles.activeLink
                  : styles.li
              }
            >
              <Link
                to={link.path}
                style={{ textDecoration: "none", color: "#000" }}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <span
              id="loginButton"
              onClick={toggleDropdown}
              style={{ textDecoration: "none", color: "#000", cursor: "pointer" }}
            >
              Login
            </span>
            {isDropdownOpen && (
              <div className="dropdown" style={styles.dropdown} id="logindropdown">
                <Link  style={{ textDecoration: "none", color: "#000", cursor: "pointer" }} to="/login">Signin</Link>
                <Link  style={{ textDecoration: "none", color: "#000", cursor: "pointer" }} to="/signup">Signup</Link>
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </span>
              </div>
            )}
          </li>

          <li>
            <Link to="/user/cart">
              <span>🛒</span>
            </Link>
          </li>
        </ul>

        <div
          style={styles.profileContainer}
          id="profile-content"
          onClick={toggleProfileDropdown}
        >
          <img
            src="https://cdn.vectorstock.com/i/500p/96/75/gray-scale-male-character-profile-picture-vector-51589675.jpg"
            alt="User"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
          {isProfileDropdownOpen && (
            <div
              style={styles.dropdown}
              className="dropdown"
              id="profiledropdown"
            >
              <Link style={{ textDecoration: "none", color: "#000" }} to="/user/userprofile">View Profile</Link>
              <Link style={{ textDecoration: "none", color: "#000" }} to="/user/orderhistory">Order History</Link>
              <Link style={{ textDecoration: "none", color: "#000" }} to="/user/reservations">My Reservations</Link>
              <Link style={{ textDecoration: "none", color: "#000" }} to="/logout" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>

       <Routes>
        <Route index element={<Home />} /> {/* Default route */}
        <Route path="about" element={<About />} />
        <Route path="order" element={<Order />} />
        <Route path="booktable" element={<BookTable />} />
        <Route path="eventbook" element={<EventBook />} />
        <Route path="cart" element={<Cart />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="orderhistory" element={<OrderHistory />} />
      </Routes>

      {/* Footer */}


<footer style={styles.footer}>
  <div style={styles.footerContainer}>
    <div style={styles.footerSection}>
      <h3 style={styles.footerHeading}>Contact Us</h3>
      <p style={styles.footerText}>
        123 Kashi Vishwanath Road, Varanasi, Uttar Pradesh, 221001
      </p>
      <p style={styles.footerText}>Phone: +91 98765 43210</p>
      <p style={styles.footerText}>Email: info@yourbistrofy.com</p>
    </div>

    <div style={styles.footerSection}>
      <h3 style={styles.footerHeading}>Quick Links</h3>
      <ul style={styles.footerList}>
        <li>
          <Link to="order" style={styles.footerLink}>Blog</Link>
        </li>
        <li>
          <Link to="eventbook" style={styles.footerLink}>Privacy</Link>
        </li>
        <li>
          <Link to="about" style={styles.footerLink}>Terms</Link>
        </li>
      </ul>
    </div>

    <div style={styles.footerSection}>
      <h3 style={styles.footerHeading}>Follow Us</h3>
      <div style={styles.socialIcons}>
        <a
          href="https://facebook.com"
          style={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://instagram.com"
          style={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://twitter.com"
          style={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://maps.google.com"
          style={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMapMarkerAlt size={20} />
        </a>
      </div>
    </div>
  </div>

  <div style={styles.footerBottom}>
    <p style={styles.footerText}>© 2024 Bistrofy. All rights reserved.</p>
  </div>
</footer>





    </div>
  );
};

export default UserDashboard;
