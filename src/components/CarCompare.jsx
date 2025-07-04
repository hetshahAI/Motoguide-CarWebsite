import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { carData } from '../data/carData';
import './CarCompare.css';

const CarCompare = () => {
  const location = useLocation();
  const preSelectedCar = location.state?.preSelectedCar;
  const [selectedCar1, setSelectedCar1] = useState(preSelectedCar || null);
  const [selectedCar2, setSelectedCar2] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (preSelectedCar) {
      setSelectedCar1(preSelectedCar);
    }
  }, [preSelectedCar]);

  const handleCarSelect = (car, position) => {
    setIsAnimating(true);
    if (position === 1) {
      setSelectedCar1(car);
    } else {
      setSelectedCar2(car);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getCarDescription = (car) => {
    return `Experience the power and elegance of the ${car.name}. This exceptional vehicle combines cutting-edge technology with stunning design. Available at ${car.price}, it represents the perfect blend of luxury and performance.`;
  };

  return (
    <div className="car-compare-container">
      <h1 className="compare-title">Compare Cars</h1>
      
      <div className="car-selection-container">
        <div className="car-selector">
          <select 
            onChange={(e) => handleCarSelect(carData[e.target.value], 1)}
            value={selectedCar1 ? carData.findIndex(c => c.name === selectedCar1.name) : ''}
          >
            <option value="">Select First Car</option>
            {carData.map((car, index) => (
              <option key={index} value={index}>
                {car.name}
              </option>
            ))}
          </select>
        </div>

        <div className="vs-circle">
          <span>VS</span>
        </div>

        <div className="car-selector">
          <select 
            onChange={(e) => handleCarSelect(carData[e.target.value], 2)}
            value={selectedCar2 ? carData.findIndex(c => c.name === selectedCar2.name) : ''}
          >
            <option value="">Select Second Car</option>
            {carData.map((car, index) => (
              <option key={index} value={index}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`comparison-content ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        {selectedCar1 && selectedCar2 && (
          <>
            <div className="car-images">
              <div className="car-image-container">
                <img src={selectedCar1.image} alt={selectedCar1.name} />
              </div>
              <div className="car-image-container">
                <img src={selectedCar2.image} alt={selectedCar2.name} />
              </div>
            </div>

            <div className="car-details">
              <div className="car-info">
                <h2>{selectedCar1.name}</h2>
                <p className="price">Price: {selectedCar1.price}</p>
                <p className="car-description">{getCarDescription(selectedCar1)}</p>
                <a href={selectedCar1.link} target="_blank" rel="noopener noreferrer" className="car-link">
                  Learn More
                </a>
              </div>
              <div className="car-info">
                <h2>{selectedCar2.name}</h2>
                <p className="price">Price: {selectedCar2.price}</p>
                <p className="car-description">{getCarDescription(selectedCar2)}</p>
                <a href={selectedCar2.link} target="_blank" rel="noopener noreferrer" className="car-link">
                  Learn More
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarCompare; 