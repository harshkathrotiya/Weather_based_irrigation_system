import React, { useState } from 'react';
import './ContactUsPage.css';

const Contactpage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      // Replace this with actual form submission logic, e.g., sending data to an API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>
      <section className="contact-form-section">
        <h2>We'd Love to Hear From You</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {submissionStatus === 'success' && <p className="success-message">Your message has been sent!</p>}
        {submissionStatus === 'error' && <p className="error-message">Something went wrong. Please try again.</p>}
      </section>
      <section className="contact-info-section">
        <h2>Contact Information</h2>
        <p>
          If you have any questions or need support, please contact us at:
        </p>
        <p>Email: <a href="mailto:support@agrisystem.com">support@agrisystem.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
        <p>Address: 123 Agricultural Rd, Farmville, FA 12345</p>
      </section>
    </div>
  );
};

export default Contactpage;
