
import React from "react";
import { useUserProfileData } from "@/hooks/useUserProfileData";
import { useNotifications } from "@/hooks/useNotifications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { NotificationsList } from "@/components/user/profile/notifications/NotificationsList";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * ClientDashboard component 
 * 
 * This component represents the client dashboard page optimized for service booking companies
 */
const ClientDashboard = () => {
  const { profile } = useUserProfileData();
  const isMobile = useIsMobile();
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

  // Extract the first name from the fullName if available
  const firstName = profile?.fullName ? profile.fullName.split(' ')[0] : '';

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Welcome{firstName ? `, ${firstName}` : ''}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Book Now</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">Schedule your next cleaning service</p>
            <button 
              onClick={() => window.location.href = '/booking'}
              className="w-full px-4 py-2 bg-primary text-white rounded-md text-sm"
            >
              Book a Service
            </button>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Clock className="h-5 w-5 text-indigo-500" />
              <span>Upcoming Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">View your upcoming scheduled services</p>
            <button 
              onClick={() => window.location.href = '/client/bookings'}
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md text-sm"
            >
              View Schedule
            </button>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Star className="h-5 w-5 text-amber-500" />
              <span>Rate Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">Rate and review your completed services</p>
            <button 
              onClick={() => window.location.href = '/client/bookings?filter=completed'}
              className="w-full px-4 py-2 bg-amber-500 text-white rounded-md text-sm"
            >
              Leave Feedback
            </button>
          </CardContent>
        </Card>
      </div>
      
      {isMobile ? (
        <Card className="bg-white dark:bg-gray-800 shadow mb-6">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center justify-between text-lg font-medium">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <NotificationsList
              notifications={notifications.slice(0, 3)} // Show fewer notifications on mobile
              loading={notificationsLoading}
              unreadCount={unreadCount}
              onMarkAllAsRead={handleClearAll}
              onNotificationClick={handleNotificationClick}
              simplified={true}
            />
            {notifications.length > 3 && (
              <button 
                onClick={() => window.location.href = '/client/notifications'}
                className="w-full mt-2 text-sm text-primary"
              >
                View all notifications
              </button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white dark:bg-gray-800 shadow mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Notifications</CardTitle>
              {unreadCount > 0 && (
                <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <NotificationsList
              notifications={notifications}
              loading={notificationsLoading}
              unreadCount={unreadCount}
              onMarkAllAsRead={handleClearAll}
              onNotificationClick={handleNotificationClick}
              simplified={false}
            />
          </CardContent>
        </Card>
      )}
      
      <Card className="bg-white dark:bg-gray-800 shadow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <MapPin className="h-5 w-5 text-green-500" />
            <span>Service Areas</span>
          </CardTitle>
          <CardDescription>Our most popular service locations</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart'].map(city => (
              <div key={city} className="bg-muted p-2 rounded text-center text-sm">
                {city}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
