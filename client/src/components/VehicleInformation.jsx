// src/components/VehicleInformation.js
import React from 'react';

function VehicleInformation({ vehicleData, handleChange }) {
  return (
    <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Vehicle Information</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Make */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Make</label>
          <input
            type="text"
            name="make"
            value={vehicleData.make}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Make (e.g., Toyota)"
            required
          />
        </div>

        {/* Model */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Model</label>
          <input
            type="text"
            name="model"
            value={vehicleData.model}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Model (e.g., Camry)"
            required
          />
        </div>

        {/* Registration */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Registration Number</label>
          <input
            type="text"
            name="registration"
            value={vehicleData.registration}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Registration No. (e.g., AB123CD)"
            required
          />
        </div>

        {/* VIN */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">VIN</label>
          <input
            type="text"
            name="vin"
            value={vehicleData.vin}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter VIN (e.g., 1234567890ABC)"
            required
          />
        </div>
      </form>
    </section>
  );
}

export default VehicleInformation;
