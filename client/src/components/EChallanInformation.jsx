import React from 'react';

function EChallanInformation() {
  return (
    <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">E-Challan Information</h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold">Violation: Speeding</h3>
        <p>Issue Date: 2023-09-15</p>
        <p>Fine Amount: $100</p>
        <p>Status: Paid</p>
      </div>
    </section>
  );
}

export default EChallanInformation;
