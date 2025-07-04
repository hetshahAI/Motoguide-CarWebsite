import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './CarDescription.css';

const CarDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const [activeTab, setActiveTab] = useState('Overview');
  const { t } = useLanguage();

  if (!car) {
    return <div className="error-message">{t('carNotFound')}</div>;
  }

  const handleCompareClick = () => {
    navigate('/compare', { state: { preSelectedCar: car } });
  };

  // Car specific description data
  const carDetails = {
    overview: {
      description: `The ${car.name} offers a sorted ride and engaging drive, ample space, and modern-day equipment. While its boot space is limited, it isn't a deal-breaker, especially considering the compact SUV's attractive pricing.`,
      specifications: {
        engine: "4.4L Twin-Turbo V8",
        power: "635 HP",
        transmission: "8-Speed Automatic",
        fuelType: "Petrol",
        mileage: "12.5 kmpl"
      }
    }
  };

  const tabs = [
    { id: 'Overview', label: t('overview') },
    { id: '360° View', label: t('view360') },
    { id: 'Variants', label: t('variants') },
    { id: 'Offers', label: t('offers') },
    { id: 'Similar Cars', label: t('similarCars') },
    { id: 'Colours', label: t('colours') },
    { id: 'Brochure', label: t('brochure') },
    { id: 'Mileage', label: t('mileage') },
    { id: 'User Reviews', label: t('userReviews') }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="overview-section">
            <p className="car-description">{carDetails.overview.description}</p>
            <div className="specifications">
              <h3>{t('keySpecifications')}</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">{t('engine')}</span>
                  <span className="spec-value">{carDetails.overview.specifications.engine}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">{t('power')}</span>
                  <span className="spec-value">{carDetails.overview.specifications.power}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">{t('transmission')}</span>
                  <span className="spec-value">{carDetails.overview.specifications.transmission}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">{t('fuelType')}</span>
                  <span className="spec-value">{carDetails.overview.specifications.fuelType}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">{t('mileage')}</span>
                  <span className="spec-value">{carDetails.overview.specifications.mileage}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="coming-soon">{t('comingSoon')}</div>;
    }
  };

  return (
    <div className="car-description-container">
      <div className="car-description-header">
        <div className="car-image-container">
          <img src={car.image} alt={car.name} className="car-main-image" />
        </div>
        <div className="car-header-info">
          <h1 className="car-title">{car.name}</h1>
          <div className="car-price">
            {car.price.startsWith('$') ? car.price : `₹ ${car.price}`}
          </div>
          <div className="rating-container">
            <div className="expert-rating">
              <span className="rating-star">★</span>
              <span>3.9 {t('expertRating')}</span>
            </div>
            <div className="user-rating">
              <span className="rating-star">★</span>
              <span>4.6 {t('userRating')} (500)</span>
            </div>
          </div>
          <button onClick={handleCompareClick} className="compare-btn">
            {t('compareCars')}
          </button>
        </div>
      </div>
      
      <div className="car-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CarDescription;