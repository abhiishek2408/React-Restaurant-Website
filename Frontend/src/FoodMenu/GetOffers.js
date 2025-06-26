import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "../UseContext";

const MenuComponent = () => {
  const { user } = useContext(UserContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('http://localhost/onlinerestro/backend/get_offers.php')
      .then(res => res.json())
      .then(data => {
        setOffers(data.offers || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const openModal = (item) => {
    setModalData(item);
    setQuantity(1);
  };

  const addToCart = () => {
    if (!modalData) return;

    const cartData = {
      user_id: user.user_id,
      item_id: modalData.id || modalData.Id,
      item_image: modalData.product_image,
      item_name: modalData.name,
      item_price: modalData.price,
      description: modalData.description,
      quantity: quantity,
    };

    axios.post('http://localhost/onlinerestro/backend/add_to_cart.php', cartData, {
      headers: { 'Content-Type': 'application/json' }
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

  const updateTotalPrice = (price, quantity) => (price * quantity).toFixed(2);

  const pink = "#e91e63";
  const lightPink = "#fce4ec";

  const containerStyle = {
   padding: '5px',
  width: '95vw',              // Use 95% of viewport width
  maxWidth: '1008px',         // Increased width
  margin: '0 auto',
  justifyContent:'center',
  alignItems:'center',
  boxSizing: 'border-box',
  };



  const cardsWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  padding:'5px',
  paddingLeft:'5px',
  justifyContent: 'flex-start',
  
  
};

  const cardStyle = {
    flex: '0 0 calc(15.6% - 14px)',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#fff',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    border: `2px solid ${lightPink}`,
    minWidth: '188px',
  };



  const titleStyle = {
    fontSize: '16px',
    fontWeight: 600,
    color: pink,
    marginBottom: '4px',
  };

  if (!user) {
    return <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>No user data found. Please log in.</p>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", color: pink }}>🔥 Today’s Offers</h2>

      {loading ? <p>Loading offers...</p> : (
        <div style={cardsWrapperStyle}>
          {offers.map(item => (
            <div key={item.id} style={cardStyle} onClick={() => openModal(item)}>
              <img src={item.product_image} alt={item.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <h3 style={titleStyle}>{item.name}{item.vegan === "1" && <span> 🌱</span>}</h3>
                <p style={{ fontSize: '13px', color: '#555' }}>{item.description}</p>
                <p style={{ fontSize: '13px' }}>₹{item.price} • ⭐ {item.rating}</p>
                <p style={{ backgroundColor: pink, color: '#fff', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', fontSize: '12px', marginTop: '4px' }}>
                  {item.offers}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalData && (
        <div id="menuModal" className="menu-modal">
          <div className="menu-modal-content">
            <span className="menu-modal-close" onClick={() => setModalData(null)}>&times;</span>
            <div className="menu-modal-container">
              <div className="menu-product-detail">
                <div className="menu-product-content">
                  <div className="menu-product-image">
                    <img
                      src={modalData.product_image}
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
                  <h3 style={{ color: 'green' }}>Price: ₹{modalData.price}</h3>
                  <div className="rating"><p>Rating: {modalData.rating}⭐</p></div>
                  <p>{modalData.description}</p>

                  <p>Quantity:</p>
                  <div className="quantity-selector">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>

                  <button className="add-to-cart" onClick={addToCart}>
                    Add to Cart | ₹{updateTotalPrice(modalData.price, quantity)}
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
