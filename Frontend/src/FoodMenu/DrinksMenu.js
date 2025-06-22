// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Ensure axios is imported
// import { useContext } from "react";
// import UserContext from "../UseContext"; 
// import './FoodMenuStyle.css';

// const MenuComponent = () => {
//   const { user } = useContext(UserContext); 
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalData, setModalData] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [specialRequest, setSpecialRequest] = useState(""); // New state for special request

//   // Fetch menu items from PHP API
//   useEffect(() => {
//     fetch('http://localhost/onlinerestro/backend/Appetizers.php')
//       .then(response => response.json())
//       .then(data => {
//         setMenuItems(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching menu items:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (!user) {
//     return <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>No user data found. Please log in.</p>;
//   }

//   // Function to open modal with item details
//   const openModal = (item) => {
//     setModalData(item);
//     setQuantity(1); // Reset quantity when opening modal
//     setSpecialRequest(""); // Reset special request when opening modal
//   };

 
 



//   const addToCart = () => {
//     if (!modalData) return;

//     // Construct cartData using React state and modalData
//     const cartData = {
//         user_id: user.user_id,
//         item_id: modalData.Id,              
//         item_image: modalData.product_image, 
//         item_name: modalData.name,           
//         item_price: modalData.price,         
//         quantity: quantity,                  
//         special_request: specialRequest, // Use the specialRequest state
//     };

//     console.log(cartData);  // Log cartData to check if it's correct

//     axios.post('http://localhost/onlinerestro/backend/add_to_cart.php', cartData, {
//         headers: {
//             'Content-Type': 'application/json',  // Specify Content-Type as JSON
//         }
//     })
//     .then(response => {
//         console.log(response.data);  // Log response to see what is returned from the server
//         if (response.data.success) {
//             alert("Item added to cart successfully!");
//             setModalData(null); // Close the modal after adding to cart
//         } else {
//             alert("Failed to add item to cart.");
//         }
//     })
//     .catch(error => {
//         console.error('Error adding item to cart:', error);
//         alert("An error occurred. Please try again.");
//     });
// };








//   // Update total price based on quantity
//   const updateTotalPrice = (price, quantity) => {
//     return (price * quantity).toFixed(2);
//   };

//   return (
//     <div className="menu-container">
//       <div className="food-type-heading">Appetizers</div>
//       {/* <h1>{user.user_id}</h1> */}

//       {loading ? (
//         <div className="loader"></div>
//       ) : (
//         <div className="menu-item-cards-flex">
//           {menuItems.map(item => (
//             <div
//               key={item.id || item.name}
//               className="menu-item-card-flex"
//               onClick={() => openModal(item)}
//             >
//               <div className="image-container">
//                 <img
//                   src={`data:image/jpeg;base64,${item.product_image}`}
//                   alt={item.name}
//                 />
//               </div>
//               <div className="name-rating">
//                 <h3>{item.name}</h3>
//                 <p>Price: ${item.price}</p>
//                 <p>Time: {item.time} min</p>
//               </div>
    
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for item details */}

//       {modalData && (
//         <div id="menuModal" className="menu-modal">
//           <div className="menu-modal-content">
//             <span className="menu-modal-close" onClick={() => setModalData(null)}>
//               &times;
//             </span>

//             <div className="menu-modal-container">
//               <div className="menu-product-detail">
//                 <div className="menu-product-content">
//                   <div className="menu-product-image">
//                     <img
//                       src={`data:image/jpeg;base64,${modalData.product_image}`}
//                       alt={modalData.name}
//                     />
//                   </div>

//                   <div className="menu-additional-info">
//                     <h3>Additional Information</h3>
//                     <ul>
//                       <li>Preparation Time: {modalData.time} mins</li>
//                       <li>Vegan: 🌱 {modalData.vegan ? "Yes" : "No"}</li>
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="menu-product-info">
//                   <h2>{modalData.name}</h2>
//                   {/* <h2>{modalData.Id}</h2> */}
//                   <p>Price: ${modalData.price}</p>
//                   <div className="rating">
//                     <p>Rating: {modalData.rating}⭐</p>
//                   </div>
//                   <p>{modalData.description}</p>

//                   <p>Special Request: </p>
//                   <textarea
//                     id="special-request"
//                     placeholder=""
//                     value={specialRequest}
//                     onChange={(e) => setSpecialRequest(e.target.value)} // Update state on change
//                   />

//                   <p>Quantity: </p>
//                   <div className="quantity-selector">
//                     <button type="button" onClick={() => setQuantity(quantity - 1)}>-</button>
//                     <input
//                       type="number"
//                       id="quantity"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) => setQuantity(parseInt(e.target.value))}
//                     />
//                     <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
//                   </div>

//                   <button
//                     className="add-to-cart"
//                     onClick={addToCart}
//                   >
//                     Add to Cart | ${updateTotalPrice(modalData.price, quantity)}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuComponent;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "../UseContext";

const MenuComponent = () => {
  const { user } = useContext(UserContext); 
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('http://localhost/onlinerestro/backend/drinksMenu.php')
      .then(response => response.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      });
  }, []);

  if (!user) {
    return <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>No user data found. Please log in.</p>;
  }

  const openModal = (item) => {
    setModalData(item);
    setQuantity(1);
  };

  const addToCart = () => {
    if (!modalData) return;

    const cartData = {
      user_id: user.user_id,
      item_id: modalData.Id,
      item_image: modalData.product_image,
      item_name: modalData.name,
      item_price: modalData.price,
      description: modalData.description,
      quantity: quantity,
    };

    axios.post('http://localhost/onlinerestro/backend/add_to_cart.php', cartData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.data.success) {
        alert("Item added to cart successfully!");
        setModalData(null);
      } else {
        alert("Failed to add item to cart.");
      }
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
      alert("An error occurred. Please try again.");
    });
  };

  const updateTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  // Inline styles

  const containerStyle = {
  padding: '20px',
  paddingLeft: '32px',         // Add this
 paddingRight: '12px',
  width: '95vw',              // Use 95% of viewport width
  maxWidth: '1100px',         // Increased width
  margin: '0 auto',
  boxSizing: 'border-box',
  
};

const cardsWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  padding:'5px',
  paddingLeft:'2px',
  justifyContent: 'flex-start',
  
  
};

const cardStyle = {
  flex: '0 0 calc(15.6% - 14px)', // Ensures 6 per row with spacing
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
  backgroundColor: '#fff',
  overflow: 'hidden',
  cursor: 'pointer',
  paddingBottom: '8px',
  transition: 'transform 0.2s ease-in-out',
  minWidth: '200px',
};


  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'left',
  };

 

  const imageContainerStyle = {
    width: '100%',
    height: '120px',
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const textContainerStyle = {
    padding: '10px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '15px',
    margin: '6px 0 2px',
  };

  const paraStyle = {
    fontSize: '13px',
    margin: '2px 0',
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <div className="food-type-heading">Drinks Menu</div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div style={cardsWrapperStyle}>
          {menuItems.map(item => (
            <div
              key={item.id || item.name}
              style={cardStyle}
              onClick={() => openModal(item)}
            >
              <div style={imageContainerStyle}>
                <img
                  src={`data:image/jpeg;base64,${item.product_image}`}
                  alt={item.name}
                  style={imageStyle}
                />
              </div>
              <div style={textContainerStyle}>
                <h3 style={titleStyle}>{item.name}</h3>
                <p style={paraStyle}>Price: ${item.price}</p>
                <p style={paraStyle}>Time: {item.time} min</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalData && (
        <div id="menuModal" className="menu-modal">
          <div className="menu-modal-content">
            <span className="menu-modal-close" onClick={() => setModalData(null)}>
              &times;
            </span>

            <div className="menu-modal-container">
              <div className="menu-product-detail">
                <div className="menu-product-content">
                  <div className="menu-product-image">
                    <img
                      src={`data:image/jpeg;base64,${modalData.product_image}`}
                      alt={modalData.name}
                    />
                  </div>

                  <div className="menu-additional-info">
                    <h3>Additional Information</h3>
                    <ul>
                      <li>Preparation Time: {modalData.time} mins</li>
                      <li>Vegan: 🌱 {modalData.vegan ? "Yes" : "No"}</li>
                    </ul>
                  </div>
                </div>

                <div className="menu-product-info">
                  <h2>{modalData.name}</h2>
                  <h3 style={{ color: 'green' }}>Price: ${modalData.price}</h3>
                  <div className="rating">
                    <p>Rating: {modalData.rating}⭐</p>
                  </div>
                  <p>{modalData.description}</p>

                  <p>Quantity: </p>
                  <div className="quantity-selector">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    />
                    <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>

                  <button
                    className="add-to-cart"
                    onClick={addToCart}
                  >
                    Add to Cart | ${updateTotalPrice(modalData.price, quantity)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
