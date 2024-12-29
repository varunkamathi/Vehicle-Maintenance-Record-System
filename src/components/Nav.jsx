import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import RegisterPage from "../components/Register"; // Adjust path if needed
import LoginPage from "../components/Login";
import { logo1 } from "../assets/images/index.js";
import React, { useState } from "react";

const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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

        {/* Navigation Links */}
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-white hover:text-orange-200 transition duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Login and Signup Buttons */}
        <div className="flex gap-4 text-lg leading-normal font-medium font-montserrat max-lg:hidden">
          {/* Login Button */}
          <a
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
              setIsPopupVisible(true);
            }}
            className="bg-white text-orange-600 px-5 py-2 rounded-full hover:bg-orange-100 shadow-md hover:shadow-xl border-2 border-orange-600 transition-all duration-200"
          >
            Login
          </a>

          {/* Login Modal */}
          {showLogin && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
              <div className="p-8 rounded-lg shadow-2xl w-full max-w-md bg-white relative flex flex-col items-center justify-center h-[550px]">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setIsPopupVisible(false);
                  }}
                  className="text-gray-500 text-xl absolute top-4 right-4 hover:text-gray-700 transition"
                >
                  ✕
                </button>

                {/* Login Page Content */}
                <div className="w-[auto] h-[auto] flex flex-col justify-center">
                  <img
                    src="login1.png"
                    alt="login"
                    className="h-[80px] w-fit self-center"
                  />
                  <LoginPage /> {/* Display LoginPage component */}
                </div>
              </div>
            </div>
          )}

          <span className="text-white text-3xl">/</span>

          {/* Signup Button */}
          <a
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
            className="bg-white text-orange-600 px-5 py-2 rounded-full hover:bg-orange-100 shadow-md hover:shadow-xl border-2 border-orange-600 transition-all duration-200"
          >
            Signup
          </a>

          {/* Signup Modal */}
          {showRegister && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
              <div className="p-8 rounded-lg shadow-2xl w-full max-w-md bg-white relative flex flex-col items-center justify-center h-[550px]">
                <button
                  onClick={() => {
                    setShowRegister(false);
                    setIsPopupVisible(false);
                  }}
                  className="text-gray-500 text-xl absolute top-4 right-4 hover:text-gray-700 transition"
                >
                  ✕
                </button>
                <div className="w-[auto] h-[auto] flex flex-col justify-center">
                  <img
                    src="signup.png"
                    alt="signup"
                    className="h-[80px] w-fit self-center"
                  />
                  <RegisterPage /> {/* Display RegisterPage component */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="hidden max-lg:block">
          <img
            src={hamburger}
            alt="hamburger icon"
            width={25}
            height={25}
            className="text-white hover:text-orange-400 transition"
          />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
