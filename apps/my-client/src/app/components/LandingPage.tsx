// src/components/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to EventHub
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover and create events in your area.
        </p>
        <div className="space-x-4">
          <Link
            to="/events"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Explore Events
          </Link>
          <Link
            to="/create-event"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Create Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
