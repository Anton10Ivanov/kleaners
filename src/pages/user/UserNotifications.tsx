
import React, { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useNotifications } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserNotifications() {
  useTitle('Notifications | Kleaners');
  const [tab, setTab] = useState('all');
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

  // Filter notifications based on selected tab
  const filteredNotifications = notifications.filter(notification => {
    if (tab === 'all') return true;
    if (tab === 'unread') return !notification.read;
    return notification.type === tab;
  });

  // Get counts for badge displays
  const unreadCount = notifications.filter(n => !n.read).length;
  const bookingCount = notifications.filter(n => n.type === 'booking').length;
  const providerCount = notifications.filter(n => n.type === 'provider').length;
  const systemCount = notifications.filter(n => n.type === 'system').length;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            className="mt-4 md:mt-0"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="all" className="relative">
            All
            {notifications.length > 0 && (
              <Badge className="ml-2 bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="unread" className="relative">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-primary text-white">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="booking" className="relative">
            Bookings
            {bookingCount > 0 && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {bookingCount}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="provider" className="relative">
            Providers
            {providerCount > 0 && (
              <Badge className="ml-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                {providerCount}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="system" className="relative">
            System
            {systemCount > 0 && (
              <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                {systemCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={tab} className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-slate-500">Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {tab === 'all'
                  ? "You don't have any notifications."
                  : tab === 'unread'
                  ? "You don't have any unread notifications."
                  : `You don't have any ${tab} notifications.`}
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map(notification => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

const NotificationItem = ({ 
  notification, 
  onMarkAsRead 
}: { 
  notification: import('@/hooks/useNotifications').Notification;
  onMarkAsRead: (id: string) => void;
}) => {
  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'payment':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'system':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'provider':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Link to={notification.link || '#'}>
      <Card className={`p-4 hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{notification.title}</h3>
              <Badge variant="outline" className={`ml-2 ${getTypeColor(notification.type)}`}>
                {notification.type}
              </Badge>
            </div>
            
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {notification.message}
            </p>
            
            <div className="mt-4 text-xs text-slate-500">
              {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
            </div>
          </div>
          
          <div className="ml-4 flex items-center space-x-2">
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-slate-400 hover:text-primary"
                onClick={handleMarkAsRead}
                title="Mark as read"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-400 hover:text-destructive"
              title="Delete notification"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
