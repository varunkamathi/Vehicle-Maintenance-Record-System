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
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Maintenance Tips</h1>
      <div className="flex justify-center mb-4">
        <button
          className={`px-5 py-3 mx-2 rounded ${
            selectedVehicle === 'bike' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedVehicle('bike')}
        >
          Bike
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${
            selectedVehicle === 'car' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedVehicle('car')}
        >
          Car
        </button>
      </div>
      <div className="flex flex-col items-center">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`Maintenance Tip for ${selectedVehicle}`}
              className="w-96 h-96 object-cover rounded shadow-md mb-2"
            />
            <p className="text-lg font-medium">{names[currentImageIndex]}</p>
          </>
        ) : (
          <p>No images available for this vehicle.</p>
        )}
      </div>
    </div>
  );
};

export default MaintenanceTips;
