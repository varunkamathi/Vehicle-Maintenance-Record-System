import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

function VehicleServiceInformation() {
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    registration: '',
    vin: '',
  });

  const [serviceData, setServiceData] = useState({
    lastServiceDate: '',
    nextServiceDate: '',
    serviceType: '',
    serviceCenter: '',
    cost: '',
  });

 


  const handleVehicleChange = (event) => {
    const { name, value } = event.target;
    setVehicleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleServiceChange = (event) => {
    const { name, value } = event.target;
    setServiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      console.log('Retrieved Token:', token); // Debug: Log the token
  
      if (!token) {
        alert('You are not logged in. Please log in first.');
        return;
      }
  
      const storedUserId = localStorage.getItem("userId");

      let payload = { vehicleData, serviceData };
      if(storedUserId){
        payload={
          ...payload,
          userId:storedUserId
        }
      }

      
      // const accessToken = Cookies.get("accessToken");
      // console.log("access token is",accessToken);
      console.log('checking payload:', payload); // Debug: Log the payload
      
      // Send the request with credentials (cookies will be automatically included)
      const response = await axios.post(
        '/api/vehicles/add',
        payload,
        {
          withCredentials: true, // This will send the cookies with the request
        }
      );
  
      console.log('Response:', response.data); // Debug: Log the server response
      alert('Vehicle and Service information added successfully');
      navigate('/vehicle-info-display'); // Redirect after submission
    } catch (error) {
      console.error(
        'Error adding vehicle and service data:',
        error.response?.data || error.message
      );
      alert('Error adding vehicle and service data');
    }
  };

  return (
    <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Vehicle and Service Information</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Vehicle Information */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Make</label>
          <input
            type="text"
            name="make"
            value={vehicleData.make}
            onChange={handleVehicleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Make (e.g., Toyota)"
            
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Model</label>
          <input
            type="text"
            name="model"
            value={vehicleData.model}
            onChange={handleVehicleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Model (e.g., Camry)"
            
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Registration Number</label>
          <input
            type="text"
            name="registration"
            value={vehicleData.registration}
            onChange={handleVehicleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Registration No. (e.g., AB123CD)"
            
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">VIN</label>
          <input
            type="text"
            name="vin"
            value={vehicleData.vin}
            onChange={handleVehicleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter VIN (e.g., 1234567890ABC)"
          
          />
        </div>

        {/* Service Information */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Last Service Date</label>
          <input
            type="date"
            name="lastServiceDate"
            value={serviceData.lastServiceDate}
            onChange={handleServiceChange}
            className="w-full p-2 border border-gray-300 rounded"
            
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Next Service Date</label>
          <input
            type="date"
            name="nextServiceDate"
            value={serviceData.nextServiceDate}
            onChange={handleServiceChange}
            className="w-full p-2 border border-gray-300 rounded"
          
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Service Type</label>
          <input
            type="text"
            name="serviceType"
            value={serviceData.serviceType}
            onChange={handleServiceChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Type (e.g., Oil Change)"
            
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Service Center</label>
          <input
            type="text"
            name="serviceCenter"
            value={serviceData.serviceCenter}
            onChange={handleServiceChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Center (e.g., ABC Motors)"
            
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Cost</label>
          <input
            type="number"
            name="cost"
            value={serviceData.cost}
            onChange={handleServiceChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Cost"
            required
          />
        </div>

        {/* Submit button */}
        <div className="col-span-2 mt-4 flex flex-col items-center">
          <button
            type="submit"
            className="w-1/3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded shadow-md transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default VehicleServiceInformation;
