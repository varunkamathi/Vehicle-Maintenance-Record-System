// src/pages/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import boy from './boy.png';


function WelcomePage() {
  return (
  
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-900 text-white">
    
    <div className="flex flex-row items-center justify-between w-full max-w-4xl mx-auto px-8">
      
      {/* Left Side: Welcome Text and Buttons */}
      <div className="flex flex-col items-start justify-center w-1/2">
        <h1 className="text-4xl font-bold mb-6 text-white">
          Welcome to Vehicle Maintenance Record System
        </h1>
        <p className='text-1xl font-bold mb-6 text-white uppercase justify'>we are interduce our website that we merage all special feature that you can use in one website  .</p>
        <p className="text-lg mb-6 text-gray-300">
          Please log in or sign up to continue.
        </p>
        <div className="flex space-x-4">
          <from></from>
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded shadow-lg transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded shadow-lg transition duration-200"
          >
            Sign Up
          </Link>
          
        </div>
      </div>
      
      {/* Right Side: Image */}
      <div className="flex items-center justify-center w-1/2">
        <img
          src={boy} // Use appropriate path or URL for your image
          alt="Illustration of a person"
          className="w-3/4 h-auto"
        />
      </div>
      
    </div>
  </div>

  );
}

export default WelcomePage;
