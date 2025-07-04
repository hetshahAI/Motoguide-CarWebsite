import React, { useContext, useEffect } from 'react';
import CarCard from './CarCard';
import { CarContext } from '../context/CarContext';

const CarGallery = ({ carData, title }) => {
  const { searchTerm, setSearchTerm, maxPrice, setMaxPrice, parsePriceToLakhs } = useContext(CarContext);

  useEffect(() => {
    const gallery = document.querySelector('.car-gallery');
    gallery.classList.add('flag-active'); // Trigger checkered flag on mount
    // Remove after animation completes to prevent overlap
    const timeout = setTimeout(() => {
      gallery.classList.remove('flag-active');
    }, 1000); // Matches flagWipe duration
    return () => clearTimeout(timeout);
  }, []); // Runs once on mount

  useEffect(() => {
    const wrappers = document.querySelectorAll('.filter-wrapper');
    wrappers.forEach((wrapper) => wrapper.classList.add('speed-active')); // Trigger speed lines
    const timeout = setTimeout(() => {
      wrappers.forEach((wrapper) => wrapper.classList.remove('speed-active')); // Remove after animation
    }, 2000); // Matches speedLines duration
    return () => clearTimeout(timeout);
  }, [searchTerm, maxPrice]); // Runs on filter updates

  const filteredCars = carData.filter((car) => {
    const nameMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const numericPrice = parsePriceToLakhs(car.price);
    const maxPriceNumber = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    return nameMatch && numericPrice <= maxPriceNumber;
  });

  return (
    <div className="car-gallery">
      <h2 className="gallery-title">{title}</h2>
      <div className="gallery-filters">
        <div className="filter-wrapper">
          <input
            type="text"
            placeholder="Search by Car Name"
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-wrapper">
          <input
            type="number"
            placeholder="Max Price (Lakhs)"
            className="filter-input"
            value={maxPrice}
            min="0"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="gallery-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => <CarCard key={index} car={car} />)
        ) : (
          <p className="no-results">No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default CarGallery;