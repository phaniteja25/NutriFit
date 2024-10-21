import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './Components/AboutUs';
import Dashboard from './Components/Dashobard';
import Login from './Components/Login';
import MealGenerator from './Components/MealGenerator';
import MealLoging from './Components/MealLoging';
import Signup from './Components/Signup';
import UserProfile from './Components/UserProfile';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in
  return isAuthenticated ? children : <Navigate to="/" />;
}

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/mealgenerator" element={<MealGenerator />}/>
        <Route path="/mealloging" element={<MealLoging />}/>
        <Route path="/aboutus" element={<AboutUs />}/>
        <Route path="/userprofile" element={<UserProfile />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;