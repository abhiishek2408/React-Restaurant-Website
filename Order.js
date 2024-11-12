import React, { useEffect, useState, useRef } from 'react';
import './OrderStyle.css';
import SeasonalMenu from './SeasonalMenu';
import Offers from './Offers';
import AlaCarteMenu from './AlaCarteMenu';
import Appetizers from './Appetizers';  
import DrinksMenu from './DrinksMenu';
import Pasta from './Pasta';
import RiceGrainBasedDishes from './RiceGrainBasedDishes';
import MeatDishes from './MeatDishes';
import SeafoodDishes from './SeafoodDishes';
import CurryDishes from './CurryDishes';
import PizzaFlatbreads from './PizzaFlatbreads';
import BurgersSandwiches from './BurgersSandwiches';
import GrilledBarbecueDishes from './GrilledBarbecueDishes';
import AsianDishes from './AsianDishes';
import VegetarianVeganDishes from './VegetarianVeganDishes';
import MexicanDishes from './MexicanDishes';

// import $ from 'jquery';

const Order = () => {
  const [location, setLocation] = useState('');
  const [filterVisible, setFilterVisible] = useState({ cuisines: false });
  const [selectedFilters, setSelectedFilters] = useState([]); // Allow multiple filters
  const [selectedMenu, setSelectedMenu] = useState(<SeasonalMenu />);
  const modalRef = useRef(null); // Modal reference

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
            .then((response) => response.json())
            .then((data) => setLocation(data.display_name))
            .catch((error) => console.error("Error fetching location:", error));
        },
        () => alert("Unable to retrieve your location.")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Menu click handler to set the selected menu component
  const handleMenuClick = (menu) => {
    switch(menu) {
      case 'seasonal':
        setSelectedMenu(<SeasonalMenu />);
        break;
      case 'offers':
        setSelectedMenu(<Offers />);
        break;
      case 'alacarte':
        setSelectedMenu(<AlaCarteMenu />);
        break;
      case 'appetizers':
        setSelectedMenu(<Appetizers />);
        break;
      case 'drinks':
        setSelectedMenu(<DrinksMenu />);
        break;
      case 'pasta':
        setSelectedMenu(<Pasta />);
        break;
      case 'rice':
        setSelectedMenu(<RiceGrainBasedDishes />);
        break;
      case 'meat':
        setSelectedMenu(<MeatDishes />);
        break;
      case 'seafood':
        setSelectedMenu(<SeafoodDishes />);
        break;
      case 'curry':
        setSelectedMenu(<CurryDishes />);
        break;
      case 'pizza':
        setSelectedMenu(<PizzaFlatbreads />);
        break;
      case 'burgers':
        setSelectedMenu(<BurgersSandwiches />);
        break;
      case 'grilled':
        setSelectedMenu(<GrilledBarbecueDishes />);
        break;
      case 'asian':
        setSelectedMenu(<AsianDishes />);
        break;
      case 'vegetarian':
        setSelectedMenu(<VegetarianVeganDishes />);
        break;
      case 'mexican':
        setSelectedMenu(<MexicanDishes />);
        break;
      default:
        setSelectedMenu(null);
    }
  };

  const openModal = () => {
    modalRef.current.style.display = 'block';
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  const showFilterOptions = (filterType) => {
    setFilterVisible({ [filterType]: !filterVisible[filterType] });
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilters((prevFilters) => 
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value) // Remove if already selected
        : [...prevFilters, value] // Add filter if not selected
    );
  };

  const applyFilters = () => {
    if (selectedFilters.length > 0) {
      // Apply each filter and update the selected menu accordingly
      selectedFilters.forEach((filter) => {
        handleMenuClick(filter); // Use handleMenuClick to load the selected component
      });
      closeModal();
    } else {
      alert("Please select at least one filter.");
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <main style={{ backgroundColor: '#ccc' }}>
      <section className="location-filter-section">
        <h2>Explore Our Menu</h2>
        <div className="location-search">
          <span className="location-icon">📍</span>
          <span className="location-text" id="locationText">
            {location || 'Loading location...'}
          </span>
        </div>

        <div className="filter-buttons">
          <button className="filter-btn" onClick={openModal}>Filters</button>
          <button className="filter-btn" onClick={() => handleMenuClick('seasonal')}>Seasonal Menu</button>
          <button className="filter-btn" onClick={() => handleMenuClick('offers')}>Offers</button>
          <button className="filter-btn" onClick={() => handleMenuClick('alacarte')}>A La Carte Menu</button>
          <button className="filter-btn" onClick={() => handleMenuClick('appetizers')}>Appetizers</button>
          <button className="filter-btn" onClick={() => handleMenuClick('drinks')}>Drinks Menu</button>
          <button className="filter-btn" onClick={() => handleMenuClick('pasta')}>Pasta</button>
          <button className="filter-btn" onClick={() => handleMenuClick('rice')}>Rice & Grain-Based Dishes</button>
          <button className="filter-btn" onClick={() => handleMenuClick('meat')}>Meat Dishes</button>
          <button className="filter-btn" onClick={() => handleMenuClick('seafood')}>Seafood Dishes</button>
          <button className="filter-btn" onClick={() => handleMenuClick('curry')}>Curry Dishes</button>
          <button className="filter-btn" onClick={() => handleMenuClick('pizza')}>Pizza & Flatbreads</button>
          <button className="filter-btn" onClick={() => handleMenuClick('burgers')}>Burgers & Sandwiches</button>
          <button className="filter-btn" onClick={() => handleMenuClick('grilled')}>Grilled & Barbecue Dishes</button>
          <button className="filter-btn" onClick={() => handleMenuClick('asian')}>Asian Dishes</button>
          <button className="filter-btn" onClick={() => handleMenuClick('vegetarian')}>Vegetarian & Vegan Dishes</button>
          <button className="filter-btn" onClick={() => handleMenuClick('mexican')}>Mexican Dishes</button>
        </div>
      </section>

      <section>
        <div id="contentnew-container">
         
          {selectedMenu}
        </div>
      </section>

      {/* Filter Modal */}
      <div id="filterModal" className="modal" ref={modalRef}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="sidebar">
            <ul>
              <li onClick={() => showFilterOptions('cuisines')}>Cuisines</li>
            </ul>
          </div>
          <div className="filter-options-container">
            {filterVisible.cuisines && (
              <div id="cuisines" className="filter-options">
                <h3>Cuisines</h3>
                <form id="pageForm">
                  <label><input type="checkbox" value="appetizers" onChange={handleFilterChange} />Appetizers</label><br />
                  <label><input type="checkbox" value="drinks" onChange={handleFilterChange} />Drinks Menu</label><br />
                  <label><input type="checkbox" value="pasta" onChange={handleFilterChange} />Pasta</label><br />
                  <label><input type="checkbox" value="rice" onChange={handleFilterChange} />Rice and Grain-Based Dishes</label><br />
                  <label><input type="checkbox" value="meat" onChange={handleFilterChange} />Meat Dishes</label><br />
                  <label><input type="checkbox" value="seafood" onChange={handleFilterChange} />Seafood Dishes</label><br />
                  <label><input type="checkbox" value="curry" onChange={handleFilterChange} />Curry Dishes</label><br />
                  <label><input type="checkbox" value="pizza" onChange={handleFilterChange} />Pizza and Flatbreads</label><br />
                  <label><input type="checkbox" value="burgers" onChange={handleFilterChange} />Burgers and Sandwiches</label><br />
                  <label><input type="checkbox" value="grilled" onChange={handleFilterChange} />Grilled and Barbecue Dishes</label><br />
                  <label><input type="checkbox" value="asian" onChange={handleFilterChange} />Asian Dishes</label><br />
                  <label><input type="checkbox" value="vegetarian" onChange={handleFilterChange} />Vegetarian and Vegan Dishes</label><br />
                  <label><input type="checkbox" value="mexican" onChange={handleFilterChange} />Mexican Dishes</label><br />
                </form>
                <div className="apply-buttons">
                  <button type="button" className="clear-button" onClick={clearFilters}>Clear all</button>
                  <button type="button" className="apply-button" onClick={applyFilters}>Apply</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Order;
