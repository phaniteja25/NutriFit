import React from "react";
import { Link } from "react-router-dom";
import profilepic from './user.png';


const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <h1>NutriNova</h1>
      </div>
      <div className = "navbar-contents">
      <div className = "profile-logo"><Link to = "/userprofile"><img src ={profilepic} alt = "profile" className="logo"/></Link></div>
      <div className="navbar-links">
        <a href="/dashboard">Home</a>
        <a href="/mealloging">Add Meal</a>
        <a href="/mealgenerator">Generate Plan</a>
        <a href="/aboutus">About Us</a>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
