// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile'; // Import the Profile component

function Header() {
  return (
    <header className="bg-orange-600 text-white shadow-md py-4">
      <div className="container mx-auto max-w-[1296px]  flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
          Vehicle Maintenance Record System
        </h1>
        <nav className="flex items-center">
          {/* Profile Link */}
          <Link to="/profile" className="text-white hover:text-gray-200">
          <img
        src="profile.png"
        alt="Profile"
        className="w-10 h-10 rounded-full "
      />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
