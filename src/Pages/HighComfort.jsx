import React, { useState } from 'react';
import { useContext } from 'react';
import { CarContext } from '../context/CarContext';
import CarCard from '../components/CarCard';
import CarSlider from '../components/CarSlider';
import { highComfortCars } from '../data/carData';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './HighComfort.css';

const HighComfort = () => {
  const { searchTerm, setSearchTerm, maxPrice, setMaxPrice, parsePriceToLakhs } = useContext(CarContext);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);

  const filteredCars = highComfortCars.filter((car) => {
    const nameMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const numericPrice = parsePriceToLakhs(car.price);
    const maxPriceNumber = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    return nameMatch && numericPrice <= maxPriceNumber;
  });

  const visibleCars = showAllCars ? filteredCars : filteredCars.slice(0, 12);
  const hasMoreCars = filteredCars.length > 12;

  return (
    <div className="high-comfort-page">
      <h1 className="page-title">High Comfort Cars</h1>
      
      <div className="page-description">
        <p>
          Step into a world of unparalleled luxury and refinement with our collection
          of high-comfort vehicles. These exceptional automobiles represent the epitome
          of automotive luxury, featuring state-of-the-art comfort technologies,
          premium materials, and meticulous craftsmanship. From whisper-quiet cabins
          to opulent interiors, each vehicle is designed to deliver the ultimate in
          comfort and sophistication for both drivers and passengers alike.
        </p>
      </div>

      <div className="filters-section">
        <button
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> Filters
        </button>

        {showFilters && (
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by Car Name"
              className="filter-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price (Lakhs)"
              className="filter-input"
              value={maxPrice}
              min="0"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="section-divider trending">
        <span>Trending Luxury Comfort Cars</span>
      </div>
      
      <CarSlider
        title=""
        images={highComfortCars.slice(0, 6)}
        isTrending={true}
      />

      <div className="section-divider main-list">
        <span>All Luxury Comfort Cars</span>
      </div>

      <div className="car-grid">
        {visibleCars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>

      {hasMoreCars && (
        <button
          className="view-toggle-button"
          onClick={() => setShowAllCars(!showAllCars)}
        >
          {showAllCars ? (
            <>
              View Less <FiChevronUp />
            </>
          ) : (
            <>
              View More <FiChevronDown />
            </>
          )}
        </button>
      )}

      {filteredCars.length === 0 && (
        <p className="no-results">No cars found matching your criteria.</p>
      )}
    </div>
  );
};

export default HighComfort;