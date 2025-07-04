import React, { createContext, useState } from 'react';
import { featuredCarsData } from '../data/featuredCars';
import { highPowerCarsData } from '../data/highPowerCars';
import { highComfortCarsData } from '../data/highComfortCars';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const allCars = [...featuredCarsData, ...highPowerCarsData, ...highComfortCarsData];

  return (
    <CarContext.Provider value={{ allCars }}>
      {children}
    </CarContext.Provider>
  );
};