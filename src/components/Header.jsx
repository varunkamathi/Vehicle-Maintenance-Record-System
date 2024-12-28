import React, { useState } from "react";
import Profile from "./Profile"; // Import the Profile component
import {logo1} from "../assets/images/index.js"


function Header() {
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile visibility

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle the state
  };

  return (
    <header className="bg-blue-950 text-white shadow-md py-4">
     
      <div className="container mx-auto max-w-[1296px] flex justify-between items-center">
       
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
        Vehicle Record Maintenance System
                  
        </h1>
        <nav className="flex items-center">
          {/* Profile Toggle Button */}
          <button onClick={toggleProfile} className="focus:outline-none bg-white rounded">
            <img
              src="profile.png"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>
        </nav>
      </div>

      {/* Conditionally render the Profile component */}
      {showProfile && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-50 w-80">
          <Profile /> {/* Render the Profile component */}
        </div>
      )}
    </header>
  );
}

export default Header;