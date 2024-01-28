// src/components/Events.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Event {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  date: string;
}

interface EventsProps {
  events: Event[];
}

const Events: React.FC = () => {
  return (
    // <Layout>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Events</h2>
        <div className="mb-4">
          <Link to="/create-event" className="text-blue-500 hover:underline">
            Create Event
          </Link>
        </div>
        <div className="flex">
          <div className="w-1/2 pr-8">
            {/* Map View */}
            {/* ... (unchanged) */}
            <Link to="/map-view" className="text-blue-500 hover:underline">
            Map View
          </Link>
          </div>
          <div className="w-1/2">
            {/* List View */}
            {/* ... (unchanged) */}
            <Link to="/list-view" className="text-blue-500 hover:underline">
            List View
          </Link>
          </div>
        </div>
      </div>
    // </Layout>
  );
};

export default Events;
