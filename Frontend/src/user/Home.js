import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// Image imports
import ExploreMenu from "../image/exploremenurb2.png";
import OrderNow from "../image/ordernowrb2.png";
import diningImage from "../image/bookdiningrb2.png";
import Pizza from "../image/pizza.png";
import Burger from "../image/burger.png";
import Noodle from "../image/noodle.png";
import Dessert from "../image/dessert.png";
import Mocktail from "../image/mocktails.png";
import Appetizerb from "../image/appetizerb.png";
import DrinkMenurb from "../image/drinkmenurb.png";
import PastaImg from "../image/pastarb.png";
import RiceGrain from "../image/ricegrainrb.png";
import MeatDishesImg from "../image/meatdishesrb.png";
import SeafoodDishesImg from "../image/seafoodrb.png";
import CurryDishesImg from "../image/curryfoodrb.png";
import PizzaFlatbreadsImg from "../image/Pizzarb.png";
import BurgerSandwichesImg from "../image/burgersSandwichesrb.png";
import GrilledBBQ from "../image/grilledBBQrb.png";
import AsianDishesImg from "../image/asianDishesrb.png";
import VegetarianVegans from "../image/vegeterianVeganrb.png";
import MexicanDishesImg from "../image/mexicanDishesrb.png";
import SoupsSalads from "../image/soupsSaladsrb.png";
import DessertsImg from "../image/dessertsrb.png";
import NoodlesStirFry from "../image/noodlesStirFryrb.png";
import MiddleEastern from "../image/middleasternrb.png";
import ItalianSpecials from "../image/italianSpecialsrb.png";

// Menu Components
import SeasonalMenu from "../FoodMenu/SeasonalMenu";
import Offers from "./Offers";
import AlaCarteMenu from "../FoodMenu/AlaCarteMenu";
import Appetizers from "../FoodMenu/Appetizers";
import DrinksMenu from "../FoodMenu/DrinksMenu";
import Pasta from "../FoodMenu/Pasta";
import RiceGrainBasedDishes from "../FoodMenu/RiceGrainBasedDishes";
import MeatDishes from "../FoodMenu/MeatDishes";
import SeafoodDishes from "../FoodMenu/SeafoodDishes";
import CurryDishes from "../FoodMenu/CurryDishes";
import PizzaFlatbreads from "../FoodMenu/PizzaFlatbreads";
import BurgersSandwiches from "../FoodMenu/BurgersSandwiches";
import GrilledBarbecueDishes from "../FoodMenu/GrilledBarbecueDishes";
import AsianDishes from "../FoodMenu/AsianDishes";
import VegetarianVeganDishes from "../FoodMenu/VegetarianVeganDishes";
import MexicanDishes from "../FoodMenu/MexicanDishes";

const containerMaxWidth = "1040px";

const styles = {
  homeContainer: {
    width: "100%",
    maxwidth: "1300px",
    margin: "0 auto",
    padding: "20px 0",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    boxsizing: "border-box",
    backgroundColor: "#fff",
  },

  banner: {
    background: "linear-gradient(135deg, #ff6f91, #ffc1d6)",
    backgroundblendmode: "overlay",
    color: "#fff",
    padding: "20px",
    borderRadius: "2rem",
    boxShadow: "0 8px 30px rgba(255, 105, 135, 0.3)",
    backdropfilter: "blur(5px)",
  },
  bannerH1: {
    fontSize: "3rem",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  },
  bannerLead: {
    fontSize: "1.15rem",
    fontWeight: 400,
    color: "rgba(255,255,255,0.85)",
  },
  bannerBtn: {
    backgroundColor: "#fff",
    color: "#d63384",
    fontWeight: 500,
    border: "none",
    margin: "20px",
    padding: "6px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(214, 51, 132, 0.2)",
  },
  bannerImages: {
    height: "90px",
    margin: "0 1px",
    objectFit: "contain",
    borderRadius: "12px",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
  },

  sectionContainer: {
    display: 'flex',
    width: containerMaxWidth,
    maxWidth: "1003px",
    margin: "24px auto",
    padding: "4px 20px",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
  },

  menuItem: {
    width: "97px",
    height: "120px",
    cursor: "pointer",
    
  },
  menuItemImg: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
  },





  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    justifyContent: "center",
    margin: "2px auto",
    width: containerMaxWidth,
    padding: "0 20px",
    boxSizing: "border-box",
  },
  
  cardBox: {
    flex: "1 1 280px",
    width:'100%',
    maxWidth: "490px",
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },
  cardImageWrapper: {
    width: "100%",
    height: "220px",
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "20px",
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  cardOverlayH2: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#000",
  },
  cardOverlayP: {
    fontSize: "0.95rem",
    marginBottom: "12px",
    color: "#fff",
  },
  orderBtn: {
    backgroundColor: "#ffb703",
    color: "#000",
    padding: "10px 18px",
    fontWeight: 600,
    fontSize: "0.95rem",
    borderRadius: "30px",
    textDecoration: "none",
    alignSelf: "flex-start",
    boxShadow: "0 4px 12px rgba(255, 183, 3, 0.3)",
  },



//contact page css
contactWrapperStyle: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#ffffff',
    padding: '8px 50px',  // ⬅️ Reduced vertical padding
    display: 'flex',
    justifyContent: 'center',
    
  },

  contactContainerStyle: {
    maxWidth: '1000px',    // ⬅️ Increased width
    width: '100%',
    backgroundColor: '#fff',
    padding: '25px',       // ⬅️ Reduced padding
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
  },

  titleStyle: {
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: '600',
    color: '#ff99b5',
    marginBottom: '16px',
  },

  inputStyle: {
    width: '100%',
    padding: '10px',       // ⬅️ Reduced height
    marginBottom: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },

  textareaStyle: {
    height: '80px',        // ⬅️ Shorter height
    resize: 'none',
  },

  buttonStyle: {
    backgroundColor: '#ff99b5',
    color: '#fff',
    padding: '10px 18px',  // ⬅️ Reduced button height
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  successMessageStyle: {
    marginTop: '14px',
    color: '#155724',
    backgroundColor: '#d4edda',
    padding: '10px',
    borderRadius: '6px',
    textAlign: 'center',
  },

  errorMessageStyle: {
    marginTop: '14px',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '6px',
    textAlign: 'center',
  },

};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(<SeasonalMenu />);

  const slides = [
    {
      img: ExploreMenu,
      title: "Welcome to Our Restaurant",
      buttonText: "Explore Menu",
      themepara:
        "Indulge in a delightful dining experience. Explore our menu now!",
      path: "/user/order",
    },
    {
      img: OrderNow,
      title: "Fresh Ingredients, Tasty Meals",
      buttonText: "Order Now",
      themepara:
        "Savor delicious meals made with fresh ingredients. Order now!",
      path: "/user/order",
    },
    {
      img: diningImage,
      title: "Relax and Enjoy Your Meal",
      buttonText: "Reserve a Table",
      themepara: "Unwind and savor your meal. Reserve your table today!",
      path: "/user/booktable",
    },
  ];


    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    try {
      const res = await fetch("http://localhost/onlinerestro/backend/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = (menu) => {
    const menus = {
      seasonal: <SeasonalMenu />,
      offers: <Offers />,
      alacarte: <AlaCarteMenu />,
      appetizers: <Appetizers />,
      drinks: <DrinksMenu />,
      pasta: <Pasta />,
      rice: <RiceGrainBasedDishes />,
      meat: <MeatDishes />,
      seafood: <SeafoodDishes />,
      curry: <CurryDishes />,
      pizza: <PizzaFlatbreads />,
      burgers: <BurgersSandwiches />,
      grilled: <GrilledBarbecueDishes />,
      asian: <AsianDishes />,
      vegetarian: <VegetarianVeganDishes />,
      mexican: <MexicanDishes />,
    };
    setSelectedMenu(menus[menu] || null);
  };

  return (
    <div style={styles.homeContainer}>
      {/* Banner */}
      <div style={{ ...styles.banner, ...styles.sectionContainer }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 style={styles.bannerH1}>Delicious Bites</h1>
            <p style={styles.bannerLead}>
              Your favourite restaurant is now online
            </p>
            <button className="btn" style={styles.bannerBtn}>
              Order Now
            </button>
          </div>
          <div className="col-md-6 d-none d-md-flex justify-content-end align-items-end">
            {[Pizza, Burger, Noodle, Dessert, Mocktail].map((img, i) => (
              <img key={i} src={img} alt="" style={styles.bannerImages} />
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div style={styles.sectionContainer}>
        <div
          className="d-grid gap-3 text-center"
          style={{
            gridTemplateColumns: "repeat(9, 1fr)",
            display: "grid",
            justifyItems: "center",
          }}
        >
          {[
            { src: Appetizerb, label: "Appetizers", menu: "appetizers" },
            { src: DrinkMenurb, label: "Drinks Menu", menu: "drinks" },
            { src: PastaImg, label: "Pasta", menu: "pasta" },
            { src: RiceGrain, label: "Rice & Grains", menu: "rice" },
            { src: MeatDishesImg, label: "Meat Dishes", menu: "meat" },
            { src: SeafoodDishesImg, label: "Seafood Dishes", menu: "seafood" },
            { src: CurryDishesImg, label: "Curry Dishes", menu: "curry" },
            {
              src: PizzaFlatbreadsImg,
              label: "Pizza & Flatbreads",
              menu: "pizza",
            },
            {
              src: BurgerSandwichesImg,
              label: "Burgers & Sandwiches",
              menu: "burgers",
            },
            { src: GrilledBBQ, label: "Grilled & BBQ", menu: "grilled" },
            { src: AsianDishesImg, label: "Asian Dishes", menu: "asian" },
            {
              src: VegetarianVegans,
              label: "Vegetarian & Vegan",
              menu: "vegetarian",
            },
            { src: MexicanDishesImg, label: "Mexican Dishes", menu: "mexican" },
            { src: SoupsSalads, label: "Soups & Salads" },
            { src: DessertsImg, label: "Desserts" },
            { src: NoodlesStirFry, label: "Noodles & Stir-Fry" },
            { src: MiddleEastern, label: "Middle Eastern" },
            { src: ItalianSpecials, label: "Italian Specials" },
          ].map((item, index) => (
            <div
              key={index}
              style={styles.menuItem}
              onClick={() => item.menu && handleMenuClick(item.menu)}
              className="p-2 border rounded shadow-sm d-flex flex-column align-items-center justify-content-center"
            >
              <img src={item.src} alt={item.label} style={styles.menuItemImg} />
              <p className="mb-0 small text-center " style={{ color: '#000', fontWeight: 100 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Carousel */}
      <div style={styles.cardsContainer}>
        {slides.map((slide, index) => (
          <div style={styles.cardBox} key={index}>
            <div style={styles.cardImageWrapper}>
              <img src={slide.img} alt={slide.title} style={styles.cardImage} />
              <div style={styles.cardOverlay}>
                <h2 style={styles.cardOverlayH2}>{slide.title}</h2>
                <p style={styles.cardOverlayP}>{slide.themepara}</p>
                <Link to={slide.path} style={styles.orderBtn}>
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Section */}
      <section>
        <div>{selectedMenu}</div>
      </section>

<div style={styles.contactWrapperStyle}>
  <div style={styles.contactContainerStyle}>
    <h2 style={styles.titleStyle}>Contact Us</h2>

    <form onSubmit={handleSubmit}>
      {/* Row 1: Name + Email */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ ...styles.inputStyle, flex: 1 }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{ ...styles.inputStyle, flex: 1 }}
          required
        />
      </div>

      {/* Row 2: Phone + Message */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ ...styles.inputStyle, flex: 1 }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...styles.inputStyle, ...styles.textareaStyle, flex: 1 }}
          required
        ></textarea>
      </div>

      <button type="submit" style={styles.buttonStyle}>Send Message</button>
    </form>

    {submitted && <div style={styles.successMessageStyle}>Thank you! Your message has been sent.</div>}
    {error && <div style={styles.errorMessageStyle}>{error}</div>}
  </div>
</div>


    </div>
  );
};

export default HeroSection;
