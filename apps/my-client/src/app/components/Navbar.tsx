// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">R.T.E</div>
          <div className="space-x-4">
            <a
              href="#features"
              className="bg-white text-gray-800 px-4 py-2 rounded-full"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="bg-white text-gray-800 px-4 py-2 rounded-full"
            >
              How It Works
            </a>
            <a
              href="signup"
              className="bg-white text-gray-800 px-4 py-2 rounded-full"
            >
              Sign Up
            </a>
            <a
              href="login"
              className="bg-white text-gray-800 px-4 py-2 rounded-full"
            >
              Log In
            </a>
            <a href="userdashboard">User</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
