// src/pages/WelcomePage.js
import React, { useState } from 'react';
import Nav from '../components/Nav';
import  Footer  from '../sections/Footer';
import SuperQuality from '../sections/SuperQuality';

function WelcomePage() {
  // State to toggle between Login and Register forms
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <main className='relative'>
      <header>            <Nav />
      </header>

    
    <section id='home' className='padding-x py-10'>
    <div className="flex flex-col justify-center min-h-screen items-star">
      
        
        {/* Left Side: Welcome Text and Buttons */}
        
          <h1 className="text-4xl font-bold mb-6 text-sky-950 ">
            Welcome to Vehicle Maintenance Record System
          </h1>
          <p className='text-1xl font-bold mb-6 text-sky-950 uppercase'>
            We introduce our website that merges all special features you can use in one platform.
          </p>
          <p className="text-lg mb-6 text-gray-600">
            Please log in or sign up to continue.
          </p>
          <div className="flex flex-col items-start space-y-4">
           
        </div>
        
        

      
      
    
    </div>
      </section>

      <section className='padding'>
        <SuperQuality />
      </section>
    
    <section className=' bg-black padding-x padding-t pb-8'>
    <Footer />
    </section>
    </main>
  );
}

export default WelcomePage;
