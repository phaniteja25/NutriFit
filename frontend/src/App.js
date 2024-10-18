import React from 'react';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import SignupNavbar from './Components/SignupNavbar';
import Navbar from './Components/Navbar';
import UserProfile from './Components/UserProfile';
import MealGenerator from './Components/MealGenerator';
import MealLoging from './Components/MealLoging';

function App() {
  return (
    <>
      <SignupNavbar></SignupNavbar>
      <Signup></Signup>
      {/* <Login></Login>
      <Navbar />
      <MealLoging /> */}
      {/* <MealGenerator></MealGenerator>
      <UserProfile></UserProfile> */}
    </>
  );
}

export default App;