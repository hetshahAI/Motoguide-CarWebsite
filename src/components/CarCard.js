import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Add fade-out effect before navigation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      navigate(`/car/${encodeURIComponent(car.name.toLowerCase().replace(/\s+/g, '-'))}`, { 
        state: { car }
      });
      // Reset opacity after navigation
      document.body.style.opacity = '1';
    }, 300);
  };

  return (
    <div 
      className="car-card" 
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="car-card-img-wrapper">
        <img src={car.image} alt={car.name} className="car-card-img" />
      </div>
      <div className="car-card-body">
        <h3 className="car-card-title">{car.name}</h3>
        <p className="car-card-price">{car.price}</p>
        <a 
          href={car.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="car-card-btn"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Official Page
        </a>
      </div>
    </div>
  );
};

export default CarCard;