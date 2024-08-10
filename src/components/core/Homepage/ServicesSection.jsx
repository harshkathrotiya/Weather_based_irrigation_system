import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Irrigation Management</h3>
            <p>Optimize your irrigation schedules based on weather and soil data.</p>
          </div>
          <div className="service-card">
            <h3>Crop Monitoring</h3>
            <p>Track the growth stages and water needs of various crops.</p>
          </div>
          <div className="service-card">
            <h3>Soil Analysis</h3>
            <p>Analyze soil types and their suitability for different crops.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;