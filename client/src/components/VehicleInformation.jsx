import React from 'react';

function VehicleInformation() {
  return (
    <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Vehicle Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold">Make: Toyota</h3>
          <p>Model: Camry</p>
          <p>Registration: AB123CD</p>
          <p>VIN: 1234567890ABC</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold">Last Service Date: 2023-10-01</h3>
          <p>Next Service Due: 2024-04-01</p>
        </div>
      </div>
    </section>
  );
}

export default VehicleInformation;
