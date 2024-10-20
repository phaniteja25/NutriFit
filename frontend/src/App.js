import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashobard';
import Login from './Components/Login';
import Signup from './Components/Signup';

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
      </Routes>
    </Router>

{/*       <SignupNavbar></SignupNavbar>
      <Login></Login> */}
      {/* <Login></Login>
      <Navbar />
      <MealLoging /> */}
      {/* <MealGenerator></MealGenerator>
      <UserProfile></UserProfile> */}
    </>
  );
}

export default App;