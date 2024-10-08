// src/pages/VehicleInfoDisplay.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import VehicleInformation from '../components/VehicleInformation.jsx';
import ServiceDetails from '../components/ServiceInformation.jsx';
import InsuranceDetails from '../components/InsuranceInformation.jsx';
import EChallanDetails from '../components/EChallanInformation.jsx';
import OtherDetails from '../components/OtherInformation.jsx';

function VehicleInfoDisplay() {
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    // Simulating an API call to fetch vehicle data
    const fetchData = async () => {
      const data = {
        ownerName: 'John Doe',
        registrationNumber: 'AB123CD',
        serviceHistory: 'Oil change on 2023-10-01. Tire rotation on 2024-04-01.',
        insuranceDetails: 'Policy No: XYZ123456, Expiry: 2024-01-15',
        eChallanDetails: 'Speeding fine on 2023-09-15, Paid $100',
      };
      setVehicleData(data);
    };

    fetchData();
  }, []);

  if (!vehicleData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="p-6 min-h-screen bg-gray-100">
        <VehicleInformation data={vehicleData} />
        <ServiceDetails serviceHistory={vehicleData.serviceHistory} />
        <InsuranceDetails insuranceDetails={vehicleData.insuranceDetails} />
        <EChallanDetails eChallanDetails={vehicleData.eChallanDetails} />
        <OtherDetails />
      </div>
    </div>
  );
}

export default VehicleInfoDisplay;
