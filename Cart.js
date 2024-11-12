import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "../UseContext";  // Import UserContext to access user data
import { useNavigate } from "react-router-dom";
import './CartStyle.css';

const Cart = () => {
  const { user } = useContext(UserContext);  // Access user data from UserContext
  const [cartDetails, setCartDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart details when component mounts
  useEffect(() => {
    if (!user || !user.user_id) {
      setError("User ID is missing or invalid.");
      setIsLoading(false);
      return;
    }

    const fetchCartDetails = async () => {
      try {
        const response = await axios.post('http://localhost/backend/UserCart.php', { user_id: user.user_id });
        if (response.data.status === 'success') {
          setCartDetails(response.data.data);
          setError(null);
        } else {
          setCartDetails([]);
          setError("No cart data found.");
        }
      } catch (error) {
        setCartDetails([]);
        setError('Error fetching cart data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartDetails();
  }, [user]);

  const handleQuantityChange = (itemId, type) => {
    const updatedCart = cartDetails.map(item => {
      if (item.cart_id === itemId) {
        const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCartDetails(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    setCartDetails(cartDetails.filter(item => item.cart_id !== itemId));
  };

  return (
    <div className="Cart-page">
      <div className="cart-container">
        <div className="cart-items-section">
          <h2>My Orders</h2>
          
          <div className="cart-items">
            {error && <p className="error-message">{error}</p>}
            {isLoading ? (
              <p>Loading...</p>
            ) : cartDetails.length > 0 ? (
              cartDetails.map((item) => (
                <div className="cart-item" key={item.cart_id}>
                  <div className="cart-item-image">
                    <img src={item.item_image || "https://via.placeholder.com/50"} alt={item.item_name} />
                  </div>
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.item_name}</p>
                    <p className="cart-item-price">${item.price}</p>
                    <div className="cart-item-quantity">
                      <button onClick={() => handleQuantityChange(item.cart_id, 'decrement')}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.cart_id, 'increment')}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.cart_id)}>X</button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>

        <div className="order-summary-section">
          <h3>Payment Method</h3>
          <form className="payment-form">
            <label className="radio-label">
              <input type="radio" name="payment" className="labelbtn" defaultChecked /> <pre>Credit Card</pre> 
            </label>
            <label className="radio-label">
              <input type="radio" name="payment" className="labelbtn" /> <span>PayPal</span>
            </label>

            <input type="text" placeholder="Credit Card Number" />
            <input type="text" placeholder="Card holder Name" />
            <div className="expiry-cvc">
              <select>
                <option>Expiry Date</option>
              </select>
              <select>
                <option>Expiry Year</option>
              </select>
              <input type="text" placeholder="CVC Code" />
            </div>
          </form>

          <div className="order-summary">
            <div className="summary-item">
              <span>Balance Amount</span>
              <span>${cartDetails.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>VAT (21%)</span>
              <span>${(cartDetails.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.21).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping Fee</span>
              <span>$10</span>
            </div>
            <div className="summary-item total">
              <span>Order Total:</span>
              <span>${(cartDetails.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.21 + 10).toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
