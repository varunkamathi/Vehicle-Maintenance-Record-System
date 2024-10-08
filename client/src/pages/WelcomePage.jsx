// src/pages/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

function WelcomePage() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to Vehicle Maintenance Record System</h1>
        <p className="text-lg mb-6">Please log in or sign up to continue.</p>
        <div className="flex space-x-4">
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </Link>
          <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
