// import React, { useEffect, useState, useContext } from 'react';
// import UserContext from '../UseContext';

// const ManageOrder = () => {
//   const { user } = useContext(UserContext);
//   const [effectiveUser, setEffectiveUser] = useState(user);
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [updateMessage, setUpdateMessage] = useState('');

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (!user && storedUser) {
//       setEffectiveUser(JSON.parse(storedUser));
//     } else {
//       setEffectiveUser(user);
//     }
//   }, [user]);

//   const fetchOrders = () => {
//     fetch('http://localhost/onlinerestro/backend/manageOrder.php', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ user_id: effectiveUser?.user_id || 0 }),
//     })
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         if (data.success) {
//           setOrders(data.data);
//         } else {
//           setError(data.message || 'No orders found.');
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Fetch error:', err);
//         setError('Error fetching orders.');
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     if (effectiveUser) fetchOrders();
//   }, [effectiveUser]);

//   const openUpdateModal = (order) => {
//     setSelectedOrder(order);
//     setFormData({
//       quantity: order.quantity,
//       price: order.price,
//       delivery_address: order.delivery_address,
//       state: order.state || '',
//       item_image: order.item_image || '',
//     });
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//     setFormData({});
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData(prev => ({ ...prev, item_image: reader.result.split(',')[1],
//       }));
//     };
//     reader.readAsDataURL(file);
//   }
// }

//   const handleSubmitUpdate = () => {
//     fetch('http://localhost/onlinerestro/backend/updateSingleOrder.php', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({
//         cart_id: selectedOrder.cart_id,
//         ...formData,
//       }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setUpdateMessage(`Order #${selectedOrder.cart_id} updated.`);
//           fetchOrders();
//         } else {
//           setUpdateMessage(`Failed to update order.`);
//         }
//         closeModal();
//       })
//       .catch(err => {
//         console.error('Update error:', err);
//         setUpdateMessage('Error updating order.');
//         closeModal();
//       });
//   };

//   const thStyle = {
//     padding: '12px 15px',
//     fontWeight: 'bold',
//     borderBottom: '2px solid #dee2e6',
//     backgroundColor: '#343a40',
//     color: '#fff',
//     textAlign: 'left',
//   };

//   const tdStyle = {
//     padding: '12px 15px',
//     borderBottom: '1px solid #dee2e6',
//     verticalAlign: 'middle',
//   };

//   const rowStyle = {
//     backgroundColor: '#fff',
//     transition: 'background 0.3s',
//     cursor: 'pointer',
//   };

//   if (loading) return <p>Loading orders...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
//       <h2 style={{ fontFamily: 'Arial', marginBottom: '20px' }}>Manage Orders</h2>

//       {updateMessage && <p style={{ color: 'green' }}>{updateMessage}</p>}

//       <table
//         style={{
//           width: '100%',
//           borderCollapse: 'separate',
//           borderSpacing: '0',
//           boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//           borderRadius: '10px',
//           overflow: 'hidden',
//           fontFamily: 'Arial, sans-serif',
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={thStyle}>#</th>
//             <th style={thStyle}>Image</th>
//             <th style={thStyle}>Item</th>
//             <th style={thStyle}>Qty</th>
//             <th style={thStyle}>Price</th>
//             <th style={thStyle}>Address</th>
//             <th style={thStyle}>Customer</th>
//             <th style={thStyle}>Phone</th>
//             <th style={thStyle}>Email</th>
//             <th style={thStyle}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => (
//             <tr
//               key={order.cart_id}
//               style={rowStyle}
//               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
//               onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
//             >
//               <td style={tdStyle}>{index + 1}</td>
//               <td style={tdStyle}>
//                 {order.item_image ? (
//                   <img
//                     src={`data:image/jpeg;base64,${order.item_image}`}
//                     alt="Product"
//                     style={{
//                       width: '60px',
//                       height: '60px',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
//                     }}
//                   />
//                 ) : (
//                   <span style={{ fontStyle: 'italic', color: '#777' }}>No Image</span>
//                 )}
//               </td>
//               <td style={tdStyle}>{order.item_name}</td>
//               <td style={tdStyle}>{order.quantity}</td>
//               <td style={tdStyle}>₹{order.price}</td>
//               <td style={tdStyle}>{order.delivery_address}</td>
//               <td style={tdStyle}>{order.full_name}</td>
//               <td style={tdStyle}>{order.phone}</td>
//               <td style={tdStyle}>{order.email}</td>
//               <td style={tdStyle}>
//                 <button
//                   onClick={() => openUpdateModal(order)}
//                   style={{
//                     background: '#007bff',
//                     color: '#fff',
//                     border: 'none',
//                     padding: '6px 12px',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     transition: 'background 0.3s',
//                   }}
//                   onMouseOver={(e) => (e.target.style.background = '#0056b3')}
//                   onMouseOut={(e) => (e.target.style.background = '#007bff')}
//                 >
//                   Update
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedOrder && (
//         <div style={modalStyles.overlay}>
//           <div style={modalStyles.modal}>
//             <h3>Update Order #{selectedOrder.cart_id}</h3>

//             <label>Quantity</label>
//             <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

//             <label>Price</label>
//             <input type="number" name="price" value={formData.price} onChange={handleChange} />

//             <label>Delivery Address</label>
//             <input type="text" name="delivery_address" value={formData.delivery_address} onChange={handleChange} />

//             <label>State</label>
//             <select name="state" value={formData.state} onChange={handleChange}>
//               <option value="">Select</option>
//               <option value="pending">Pending</option>
//               <option value="processing">Processing</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>

//             <label>Update Image</label>
//             <input type="file" accept="image/*" onChange={handleImageChange} />

//             <div style={{ marginTop: '15px' }}>
//               <button
//                 onClick={handleSubmitUpdate}
//                 style={{ marginRight: '10px', background: 'green', color: '#fff', padding: '6px 12px' }}
//               >
//                 Save
//               </button>
//               <button
//                 onClick={closeModal}
//                 style={{ background: 'gray', color: '#fff', padding: '6px 12px' }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const modalStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0, left: 0, right: 0, bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//   },
//   modal: {
//     background: '#fff',
//     padding: '25px',
//     borderRadius: '10px',
//     width: '450px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px',
//   },
// };

// export default ManageOrder;

import React, { useEffect, useState, useContext } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import UserContext from "../UseContext";

const ManageOrder = () => {
  const { user } = useContext(UserContext);
  const [effectiveUser, setEffectiveUser] = useState(user);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      setEffectiveUser(JSON.parse(storedUser));
    } else {
      setEffectiveUser(user);
    }
  }, [user]);

  const fetchOrders = () => {
    fetch("http://localhost/onlinerestro/backend/manageOrder.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_id: effectiveUser?.user_id || 0 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.data);
        } else {
          setError(data.message || "No orders found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Error fetching orders.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (effectiveUser) fetchOrders();
  }, [effectiveUser]);

  const openUpdateModal = (order) => {
    setSelectedOrder(order);
    setFormData({
      quantity: order.quantity,
      price: order.price,
      delivery_address: order.delivery_address,
      state: order.state || "",
      item_image: order.item_image?.includes("base64")
        ? order.item_image.split(",")[1]
        : "",
    });
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Content = reader.result.split(",")[1];
      setFormData((prev) => ({ ...prev, item_image: base64Content }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitUpdate = () => {
    fetch("http://localhost/onlinerestro/backend/updateSingleOrder.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        cart_id: selectedOrder.cart_id,
        ...formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUpdateMessage(`Order #${selectedOrder.cart_id} updated.`);
          fetchOrders();
        } else {
          setUpdateMessage(`Failed to update order.`);
        }
        closeModal();
      })
      .catch((err) => {
        console.error("Update error:", err);
        setUpdateMessage("Error updating order.");
        closeModal();
      });
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={modalStyles.container}>
      <h2
        style={{ color: "#d63384", marginBottom: "20px", textAlign: "center" }}
      >
        Manage Orders
      </h2>
      {updateMessage && <p style={{ color: "green" }}>{updateMessage}</p>}
      <table style={modalStyles.table}>
        <thead>
          <tr>
            <th style={modalStyles.th}>#</th>
            <th style={modalStyles.th}>Image</th>
            <th style={modalStyles.th}>Item</th>
            <th style={modalStyles.th}>Qty</th>
            <th style={modalStyles.th}>Price</th>
            <th style={modalStyles.th}>Address</th>
            <th style={modalStyles.th}>Customer</th>
            <th style={modalStyles.th}>Phone</th>
            <th style={modalStyles.th}>Email</th>
            <th style={modalStyles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.cart_id}>
              <td style={modalStyles.td}>{index + 1}</td>
              <td style={modalStyles.td}>
                {order.item_image ? (
                  <img
                    src={
                      order.item_image.startsWith("data")
                        ? order.item_image
                        : `data:image/jpeg;base64,${order.item_image}`
                    }
                    alt="Item"
                    style={modalStyles.image}
                  />
                ) : (
                  <span style={modalStyles.noImageText}>No Image</span>
                )}
              </td>
              <td style={modalStyles.td}>{order.item_name}</td>
              <td style={modalStyles.td}>{order.quantity}</td>
              <td style={modalStyles.td}>₹{order.price}</td>
              <td style={modalStyles.td}>{order.delivery_address}</td>
              <td style={modalStyles.td}>{order.full_name}</td>
              <td style={modalStyles.td}>{order.phone}</td>
              <td style={modalStyles.td}>{order.email}</td>
              <td style={modalStyles.td}>
                <button  className="text-blue-600 hover:text-blue-800 mr-3"
                  onClick={() => openUpdateModal(order)}
                >
                <Edit size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {selectedOrder && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3 style={modalStyles.heading}>
              Update Order #{selectedOrder.cart_id}
            </h3>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={modalStyles.label}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  style={modalStyles.input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={modalStyles.label}>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  style={modalStyles.input}
                />
              </div>
            </div>

            <label style={modalStyles.label}>Delivery Address</label>
            <input
              type="text"
              name="delivery_address"
              value={formData.delivery_address}
              onChange={handleChange}
              style={modalStyles.input}
            />

            <label style={modalStyles.label}>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={modalStyles.select}
            >
              <option value="">Select</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <label style={modalStyles.label}>Update Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ ...modalStyles.input, padding: "4px" }}
            />

            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button
                onClick={handleSubmitUpdate}
                style={modalStyles.buttonPrimary}
              >
                Save
              </button>
              <button onClick={closeModal} style={modalStyles.buttonSecondary}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  container: {
    fontFamily: `'Segoe UI', 'Arial', sans-serif`,
    maxWidth: "900px",
    margin: "30px auto",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    fontFamily: `'Segoe UI', 'Arial', sans-serif`,
  },
  heading: {
    color: "#d63384",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "16px",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#ad1457",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    border: "1px solid #f8bbd0",
    borderRadius: "6px",
    fontSize: "13px",
    outlineColor: "#f06292",
  },
  select: {
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    border: "1px solid #f8bbd0",
    borderRadius: "6px",
    fontSize: "13px",
    outlineColor: "#f06292",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    fontSize: "14px",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    fontSize: "13px",
    borderBottom: "1px solid #f0f0f0",
    background: "#ffebee", // Light pink header
    color: "#e91e63",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    textAlign: "center",
    color: "#333",
  },
  buttonPrimary: {
    background: "#f783ac",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    marginRight: "10px",
  },
  buttonSecondary: {
    background: "#ff4d6d",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
  },
  noImageText: {
    fontStyle: "italic",
    color: "#999",
    fontSize: "13px",
  },
  image: {
    width: "60px",
    height: "60px",
    borderRadius: "6px",
    objectFit: "cover",
    border: "1px solid #ccc",
  },
};

export default ManageOrder;
