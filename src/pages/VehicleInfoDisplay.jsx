// src/pages/VehicleInfoDisplay.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // To retrieve the passed data
import Header from '../components/Header.jsx';
import VehicleInformation from '../components/VehicleInformation.jsx';
import ServiceInformation from '../components/ServiceInformation.jsx';
import InsuranceDetails from '../components/InsuranceInformation.jsx';
import EChallanDetails from '../components/EChallanInformation.jsx';
import OtherDetails from '../components/OtherInformation.jsx';

function VehicleInfoDisplay() {
  const location = useLocation();
  const { combinedData } = location.state || {}; // Get the submitted data

  // If no data is passed, show a fallback message
  if (!combinedData) {
    return <div className="flex justify-center items-center min-h-screen">No data submitted</div>;
  }

  return (
    <div>
      <Header />
      <div className="p-6 min-h-screen bg-gray-100">
        {/* Vehicle Information Display */}
        <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Vehicle Information</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">Make: {combinedData.make}</h3>
            <p>Model: {combinedData.model}</p>
            <p>Registration: {combinedData.registration}</p>
            <p>VIN: {combinedData.vin}</p>
            <p>Last Service Date: {combinedData.lastServiceDate}</p>
            <p>Next Service Date: {combinedData.nextServiceDate}</p>
          </div>
        </section>

        {/* Service Information Display */}
        <section className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Service Information</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p>Service Type: {combinedData.serviceType}</p>
            <p>Service Center: {combinedData.serviceCenter}</p>
            <p>Cost: {combinedData.cost ? `$${combinedData.cost}` : 'N/A'}</p>
          </div>
        </section>

        {/* Insurance Details Display */}
        
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <InsuranceDetails data={combinedData.insuranceDetails} />
          </div>
        

        {/* E-Challan Details Display */}
        
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <EChallanDetails data={combinedData.eChallanDetails} />
          </div>


        {/* Other Details Display */}
        
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <OtherDetails data={combinedData.otherDetails} />
          </div>
        
      </div>
    </div>
  );
}

export default VehicleInfoDisplay;
