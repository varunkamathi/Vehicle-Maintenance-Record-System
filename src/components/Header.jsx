import React, { useState, useRef, useEffect } from "react";
import Profile from "./Profile"; // Import the Profile component
import { logo1 } from "../assets/images/index.js";

function Header() {
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile visibility
  const profileRef = useRef(null); // Reference for the profile dropdown

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle the state
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-600 shadow-lg py-4 px-6 relative w-full z-10">
      <nav className="flex justify-between items-center max-container">
        {/* Logo */}
        <a href="/">
          <img
            src={logo1}
            alt="logo"
            width={129}
            height={29}
            className="m-0 w-[111px] hover:scale-110 transition-transform duration-200"
          />
        </a>

        <div className="container mx-auto max-w-[1296px] flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            Vehicle Record Maintenance System
          </h1>
          <nav className="flex items-center">
            {/* Profile Toggle Button */}
            <button
              onClick={toggleProfile}
              className="focus:outline-none bg-white rounded-full"
            >
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
          <div
            ref={profileRef}
            className="absolute top-24 left-3/4 bg-white shadow-xl rounded-xl p-4 z-10 w-72 border border-gray-200"
          >
            <Profile /> {/* Render the Profile component */}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;