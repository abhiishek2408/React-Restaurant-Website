import React, { useState, useEffect } from "react";
import { useLocation, Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import HomeAdmin from "./HomeAdmin";
import Profile from "./AdminProfile";
import MenuManagement from "./MenuManagement";
import ManageOrder from "./ManageOrder";
import BarcodeScannerInvoice from "./BarcodeScannerInvoice";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || JSON.parse(localStorage.getItem("user")));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#logindropdown") && !event.target.closest("#loginButton")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost/onlinerestro/backend/logout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={{ fontFamily: "Arial", margin: 0 }}>
  Bistro<span style={{ color: "#ff69b4" }}>fy</span>
</h1>

        <ul style={styles.navLinks}>
          <li>
            <Link to="/admin" style={styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="ordermanage" style={styles.navLink}>Orders</Link>
          </li>
          <li>
            <Link to="usermanage" style={styles.navLink}>Users</Link>
          </li>
          <li>
            <Link to="menumanage" style={styles.navLink}>Menu</Link>
          </li>

          {/* Profile Dropdown */}
          <li id="loginButton" style={{ position: "relative", cursor: "pointer" }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span style={styles.navLink}>Admin ▼</span>
            {isDropdownOpen && (
              <ul id="logindropdown" style={styles.dropdown}>
                <li><Link to="barcode" style={styles.dropdownLink}>Invoice</Link></li>
                <li><Link to="settings" style={styles.dropdownLink}>Settings</Link></li>
                <li><span onClick={handleLogout} style={styles.dropdownLink}>Logout</span></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/usermanage" element={<UserManagement />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/menumanage" element={<MenuManagement />} />
          <Route path="/ordermanage" element={<ManageOrder />} />
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/homeadmin" element={<HomeAdmin />} />
          <Route path="/barcode" element={<BarcodeScannerInvoice />} />
          <Route path="/admin/*" element={<Navigate to="/homeadmin" />} />
        </Routes>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
  },
  navbar: {
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FF6347",
  },
  navLinks: {
    listStyleType: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "#000",
    textDecoration: "none",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "background 0.2s ease-in-out",
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: 1000,
    listStyle: "none",
    padding: "10px 0",
    width: "160px",
  },
  dropdownLink: {
    display: "block",
    padding: "10px 20px",
    textDecoration: "none",
    color: "#333",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s ease-in-out",
  },
  mainContent: {
    padding: "20px 30px",
  },
};

export default AdminDashboard;
