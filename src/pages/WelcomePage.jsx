// src/pages/WelcomePage.js
import React, { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../sections/Footer";
import SuperQuality from "../sections/SuperQuality";
import SpecialOffer from "../sections/SpecialOffer";
import MaintenanceTips from "../components/Maintenance";

function WelcomePage() {
  // State to toggle between Login and Register forms
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <main className="relative">
      <header>
        {" "}
        <Nav />
      </header>

      <section>
        <div className="flex flex-col justify-center items-center min-h-[70vh] text-center relative">
          <h1 className="text-2xl font-extrabold mb-6 text-sky-950 drop-shadow-lg">
            Welcome to{" "}
            <span className="text-orange-500">
              Vehicle Record Maintenance System
            </span>
          </h1>
          <p className="text-4xl font-semibold mb-8 text-sky-900 uppercase tracking-wide">
            Empowering <span className="text-orange-600">Smarter</span> Vehicle
            Record Management
          </p>
        </div>
      </section>
      <section className="pt-32">
        <MaintenanceTips />
      </section>

      <section className="padding">
        <SpecialOffer />
      </section>

      <section className="padding">
        <SuperQuality />
      </section>

      <section className=" bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  );
}

export default WelcomePage;
