// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
  <>
  <Navbar />
      <div>
      <h1>Welcome to your Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  </>
  );
};

export default Dashboard;
