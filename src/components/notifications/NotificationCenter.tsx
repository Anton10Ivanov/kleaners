
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { Bell, X, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-blue-500" />
        </div>;
      case 'payment':
        return <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-green-500" />
        </div>;
      case 'provider':
        return <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-purple-500" />
        </div>;
      default:
        return <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-gray-500" />
        </div>;
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="absolute right-0 top-full mt-2 w-80 md:w-96 max-h-[70vh] overflow-auto shadow-lg z-50">
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Notifications</CardTitle>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => markAllAsRead()}
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {notifications.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground text-sm">No notifications</p>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-auto">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id}>
                <div 
                  className={`flex items-start p-3 hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex-shrink-0 mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium mb-0.5 ${!notification.read ? 'text-primary' : ''}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-0.5">
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

            {notifications.length > 5 && (
              <div className="p-2 text-center">
                <Button 
                  variant="link" 
                  className="text-xs"
                  onClick={() => {
                    navigate('/user/notifications');
                    onClose();
                  }}
                >
                  See all notifications
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
