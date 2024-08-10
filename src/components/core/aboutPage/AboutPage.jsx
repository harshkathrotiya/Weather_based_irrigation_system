import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About AgriSystem</h1>
      </header>
      <section className="about-intro">
        <h2>Our Mission</h2>
        <p>
          At AgriSystem, our mission is to revolutionize agriculture with smart technology and data-driven solutions. We aim to optimize irrigation practices through accurate weather data, advanced soil analysis, and real-time crop monitoring.
        </p>
      </section>
      <section className="about-features">
        <h2>Features</h2>
        <div className="features-container">
          <div className="feature-item">
            <h3>Weather-Based Irrigation</h3>
            <p>
              Our system adjusts irrigation schedules based on real-time weather data, ensuring optimal water usage and reducing waste.
            </p>
          </div>
          <div className="feature-item">
            <h3>Comprehensive Crop Monitoring</h3>
            <p>
              Track the growth stages and water requirements of your crops, helping you make informed decisions to enhance yield and productivity.
            </p>
          </div>
          <div className="feature-item">
            <h3>Soil Analysis</h3>
            <p>
              Analyze different soil types and their suitability for various crops to improve soil management and crop health.
            </p>
          </div>
        </div>
      </section>
      <section className="about-team">
        <h2>Meet the Team</h2>
        <p>
          Our team consists of passionate agronomists, data scientists, and engineers dedicated to improving agricultural practices through technology. We are committed to providing innovative solutions and exceptional service to our users.
        </p>
      </section>
      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>
          Have questions or need support? Reach out to us at <a href="mailto:support@agrisystem.com">support@agrisystem.com</a>.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
