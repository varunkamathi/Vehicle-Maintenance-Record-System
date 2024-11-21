// src/pages/VehicleInfoDisplay.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { VehicleContext } from "../context.jsx";
import InsuranceDetails from "../components/InsuranceInformation.jsx";
import EChallanDetails from "../components/EChallanInformation.jsx";
import OtherDetails from "../components/OtherInformation.jsx";

function VehicleInfoDisplay() {
  const { vehicles } = useContext(VehicleContext); // Get vehicle list from context
  const navigate = useNavigate();

  // Navigate to the form for adding a new vehicle
  const handleAddVehicle = () => {
    navigate("/vehicle-info");
  };

  // Log vehicle data for debugging purposes
  console.log("Current vehicles:", vehicles);

  return (
    <div>
      <Header />
      <div className="m-6 mx-auto max-w-[1296px] min-h-screen bg-gray-100">
        {/* Button to add a new vehicle */}
        <div className="mb-4">
          <button
            onClick={handleAddVehicle}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded shadow-md transition duration-200"
          >
            Add Vehicle
          </button>
        </div>

        {/* Display each vehicle's information */}
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Vehicle Information #{index + 1}
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">
                  Make: {vehicle.vehicleData.make || "N/A"}
                </h3>
                <p>Model: {vehicle.vehicleData.model || "N/A"}</p>
                <p>Registration: {vehicle.vehicleData.registration || "N/A"}</p>
                <p>VIN: {vehicle.vehicleData.vin || "N/A"}</p>
                <p>
                  Last Service Date:{" "}
                  {vehicle.serviceData.lastServiceDate || "N/A"}
                </p>
                <p>
                  Next Service Date:{" "}
                  {vehicle.serviceData.nextServiceDate || "N/A"}
                </p>
              </div>

              {/* Service Information, Insurance, E-Challan, and Other Details sections */}
              <section className="p-4 bg-gray-50 rounded-lg mt-4">
                <h2 className="font-semibold">Service Information</h2>
                <p>Service Type: {vehicle.serviceData.serviceType || "N/A"}</p>
                <p>
                  Service Center: {vehicle.serviceData.serviceCenter || "N/A"}
                </p>
                <p>
                  Cost:{" "}
                  {vehicle.serviceData.cost
                    ? `₹${vehicle.serviceData.cost}`
                    : "N/A"}
                </p>
              </section>
              <div className="p-4 bg-gray-50 rounded-lg mt-4">
                <InsuranceDetails data={vehicle.insuranceDetails} />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg mt-4">
                <EChallanDetails data={vehicle.eChallanDetails} />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg mt-4">
                <OtherDetails data={vehicle.otherDetails} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-start mt-[250px] min-h-screen">
            <div className="flex flex-col items-center space-y-4 ">
            <img
              src="NoData2.png"
              alt="Empty Garage"
              className="w-24 h-24 object-cover opacity-92"
            />
            <p className="text-xl font-medium text-gray-700">
              No vehicles yet—tap&nbsp;
              <span className="text-orange-500 font-semibold">Add Vehicle</span>
              &nbsp;to get started.
            </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VehicleInfoDisplay;
