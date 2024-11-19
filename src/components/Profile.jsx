import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null); // Stores user data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // The token is automatically sent with the request because it is in the cookies
        const response = await axios.get('/api/users/current-user', {
          withCredentials: true, // This ensures that cookies are sent with the request
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          // If unauthorized, redirect to login
          navigate('/login');
        }
      } finally {
        setLoading(false); // Ensure loading state is set to false
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    // On logout, delete the cookie from the browser
    axios.post('/api/users/logout', {}, { withCredentials: true })
      .then(() => {
        navigate('/login');
        localStorage.removeItem("userId");
      })
      .catch(error => console.error('Logout error:', error));
  };

  if (loading) {
    // Show a loading message or spinner
    return (
      <div className="profile-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mt-4">{user.name || 'Name not available'}</h2>
            <p className="text-gray-600 mt-2">{user.email || 'Email not available'}</p>
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
        <p className="text-center text-gray-600">Profile not found.</p>
      )}
    </div>
  );

}

export default Profile;
