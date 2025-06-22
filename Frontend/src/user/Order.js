import React, {useState, useRef } from 'react';
import SeasonalMenu from '../FoodMenu/SeasonalMenu';
import Offers from './Offers';
import AlaCarteMenu from '../FoodMenu/AlaCarteMenu';
import Appetizers from '../FoodMenu/Appetizers';
import DrinksMenu from '../FoodMenu/DrinksMenu';
import Pasta from '../FoodMenu/Pasta';
import RiceGrainBasedDishes from '../FoodMenu/RiceGrainBasedDishes';
import MeatDishes from '../FoodMenu/MeatDishes';
import SeafoodDishes from '../FoodMenu/SeafoodDishes';
import CurryDishes from '../FoodMenu/CurryDishes';
import PizzaFlatbreads from '../FoodMenu/PizzaFlatbreads';
import BurgersSandwiches from '../FoodMenu/BurgersSandwiches';
import GrilledBarbecueDishes from '../FoodMenu/GrilledBarbecueDishes';
import AsianDishes from '../FoodMenu/AsianDishes';
import VegetarianVeganDishes from '../FoodMenu/VegetarianVeganDishes';
import MexicanDishes from '../FoodMenu/MexicanDishes';
import './OrderStyle.css';

const Order = () => {

  const [filterVisible, setFilterVisible] = useState({ cuisines: false });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(<SeasonalMenu />);
  const modalRef = useRef(null);


  const handleMenuClick = (menu) => {
    switch (menu) {
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
      prevFilters.includes(value) ? prevFilters.filter((filter) => filter !== value) : [...prevFilters, value]
    );
  };

  const applyFilters = () => {
    if (selectedFilters.length > 0) {
      selectedFilters.forEach((filter) => {
        handleMenuClick(filter);
      });
      closeModal();
    } else {
      alert('Please select at least one filter.');
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <main style={{ backgroundColor: '#fff' }}>
      <section className="location-filter-section">
        <h2>Explore Our Menu</h2>
       

        <div className="filter-buttons">
          <button className="filter-btn" onClick={openModal}>
            <i className="fas fa-sliders-h filter-icon" aria-hidden="true"></i> Show filters
          </button>
        </div>
      </section>

      <section>
        <div id="contentnew-container">{selectedMenu}</div>
      </section>

      <div id="filterModal" className="menufilter-modal" ref={modalRef}>
        <div className="menufilter-modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="sidebar">
            <ul>
              <li onClick={() => showFilterOptions('cuisines')}>Cuisines</li>
            </ul>
          </div>

          <div className="filter-options-container">
            {filterVisible.cuisines && (
              <div id="cuisines" className="filter-option">
                <h1>Cuisines</h1>
                <form id="pageForm">
                  <label>
                    <br></br>
                    <input type="checkbox" value="appetizers" onChange={handleFilterChange} />
                    Appetizers
                  </label>
                  <label>
                    <input type="checkbox" value="drinks" onChange={handleFilterChange} />
                    Drinks Menu
                  </label>
                  <label>
                    <input type="checkbox" value="pasta" onChange={handleFilterChange} />
                    Pasta
                  </label>
                  <label>
                    <input type="checkbox" value="rice" onChange={handleFilterChange} />
                    Rice and Grain-Based Dishes
                  </label>
                  <label>
                    <input type="checkbox" value="meat" onChange={handleFilterChange} />
                    Meat Dishes
                  </label>
                  <label>
                    <input type="checkbox" value="seafood" onChange={handleFilterChange} />
                    Seafood Dishes
                  </label>
                  <label>
                    <input type="checkbox" value="curry" onChange={handleFilterChange} />
                    Curry Dishes
                  </label>
                  <label>
                    <input type="checkbox" value="pizza" onChange={handleFilterChange} />
                    Pizza and Flatbreads
                  </label>
                  <label>
                    <input type="checkbox" value="burgers" onChange={handleFilterChange} />
                    Burgers and Sandwiches
                  </label>
                  <label>
                    <input type="checkbox" value="grilled" onChange={handleFilterChange} />
                    Grilled and Barbecue Dishes
                  </label>
                  <label>
                    <input type="checkbox" value="asian" onChange={handleFilterChange} />
                    Asian Dishes
                  </label>
                  <label>
                    <input type="checkbox" value="vegetarian" onChange={handleFilterChange} />
                    Vegetarian and Vegan Dishes
                  </label>
                  <label>
                    <input type="checkbox" value="mexican" onChange={handleFilterChange} />
                    Mexican Dishes
                  </label>
                </form>

                <div className="apply-buttons">
                  <button type="button" className="clear-button" onClick={clearFilters}>
                    Clear all
                  </button>
                  <button type="button" className="apply-button" onClick={applyFilters}>
                    Apply
                  </button>
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
