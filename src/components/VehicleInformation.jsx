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

  console.log(vehicleData);

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicleData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate VIN and VRN
  // const validateVIN = (vin) => /^[A-HJ-NPR-Z0-9]{17}$/.test(vin); // Example VIN regex
  // const validateVRN = (vrn) => /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(vrn); // Example VRN regex

  // Handle VRN lookup
  // const handleVRNLookup = async () => {
  //   const { vrn } = vehicleData;
  //   if (!vrn) {
  //     toast.error('Please enter a VRN to search.');
  //     return;
  //   }

  //   if (!validateVRN(vrn)) {
  //     toast.error('Invalid VRN format. Example: MH12AB1234.');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`/api/vehicles/lookup-vrn/${vrn}`);
  //     const { ownerName, vin } = response.data;

  //     setVehicleData((prevData) => ({
  //       ...prevData,
  //       ownerName: ownerName || '',
  //       vin: vin || '',
  //     }));

  //     toast.success('Vehicle information retrieved successfully.');
  //   } catch (error) {
  //     console.error('Error fetching vehicle details:', error.response?.data || error.message);
  //     toast.error('Failed to retrieve vehicle details. Please check the VRN.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      return toast.error("Both owner name and vrn is required");
    }

    // if (!validateVIN(vin)) {
    //   toast.error('Invalid VIN format. VIN must be 17 characters.');
    //   return;
    // }

    try {
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   toast.error('You are not logged in. Please log in first.');
      //   return;
      // }

      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        return toast.error("Kindly logged in first!");
      }
      //const response =await axios.get(`/api/vehicles/rto/lookup?vehicle_no=${vrn}&ownerName=${ownerName}&userId=${storedUserId}`)
      const response = await axios.get(
        `/api/vehicles/vehicle/lookup?vehicle_no=${vrn}&ownerName=${ownerName}&userId=${storedUserId}`
      );

      if (response.status === 403) {
        return toast.error(
          "You are not authorized kindly check your owner name"
        );
      }

      if (response.status === 200) {
        console.log("response from rto is", response);
        toast.success("Vehicle information added successfully.");
        setIsAddClicked(false);
        // adding vehickes to vehicle array for the optimistic updates;
        setVehicles((prev) => {
          console.log(prev);
          return [response.data.vehicle, ...prev];
        });
      }

      // const payload = { ...vehicleData, userId: storedUserId || null };

      // await axios.post('/api/vehicles/add', payload, { withCredentials: true });

      // navigate('/vehicle-info-display');
    } catch (error) {
      console.log("error in communicate with RTO", error);
      console.error(
        "Error adding vehicle data:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data ||
          error.message ||
          "Error adding vehicle data. Please try again."
      );
    }
  };

  return (
    <section className="mb-4 p-3 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Add Vehicle Information</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        {/* Owner Name */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={vehicleData.ownerName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Owner Name"
            required
          />
        </div>

        {/* Optional VRN */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">
            VRN ( Vehicle Registration Number )
          </label>
          <input
            type="text"
            name="vrn"
            value={vehicleData.vrn}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter VRN (e.g., MH12AB1234)"
            required
          />
        </div>

        {/* VRN Lookup Button */}
        {/* <div className="col-span-1 flex justify-end">
          <button
            type="button"
            onClick={handleVRNLookup}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md transition duration-200"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Lookup VRN'}
          </button>
        </div> */}

        {/* Submit Button */}
        <div className="col-span-1 mt-4 flex flex-col items-center">
          <button
            disabled={isLoading}
            className={`bg-white text-orange-600 px-14 py-2 rounded-full hover:bg-orange-600 hover:text-white shadow-lg hover:shadow-xl border-[2px] border-orange-600 transition-all duration-200 flex items-center justify-center ${
              isLoading
                ? "bg-orange-400 cursor-not-allowed "
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            style={{ height: "40px", width: "200px" }} // Ensure the button size stays constant
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
