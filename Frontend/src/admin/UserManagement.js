import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from "lucide-react";

// Base styling
const styles = {
  container: {
    fontFamily: `'Segoe UI', 'Arial', sans-serif`,
    maxWidth: '900px',
    margin: '30px auto',
    padding: '25px',
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
   
  },
  title: {
    textAlign: 'center',
    color: '#d63384',
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '22px',
    letterSpacing: '0.5px',
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
    padding: '10px 8px',
    borderBottom: '1px solid #eee',
    textAlign: 'center',
    color: '#333',
  },
  img: {
    width: '48px',
    height: '48px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #f8bbd0',
  },
  actionBtn: {
    padding: '4px 10px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '4px 6px 4px 0', // spacing between buttons
    transition: 'background 0.3s ease',
  },
  deleteBtn: {
    background: '#ff4d6d',
    color: '#fff',
  },
  updateBtn: {
    background: '#f783ac',
    color: '#fff',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    width: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#ad1457',
    fontSize: '13px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    border: '1px solid #f8bbd0',
    borderRadius: '5px',
    fontSize: '13px',
    outlineColor: '#f06292',
  },
};


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost/onlinerestro/backend/getUser.php');
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const dataToSend = {
      user_id: selectedUser.user_id,
      username: updatedData.username || selectedUser.username,
      email: updatedData.email || selectedUser.email,
      phone: updatedData.phone || selectedUser.phone,
      address: updatedData.address || selectedUser.address,
      bio: updatedData.bio || selectedUser.bio,
      password: updatedData.password || selectedUser.password,
      role: updatedData.role || selectedUser.role,
      profile_img: updatedData.profile_img || selectedUser.profile_img,
    };

    try {
      const response = await fetch('http://localhost/onlinerestro/backend/updateUser.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (data.success) {
        alert('User updated successfully!');
        setShowUpdateForm(false);
        setUpdatedData({});
        setSelectedUser(null);
        fetchUsers();
      } else {
        alert('Update failed: ' + data.message);
      }
    } catch {
      alert('Error updating user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch('http://localhost/onlinerestro/backend/deleteUser.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      if (data.success) {
        alert('User deleted successfully!');
        fetchUsers();
      } else {
        alert('Delete failed');
      }
    } catch {
      alert('Error deleting user');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#d63384', marginBottom: '20px', textAlign:'center' }}>User List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
      {showUpdateForm && selectedUser && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h3 style={{ color: '#c2185b' }}>Update User</h3>
      <form onSubmit={handleUpdateSubmit}>
        {['username', 'email', 'phone', 'address', 'bio'].map((field, index) => {
          if (index % 2 === 0) {
            const nextField = ['username', 'email', 'phone', 'address', 'bio'][index + 1];
            return (
              <div key={field + (nextField || '')} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    style={styles.input}
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    value={updatedData[field] || selectedUser[field] || ''}
                    onChange={handleInputChange}
                    required={field !== 'bio'}
                  />
                </div>
                {nextField && (
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>
                      {nextField.charAt(0).toUpperCase() + nextField.slice(1)}:
                    </label>
                    <input
                      style={styles.input}
                      type={nextField === 'email' ? 'email' : nextField === 'phone' ? 'tel' : 'text'}
                      name={nextField}
                      value={updatedData[nextField] || selectedUser[nextField] || ''}
                      onChange={handleInputChange}
                      required={nextField !== 'bio'}
                    />
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}

        <label style={styles.label}>Profile Image:</label>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setUpdatedData((prev) => ({
                  ...prev,
                  profile_img: reader.result.split(',')[1],
                }));
              };
              reader.readAsDataURL(file);
            }
          }}
        />

        <div>
          <button type="submit" style={{ ...styles.actionBtn, ...styles.updateBtn }}>
            Update
          </button>
          <button
            type="button"
            style={{ ...styles.actionBtn, ...styles.deleteBtn }}
            onClick={() => setShowUpdateForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


          <table style={styles.table}>
            <thead>
              <tr>
                {['Id', 'Username', 'Email', 'Phone', 'Bio', 'Image', 'Actions'].map((head) => (
                  <th key={head} style={styles.th}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td style={styles.td}>{user.user_id}</td>
                  <td style={styles.td}>{user.username}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.phone}</td>
                  <td style={styles.td}>{user.bio}</td>
                  <td style={styles.td}>
                    {user.profile_img ? (
                      <img src={`data:image/jpeg;base64,${user.profile_img}`} alt="Profile" style={styles.img} />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td style={styles.td}>



                   <button   className="text-blue-600 hover:text-blue-800 mr-3"
                      style={{ ...styles.actionBtn}}
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUpdateForm(true);
                      }}
                    >
                       <Edit size={18} />
                    </button>
                    <button  className="text-red-600 hover:text-blue-800 mr-3"
                      style={{ ...styles.actionBtn }}
                      onClick={() => handleDeleteUser(user.user_id)}
                    >
                       <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserTable;
