import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeStyle.css';

// Import images from the 'images' folder
import featurePic1 from './image/featurepic1.jpg';
import featurePic2 from './image/featurepic2.png';
import curlyLine from './image/curlyline.jpg';
import diningImage from './image/dining1.jpg';
import OccasionImage from './image/Occasion1.jpg'; 

const HeroSection = () => {


    return (
    <>
        <section id="hero">
            <div className="overlay"></div>
            <div className="hero-content">
                <h1>Welcome to Bistrofy</h1>
                <p>A Symphony of Flavors Awaits</p>
                <Link to="/order" className="btn-primary" id="orderOnlineBtn">Order Online</Link>
            </div>
            <img src={featurePic2} alt="Feature 2" className="feature-img2" />
            <img src={featurePic1} alt="Feature 1" className="feature-img1" />
            <img src={curlyLine} alt="Curly Line" className="feature-img3" />
            <img src={curlyLine} alt="Curly Line" className="feature-img4" />
        </section>


            <section className="Bistrofy-container">
                <main>
                    <h1 className="Bistrofy-header">
                        Inspired by the rich heritage of Indian cuisine, Bistrofy offers a vibrant, contemporary twist on beloved traditional flavors.
                    </h1>
                    <Link to="/booktable" className="Bistrofy-book-button" id="bookOnlineBtn">Reserve Your Seat</Link>
                    <img src={diningImage} alt="Dining Experience" className="Bistrofy-dining" />
                </main>
            </section>




 




            <div className="occasion-container">
            <div className="occasion-image-section">
                <img src={OccasionImage} alt="Food" />
            </div>
            <div className="occasion-text-section">
                <div className="occasion-icons">
                    {/* Add icons here if needed */}
                </div>
                <h2>Your Perfect Destination for Any Occasion</h2>
                <p className="occasion-description">
                From coordination to execution, our team is dedicated to ensuring every detail of your event goes off without a hitch.
                </p>

                <Link to="/eventbook" className="occasion-button">Private Events</Link>
                <div className="occasion-contact-info">
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <strong style={{ marginRight: '10px' }}>Address:</strong>
                        <p style={{ marginLeft: '86px' }}>
                             123 Kashi Vishwanath Road<br/> 
                             Varanasi, Uttar Pradesh, 221001
                            
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <strong style={{ marginRight: '10px' }}>Opening Hours:</strong>
                        <p style={{ marginLeft: '40px' }}>
                            Mon - Fri : 8am - 8pm<br />
                            Saturday : 9am - 7pm<br />
                            Sunday : 9am - 8pm
                        </p>
                    </div>
                </div>
            </div>
        </div>

  



<section className="testimonial-section" id="testimonial">
<div className="testimonial-header">
    <h2>What Our Diners Say About Us</h2>
    <div className="icons">
        <span className="icon">🏠</span>
        <span className="icon">🐟</span>
        <span className="icon">🐚</span>
    </div>
</div>
<div className="testimonials">
    <div className="testimonial">
        <p>"The atmosphere is perfect, and every dish is a masterpiece! I've never had such a memorable dining experience—highly recommend it!"</p>
        <p className="author">Aditi S.</p>
    </div>
    <div className="testimonial">
        <p>"From the warm staff to the outstanding flavors, this place is a hidden gem. I look forward to each visit!"</p>
        <p className="author">Vishesh Y.</p>
    </div>
    <div className="testimonial">
        <p>"Exceptional food and service! Every meal feels special, with attention to detail that makes this restaurant my top choice."</p>
        <p className="author">Kavya N.</p>
    </div>
</div>
</section>




<footer className="footer">
            <div className="footer-content">
                <div className="footer-section contact-info">
                    <h3>Contact Us</h3>
<p>123 Kashi Vishwanath Road, Varanasi, Uttar Pradesh, 221001</p>
<p>Phone: +91 98765 43210</p>
<p>Email: info@yourbistrofy.com</p>

                </div>

                <div className="footer-section quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="#home">Home</Link></li>
                        <li><Link to="#menu">Menu</Link></li>
                        <li><Link to="#about">About Us</Link></li>
                        <li><Link to="#contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section social-media">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <Link to="#facebook" className="icon">📘</Link>
                        <Link to="#instagram" className="icon">📷</Link>
                        <Link to="#twitter" className="icon">🐦</Link>
                        <Link to="#location" className="icon">📍</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p style={{ fontSize: '1rem' }}>&copy; 2024 Bistrofy. All rights reserved.</p>
            </div>
        </footer>


</>
        
    );
};

export default HeroSection;
