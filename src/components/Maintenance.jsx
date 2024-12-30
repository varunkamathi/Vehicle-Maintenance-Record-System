import React, { useEffect, useState } from "react";

const MaintenanceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tips = [
    // Car Tips
    {
      icon: "carOil.png", // Replace with your custom icon path
      title: "Regular Oil Changes",
      description:
        "Ensure your car’s engine runs smoothly by changing the oil and oil filter every 5,000-7,500 miles.",
    },
    {
      icon: "carBattery.png", // Replace with your custom icon path
      title: "Battery Maintenance",
      description:
        "Clean battery terminals and check its charge regularly to avoid unexpected breakdowns.",
    },
    {
      icon: "tirePressure.png", // Replace with your custom icon path
      title: "Monitor Tire Pressure",
      description:
        "Check tire pressure monthly to improve fuel efficiency and prevent uneven tire wear.",
    },
    {
      icon: "carCooling.png", // Replace with your custom icon path
      title: "Cooling System Check",
      description:
        "Inspect coolant levels and radiator condition to prevent engine overheating.",
    },
    {
      icon: "carTools.png", // Replace with your custom icon path
      title: "Regular Inspections",
      description:
        "Schedule professional inspections to identify and address issues before they become costly repairs.",
    },
    // Bike Tips
    {
      icon: "bikeChain.png", // Replace with your custom icon path
      title: "Chain Lubrication",
      description:
        "Lubricate the chain regularly to prevent rust and maintain smooth performance.",
    },
    {
      icon: "bikeFuel.png", // Replace with your custom icon path
      title: "Check Fuel Levels",
      description:
        "Always check fuel levels and avoid running on an empty tank to prevent engine strain.",
    },
    {
      icon: "bikeBolts.png", // Replace with your custom icon path
      title: "Tighten Bolts",
      description:
        "Regularly check and tighten bolts to ensure the bike is secure and safe to ride.",
    },
    {
      icon: "bikeHelmet.png", // Replace with your custom icon path
      title: "Inspect Safety Gear",
      description:
        "Ensure helmets, gloves, and other safety gear are in good condition before riding.",
    },
    {
      icon: "bikeDriveChain.png", // Replace with your custom icon path
      title: "Check Drive Chain Tension",
      description:
        "Inspect the drive chain’s tension and alignment for optimal performance.",
    },
  ];

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 2000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [tips.length]);

  return (
    <>
    <div className="max-w-[1296px] mx-auto overflow-hidden relative bg-transparent pt-8 pb-8">
    <p className="font-palanquin capitalize text-4xl max-w-full mb-4 font-bold">Vehicle Maintainance <span className="text-orange-500">Tips 💡</span></p>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full max-w-[1440px] flex flex-col items-center text-center bg-orange-50 rounded-lg p-8 m2"
          >
            <img
              src={tip.icon}
              alt={tip.title}
              className="w-16 h-16 mb-4" // Adjust size as needed
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {tip.title}
            </h3>
            <p className="text-gray-600">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MaintenanceCarousel;