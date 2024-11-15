// src/context/VehicleContext.js
import React, { createContext, useState } from 'react';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  const addVehicle = (vehicleData) => {
    setVehicles((prevVehicles) => [...prevVehicles, vehicleData]);
  };

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};
