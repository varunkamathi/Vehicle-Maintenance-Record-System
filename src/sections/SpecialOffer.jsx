import { offer } from "../assets/images";

const SpecialOffer = () => {
  return (
    <section className="flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container">
      <div className="flex-1">
        <img
          src={offer}
          alt="Shoe Promotion"
          width={773}
          height={687}
          className="object-contain w-full"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h2 className="text-4xl font-palanquin font-bold">
          <span className="text-orange-500">Simplify </span>
          Your Vehicle Management
        </h2>
        <p className="mt-4 info-text">
          Managing your vehicle&apos;s records has never been easier! Our
          platform empowers you to stay on top of every detail related to your
          car or bike, ensuring peace of mind and convenience at your
          fingertips.
          <br /> 🗂️ Organized Records, Anytime, Anywhere Upload and access
          service records, insurance details, and e-challan payments
          effortlessly—all in one secure place.
          <br /> 📅 Stay Ahead with Timely Reminders Never miss important dates!
          From insurance renewals to service schedules, we’ve got you covered.{" "}
          <br />
          🔍 Comprehensive Vehicle Insights Gain analytical insights into your
          vehicle’s health, maintenance history, and compliance to stay in
          control.
          <br /> 🌟 For All Your Rides Whether you own a single vehicle or a
          fleet, our platform is designed to handle it all seamlessly.
          <br /> 🔗 Integrated with RTO Verifications Verify your vehicle
          details directly from official sources, ensuring accuracy and
          reliability.
          <br /> Let us take the hassle out of vehicle management—so you can
          focus on enjoying the journey ahead!
        </p>
      </div>
    </section>
  );
};

export default SpecialOffer;
