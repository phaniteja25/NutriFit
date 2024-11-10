import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profilepic from './user.png';
import logo from "./logo.png"

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="">
        <img src={logo} alt="" srcset="" className="w-48"  />
        </Link>

      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline">Home</Link>
        <Link to="/mealloging" className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline">Add Meal</Link>
        <Link to="/mealgenerator" className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline">Generate Plan</Link>
        <Link to="/aboutus" className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline">About Us</Link>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline"
        >
          Logout
        </button>
        <Link to="/userprofile">
          <img src={profilepic} alt="profile" className="w-8 h-8 rounded-full" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
