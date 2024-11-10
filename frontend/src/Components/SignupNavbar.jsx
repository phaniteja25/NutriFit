import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png"

const SignupNavbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo and Brand Name */}
      <div className="text-xl font-semibold text-blue-600">
        <Link to="/">
        <img src={logo} alt="" srcset="" className="w-48"  />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline">Login</Link>
        <Link to="/Signup" className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline">SignUp</Link>
        <Link to="/about" className="text-gray-700 hover:text-white hover:bg-blue-600 hover:rounded-full px-3 py-1 transition-all duration-300 no-underline">About Us</Link>
      </div>
    </nav>
  );
};

export default SignupNavbar;
