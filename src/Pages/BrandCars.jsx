import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { brandCars } from '../data/brandCars';
import './BrandCars.css';

const BrandCars = () => {
  const { brandName } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Format brandName to match the keys in brandCars
  const formattedBrand = brandName.toLowerCase().replace(/\s+/g, '');
  const cars = brandCars[formattedBrand] || [];

  const handleCompareClick = (car) => {
    navigate('/compare', { state: { preSelectedCar: car } });
  };

  return (
    <div className="brand-cars-container">
      <h1 className="brand-title">{brandName} {t('collection')}</h1>
      {cars.length === 0 ? (
        <div className="no-cars-message">
          {t('noCarsAvailable')}
        </div>
      ) : (
        <div className="cars-grid">
          {cars.map((car, index) => (
            <div key={index} className="car-card">
              <div className="car-image-container">
                <img src={car.image} alt={car.name} className="car-image" />
              </div>
              <div className="car-info">
                <h3 className="car-name">{car.name}</h3>
                <p className="car-price">{t('price')}: {car.price}</p>
                <p className="car-description">{car.description}</p>
                <button 
                  className="compare-button"
                  onClick={() => handleCompareClick(car)}
                >
                  {t('compareCars')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandCars;