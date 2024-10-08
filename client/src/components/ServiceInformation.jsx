import React from 'react';

function ServiceInformation() {
  return (
    <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Service Information</h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold">Last Service:</h3>
        <p>Date: 2023-10-01</p>
        <p>Service Type: Oil Change</p>
        <p>Service Center: ABC Motors</p>
        <p>Cost: $150</p>
      </div>
    </section>
  );
}

export default ServiceInformation;
