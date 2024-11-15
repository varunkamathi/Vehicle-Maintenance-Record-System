// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/users/register', { email, password });
      console.log(response.data);
      alert('Registration successful');
      navigate('/login'); // Redirect to login page after registration
      //navigate('/profile'); // Redirect to profile
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Registration failed, please try again');
        }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded shadow-lg transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
