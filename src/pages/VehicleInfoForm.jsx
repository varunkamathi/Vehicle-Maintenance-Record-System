// src/pages/VehicleInfoForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { VehicleContext } from '../context.jsx';
import Header from '../components/Header.jsx';
import VehicleInformation from '../components/VehicleInformation.jsx';

function VehicleInfoForm() {
  const navigate = useNavigate();
  const { addVehicle } = useContext(VehicleContext); // Use the context

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    registration: '',
    vin: '',
    lastServiceDate: '',
    nextServiceDate: '',
  });

  const [serviceData, setServiceData] = useState({
    serviceType: '',
    serviceCenter: '',
    cost: '',
  });

  const handleVehicleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = { ...vehicleData, ...serviceData };
    addVehicle(combinedData); // Add vehicle to context
    navigate('/vehicle-info-display'); // Navigate to display page
  };

  return (
    <div>
      <Header />
      <div  onSubmit={handleSubmit} className="items-start pt-6 mx-auto max-w-[1440px] min-h-screen">
        
          
          <VehicleInformation vehicleData={vehicleData} handleChange={handleVehicleChange} />
        
      </div>
    </div>
  );
}

export default VehicleInfoForm;
