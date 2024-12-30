import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddDocument from "./AddDocument";

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
      <div className="flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white w-full max-w-sm">
      {user || storedEmail ? (
        <>
          {/* Profile Info */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <p className="text-sm text-gray-600">
              {user?.email || storedEmail || "Email not available"}
            </p>
          </div>

          {/* Add Document */}
          <div className="mb-6">
            <AddDocument />
          </div>

          {/* Logout Button */}
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-red-600 transition-all duration-200"
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
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-blue-600 transition-all duration-200"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;