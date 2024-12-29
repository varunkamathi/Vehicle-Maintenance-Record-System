import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { VehicleContext } from "../context.jsx";
import EChallanDetails from "../components/EChallanInformation.jsx";
import OtherDetails from "../components/OtherInformation.jsx";
import VehicleInformation from "../components/VehicleInformation.jsx";
import Footer from "../sections/Footer";
import { acko, kotak, bajaj, bharti, zuno } from "../assets/images/index.js";
import axios from "axios";

function VehicleInfoDisplay() {
  const [vehicles, setVehicles] = useState([]);
  const [challans, setChallans] = useState([]);
  const [activeSection, setActiveSection] = useState(null); // Track active section

  const storedUserId = localStorage.getItem("userId");
  if (!storedUserId) {
    return <h1>You need to loggedIn</h1>;
  }
  const navigate = useNavigate();

  // Handle toggle for each section
  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle section
  };

  const handleEditVehicle = (index) => {
    navigate("/vehicle-info", { state: { vehicle: vehicles[index], index } });
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

  useEffect(() => {
    const fetchVehiclesFromBackEnd = async () => {
      try {
        const response = await axios.get(`/api/vehicles/get/${storedUserId}`);
        if (response.status === 200) {
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
        const response = await axios.get(`/api/vehicles/get/challan/${storedUserId}`);
        if (response.status === 200) {
          const challanData = response.data;
          if (Array.isArray(challanData)) {
            setChallans(challanData);
          } else {
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

  const buttonClass = (section) => {
    return ` px-14 py-2 rounded-full shadow-lg border-[2px] transition-all duration-200 ${
      activeSection === section
        ? "text-white bg-orange-600 border-orange-600 hover:shadow-xl"
        : "bg-white text-orange-600 hover:bg-orange-600 hover:text-white hover:shadow-xl border-orange-600"
    }`;
  };

  return (
    <div>
      <Header />
      <div className="p-1 items-center  ">
        <div className="mb-4 mt-4 flex space-x-16 mx-[auto] max-w-[1440px] justify-center">
          <button
            onClick={() => handleSectionToggle("addVehicle")}
            className={buttonClass("addVehicle")}
          >
            Add Vehicle
          </button>
          <button
            onClick={() => handleSectionToggle("viewVehicles")}
            className={buttonClass("viewVehicles")}
          >
            View Vehicles
          </button>
          <button
            onClick={() => handleSectionToggle("viewInsurance")}
            className={buttonClass("viewInsurance")}
          >
            View Insurance
          </button>
          <button
            onClick={() => handleSectionToggle("searchChallan")}
            className={buttonClass("searchChallan")}
          >
            Search Challan
          </button>
          <button
            onClick={() => handleSectionToggle("viewChallan")}
            className={buttonClass("viewChallan")}
          >
            View Challan
          </button>
        </div>
        <hr className="border-gray-300 w-2/3 mx-auto my-6" />
      </div>

      {activeSection === "addVehicle" && (
        <VehicleInformation setIsAddClicked={setActiveSection} setVehicles={setVehicles} />
      )}

      {activeSection === "searchChallan" && (
        <EChallanDetails setIsAddChallan={setActiveSection} setChallans={setChallans} />
      )}

      {activeSection === "viewChallan" && (
        challans.length > 0 ? (
          challans.map((challan, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Challans #{index + 1}
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">challan No: {challan.challans.challanNo || "N/A"}</h3>
                <p>date: {challan.challans.date || "N/A"}</p>
                <p>amount: {challan.challans.amount}</p>
                <p>status: {challan.challans.status}</p>
                <p>violation: {challan.challans.violation}</p>
                <p>location: {challan.challans.location}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-start mt-[250px] min-h-screen">
            <div className="flex flex-col items-center space-y-4">
              <img src="NoData2.png" alt="Empty Garage" className="w-24 h-24 object-cover opacity-92" />
              <p className="text-xl font-medium text-gray-700">
                No vehicles yet—tap&nbsp;
                <span className="text-orange-500 font-semibold">Add Vehicle</span>&nbsp;to get started.
              </p>
            </div>
          </div>
        )
      )}

      {activeSection === "viewVehicles" && (
        vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Vehicle Information #{index + 1}</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">Owner Name: {vehicle.rtoUserVehicleData.rc_owner_name || "N/A"}</h3>
                <p>VRN: {vehicle.vehicleData.registration || "N/A"}</p>
                <p>Registration date: {vehicle.rtoUserVehicleData.rc_regn_dt}</p>
                <p>Vehicle fitness upto: {vehicle.rtoUserVehicleData.rc_fit_upto}</p>
                <p>Vehicle issue date: {vehicle.rtoUserVehicleData.rc_status_as_on}</p>
                {vehicle.rtoUserVehicleData.rc_financer && (
                  <p>Vehicle financer company: {vehicle.rtoUserVehicleData.rc_financer}</p>
                )}
                {vehicle.rtoUserVehicleData.rc_insurance_comp && vehicle.rtoUserVehicleData.rc_insurance_upto && (
                  <>
                    <p>Insurance company: {vehicle.rtoUserVehicleData.rc_insurance_comp}</p>
                    <p>Insurance upto: {vehicle.rtoUserVehicleData.rc_insurance_upto}</p>
                  </>
                )}
                <p>PUCC upto: {vehicle.rtoUserVehicleData.rc_pucc_upto}</p>
                <p>Permanent address: {vehicle.rtoUserVehicleData.rc_permanent_address}</p>
                <p>RC Status: {vehicle.rtoUserVehicleData.rc_status}</p>
              </div>
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
              <img src="NoData2.png" alt="Empty Garage" className="w-24 h-24 object-cover opacity-92" />
              <p className="text-xl font-medium text-gray-700">
                No vehicles yet—tap&nbsp;
                <span className="text-orange-500 font-semibold">Add Vehicle</span>&nbsp;to get started.
              </p>
            </div>
          </div>
        )
      )}

      {activeSection === "viewInsurance" && (
        vehicles.length > 0 ? (
          <>
            {vehicles.map((vehicle, index) => {
              const insuranceExpiryDate = new Date(vehicle.rtoUserVehicleData.rc_insurance_upto);
              const currentDate = new Date();
              const isInsuranceExpired = insuranceExpiryDate < currentDate;
              return (
                <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {vehicle.rtoUserVehicleData.rc_insurance_comp && vehicle.rtoUserVehicleData.rc_insurance_upto && (
                      <>
                        <p>Insurance company: {vehicle.rtoUserVehicleData.rc_insurance_comp}</p>
                        <p>Insurance upto: {insuranceExpiryDate.toLocaleDateString()}</p>
                        {isInsuranceExpired && (
                          <p className="text-red-600 font-semibold">
                            Insurance has expired! Please renew as soon as possible.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Recommended Insurance Providers</h3>
              <div className="flex justify-center gap-4">
                <img src={acko} alt="Acko Insurance" className="w-24 h-12 object-contain" />
                <img src={kotak} alt="Kotak Insurance" className="w-24 h-12 object-contain" />
                <img src={bajaj} alt="Bajaj Allianz" className="w-24 h-12 object-contain" />
                <img src={bharti} alt="Bharti AXA" className="w-24 h-12 object-contain" />
                <img src={zuno} alt="Zuno Insurance" className="w-24 h-12 object-contain" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-start mt-[250px] min-h-screen"></div>
        )
      )}

      <section className="bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </div>
  );
}

export default VehicleInfoDisplay;