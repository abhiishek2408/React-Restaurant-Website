import React, { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const MenuManagement = () => {
  const [menuSections, setMenuSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchMenuSections = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost/onlinerestro/backend/ManageMenu.php?page=${page}`
      );
      const data = await response.json();

      if (data.success) {
        setMenuSections(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || "Failed to fetch menu sections");
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuSections(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost/onlinerestro/backend/DeleteMenuItem.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Item deleted successfully");
        fetchMenuSections(currentPage);
      } else {
        alert(result.message || "Failed to delete item");
      }
    } catch (err) {
      alert("Error deleting item: " + err.message);
    }
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost/onlinerestro/backend/UpdateMenuItem.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Item updated successfully");
        setShowModal(false);
        fetchMenuSections(currentPage);
      } else {
        alert(result.message || "Update failed");
      }
    } catch (error) {
      alert("Error updating item: " + error.message);
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "850px",
      margin: "30px auto",
      padding: "20px",
      background: "#ffffff",
      borderRadius: "15px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    title: {
      textAlign: "center",
      color: "#d63384",
      fontSize: "28px",
      marginBottom: "20px",
    },
     table: {
   width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    borderRadius: '10px',
    overflow: 'hidden',
    fontSize: '14px',
  },
     th: {
      padding: "10px",
    textAlign: "left",
    fontSize: "13px",
    borderBottom: "1px solid #f0f0f0",
    background: "#ffebee", 
    color: "#e91e63",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
    td: {
      padding: "10px",
      borderBottom: "1px solid #eee",
      fontSize: "14px",
    },
    img: {
      width: "50px",
      height: "50px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    actionBtn: {
      marginRight: "6px",
      padding: "6px 10px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
    },
    deleteBtn: {
      background: "white",
      color: "#fff",
    },
    updateBtn: {
      background: "#f783ac",
      color: "#fff",
    },
    pagination: {
      textAlign: "center",
      marginTop: "20px",
    },
    pageBtn: {
      padding: "6px 12px",
      margin: "0 5px",
      backgroundColor: "#f8a5c2",
      border: "none",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "13px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    modalContent: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      width: "400px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "20px",
    },
    smallBtn: {
      padding: "8px 14px",
      fontSize: "13px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
    updateSmallBtn: {
      backgroundColor: "#ff69b4",
      color: "white",
    },
    cancelSmallBtn: {
      backgroundColor: "#ccc",
      color: "#333",
    },

    inputRow: {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '12px',
},

inputGroup: {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
},

smallBtn: {
  padding: '6px 14px',
  fontSize: '13px',
  fontWeight: 'bold',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  marginLeft: '8px',
},

cancelSmallBtn: {
  backgroundColor: '#dee2e6',
  color: '#333',
},

updateSmallBtn: {
  backgroundColor: '#d63384',
  color: '#fff',
},

buttonRow: {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '16px',
},

  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return <div style={styles.container}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Menu Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Offers</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuSections.map((item) => (
            <tr key={item.Id}>
              <td style={styles.td}>{item.Id}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>₹{item.price}</td>
              <td style={styles.td}>{item.Offers}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>{item.rating || "-"}</td>
              <td style={styles.td}>
                {item.product_image ? (
                  <img
                    src={`data:image/jpeg;base64,${item.product_image}`}
                    alt="Product"
                    style={styles.img}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td style={styles.td}>
                <button  className="text-blue-600 hover:text-blue-800 mr-3"
                  style={{ ...styles.actionBtn}}
                  onClick={() => handleDelete(item.Id)}
                >
                 <Trash2 size={18} />
                </button>
                <button className="text-red-600 hover:text-blue-800 mr-3"
                  style={{ ...styles.actionBtn }}
                  onClick={() => handleEditClick(item)}
                >
                <Edit size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          style={styles.pageBtn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={styles.pageBtn}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

{showModal && editData && (
  <div style={styles.modalOverlay}>
    <div style={styles.modalContent}>
      <h3 style={{ marginBottom: '15px', color: '#d63384' }}>Update Menu Item</h3>
      <form onSubmit={handleUpdateSubmit}>
        <div style={styles.inputRow}>
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input type="text" name="name" value={editData.name} onChange={handleEditChange} style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <label>Price:</label>
            <input type="number" name="price" value={editData.price} onChange={handleEditChange} style={styles.input} required />
          </div>
        </div>

        <div style={styles.inputRow}>
          <div style={styles.inputGroup}>
            <label>Offers:</label>
            <input type="text" name="Offers" value={editData.Offers} onChange={handleEditChange} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Quantity:</label>
            <input type="number" name="quantity" value={editData.quantity} onChange={handleEditChange} style={styles.input} />
          </div>
        </div>

        <div style={styles.inputRow}>
          <div style={styles.inputGroup}>
            <label>Rating:</label>
            <input type="number" step="0.1" name="rating" value={editData.rating} onChange={handleEditChange} style={styles.input} />
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            style={{ ...styles.smallBtn, ...styles.cancelSmallBtn }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ ...styles.smallBtn, ...styles.updateSmallBtn }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default MenuManagement;
