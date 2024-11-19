// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile'; // Import the Profile component
import profile from '../image/profile.png'

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          Vehicle Maintenance Record System
        </h1>
        <nav className="flex items-center">
          {/* Profile Link */}
          <Link to="/profile" className="text-white hover:text-gray-200 mx-2">
          <img
            src={profile} // Use the appropriate path or URL for your image
            alt="Illustration of a person"
            className="w-12 h-12 rounded-full"
          />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
