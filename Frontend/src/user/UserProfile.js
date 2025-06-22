import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UseContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setEditableData({
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSave = () => {
    // (You can add backend API here)
    setIsEditing(false);
  };

  if (!user) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
        No user data found. Please log in.
      </p>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.leftSection}>
          <img
            src={
              user.profile_img ||
              "https://cdn.vectorstock.com/i/500p/96/75/gray-scale-male-character-profile-picture-vector-51589675.jpg"
            }
            alt="Profile"
            style={styles.profileImage}
          />
          <h2 style={styles.username}>{user.username}</h2>
          <p style={styles.bio}>{user.bio || "I am a Software Developer"}</p>
        </div>

        <div style={styles.rightSection}>
          <h3 style={styles.sectionTitle}>Profile Details</h3>

          <div style={styles.detailRow}>
            <span style={styles.label}>Email:</span>
            {isEditing ? (
              <input
                type="email"
                value={editableData.email}
                onChange={(e) =>
                  setEditableData({ ...editableData, email: e.target.value })
                }
                style={styles.input}
              />
            ) : (
              <span>{editableData.email}</span>
            )}
          </div>

          <div style={styles.detailRow}>
            <span style={styles.label}>Phone:</span>
            {isEditing ? (
              <input
                type="text"
                value={editableData.phone}
                onChange={(e) =>
                  setEditableData({ ...editableData, phone: e.target.value })
                }
                style={styles.input}
              />
            ) : (
              <span>{editableData.phone}</span>
            )}
          </div>

          <div style={styles.detailRow}>
            <span style={styles.label}>Address:</span>
            {isEditing ? (
              <input
                type="text"
                value={editableData.address}
                onChange={(e) =>
                  setEditableData({ ...editableData, address: e.target.value })
                }
                style={styles.input}
              />
            ) : (
              <span>{editableData.address}</span>
            )}
          </div>

          <div style={styles.buttonRow}>
            <button
              style={isEditing ? styles.saveBtn : styles.editBtn}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
            <button style={styles.homeBtn} onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#fff0f5",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "1000px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  leftSection: {
    flex: 1,
    backgroundColor: "#ff99b5",
    color: "#fff",
    padding: "40px 20px",
    textAlign: "center",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #fff",
    objectFit: "cover",
    marginBottom: "20px",
  },
  username: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  bio: {
    fontStyle: "italic",
    fontSize: "14px",
  },
  rightSection: {
    flex: 2,
    padding: "40px 30px",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#ff99b5",
    marginBottom: "20px",
  },
  detailRow: {
    fontSize: "16px",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    marginRight: "12px",
    color: "#333",
    minWidth: "80px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    color: "#333",
  },
  buttonRow: {
    marginTop: "30px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  editBtn: {
    padding: "10px 18px",
    border: "2px solid #ff99b5",
    backgroundColor: "#fff",
    color: "#ff99b5",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 18px",
    backgroundColor: "#ff99b5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "10px 18px",
    border: "none",
    backgroundColor: "#ff99b5",
    color: "#fff",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  homeBtn: {
    padding: "10px 18px",
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    color: "#333",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Profile;
