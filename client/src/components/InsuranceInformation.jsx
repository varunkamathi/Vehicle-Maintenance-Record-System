import React from 'react';

function InsuranceInformation() {
  return (
    <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Insurance Information</h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold">Policy Number: XYZ123456</h3>
        <p>Provider: ABC Insurance</p>
        <p>Expiry Date: 2024-01-15</p>
      </div>
    </section>
  );
}

export default InsuranceInformation;
