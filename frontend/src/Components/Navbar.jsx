import React from "react";


const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <h1>NutriFit</h1>
      </div>
      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Add Meal</a>
        <a href="#">Generate Plan</a>
        <a href="#">About Us</a>
      </div>
    </div>
  );
};

export default Navbar;
