import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { VehicleContext } from "../context.jsx";
import InsuranceDetails from "../components/InsuranceInformation.jsx";
import EChallanDetails from "../components/EChallanInformation.jsx";
import OtherDetails from "../components/OtherInformation.jsx";
import VehicleInformation from "../components/VehicleInformation.jsx";
import axios from "axios";

function VehicleInfoDisplay() {
  // const { vehicles, setVehicles } = useContext(VehicleContext); // Access vehicles and updater from context
  const [vehicles,setVehicles]=useState([]);
  const [isAddClicked,setIsAddClicked]=useState(false);
  console.log("checking the vehicles array",vehicles);

  // get userId;
  const storedUserId = localStorage.getItem("userId");
  if(!storedUserId){
    return  <h1>You need to loggedIn</h1>;
  }
  const navigate = useNavigate();
  
  // Navigate to the form for adding/editing a vehicle
 

  const handleEditVehicle = (index) => {
    navigate("/vehicle-info", { state: { vehicle: vehicles[index], index } }); // Pass the vehicle data and index
  };

  const handleDeleteVehicle = async (index) => {
    const deletedVehicleId = vehicles[index]._id;
    try {
      await axios.delete(`/api/vehicles/delete/${deletedVehicleId}`);
      const updatedVehicles = vehicles.filter((_v, i) => i !== index);
      setVehicles(updatedVehicles);
      alert("Vehicle deleted successfully.");
    } catch (error) {
      console.error("Error deleting vehicle:", error.response?.data || error.message);
      alert("Failed to delete vehicle.");
    }
  };
  /*const deletedVehicle = async(indexToDelete) => {
    // Filter out the task at the given index
    const updatedVehicles = vehicles.filter((_, index) => index.indexToDelete !== indexToDelete);
    setVehicles(updatedVehicles);
  };*/

  useEffect(()=>{
    
    const fetchVehicelsFromBackEnd = async()=>{
      console.log("backend function called")
      const response = await axios.get(`/api/vehicles/get/${storedUserId}`);
      
      if(response.status===200){
        console.log("hey i am ok");
        setVehicles(response.data)
      }
      
  
      
    }

    fetchVehicelsFromBackEnd();
  },[vehicles.length]);



  return (
    <div>
      <Header />
      <div className="m-6 mx-auto max-w-[1296px] min-h-screen bg-gray-100">
        {/* Button to add a new vehicle */}
        <div className="mb-4">
          <button
            onClick={()=>setIsAddClicked(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded shadow-md transition duration-200"
          >
            Add Vehicle
          </button>
        </div>
      {
        isAddClicked && <VehicleInformation setIsAddClicked={setIsAddClicked} setVehicles={setVehicles}/>
      }
        


        {/* Display each vehicle's information */}
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Vehicle Information #{index + 1}
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">
                  Owner Name: {vehicle.rtoUserVehicleData.rc_owner_name || "N/A"}
                </h3>
                {/* <p>VIN: {vehicle.vin || "N/A"}</p> */}
                <p>VRN: {vehicle.vehicleData.registration || "N/A"}</p>
                <p>Registration date : {vehicle.rtoUserVehicleData.rc_regn_dt}</p>
                <p>Vehicle fitness upto : {vehicle.rtoUserVehicleData.rc_fit_upto}</p>
                <p>Vehicle issue date  : {vehicle.rtoUserVehicleData.rc_status_as_on}</p>
                {vehicle.rtoUserVehicleData.rc_financer && (
                  <p>Vehical financer company : {vehicle.rtoUserVehicleData.rc_financer}</p>
                )}
                {/* if insurance is present then only show the insurance otherwise leave it */}
                {
                 ( vehicle.rtoUserVehicleData.rc_insurance_comp && vehicle.rtoUserVehicleData.rc_insurance_upto)&& (
                  <>
                  <p>Insurance company  : {vehicle.rtoUserVehicleData.rc_insurance_comp}</p>
                  <p>Insurance upto  : {vehicle.rtoUserVehicleData.rc_insurance_upto}</p>
                  </>
                 )
                }
                  <p>PUCC upto  : {vehicle.rtoUserVehicleData.rc_pucc_upto}</p>
                  <p>Permanent address  : {vehicle.rtoUserVehicleData.rc_permanent_address}</p>
                  <p>RC Status  : {vehicle.rtoUserVehicleData.rc_status}</p>
              </div>

              {/* Other details */}
              

              {/* Edit and Delete Buttons */}
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  onClick={() => handleDeleteVehicle(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-start mt-[250px] min-h-screen">
            <div className="flex flex-col items-center space-y-4">
              <img
                src="NoData2.png"
                alt="Empty Garage"
                className="w-24 h-24 object-cover opacity-92"
              />
              <p className="text-xl font-medium text-gray-700">
                No vehicles yet—tap&nbsp;
                <span className="text-orange-500 font-semibold">
                  Add Vehicle
                </span>
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
