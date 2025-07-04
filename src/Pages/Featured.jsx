import React, { useState } from 'react';
import { useContext } from 'react';
import { CarContext } from '../context/CarContext';
import CarCard from '../components/CarCard';
import CarSlider from '../components/CarSlider';
import { featuredCars } from '../data/carData';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Featured.css';

const Featured = () => {
  const { searchTerm, setSearchTerm, maxPrice, setMaxPrice, parsePriceToLakhs } = useContext(CarContext);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);

  const filteredCars = featuredCars.filter((car) => {
    const nameMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const numericPrice = parsePriceToLakhs(car.price);
    const maxPriceNumber = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    return nameMatch && numericPrice <= maxPriceNumber;
  });

  const visibleCars = showAllCars ? filteredCars : filteredCars.slice(0, 12);
  const hasMoreCars = filteredCars.length > 12;

  return (
    <div className="featured-page">
      <h1 className="page-title">Featured Cars</h1>
      
      <div className="page-description">
        <p>
          Discover our handpicked selection of exceptional vehicles that represent
          the perfect blend of luxury, performance, and value. Our featured collection
          showcases the most sought-after models, each carefully chosen for their
          outstanding qualities and unique appeal. From elegant sedans to powerful
          sports cars, these vehicles exemplify automotive excellence.
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
        <span>Trending Featured Cars</span>
      </div>
      
      <CarSlider
        title=""
        images={featuredCars.slice(0, 6)}
        isTrending={true}
      />

      <div className="section-divider main-list">
        <span>All Featured Cars</span>
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

export default Featured;