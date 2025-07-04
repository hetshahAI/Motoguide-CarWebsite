import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const { t } = useLanguage();
  const tr = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };

  useEffect(() => {
    // Update theme based on body class
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    setTheme(currentTheme);

    // Observe changes to the body class for theme updates
    const observer = new MutationObserver(() => {
      const updatedTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      setTheme(updatedTheme);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className={`about-us-container ${theme}`}>
      <div className="about-us-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{tr('aboutHeroTitle', 'Expert Car Guide')}</h1>
            <h2 className="hero-subtitle">{tr('aboutHeroSubtitle', 'Consultation & Advice')}</h2>
            <p className="hero-description">
              {tr('aboutHeroDescription', 'Get personalized guidance for choosing, maintaining, and upgrading your car. Our experts help you make informed decisions for a better driving experience.')}
            </p>
            <p className="hero-phone">{tr('aboutHeroPhone', 'Phone: 123 456 786')}</p>
            <button className="hero-button" onClick={handleContactClick}>{tr('contactUs', 'Contact Us')}</button>
            <p className="developer-name">{tr('developerName', 'Developed by Ayan Malaviya')}</p>
          </div>
        </div>
        <img
          className="hero-image"
          src="https://images.hdqwalls.com/download/mercedes-benz-amg-gt-4k-2020-qd-1600x900.jpg"
          alt={tr('aboutHeroImageAlt', 'Car Consultation')}
        />
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-card">
          <div className="about-images-grid">
            <div className="about-image-card" data-transition>
              <img
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80"
                alt="Car Consultation 1"
              />
            </div>
            <div className="about-image-card" data-transition>
              <img
                src="https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=600&q=80"
                alt="Car Consultation 2"
              />
            </div>
            <div className="about-image-card" data-transition>
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
                alt="Car Consultation 3"
              />
            </div>
          </div>
          <div className="about-content">
            <h2 className="about-title">{tr('aboutSectionTitle', 'Know More About Us')}</h2>
            <p className="about-text">
              {tr('aboutSectionText1', "At MotoGuide, we specialize in providing expert car guide consultation. Our team helps you navigate the world of automobiles, whether you're buying, upgrading, or simply seeking advice.")}
            </p>
            <p className="about-text">
              {tr('aboutSectionText2', 'From comparing models to understanding features and maintenance tips, we offer unbiased, up-to-date information so you can make the best choices for your needs.')}
            </p>
            <button className="about-btn" onClick={() => navigate('/')}>{tr('learnMore', 'Learn More')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;