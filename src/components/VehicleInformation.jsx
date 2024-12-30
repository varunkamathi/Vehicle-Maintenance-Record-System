import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VehicleInformation({ setIsAddClicked, setVehicles }) {
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState({
    ownerName: "",
    vin: "",
    vrn: "", // Optional VRN field
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicleData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Form submitted!");
    }, 2000);

    const { ownerName, vin, vrn } = vehicleData;
    if (!ownerName || !vrn) {
      return toast.error("Both owner name and vrn are required");
    }

    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        return toast.error("Please log in first!");
      }

      const response = await axios.get(
        `/api/vehicles/vehicle/lookup?vehicle_no=${vrn}&ownerName=${ownerName}&userId=${storedUserId}`
      );

      if (response.status === 403) {
        return toast.error(
          "You are not authorized. Please check your owner name."
        );
      }

      if (response.status === 200) {
        toast.success("Vehicle information added successfully.");
        setIsAddClicked(false);
        setVehicles((prev) => {
          return [response.data.vehicle, ...prev];
        });
      }
    } catch (error) {
      console.log("Error communicating with RTO", error);
      toast.error(
        error.response?.data ||
          error.message ||
          "Error adding vehicle data. Please try again."
      );
    }
  };

  return (
    <section className="mb-6 p-6 bg-white rounded-2xl shadow-2xl w-1/4 mx-auto border-[1px]">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add Vehicle Information
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Owner Name */}
        <div className="p-5 bg-[radial-gradient(ellipse,_rgba(248,_250,_252,_0.7),_rgba(209,_213,_219,_0.8))] rounded-lg">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Owner Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ownerName"
            value={vehicleData.ownerName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[1.5px] focus:ring-black focus:outline-none transition-all duration-200"
            placeholder="Enter Owner Name"
            required
          />
        </div>

        {/* VRN */}
        <div className="p-5 bg-[radial-gradient(ellipse,_rgba(248,_250,_252,_0.7),_rgba(209,_213,_219,_0.8))] rounded-lg">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            VRN (Vehicle Registration Number)<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="vrn"
            value={vehicleData.vrn}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[1.5px] focus:ring-black focus:outline-none transition-all duration-200"
            placeholder="Enter VRN (e.g., MH12AB1234)"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 mt-4 flex justify-center">
          <button
            disabled={isLoading}
            className={`flex items-center justify-center px-6 py-3 rounded-full font-bold text-white transition-all duration-200 ${
              isLoading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl"
            }`}
            style={{ height: "50px", width: "220px" }} // Ensure the button size stays consistent
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default VehicleInformation;