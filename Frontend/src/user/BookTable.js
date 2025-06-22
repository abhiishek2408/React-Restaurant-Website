import React, { useState, useContext } from "react";
import UserContext from "../UseContext";
import axios from "axios";

function BookTable() {
  const { user } = useContext(UserContext);
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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.user_id) {
      setIsSuccess(false);
      setMessage("User ID is missing or invalid.");
      return;
    }

    const data = { ...formData, user_id: user.user_id };
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost/onlinerestro/backend/bookTable.php", data);
      if (res.data.status === "success") {
        setIsSuccess(true);
        setMessage(res.data.message);
        setFormData({
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
        setMessage(res.data.message);
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage("Oops! Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .book-wrapper {
          background-color: #ffffff;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          justify-content: center;
          padding: 50px 20px;
        }

        .booking-form {
          width: 100%;
          max-width: 800px;
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .form-title {
          font-size: 22px;
          font-weight: 600;
          color: #ff99b5;
          text-align: center;
          margin-bottom: 25px;
        }

        .occasion-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .form-row input,
        .form-row select {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }

        textarea {
          width: 100%;
          padding: 12px;
          height: 100px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          resize: none;
        }

        button {
          background-color: #ff99b5;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background-color: #ff7da5;
        }

        .success-message, .error-message {
          padding: 12px;
          border-radius: 6px;
          text-align: center;
          font-size: 14px;
          margin-top: 10px;
        }

        .success-message {
          background-color: #d4edda;
          color: #155724;
        }

        .error-message {
          background-color: #f8d7da;
          color: #721c24;
        }

        @media (max-width: 600px) {
          .form-row {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="book-wrapper">
        <div className="booking-form">
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
              <option value="birthday">Birthday Party</option>
  <option value="wedding">Wedding</option>
  <option value="engagement">Engagement Ceremony</option>
  <option value="mehendi">Mehendi Function</option>
  <option value="sangeet">Sangeet Night</option>
  <option value="anniversary">Anniversary Celebration</option>
  <option value="baby-shower">Baby Shower (Godh Bharai)</option>
  <option value="naming-ceremony">Naming Ceremony (Namkaran)</option>
  <option value="housewarming">Housewarming (Griha Pravesh)</option>
  <option value="retirement">Retirement Party</option>
  <option value="farewell">Farewell Party</option>
  <option value="reunion">Friends/Family Reunion</option>
  <option value="corporate">Corporate Event</option>
  <option value="seminar">Seminar</option>
  <option value="conference">Conference</option>
  <option value="product-launch">Product Launch</option>
  <option value="award-ceremony">Award Ceremony</option>
  <option value="festival">Festival Celebration (Diwali, Holi, Eid, Christmas)</option>
  <option value="cultural">Cultural Program</option>
  <option value="community">Community Gathering</option>
  <option value="religious">Religious Function (Puja, Kirtan, Jagrata)</option>
  <option value="charity">Charity Event</option>
  <option value="cradle-ceremony">Cradle Ceremony</option>
  <option value="haldi">Haldi Ceremony</option>
  <option value="school-event">School/College Function</option>
  <option value="kitti-party">Kitti Party</option>
  <option value="bachelor-party">Bachelor/Bachelorette Party</option>
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

            {isSuccess !== null && (
              <div className={isSuccess ? "success-message" : "error-message"}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default BookTable;
