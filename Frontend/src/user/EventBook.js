import React, { useState, useContext } from 'react';
import UserContext from '../UseContext';
import axios from 'axios';
import tablebookbanner from '../image/tablebookbanner.png';

const EventBook = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    event_type: 'dinner',
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
          event_type: 'dinner',
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
    <div className="event-wrapper">
      <style>{`
        .event-wrapper {
          font-family: 'Segoe UI', sans-serif;
          background-color: #ffffff;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }

        .booking-form {
          display: grid;
          gap: 40px;
          max-width: 1200px;
          width: 100%;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 24px rgba(0,0,0,0.05);
        }

        .right-details {
          background-image: url(${tablebookbanner});
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-color: #ffffff;
          color: white;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 350px;
          text-align: center;
        }

        .occasion-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-title {
          text-align: center;
          font-size: 22px;
          font-weight: 600;
          color: #ff99b5;
        }

        .form-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        input, select, textarea {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }

        textarea {
          height: 100px;
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
        }

        button:hover {
          background-color: #ff7da5;
        }

        .success-message, .error-message {
          margin-top: 12px;
          padding: 10px;
          border-radius: 6px;
          text-align: center;
          font-size: 14px;
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

      <div className="booking-form">
        <div className="right-details"></div>

        <form onSubmit={handleSubmit} className="occasion-form">
          <h2 className="form-title">Book your Table</h2>

          <div className="form-row">
            <input type="text" name="first_name" placeholder="First Name*" value={formData.first_name} onChange={handleInputChange} required />
            <input type="text" name="last_name" placeholder="Last Name*" value={formData.last_name} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
          </div>

          <div className="form-row">
            <select name="event_type" value={formData.event_type} onChange={handleInputChange} required>
              <option value="dinner">Dinner</option>
              <option value="lunch">Lunch</option>
              <option value="family-gathering">Family Gathering</option>
              <option value="birthday">Birthday Celebration</option>
              <option value="anniversary">Anniversary</option>
              <option value="corporate-meal">Corporate Meal</option>
              <option value="friends-party">Friends Hangout</option>
              <option value="couple-date">Couple Date</option>
              <option value="kitty-party">Kitty Party</option>
              <option value="baby-shower">Baby Shower</option>
              <option value="other">Other</option>
            </select>
            <input type="date" name="event_date" value={formData.event_date} onChange={handleInputChange} required />
          </div>

          <textarea name="message" placeholder="Write a message" value={formData.message} onChange={handleInputChange} required></textarea>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>

          {isSuccess !== null && (
            <div className={isSuccess ? 'success-message' : 'error-message'}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventBook;
