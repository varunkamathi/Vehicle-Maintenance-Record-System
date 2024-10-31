// src/components/ServiceInformation.js
import React from 'react';

function ServiceInformation({ serviceData, handleChange }) {
  return (
    <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Service Information</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Last Service Date */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Last Service Date</label>
          <input
            type="date"
            name="lastServiceDate"
            value={serviceData.lastServiceDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Next Service Date */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Next Service Date</label>
          <input
            type="date"
            name="nextServiceDate"
            value={serviceData.nextServiceDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Service Type */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Service Type</label>
          <input
            type="text"
            name="serviceType"
            value={serviceData.serviceType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Type (e.g., Oil Change)"
            required
          />
        </div>

        {/* Service Center */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Service Center</label>
          <input
            type="text"
            name="serviceCenter"
            value={serviceData.serviceCenter}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Center (e.g., ABC Motors)"
            required
          />
        </div>

        {/* Cost */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Cost</label>
          <input
            type="number"
            name="cost"
            value={serviceData.cost}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Service Cost"
            required
          />
        </div>
      </form>
    </section>
  );
}

export default ServiceInformation;
