// src/components/UserDashboard.tsx
import React from 'react';
import Layout from './Layout';

interface UserDashboardProps {
  // Add any additional props you may need
}

const UserDashboard: React.FC<UserDashboardProps> = (props) => {
  // Replace the dummy data with your actual user data
  const userData = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    upcomingEvents: [
      { id: 1, name: 'Event 1', date: '2024-03-15' },
      { id: 2, name: 'Event 2', date: '2024-03-20' },
    ],
  };

  return (
    // <Layout>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
        <div className="flex">
          <div className="w-1/4 pr-8">
            {/* Navigation Menu */}
            <nav className="mb-8">
              <ul className="space-y-2">
                <li>
                  <a href="#profile" className="text-blue-500 hover:underline">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="events" className="text-blue-500 hover:underline">
                    Events
                  </a>
                </li>
                {/* Add more navigation items as needed */}
              </ul>
            </nav>
          </div>
          <div className="w-3/4">
            {/* User Profile */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">User Profile</h3>
              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
            </div>

            {/* Upcoming Events */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
              {userData.upcomingEvents.length === 0 ? (
                <p>No upcoming events.</p>
              ) : (
                <ul className="list-disc pl-6">
                  {userData.upcomingEvents.map((event) => (
                    <li key={event.id}>
                      <strong>{event.name}</strong> - {event.date}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    // {/* </Layout> */}
  );
};

export default UserDashboard;
