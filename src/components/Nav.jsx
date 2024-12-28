import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants"
import RegisterPage from '../components/Register';  // Adjust path if needed
import LoginPage from '../components/Login'; 
import {logo1} from "../assets/images/index.js"
import React, { useState } from 'react';


const Nav = () => {
   const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
      <nav className='flex justify-between items-center max-container'>
        <a href='/'>
          <img
            src={logo1}
            alt='logo'
            width={129}
            height={29}
            className='m-0 w-[111px] h-140px]'
          />
        </a>
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className='font-montserrat leading-normal text-lg text-slate-gray'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
          <a
             onClick={() => { setShowLogin(true); setShowRegister(false); setIsPopupVisible(true)}}
             className=" text-black px-4 py-2  transition duration-200 font-bold cursor-pointer"
          >
            Login
          </a>
        {showLogin && (
           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
           <div className="p-8 rounded shadow-lg w-full max-w-md h-4/5">

           <button
              onClick={() => {setShowLogin(false); setIsPopupVisible(false);}}
           className="text-black text-xl m-1 float-right cursor-pointer"
            >
           X
           </button>
        <LoginPage /> {/* Display LoginPage component */}
          </div>
          </div>
           )}
          <span className="text-3xl">/</span>
          <a 
            onClick={() => { setShowRegister(true); setShowLogin(false); }}
           className="text-black px-4 py-2 transition duration-200 font-bold cursor-pointer"
          >
          signup
         </a>
         {/* Register Modal */} 
        {showRegister && (
       <div className="fixed inset-0 flex items-center bg-gray-900 justify-center bg-opacity-75">
       <div className="p-8 w-full max-w-md h-4/5">
      <button
       onClick={() => {setShowRegister(false); setIsPopupVisible(false)}}
       className="text-black text-xl m-1 float-right cursor-pointer"
         >
         X
      </button>
       <RegisterPage /> {/* Display RegisterPage component */}
      </div>
      </div>
)}
         </div>
        
        <div className='hidden max-lg:block'>
        <img src={hamburger} alt='hamburger icon' width={25} height={25} />
        </div>
        </nav>
       </header>
  );
};

export default Nav;
