import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null); // Stores user data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/current-user");

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Failed to fetch user profile");
          navigate("/"); // Redirect to login on failure
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response && error.response.status === 401) {
          navigate("/"); // Redirect to login on unauthorized
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Get email from localStorage
  const storedEmail = localStorage.getItem("email");

  const handleLogout = async () => {
    try {
    
      localStorage.removeItem("email"); // Remove email from localStorage
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className=" bg-white rounded-lg">
      {user || storedEmail ? (
        <>
          <div className="text-center">
            <p className="text-gray-700">
              {user?.email || storedEmail || "Email not available"}
            </p>
          </div>
          <div className=" flex justify-center">
            <button
              onClick={handleLogout}
              className=" text-black rounded underline "
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Profile not found.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
