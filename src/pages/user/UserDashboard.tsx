
import React from "react";

/**
 * UserDashboard component 
 * 
 * This component represents the user dashboard page
 */
const UserDashboard = () => {
  return (
    <div className="container mx-auto py-6 px-4 mt-8">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Recent Bookings</h2>
          <p className="text-muted-foreground">View your recent booking activity</p>
          <button 
            onClick={() => window.location.href = '/user/bookings'}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            Go to Bookings
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Messages</h2>
          <p className="text-muted-foreground">Check your recent messages</p>
          <button 
            onClick={() => window.location.href = '/user/messages'}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            View Messages
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>
          <p className="text-muted-foreground">Update your profile and preferences</p>
          <button 
            onClick={() => window.location.href = '/user/profile'}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            Go to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
