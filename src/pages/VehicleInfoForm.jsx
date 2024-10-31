// src/pages/VehicleInfoForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../components/Header.jsx';
import VehicleInformation from '../components/VehicleInformation';
import ServiceInformation from '../components/ServiceInformation';

function VehicleInfoForm() {
  const navigate = useNavigate(); // Initialize the navigation hook

  // State to hold vehicle data
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    registration: '',
    vin: '',
    lastServiceDate: '',
    nextServiceDate: '',
  });

  // State to hold service data
  const [serviceData, setServiceData] = useState({
    serviceType: '',
    serviceCenter: '',
    cost: '',
  });

  // Handle changes for vehicle information
  const handleVehicleChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes for service information
  const handleServiceChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine vehicleData and serviceData
    const combinedData = {
      ...vehicleData,
      ...serviceData,
    };
    
    // Redirect to VehicleInfoDisplay with the submitted data
    navigate('/vehicle-info-display', { state: { combinedData } });
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-start p-6 bg-gray-100 min-h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Vehicle and Service Information Form</h2>

          {/* Vehicle Information Section */}
          <VehicleInformation vehicleData={vehicleData} handleChange={handleVehicleChange} />

          {/* Service Information Section */}
          <ServiceInformation serviceData={serviceData} handleChange={handleServiceChange} />

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VehicleInfoForm;
