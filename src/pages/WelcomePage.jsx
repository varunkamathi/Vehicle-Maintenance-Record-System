// src/pages/WelcomePage.js
import React, { useState } from 'react';
import boy from './boy.png';
import RegisterPage from '../components/Register';  // Adjust path if needed
import LoginPage from '../components/Login';        // Adjust path if needed

function WelcomePage() {
  // State to toggle between Login and Register forms
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className={`flex flex-row items-center justify-between w-full max-w-4xl mx-auto px-8 ${isPopupVisible ? 'blur-sm' : ''}`}>
        
        {/* Left Side: Welcome Text and Buttons */}
        <div className="flex flex-col items-start justify-center w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Welcome to Vehicle Maintenance Record System
          </h1>
          <p className='text-1xl font-bold mb-6 text-white uppercase'>
            We introduce our website that merges all special features you can use in one platform.
          </p>
          <p className="text-lg mb-6 text-gray-300">
            Please log in or sign up to continue.
          </p>
          <div className="flex flex-col items-start space-y-4">
            <button
              onClick={() => { setShowLogin(true); setShowRegister(false); setIsPopupVisible(true)}}
              className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded shadow-lg transition duration-200 font-bold mx-3"
            >
              Login
            </button>
            
            <button
              onClick={() => { setShowRegister(true); setShowLogin(false); }}
              className="text-white px-4 py-2 rounded shadow-lg transition duration-200 font-bold"
            >
              New User Register here to continue
            </button>
          </div>
        </div>
        
        {/* Right Side: Image */}
        <div className="flex items-center justify-center w-1/2">
          <img
            src={boy} // Use the appropriate path or URL for your image
            alt="Illustration of a person"
            className="w-3/4 h-auto"
          />
        </div>
        
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="p-8 rounded shadow-lg w-full max-w-md h-4/5">
            <button
              onClick={() => {setShowLogin(false); setIsPopupVisible(false);}}
              className="text-white text-xl m-1 float-right cursor-pointer"
            >
              X
            </button>
            <LoginPage /> {/* Display LoginPage component */}
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="p-8 rounded shadow-lg w-full max-w-md h-4/5">
            <button
              onClick={() => {setShowRegister(false); setIsPopupVisible(false)}}
              className="text-white text-xl m-1 float-right cursor-pointer"
            >
              X
            </button>
            <RegisterPage /> {/* Display RegisterPage component */}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default WelcomePage;
