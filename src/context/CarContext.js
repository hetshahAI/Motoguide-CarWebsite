import React, { createContext, useState } from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const parsePriceToLakhs = (priceString) => {
    const cleanedPrice = priceString.toUpperCase().replace(/[^0-9.CRLAKHS]/g, '');
    const number = parseFloat(cleanedPrice);
    return cleanedPrice.includes('CR') ? number * 100 : number;
  };

  return (
    <CarContext.Provider value={{ searchTerm, setSearchTerm, maxPrice, setMaxPrice, parsePriceToLakhs }}>
      {children}
    </CarContext.Provider>
  );
};