import React from 'react';

function AboutUs() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

                body {
                    font-family: 'Roboto', sans-serif;
                }

                .about-us {
                    padding: 50px 16px;
                    background-color: #fff0f5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 1s ease forwards;
                }

                .about-container {
                    max-width: 850px;
                    padding: 40px 30px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 10px 24px rgba(255, 153, 181, 0.25);
                    text-align: center;
                    transform: translateY(30px);
                    opacity: 0;
                    animation: slideUp 1s ease-out 0.5s forwards;
                    transition: all 0.3s ease-in-out;
                }

                .about-container:hover {
                    transform: translateY(0px) scale(1.01);
                    box-shadow: 0 16px 36px rgba(255, 153, 181, 0.35);
                }

                .about-container h1 {
                    color: #ff99b5;
                    font-size: 1.8rem;
                    margin-bottom: 16px;
                    animation: fadeIn 1.2s forwards;
                }

                .about-container h2 {
                    color: #ff99b5;
                    font-size: 1.1rem;
                    margin-top: 30px;
                    margin-bottom: 16px;
                    animation: fadeIn 1.5s forwards;
                }

                .about-container p {
                    font-size: 0.95rem;
                    color: #333;
                    margin-bottom: 14px;
                    line-height: 1.6;
                    text-align: justify;
                    animation: fadeIn 2s forwards;
                }

                .about-intro {
                    font-weight: 500;
                    margin-bottom: 20px;
                }

                .about-highlight {
                    color: #ff99b5;
                    font-weight: 700;
                    margin-top: 10px;
                }

                @media (min-width: 768px) {
                    .about-container h1 {
                        font-size: 2.3rem;
                    }

                    .about-container h2 {
                        font-size: 1.4rem;
                    }

                    .about-container p {
                        font-size: 1.05rem;
                    }

                    .about-container {
                        padding: 50px 50px;
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>

            <section className="about-us" id="about">
                <div className="about-container">
                    <h1>Welcome to Bistrofy</h1>
                    <p className="about-intro">
                        At Bistrofy, we believe that great food is at the heart of every memorable moment.
                        Located in the heart of the city, we serve up fresh, seasonal, and delicious dishes that bring people together.
                    </p>
                    <p>
                        Our culinary team, inspired by global flavors and local ingredients, crafts every dish with passion and precision.
                        Whether you're joining us for a casual meal or a special celebration, we strive to make each experience delightful and unforgettable.
                    </p>
                    <p className="about-highlight">
                        Come experience the art of dining at Bistrofy. We can't wait to welcome you!
                    </p>

                    <h2>Our Vision</h2>
                    <p>
                        At Bistrofy, our vision is to create a space where people can connect over exceptional food,
                        fostering memories that last a lifetime. We aim to be the city's favorite gathering spot for
                        food lovers and create an atmosphere of warmth and joy for all.
                    </p>

                    <p><strong>Created by:</strong> Abhishek Yadav</p>
                </div>
            </section>
        </>
    );
}

export default AboutUs;
