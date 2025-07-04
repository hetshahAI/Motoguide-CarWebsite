import React, { useState } from 'react';
import { useContext } from 'react';
import { CarContext } from '../context/CarContext';
import CarCard from '../components/CarCard';
import CarSlider from '../components/CarSlider';
import { highPowerCars } from '../data/carData';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './HighPower.css';

const HighPower = () => {
  const { searchTerm, setSearchTerm, maxPrice, setMaxPrice, parsePriceToLakhs } = useContext(CarContext);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);

  const filteredCars = highPowerCars.filter((car) => {
    const nameMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const numericPrice = parsePriceToLakhs(car.price);
    const maxPriceNumber = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    return nameMatch && numericPrice <= maxPriceNumber;
  });

  const visibleCars = showAllCars ? filteredCars : filteredCars.slice(0, 12);
  const hasMoreCars = filteredCars.length > 12;

  return (
    <div className="high-power-page">
      <h1 className="page-title">High Power Cars</h1>
      
      <div className="page-description">
        <p>
          Experience the pinnacle of automotive performance with our collection of
          high-powered machines. These vehicles represent the ultimate expression of
          engineering excellence, delivering breathtaking acceleration, precise handling,
          and raw power. From track-focused sports cars to luxurious super-sedans,
          each vehicle in this category is designed to deliver an exhilarating driving
          experience that will leave you speechless.
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
        <span>Trending High-Performance Cars</span>
      </div>
      
      <CarSlider
        title=""
        images={highPowerCars.slice(0, 6)}
        isTrending={true}
      />

      <div className="section-divider main-list">
        <span>All High-Performance Cars</span>
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

export default HighPower;