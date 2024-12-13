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
        // Fetch user data from the /api/current-user endpoint
        const response = await axios.get("/api/current-user");

        if (response.status === 200) {
          setUser(response.data); // Set user data
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
        setLoading(false); // Set loading state to false
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Send logout request and navigate to login page
      await axios.post("/api/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("email"); // Remove email from localStorage (if applicable)
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">{user.name || "Name not available"}</h1>
            <p className="text-gray-700">{user.email || "Email not available"}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
