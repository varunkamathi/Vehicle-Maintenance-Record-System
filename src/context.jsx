// src/context/VehicleContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const VehicleContext = createContext();


export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const storedUserId = localStorage.getItem("userId");
  // paste use state here that you want to be used as global;
  
  const addVehicle = async (vehicleData) => {
    const token = localStorage.getItem('token');
    await axios.post('/api/users/add', vehicleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchVehicles(); // Refresh vehicles after adding
  };

  // Function to fetch all vehicles for the logged-in user
  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }
      const response = await axios.get(`/api/vehicles/get/${storedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("checking get vehicles",response);
      setVehicles(response.data.vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error.response?.data || error.message);
    }
  };
  
  // Fetch vehicles on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchVehicles();
  }, []);

  

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle}}>
      {children}
    </VehicleContext.Provider>
  );
};