// src/pages/LoginPage.js
import React , { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      console.log(response);
     
      if(response.status===200){
        console.log("LOGGED IN USER ID IS",response?.data?.data?.user?._id)
         // Store email in localStorage
      localStorage.setItem("email", email);

      // Navigate to the profile or home page
      navigate("/profile");
        if(response?.data?.data?.user?._id){
          localStorage.setItem("userId",response?.data?.data?.user?._id);
        }
      }
      localStorage.setItem('token', response.data.token); // Save token
      navigate('/vehicle-info-display'); // Redirect to profile
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert('Login failed, please check your credentials');    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-slate-700 rounded-xl">
      
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-lg bg-slate-100 border border-gray-400 "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-lg bg-slate-100 border border-gray-400"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full shadow-lg transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
