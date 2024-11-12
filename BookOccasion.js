import React, { useState, useContext } from "react";
import UserContext from "../UseContext";
import axios from "axios";  // Import axios for HTTP requests
import './BookTableStyle.css';

function AdminDashboard() {

  const { user } = useContext(UserContext);  // Get user_id from context
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    event_type: 'private',
    event_date: '',
    message: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.user_id) {
      setIsSuccess(false);
      setMessage("User ID is missing or invalid.");
      return; // Prevent submission if user_id is missing or invalid
    }

    const data = {
      ...formData,
      user_id: user.user_id // Attach user_id to form data
    };

    setIsLoading(true);  // Set loading to true

    try {
      const response = await axios.post("http://localhost/backend/bookTable.php", data);

      if (response.data.status === "success") {
        setIsSuccess(true);
        setMessage(response.data.message); // Success message
        setFormData({  // Optionally reset form after successful submission
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          event_type: 'private',
          event_date: '',
          message: ''
        });
      } else {
        setIsSuccess(false);
        setMessage(response.data.message); // Error message from backend
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);  // Set loading to false
    }
  };

  return (
    <div>
      <div className="booking-form-container">
        <div className="container booking-form" id="booking-form">
          <form id="form" onSubmit={handleSubmit} className="occasion-form">
            <h2 className="form-title">Sign Up for an Upcoming Event</h2>
            <div className="form-row">
              <input
                type="text"
                name="first_name"
                placeholder="First Name*"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name*"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <select
                name="event_type"
                value={formData.event_type}
                onChange={handleInputChange}
                required
              >
                <option value="private">Private Event</option>
                <option value="corporate">Corporate Event</option>
              </select>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleInputChange}
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Write a message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>

            {/* Success or Error Message */}
            {isSuccess !== null && (
              <div className={isSuccess ? "success-message" : "error-message"}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
