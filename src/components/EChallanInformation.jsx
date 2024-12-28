import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EChallanInformation({ setIsAddChallan, setChallans }) {
  const [challanData, setChallanData] = useState({
    vehicle_no: '', // Field for vehicle registration number
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
      return toast.error('Vehicle registration number (VRN) is required.');
    }

    try {
      setIsLoading(true);

      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        toast.error('Please log in first.');
        setIsLoading(false);
        return;
      }

      // API call to fetch challan data
      const response = await axios.get(
        //vehicle_no=${vrn}&ownerName=${ownerName}&userId=${storedUserId}
        `/api/vehicles/vehicle/e-challan:?vehicle_no=${vehicle_no}&userId=${storedUserId}`);

      if (response.status === 200) {
        toast.success('Challan information retrieved successfully.');
        setChallans((prev)=>{
          console.log(prev);
          return [response.data.challans,...prev]
       });
        setIsAddChallan(false);
      }
    } catch (error) {
      console.error('Error fetching challan data:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch challan data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-4 p-3 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">View Vehicle Challan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {/* VRN Field */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block mb-2 font-semibold">VRN (Vehicle Registration Number)</label>
          <input
            type="text"
            name="vehicle_no"
            value={challanData.vehicle_no}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter VRN (e.g., MH12AB1234)"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 mt-4 flex flex-col items-center">
          <button
            disabled={isLoading}
            className={`relative flex items-center justify-center px-6 py-2 text-white font-semibold rounded-lg ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EChallanInformation;
