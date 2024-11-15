// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          // If unauthorized, redirect to login
          navigate('/login');
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {user.profileImage && <img src={user.profileImage} alt="Profile" />}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
