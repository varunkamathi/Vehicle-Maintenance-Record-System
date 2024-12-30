import { aboutus } from "../assets/images/index.js";

const SuperQuality = () => {
  return (
    <section
      id="about-us"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-bold">
          About
          <span className="text-orange-500"> Us </span>
        </h2>
        <p className="mt-4 lg:max-w-lg info-text text-justify">
          Welcome to the Vehicle Record Maintenance System, a comprehensive
          platform designed to simplify and enhance vehicle management. <br />
          Our website seamlessly integrates a range of essential features to
          cater to car and bike owners alike, offering a user-friendly
          experience for maintaining records, ensuring compliance, and staying
          informed about your vehicle&apos;s health. With tools like{" "}
          <b>insurance and e-challan reminders, RTO verification</b> we aim to
          provide a one-stop solution for all your vehicle maintenance needs.
          Additionally, our platform offers expert tips for extending the life
          of your vehicle, presented through interactive carousels for easy
          access and understanding.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          At its core, our system is built to empower users with proactive
          maintenance practices, ensuring safety, efficiency, and peace of mind.
          Join us and experience a smarter way to manage your vehicles!
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img
          src='aobutUs.jpg'
          alt="product detail"
          width={570}
          height={522}
          className="object-contain rounded-lg"
        />
      </div>
    </section>
  );
};

export default SuperQuality;
