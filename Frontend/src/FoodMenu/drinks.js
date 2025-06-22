import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import axios from 'axios'; 
import UserContext from "../UseContext"; 
import './FoodMenuStyle.css';

const MenuComponent = () => {
  const { user } = useContext(UserContext); 
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState(""); 


  useEffect(() => {
    fetch('http://localhost/onlinerestro/backend/alacarteMenu.php')
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
    setSpecialRequest("");
  };

 
 



  const addToCart = () => {
    if (!modalData) return;


    const cartData = {
        user_id: user.user_id,
        item_id: modalData.Id,              
        item_image: modalData.product_image, 
        item_name: modalData.name,           
        item_price: modalData.price,         
        quantity: quantity,                  
        special_request: specialRequest, 
    };

    console.log(cartData);  

    axios.post('http://localhost/onlinerestro/backend/add_to_cart.php', cartData, {
        headers: {
            'Content-Type': 'application/json',  
        }
    })
    .then(response => {
        console.log(response.data); 
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

  return (
    <div className="menu-container">
      <div className="food-type-heading">A La Carte Menu</div>
      {/* <h1>{user.user_id}</h1> */}

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="menu-item-cards-flex">
          {menuItems.map(item => (
            <div
              key={item.id || item.name}
              className="menu-item-card-flex"
              onClick={() => openModal(item)}
            >
              <div className="image-container">
                <img
                  src={`data:image/jpeg;base64,${item.product_image}`}
                  alt={item.name}
                />
              </div>
              <div className="name-rating">
                <h3>{item.name}</h3>
                <div className="rating">{item.rating} ⭐</div>
              </div>
              <div className="item-price-time">
                <p>Price: ${item.price}</p>
                <p>Time: {item.time} min</p>
              </div>
              <p className={item.vegan ? "item-vegan-label" : "item-non-vegan-label"}>
                {item.vegan ? "🌱 Vegan" : "🍗 Non-Vegan"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal for item details */}

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
                  {/* <h2>{modalData.Id}</h2> */}
                  <p>Price: ${modalData.price}</p>
                  <div className="rating">
                    <p>Rating: {modalData.rating}⭐</p>
                  </div>
                  <p>{modalData.description}</p>

                  <p>Special Request: </p>
                  <textarea
                    id="special-request"
                    placeholder=""
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                  />

                  <p>Quantity: </p>
                  <div className="quantity-selector">
                    <button type="button" onClick={() => setQuantity(quantity - 1)}>-</button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
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

