// src/context/VehicleContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const VehicleContext = createContext();


export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [challans, setChallans] = useState([]); // State to store challans
  const storedUserId = localStorage.getItem("userId");
  
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
  // fetch isurance
  const fetchisurance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }
      const response = await axios.get(`/api/vehicles/get/${storedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("checking get insurance",response);
      setVehicles(response.data.vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error.response?.data || error.message);
    }
  };
  
  // Fetch all challans for the logged-in user
  const fetchChallans = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }
      const response = await axios.get(`/api/vehicles/get/challan/${storedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched challans:", response.data);
      setChallans(response.data.challans || []);
    } catch (error) {
      console.error("Error fetching challans:", error.response?.data || error.message);
    }
  };

  // Fetch vehicles and challans on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchVehicles();
      fetchChallans();
    }
  }, []);
  

  return (
    <VehicleContext.Provider value={{
      vehicles,
      challans, // Expose challans in context
      addVehicle,
      fetchVehicles,
      fetchChallans, // Expose fetchChallans function
      fetchisurance
    }}>
      {children}
    </VehicleContext.Provider>
  );
};