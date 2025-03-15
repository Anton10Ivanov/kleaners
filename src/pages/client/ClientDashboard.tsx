
import React from "react";
import { useUserProfileData } from "@/hooks/useUserProfileData";
import { NotificationsList } from "@/components/user/profile/notifications/NotificationsList";
import { useNotifications } from "@/hooks/useNotifications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

/**
 * ClientDashboard component 
 * 
 * This component represents the client dashboard page
 */
const ClientDashboard = () => {
  const { profile } = useUserProfileData();
  const {
    notifications,
    loading: notificationsLoading,
    markAsRead,
    markAllAsRead,
    unreadCount
  } = useNotifications();

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleClearAll = () => {
    toast.success('All notifications marked as read');
    markAllAsRead();
  };

  return (
    <div className="container mx-auto py-6 px-4 mt-4">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Bookings</CardTitle>
            <CardDescription>View your recent booking activity</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">Check your recent bookings and their status</p>
            <button 
              onClick={() => window.location.href = '/client/bookings'}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm"
            >
              Go to Bookings
            </button>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Messages</CardTitle>
            <CardDescription>Check your recent messages</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">Stay in touch with your service providers</p>
            <button 
              onClick={() => window.location.href = '/client/messages'}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm"
            >
              View Messages
            </button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-medium">Recent Notifications</CardTitle>
                <CardDescription>Stay updated with your latest activities</CardDescription>
              </div>
              {unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <NotificationsList
              notifications={notifications}
              loading={notificationsLoading}
              unreadCount={unreadCount}
              onMarkAllAsRead={handleClearAll}
              onNotificationClick={handleNotificationClick}
            />
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Account Settings</CardTitle>
            <CardDescription>Update your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">Manage your account information and settings</p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => window.location.href = '/client/profile'}
                className="px-4 py-2 bg-primary text-white rounded-md text-sm"
              >
                Go to Profile
              </button>
              <button 
                onClick={() => window.location.href = '/client/settings'}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md text-sm"
              >
                Manage Settings
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
