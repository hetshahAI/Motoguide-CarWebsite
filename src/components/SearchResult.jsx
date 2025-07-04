import React from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from './CarCard';
import { FullCardata }  from '../data/FullCardata';

const SearchResults = () => {
  const location = useLocation();

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';

  // Filter cars based on the query matching the car name
  const filteredResults = FullCardata.filter(car =>
    car.name.toLowerCase().includes(query)
  );

  if (filteredResults.length === 0) {
    return (
      <div className="no-results">  
        <h2>No cars found matching your search</h2>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="car-grid">
        {filteredResults.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
