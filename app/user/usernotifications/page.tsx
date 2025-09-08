'use client'


import React, { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useTitle } from '@/hooks/useTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export default function UserNotifications() {
  useTitle('Notifications | Kleaners');
  const navigate = useRouter();
  const { notifications, loading, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-blue-500" />
        </div>;
      case 'payment':
        return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-green-500" />
        </div>;
      case 'provider':
        return <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-purple-500" />
        </div>;
      default:
        return <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-gray-500" />
        </div>;
    }
  };

  const handleClearAll = () => {
    toast.success('All notifications marked as read');
    markAllAsRead();
  };

  if (loading) {
    return (
      <div className="container mx-auto section-spacing-sm">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Loading your notifications...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="form-spacing-relaxed">
              {[1, 2, 3].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="card-spacing-sm">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto section-spacing-sm">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {unreadCount ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Unread
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="booking">Bookings</TabsTrigger>
              <TabsTrigger value="provider">Providers</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredNotifications.length === 0 ? (
                <div className="text-center section-spacing-md">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'all' 
                      ? "You don't have any notifications yet" 
                      : `You don't have any ${activeTab === 'unread' ? 'unread' : activeTab} notifications`}
                  </p>
                </div>
              ) : (
                <div className="component-spacing-xs">
                  {filteredNotifications.map((notification) => (
                    <div key={notification.id}>
                      <div 
                        className={`flex items-start card-spacing-xs hover:bg-muted/50 cursor-pointer rounded-lg transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex-shrink-0 mr-4">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium mb-1 ${!notification.read ? 'text-primary' : ''}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 ml-2">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
