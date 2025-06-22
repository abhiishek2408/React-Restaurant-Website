// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import UserContext from "../UseContext"; 
// import './CartStyle.css';

// const Cart = () => {
//   const { user } = useContext(UserContext);  
//   const [cartDetails, setCartDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedItems, setSelectedItems] = useState({});  

//   // Fetch cart details when component mounts
//   useEffect(() => {
//     if (!user || !user.user_id) {
//       setError("User ID is missing or invalid.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchCartDetails = async () => {
//       try {
//         const response = await axios.post('http://localhost/onlinerestro/backend/UserCart.php', { user_id: user.user_id });
//         if (response.data.status === 'success') {
//           setCartDetails(response.data.data);
//           setError(null);
//         } else {
//           setCartDetails([]);
//           setError("No cart data found.");
//         }
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//         setCartDetails([]);
//         setError('Error fetching cart data.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartDetails();
//   }, [user]);


//   const handleQuantityChange = (itemId, type) => {
//     const updatedCart = cartDetails.map(item => {
//       if (item.cart_id === itemId) {
//         const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
//         return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
//       }
//       return item;
//     });
//     setCartDetails(updatedCart);
//   };

//   const handleRemoveItem = (itemId, event) => {
//     event.stopPropagation(); // Prevent event bubbling
//     if (window.confirm("Are you sure you want to delete this item from your cart?")) {
//       fetch('http://localhost/backend/delete_from_cart.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action: 'delete', cart_id: itemId })
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === 'success') {
//           alert("Item deleted successfully!");
//           setCartDetails(prevCart => prevCart.filter(item => item.cart_id !== itemId)); // Update the state
//         } else {
//           alert("Failed to delete item. Please try again.");
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         alert("An error occurred. Please check the console for details.");
//       });
//     }
//   };

//   // Handle item selection for total calculation
//   const handleItemSelect = (itemId) => {
//     setSelectedItems(prevSelectedItems => ({
//       ...prevSelectedItems,
//       [itemId]: !prevSelectedItems[itemId] // Toggle selection
//     }));
//   };

//   // Calculate total for selected items
//   const calculateTotal = () => {
//     return cartDetails.reduce((acc, item) => {
//       if (selectedItems[item.cart_id]) { // Only add price if item is selected
//         return acc + item.price * item.quantity;
//       }
//       return acc;
//     }, 0).toFixed(2);
//   };

//   return (
//     <div className="Cart-page">
//       <div className="cart-container">
//         <div className="cart-items-section">
//           <p className='cart-title'>Your cart ({cartDetails.length})</p>
          
//           <div className="cart-items">
//             {error && <p className="error-message">{error}</p>}
//             {isLoading ? (
//               <p>Loading...</p>
//             ) : cartDetails.length > 0 ? (
//               cartDetails.map((item) => (
//                 <div 
//                   className={`cart-item ${selectedItems[item.cart_id] ? 'selected' : ''}`} // Add 'selected' class for styling
//                   key={item.cart_id}
//                   onClick={() => handleItemSelect(item.cart_id)} // Handle click for selection
//                 >
//                   <div className="cart-item-image">
//                     <img src={item.item_image || "https://via.placeholder.com/50"} alt={item.item_name} />
//                   </div>

//                   <div className="cart-item-details">
//                     <h4 className="cart-item-name">{item.description}</h4>
//                     <p className="cart-item-name">{item.item_name}</p>
//                     <p className="cart-item-price">${item.price}</p>

//                     <div className="cart-item-quantity">
//                       <button onClick={() => handleQuantityChange(item.cart_id, 'decrement')}>-</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => handleQuantityChange(item.cart_id, 'increment')}>+</button>
//                     </div>
//                   </div>

//                   {/* Hidden checkbox but functional for selection */}
//                   <input 
//                     type="checkbox" 
//                     checked={selectedItems[item.cart_id] || false} 
//                     onChange={() => handleItemSelect(item.cart_id)} 
//                     className="hidden-checkbox"
//                   />
//                   <button className="remove-btn" onClick={(e) => handleRemoveItem(item.cart_id, e)}><i className="fas fa-trash"></i></button>
//                 </div>
//               ))
//             ) : (
//               <p style={{color:'black'}}>Your cart is empty</p>
//             )}
//           </div>
//         </div>
//         <div className="order-summary-section">
//           <h3>Order summary</h3>
         
//           <div className="order-summary">
//             <div className="summary-item">
//               <span>Subtotal</span>
//               <span>${calculateTotal()}</span> {/* Display total for selected items */}
//             </div>
//             <div className="summary-item">
//               <span>Tax (21%)</span>
//               <span>${(calculateTotal() * 0.21).toFixed(2)}</span>
//             </div>
//             <div className="summary-item">
//               <span>Shipping</span>
//               <span>$10</span>
//             </div>
//             <div className="summary-item total">
//               <span>Total:</span>
//               <span>${(parseFloat(calculateTotal()) * 1.21 + 10).toFixed(2)}</span>
//             </div>
//             <button className="checkout-btn">Checkout</button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import UserContext from "../UseContext"; 
// import './CartStyle.css';

// const Cart = () => {
//   const { user } = useContext(UserContext);  
//   const [cartDetails, setCartDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [checkout, setCheckout] = useState(false); // State to show PayPal button

//   useEffect(() => {
//     if (!user || !user.user_id) {
//       setError("User ID is missing or invalid.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchCartDetails = async () => {
//       try {
//         const response = await axios.post('http://localhost/onlinerestro/backend/UserCart.php', { user_id: user.user_id });
//         if (response.data.status === 'success') {
//           setCartDetails(response.data.data);
//           setError(null);
//         } else {
//           setCartDetails([]);
//           setError("No cart data found.");
//         }
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//         setCartDetails([]);
//         setError('Error fetching cart data.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartDetails();
//   }, [user]);

//   const handleItemSelect = (itemId) => {
//     setSelectedItems(prevSelectedItems => ({
//       ...prevSelectedItems,
//       [itemId]: !prevSelectedItems[itemId]
//     }));
//   };

//   const calculateTotal = () => {
//     return cartDetails.reduce((acc, item) => {
//       if (selectedItems[item.cart_id]) {
//         return acc + item.price * item.quantity;
//       }
//       return acc;
//     }, 0).toFixed(2);
//   };

//   const createOrder = async () => {
//     const totalAmount = calculateTotal();
//     const response = await axios.post('http://localhost/onlinerestro/backend/paypal_payment.php', { total: totalAmount });
//     return response.data.id; 
//   };

//   const onApprove = async (data) => {
//     console.log("Payment Approved:", data);
//     alert("Payment successful!");
//   };

//   return (
//     <div className="Cart-page">
//       <div className="cart-container">
//         <div className="cart-items-section">
//           <p className='cart-title'>Your cart ({cartDetails.length})</p>
//           <div className="cart-items">
//             {error && <p className="error-message">{error}</p>}
//             {isLoading ? (
//               <p>Loading...</p>
//             ) : cartDetails.length > 0 ? (
//               cartDetails.map((item) => (
//                 <div 
//                   className={`cart-item ${selectedItems[item.cart_id] ? 'selected' : ''}`} 
//                   key={item.cart_id}
//                   onClick={() => handleItemSelect(item.cart_id)}
//                 >
//                   <div className="cart-item-image">
//                     <img src={item.item_image || "https://via.placeholder.com/50"} alt={item.item_name} />
//                   </div>
//                   <div className="cart-item-details">
//                     <h4 className="cart-item-name">{item.description}</h4>
//                     <p className="cart-item-price">${item.price}</p>
//                   </div>
//                   <input 
//                     type="checkbox" 
//                     checked={selectedItems[item.cart_id] || false} 
//                     onChange={() => handleItemSelect(item.cart_id)} 
//                     className="hidden-checkbox"
//                   />
//                 </div>
//               ))
//             ) : (
//               <p>Your cart is empty</p>
//             )}
//           </div>
//         </div>
        
//         <div className="order-summary-section">
//           <h3>Order Summary</h3>
//           <div className="order-summary">
//             <div className="summary-item">
//               <span>Subtotal</span>
//               <span>${calculateTotal()}</span>
//             </div>
//             <div className="summary-item">
//               <span>Tax (21%)</span>
//               <span>${(calculateTotal() * 0.21).toFixed(2)}</span>
//             </div>
//             <div className="summary-item">
//               <span>Shipping</span>
//               <span>$10</span>
//             </div>
//             <div className="summary-item total">
//               <span>Total:</span>
//               <span>${(parseFloat(calculateTotal()) * 1.21 + 10).toFixed(2)}</span>
//             </div>

//             {/* Show Checkout Button */}
//             {!checkout ? (
//               <button className="checkout-btn" onClick={() => setCheckout(true)}>
//                 Proceed to Payment
//               </button>
//             ) : (
//               <PayPalScriptProvider options={{ "client-id": "AcE5tnVEdPIABDFHbELA6SP5UmuwvrI3Cet__4pw2-HW58dd7F_FGCVR5xzazDbk9kxoPCIcKo2bN-h0" }}>
//                 <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
//               </PayPalScriptProvider>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import UserContext from "../UseContext"; 
// import './CartStyle.css';

// const Cart = () => {
//   const { user } = useContext(UserContext);  
//   const [cartDetails, setCartDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [checkout, setCheckout] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     zip: '',
//     directions: ''
//   });

//   // Fetch Cart Data
//   useEffect(() => {
//     if (!user || !user.user_id) {
//       setError("User ID is missing or invalid.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchCartDetails = async () => {
//       try {
//         const response = await axios.post('http://localhost/onlinerestro/backend/UserCart.php', { user_id: user.user_id });
//         if (response.data.status === 'success') {
//           setCartDetails(response.data.data);
//           setError(null);
//         } else {
//           setCartDetails([]);
//           setError("No cart data found.");
//         }
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//         setCartDetails([]);
//         setError('Error fetching cart data.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartDetails();
//   }, [user]);

//   // Get User's Current Location
//   const fetchLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
        
//         try {
//           const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
//           const locationData = response.data.address;

//           setAddress({
//             street: locationData.road || '',
//             city: locationData.city || locationData.town || '',
//             zip: locationData.postcode || '',
//             directions: ''
//           });
//         } catch (error) {
//           console.error("Error fetching location:", error);
//         }
//       }, (error) => {
//         console.error("Geolocation error:", error);
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   // Handle Form Input Change
//   const handleAddressChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   // Proceed to Payment
//   const handleProceedToPayment = () => {
//     setShowAddressForm(true);
//     fetchLocation();  // Auto-fill location
//   };

//   // Save Address and Show PayPal Button
//   const handleSaveAddress = () => {
//     if (!address.street || !address.city || !address.zip) {
//       alert("Please enter complete address details.");
//       return;
//     }
//     setShowAddressForm(false);
//     setCheckout(true);
//   };

//   // Calculate Total
//   const calculateTotal = () => {
//     return cartDetails.reduce((acc, item) => {
//       if (selectedItems[item.cart_id]) {
//         return acc + item.price * item.quantity;
//       }
//       return acc;
//     }, 0).toFixed(2);
//   };

//   const createOrder = async () => {
//     const totalAmount = calculateTotal();
//     const response = await axios.post('http://localhost/onlinerestro/backend/paypal_payment.php', { total: totalAmount, address });
//     return response.data.id; 
//   };

//   const onApprove = async (data) => {
//     console.log("Payment Approved:", data);
//     alert("Payment successful!");
//   };

//   return (
//     <div className="Cart-page">
//       <div className="cart-container">
//         <div className="cart-items-section">
//           <p className='cart-title'>Your cart ({cartDetails.length})</p>
//           <div className="cart-items">
//             {error && <p className="error-message">{error}</p>}
//             {isLoading ? (
//               <p>Loading...</p>
//             ) : cartDetails.length > 0 ? (
//               cartDetails.map((item) => (
//                 <div className="cart-item" key={item.cart_id}>
//                   <div className="cart-item-image">
//                     <img src={item.item_image || "https://via.placeholder.com/50"} alt={item.item_name} />
//                   </div>
//                   <div className="cart-item-details">
//                     <h4 className="cart-item-name">{item.item_name}</h4>
//                     <p className="cart-item-price">${item.price}</p>
//                   </div>
//                   <input 
//                     type="checkbox" 
//                     checked={selectedItems[item.cart_id] || false} 
//                     onChange={() => setSelectedItems({ ...selectedItems, [item.cart_id]: !selectedItems[item.cart_id] })} 
//                   />
//                 </div>
//               ))
//             ) : (
//               <p>Your cart is empty</p>
//             )}
//           </div>
//         </div>
        
//         <div className="order-summary-section">
//           <h3>Order Summary</h3>
//           <div className="order-summary">
//             <div className="summary-item">
//               <span>Subtotal</span>
//               <span>${calculateTotal()}</span>
//             </div>
//             <div className="summary-item total">
//               <span>Total:</span>
//               <span>${(parseFloat(calculateTotal()) * 1.21 + 10).toFixed(2)}</span>
//             </div>

//             {!checkout ? (
//               <button className="checkout-btn" onClick={handleProceedToPayment}>
//                 Proceed to Payment
//               </button>
//             ) : (
//               <PayPalScriptProvider options={{ "client-id": "AcE5tnVEdPIABDFHbELA6SP5UmuwvrI3Cet__4pw2-HW58dd7F_FGCVR5xzazDbk9kxoPCIcKo2bN-h0" }}>
//                 <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
//               </PayPalScriptProvider>
//             )}
//           </div>
//         </div>
//       </div>

//       {showAddressForm && (
//         <div className="address-modal">
//           <div className="address-form">
//             <h3>Enter Delivery Address</h3>
//             <input type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="Street Address" />
//             <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="City" />
//             <input type="text" name="zip" value={address.zip} onChange={handleAddressChange} placeholder="Zip Code" />
//             <textarea name="directions" value={address.directions} onChange={handleAddressChange} placeholder="Additional Directions"></textarea>
//             <button onClick={handleSaveAddress}>Save & Continue</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;




// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import UserContext from "../UseContext"; 
// import './CartStyle.css';

// const Cart = () => {
//   const { user } = useContext(UserContext);  
//   const [cartDetails, setCartDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [checkout, setCheckout] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     zip: '',
//     phone: '',
//     directions: ''
//   });

//   // Fetch Cart Data
//   useEffect(() => {
//     if (!user || !user.user_id) {
//       setError("User ID is missing or invalid.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchCartDetails = async () => {
//       try {
//         const response = await axios.post('http://localhost/onlinerestro/backend/UserCart.php', { user_id: user.user_id });
//         if (response.data.status === 'success') {
//           setCartDetails(response.data.data);
//           setError(null);
//         } else {
//           setCartDetails([]);
//           setError("No cart data found.");
//         }
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//         setCartDetails([]);
//         setError('Error fetching cart data.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCartDetails();
//   }, [user]);

//   // Get User's Current Location
//   const fetchLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
        
//         try {
//           const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
//           const locationData = response.data.address;

//           setAddress(prev => ({
//             ...prev,
//             street: locationData.road || '',
//             city: locationData.city || locationData.town || '',
//             zip: locationData.postcode || '',
//           }));
//         } catch (error) {
//           console.error("Error fetching location:", error);
//         }
//       }, (error) => {
//         console.error("Geolocation error:", error);
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   // Handle Form Input Change
//   const handleAddressChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   // Proceed to Payment
//   const handleProceedToPayment = () => {
//     setShowAddressForm(true);
//     fetchLocation();  // Auto-fill location
//   };

//   // Save Address and Show PayPal Button
//   const handleSaveAddress = () => {
//     if (!address.street || !address.city || !address.zip || !address.phone) {
//       alert("Please enter complete address details.");
//       return;
//     }
//     setShowAddressForm(false);
//     setCheckout(true);
//   };

//   // Calculate Total
//   const calculateTotal = () => {
//     return cartDetails.reduce((acc, item) => {
//       if (selectedItems[item.cart_id]) {
//         return acc + item.price * item.quantity;
//       }
//       return acc;
//     }, 0).toFixed(2);
//   };

//   const createOrder = async () => {
//     const totalAmount = calculateTotal();
//     const response = await axios.post('http://localhost/onlinerestro/backend/paypal_payment.php', { total: totalAmount, address });
//     return response.data.id; 
//   };

//   const onApprove = async (data) => {
//     console.log("Payment Approved:", data);
//     alert("Payment successful!");
//   };

//   return (
//     <div className="Cart-page">
//       <div className="cart-container">
//         <div className="order-summary-section">
//           <h3>Order Summary</h3>
//           <div className="order-summary">
//             <div className="summary-item">
//               <span>Subtotal</span>
//               <span>${calculateTotal()}</span>
//             </div>
//             <div className="summary-item total">
//               <span>Total:</span>
//               <span>${(parseFloat(calculateTotal()) * 1.21 + 10).toFixed(2)}</span>
//             </div>

//             {!checkout ? (
//               <button className="checkout-btn" onClick={handleProceedToPayment}>
//                 Proceed to Payment
//               </button>
//             ) : (
//               <PayPalScriptProvider options={{ "client-id": "AcE5tnVEdPIABDFHbELA6SP5UmuwvrI3Cet__4pw2-HW58dd7F_FGCVR5xzazDbk9kxoPCIcKo2bN-h0" }}>
//                 <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
//               </PayPalScriptProvider>
//             )}
//           </div>
//         </div>
//       </div>

//       {showAddressForm && (
//         <div className="address-modal">
//           <div className="address-form">
//             <h3>Enter Delivery Address</h3>
//             <input type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="Street Address" />
//             <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="City" />
//             <input type="text" name="zip" value={address.zip} onChange={handleAddressChange} placeholder="Zip Code" />
//             <input type="tel" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Phone Number" />
//             <textarea name="directions" value={address.directions} onChange={handleAddressChange} placeholder="Additional Directions"></textarea>
//             <button onClick={handleSaveAddress}>Save & Continue</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;




import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import UserContext from "../UseContext"; 
import './CartStyle.css';

const Cart = () => {
  const { user } = useContext(UserContext);  
  const [cartDetails, setCartDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: '',
    phone: '',
    directions: ''
  });

  // Fetch Cart Data
  useEffect(() => {
    if (!user || !user.user_id) {
      setError("User ID is missing or invalid.");
      setIsLoading(false);
      return;
    }

    const fetchCartDetails = async () => {
      try {
        const response = await axios.post('http://localhost/onlinerestro/backend/UserCart.php', { user_id: user.user_id });
        if (response.data.status === 'success') {
          setCartDetails(response.data.data);
          setError(null);
        } else {
          setCartDetails([]);
          setError("No cart data found.");
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
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

  
  const handleRemoveItem = (itemId, event) => {
    event.stopPropagation(); // Prevent event bubbling
    if (window.confirm("Are you sure you want to delete this item from your cart?")) {
      fetch('http://localhost/backend/delete_from_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', cart_id: itemId })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert("Item deleted successfully!");
          setCartDetails(prevCart => prevCart.filter(item => item.cart_id !== itemId)); // Update the state
        } else {
          alert("Failed to delete item. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please check the console for details.");
      });
    }
  };

  // Handle item selection for total calculation
  const handleItemSelect = (itemId) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId] // Toggle selection
    }));
  };

  // Get User's Current Location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const locationData = response.data.address;

          setAddress(prev => ({
            ...prev,
            street: locationData.road || '',
            city: locationData.city || locationData.town || '',
            zip: locationData.postcode || '',
          }));
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }, (error) => {
        console.error("Geolocation error:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle Form Input Change
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Proceed to Payment
  const handleProceedToPayment = () => {
    setShowAddressForm(true);
    fetchLocation();  // Auto-fill location
  };

  // Save Address and Show PayPal Button
  const handleSaveAddress = () => {
    if (!address.street || !address.city || !address.zip || !address.phone) {
      alert("Please enter complete address details.");
      return;
    }
    setShowAddressForm(false);
    setCheckout(true);
  };

  // Calculate Total
  const calculateTotal = () => {
    return cartDetails.reduce((acc, item) => {
      if (selectedItems[item.cart_id]) {
        return acc + item.price * item.quantity;
      }
      return acc;
    }, 0).toFixed(2);
  };

  const createOrder = async () => {
    const totalAmount = calculateTotal();
    const response = await axios.post('http://localhost/onlinerestro/backend/paypal_payment.php', { total: totalAmount, address });
    return response.data.id; 
  };

  const onApprove = async (data) => {
    console.log("Payment Approved:", data);
    alert("Payment successful!");
  };

  return (
    <div className="Cart-page">
      <div className="cart-container">
        <div className="cart-items-section">
          <p className="cart-title">Your Cart ({cartDetails.length})</p>
          
          <div className="cart-items">
            {error && <p className="error-message">{error}</p>}
            {isLoading ? (
              <p>Loading...</p>
            ) : cartDetails.length > 0 ? (
              cartDetails.map((item) => (
                <div
                  className={`cart-item ${selectedItems[item.cart_id] ? 'selected' : ''}`}
                  key={item.cart_id}
                  onClick={() => handleItemSelect(item.cart_id)}
                >
                  <div className="cart-item-image">
                    <img src={item.item_image || "https://via.placeholder.com/50"} alt={item.item_name} />
                  </div>

                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.description}</h4>
                    <p className="cart-item-name">{item.item_name}</p>
                    <p className="cart-item-price">${item.price}</p>

                    <div className="cart-item-quantity">
                      <button onClick={() => handleQuantityChange(item.cart_id, 'decrement')}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.cart_id, 'increment')}>+</button>
                    </div>
                  </div>

                  <button className="remove-btn" onClick={(e) => handleRemoveItem(item.cart_id, e)}><i className="fas fa-trash"></i></button>
                </div>
              ))
            ) : (
              <p style={{ color: 'black' }}>Your cart is empty</p>
            )}
          </div>
        </div>

        <div className="order-summary-section">
          <h3>Order Summary</h3>
          <div className="order-summary">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="summary-item">
              <span>Tax (21%)</span>
              <span>${(calculateTotal() * 0.21).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>$10</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>${(parseFloat(calculateTotal()) * 1.21 + 10).toFixed(2)}</span>
            </div>
            
            {!checkout ? (
              <button className="checkout-btn" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            ) : (
              <PayPalScriptProvider options={{ "client-id": "AcE5tnVEdPIABDFHbELA6SP5UmuwvrI3Cet__4pw2-HW58dd7F_FGCVR5xzazDbk9kxoPCIcKo2bN-h0" }}>
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressForm && (
        <div className="address-modal">
          <div className="address-form">
            <h3>Enter Delivery Address</h3>
            <input type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="Street Address" />
            <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="City" />
            <input type="text" name="zip" value={address.zip} onChange={handleAddressChange} placeholder="Zip Code" />
            <input type="tel" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Phone Number" />
            <textarea name="directions" value={address.directions} onChange={handleAddressChange} placeholder="Additional Directions"></textarea>
            <button onClick={handleSaveAddress}>Save & Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
