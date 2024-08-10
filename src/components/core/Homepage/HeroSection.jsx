import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1>Welcome to AgriSystem</h1>
        <p>Your solution for smart agriculture and irrigation</p>
        <a href="#services" className="cta-button">Explore Services</a>
      </div>
    </section>
  );
};

export default HeroSection;