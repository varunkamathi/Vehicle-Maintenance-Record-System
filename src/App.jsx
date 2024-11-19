// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import VehicleInfoForm from './pages/VehicleInfoForm.jsx';
import VehicleInfoDisplay from './pages/VehicleInfoDisplay.jsx';
import RegisterPage from '../src/components/Register.jsx';
import LoginPage from '../src/components/Login.jsx';
import Profile from '../src/components/Profile.jsx';
import { VehicleProvider } from '../src/context.jsx';



function App() {
  return (
    <VehicleProvider>
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Welcome Page */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Route for Vehicle Info Form Page */}
          <Route path="/vehicle-info" element={<VehicleInfoForm />} />
          {/* Route for Vehicle Info Display Page */}
          <Route path="/vehicle-info-display" element={<VehicleInfoDisplay />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
    </VehicleProvider>

  );
}

export default App;