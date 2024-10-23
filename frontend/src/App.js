import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import MealLoging from './Components/MealLoging'

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
        <Route path="/meals" element={<MealLoging />}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;