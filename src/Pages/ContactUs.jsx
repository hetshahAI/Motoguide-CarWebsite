import React, { useState, useEffect } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [theme, setTheme] = useState('dark'); // Default theme is dark

  useEffect(() => {
    // Function to update the theme based on the body class
    const updateTheme = () => {
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      setTheme(currentTheme);
    };

    // Initial theme check
    updateTheme();

    // Add a mutation observer to detect changes in the body class
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <div className={`contact-us-container ${theme}`}>
      {/* Hero Section */}
      <div className="contact-us-hero">
        <h1 className="contact-us-title">Get in Touch</h1>
        <p className="contact-us-description">
          Got a question? You might find the answer in our FAQ section. Otherwise, see all the ways you can speak to our team below.
        </p>
      </div>

      {/* Customer Categories Section */}
      <div className={`contact-us-categories ${theme}`}>
        <div className={`category-card ${theme}`}>
          <h3>Existing Customers</h3>
          <p>Already a MotoGuide user? Our support team is here to help with your questions.</p>
          <a href="#contact-details" className="category-link">Contact us →</a>
        </div>
        <div className={`category-card ${theme}`}>
          <h3>New Customers</h3>
          <p>Looking to join MotoGuide? Speak to our team to get started.</p>
          <a href="#contact-details" className="category-link">Contact us →</a>
        </div>
        <div className={`category-card ${theme}`}>
          <h3>Business Inquiries</h3>
          <p>Interested in partnerships or business opportunities? Let’s connect.</p>
          <a href="#contact-details" className="category-link">Contact us →</a>
        </div>
      </div>

      {/* Contact Details and Form Section */}
      <div id="contact-details" className="contact-us-details">
        <div className={`contact-us-info ${theme}`}>
          <h2>Contact Details</h2>
          <div className="contact-detail">
            <h3>Phone Number</h3>
            <p>+1 123-456-7890</p>
          </div>
          <div className="contact-detail">
            <h3>Email</h3>
            <p>support@motoguide.com</p>
          </div>
          <div className="contact-detail">
            <h3>Location</h3>
            <p>123 MotoGuide Street, City, Country</p>
          </div>
          <div className="contact-detail">
            <h3>Working Hours</h3>
            <p>Monday to Saturday: 9:00 AM - 6:00 PM</p>
          </div>
        </div>

        <form id="contact-form" className={`contact-us-form ${theme}`} onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile No"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;