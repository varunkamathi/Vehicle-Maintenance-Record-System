import React, { useState, useEffect } from 'react';
import { battery } from '../assets/images/index.js';
import { bike_air } from '../assets/images/index.js';
import { car_breakes } from '../assets/images/index.js';
import { car_oilTopup } from '../assets/images/index.js';
import { car_wheel } from '../assets/images/index.js';
import { chain_lubrication } from '../assets/images/index.js';
import { carboreter } from '../assets/images/index.js';
import { colent } from '../assets/images/index.js';
import { oil_changes } from '../assets/images/index.js';

const MaintenanceTips = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const bikeImages = [bike_air, carboreter, chain_lubrication, oil_changes];
  const bikeNames = ['Air Filter Maintenance', 'Carburetor Tuning', 'Chain Lubrication', 'Oil Changes'];

  const carImages = [car_breakes, car_oilTopup, car_wheel, battery, colent];
  const carNames = ['Brake Inspection', 'Oil Top-up', 'Wheel Alignment', 'Battery Care', 'Coolant Check'];

  const images = selectedVehicle === 'bike' ? bikeImages : carImages;
  const names = selectedVehicle === 'bike' ? bikeNames : carNames;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Maintenance Tips</h1>
      <div className="flex justify-center mb-8">
        <button
          className={`px-5 py-3 mx-2 rounded ${
            selectedVehicle === 'bike' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => {
            setSelectedVehicle('bike');
            setCurrentImageIndex(0);
          }}
        >
          Bike
        </button>
        <button
          className={`px-5 py-3 mx-2 rounded ${
            selectedVehicle === 'car' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => {
            setSelectedVehicle('car');
            setCurrentImageIndex(0);
          }}
        >
          Car
        </button>
      </div>
      <div className="relative w-full max-w-7xl mx-auto h-[700px] flex justify-center items-center">
        {/* Left Arrow */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center shadow hover:bg-gray-300 focus:outline-none"
          onClick={handlePrevious}
        >
          &#8592;
        </button>

        {/* Image and Description */}
        <div className="w-full flex flex-col items-center">
          <img
            src={images[currentImageIndex]}
            alt={`Maintenance Tip for ${selectedVehicle}`}
            className="h-[700px] max-h-full object-contain rounded shadow-md"
          />
          <p className="text-lg font-medium mt-2">{names[currentImageIndex]}</p>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center shadow hover:bg-gray-300 focus:outline-none"
          onClick={handleNext}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default MaintenanceTips;