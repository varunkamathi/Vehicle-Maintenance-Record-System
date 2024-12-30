import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EChallanInformation({ setIsAddChallan, setChallans }) {
  const [challanData, setChallanData] = useState({
    vehicle_no: "", // Field for vehicle registration number
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChallanData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { vehicle_no } = challanData;

    // Input validation
    if (!vehicle_no) {
      return toast.error("Vehicle registration number (VRN) is required.");
    }

    try {
      setIsLoading(true);

      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        toast.error("Please log in first.");
        setIsLoading(false);
        return;
      }

      // API call to fetch challan data
      const response = await axios.get(
        `/api/vehicles/vehicle/e-challan:?vehicle_no=${vehicle_no}&userId=${storedUserId}`
      );

      if (response.status === 200) {
        toast.success("Challan information retrieved successfully.");
        setChallans((prev) => {
          return [response.data.challans, ...prev];
        });
        setIsAddChallan(false);
      }
    } catch (error) {
      console.error("Error fetching challan data:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to fetch challan data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-6 p-6 bg-white rounded-2xl shadow-2xl w-1/4 mx-auto border-[1px]">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">View Vehicle Challan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* VRN Field */}
        <div className="p-5 bg-[radial-gradient(ellipse,_rgba(248,_250,_252,_0.7),_rgba(209,_213,_219,_0.8))] rounded-lg">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            VRN (Vehicle Registration Number)<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="vehicle_no"
            value={challanData.vehicle_no}
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

export default EChallanInformation;