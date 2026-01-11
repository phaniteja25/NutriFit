import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/App.css';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import Login from '../pages/Login';
import MealGenerator from '../Components/MealGenerator';
import MealLoging from '../Components/MealLoging';
import Signup from '../pages/Signup';
import UserProfile from '../pages/UserProfile';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
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
        <Route path="/userprofile" element={<UserProfile />}/>
        <Route path="/history" element={<History />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;