import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { VehicleContext } from "../context.jsx";
import EChallanDetails from "../components/EChallanInformation.jsx";
import OtherDetails from "../components/OtherInformation.jsx";
import VehicleInformation from "../components/VehicleInformation.jsx";
import MaintenanceTips from "../components/Maintenance.jsx";
import  Footer  from '../sections/Footer';

  import {acko} from '../assets/images/index.js'
  import { kotak } from "../assets/images/index.js";
  import { bajaj} from "../assets/images/index.js";
  import { bharti } from "../assets/images/index.js";
  import { zuno } from "../assets/images/index.js";

import axios from "axios";

function VehicleInfoDisplay() {
  // const { vehicles, setVehicles } = useContext(VehicleContext); // Access vehicles and updater from context
  const [vehicles,setVehicles]=useState([]);
  const [isAddClicked,setIsAddClicked]=useState(false);
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [isViewInsuranceClicked , setViewInsuranceClicked] = useState(false);
  const [isChallanClicked, setIsChallanClicked] = useState(false);
  const [isAddChallan, setIsAddChallan] = useState(false); // To toggle form visibility
  const [challans, setChallans] = useState([]); // To store list of challans

  // Function to toggle the form
  




    const toggleProfile = () => {
      setIsAddClicked((prevState) => !prevState);// Toggle the state
    };
    const togglechllan = () => {
      setIsAddChallan((prevState) => !prevState);// Toggle the state
    };
  console.log("checking the vehicles array",vehicles);
  console.log("checking the challans array",challans);



  const toggleViewVehicles = () => {
    setIsViewClicked(!isViewClicked);
    setIsAddClicked(false); // Ensure Add is turned off
  };

  const toggleInsurance =() => {
    setViewInsuranceClicked(!isViewInsuranceClicked);
    setIsAddClicked(false);

  }

  
  const toggleViewChallan = () => {
    setIsChallanClicked(!isChallanClicked);
    setIsAddChallan(false); // Ensure Add is turned off
  }


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

  useEffect(() => {
    const fetchVehiclesFromBackEnd = async () => {
      try {
        console.log("Fetching vehicles from backend");
        const response = await axios.get(`/api/vehicles/get/${storedUserId}`);
        if (response.status === 200) {
          console.log("Vehicles fetched successfully:", response.data);
          setVehicles(response.data);
        } else {
          console.error("Failed to fetch vehicles");
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error.response?.data || error.message);
      }
    };
  
    const fetchChallanFromBackEnd = async () => {
      try {
        console.log("Fetching challans from backend");
        const response = await axios.get(`/api/vehicles/get/challan/${storedUserId}`);
        if (response.status === 200) {
          console.log("Challans fetched successfully:", response.data);
          const challanData = response.data;
          if (Array.isArray(challanData)) {
            setChallans(challanData);
          } else {
            console.warn("Challans data is not an array:", challanData);
            setChallans([]);
          }
        } else {
          console.error("Failed to fetch challans");
        }
      } catch (error) {
        console.error("Error fetching challans:", error.response?.data || error.message);
      }
    };
  
    fetchVehiclesFromBackEnd();
    fetchChallanFromBackEnd();
  }, [storedUserId]);

   
  



  return (
    <div >
      <Header />
      
        {/* Button to add a new vehicle */}
        <div className="bg-stone-400 p-1 ">
        <div className="mb-4 flex space-x-48  mx-40 max-w-[1296px] ">
          <button
            onClick={()=>toggleProfile(true)}
            className=" text-black font-bold underline hover:text-blue-900"
          >
         Add Vehicle
        
          </button>
      
       {/* View Vehicle button */}
       <button
            onClick={toggleViewVehicles}
            className=" text-black font-bold underline"
          >
            View Vehicles
          </button>

  {/* View Insurance button */}
  <button
    onClick={toggleInsurance}
    className=" text-black font-bold underline"
  >
    View Insurance
  </button>

  {/* View Challan button */}
  <button
  onClick={togglechllan} // Set the selected vehicle number
  className="text-black font-bold underline"
>
   Search Challan
</button>
<button
  onClick={toggleViewChallan} // Set the selected vehicle number
  className="text-black font-bold underline"
>
   Veiw Challan
</button>
  </div>
  </div>

 

  {
        isAddClicked && <VehicleInformation setIsAddClicked={setIsAddClicked} setVehicles={setVehicles}/>
      }

 {/* Render EChallanInformation if isAddClicked is true */}
 {isAddChallan && (
        <EChallanDetails
        setIsAddChallan={setIsAddChallan}
          setChallans={setChallans}
        />
      )}
       



        {/* Display each vehicle's information */}
        {isChallanClicked && (
  challans.length > 0 ? (
    challans.map((challan, index) => (
      <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Challans #{index + 1}
        </h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold">
          challan No: {challan.challans.challanNo || "N/A"}
          </h3>
          {/* <p>VIN: {vehicle.vin || "N/A"}</p> */}
          <p>date: {challan.challans.date || "N/A"}</p>
          <p>amounte: {challan.challans.amount}</p>
          <p>status: {challan.challans.status}</p>
          <p>violation: {challan.challans.violation}</p>
          <p>location: {challan.challans.location}</p>
          
          
         
        </div>

        {/* Edit and Delete Buttons */}
        
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
          <span className="text-orange-500 font-semibold">Add Vehicle</span>
          &nbsp;to get started.
        </p>
      </div>
    </div>
  )
)}




{isViewClicked && (
  vehicles.length > 0 ? (
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
          <p>Registration date: {vehicle.rtoUserVehicleData.rc_regn_dt}</p>
          <p>Vehicle fitness upto: {vehicle.rtoUserVehicleData.rc_fit_upto}</p>
          <p>Vehicle issue date: {vehicle.rtoUserVehicleData.rc_status_as_on}</p>
          {vehicle.rtoUserVehicleData.rc_financer && (
            <p>
              Vehicle financer company: {vehicle.rtoUserVehicleData.rc_financer}
            </p>
          )}
          {/* Show insurance details only if present */}
          {(vehicle.rtoUserVehicleData.rc_insurance_comp &&
            vehicle.rtoUserVehicleData.rc_insurance_upto) && (
            <>
              <p>Insurance company: {vehicle.rtoUserVehicleData.rc_insurance_comp}</p>
              <p>Insurance upto: {vehicle.rtoUserVehicleData.rc_insurance_upto}</p>
            </>
          )}
          <p>PUCC upto: {vehicle.rtoUserVehicleData.rc_pucc_upto}</p>
          <p>Permanent address: {vehicle.rtoUserVehicleData.rc_permanent_address}</p>
          <p>RC Status: {vehicle.rtoUserVehicleData.rc_status}</p>
        </div>

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
          <span className="text-orange-500 font-semibold">Add Vehicle</span>
          &nbsp;to get started.
        </p>
      </div>
    </div>
  )
)}


{isViewInsuranceClicked && (
  vehicles.length > 0 ? (
    <>
      {vehicles.map((vehicle, index) => {
        const insuranceExpiryDate = new Date(vehicle.rtoUserVehicleData.rc_insurance_upto);
        const currentDate = new Date();
        const isInsuranceExpired = insuranceExpiryDate < currentDate;

        return (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <div className="p-4 bg-gray-50 rounded-lg">
              {/* Show insurance details only if present */}
              {(vehicle.rtoUserVehicleData.rc_insurance_comp &&
                vehicle.rtoUserVehicleData.rc_insurance_upto) ? (
                <>
                  <p>Insurance company: {vehicle.rtoUserVehicleData.rc_insurance_comp}</p>
                  <p>Insurance upto: {insuranceExpiryDate.toLocaleDateString()}</p>
                  {isInsuranceExpired && (
                    <p className="text-red-600 font-semibold">
                      Insurance has expired! Please renew as soon as possible.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-600">
                  Insurance details not available for this vehicle.
                </p>
              )}
            </div>
            
          </div>
        );
      })}

      {/* Recommended Insurance Providers */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recommended Insurance Providers</h3>
        <div className="flex justify-center gap-4">
        <img
      src={acko}
      alt="Acko Insurance"
      className="w-24 h-12 object-contain"
    />
    <img
      src={kotak}
      alt="Kotak Insurance"
      className="w-24 h-12 object-contain"
    />
    <img
      src={bajaj}
      alt="Bajaj Allianz"
      className="w-24 h-12 object-contain"
    />
    <img
      src={bharti}
      alt="Bharti AXA"
      className="w-24 h-12 object-contain"
    />
    <img
      src={zuno}
      alt="Zuno Insurance"
      className="w-24 h-12 object-contain"
    />
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-start mt-[250px] min-h-screen">
      
    </div>
  )
)}


<section>
  <MaintenanceTips/>
</section>



<section className=' bg-black padding-x padding-t pb-8'>
    <Footer />
    </section>
      </div>
  );
}

export default VehicleInfoDisplay;
