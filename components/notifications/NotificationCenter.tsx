
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Check, Trash2 } from "lucide-react";
import { useNotifications, Notification } from '@/hooks/useNotifications';

export interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showAll, setShowAll] = useState(true);

  // Close notification center when pressing escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const filteredNotifications = showAll ? notifications : notifications.filter(n => !n.read);

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end" onClick={onClose}>
      <Card 
        className="h-full w-full sm:w-96 rounded-none animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center justify-between form-spacing-none pb-2">
          <div className="component-spacing-xs">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have {unreadCount} unread notifications</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            <Bell className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={showAll ? "text-primary" : ""}
              onClick={() => setShowAll(true)}
            >
              All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={!showAll ? "text-primary" : ""}
              onClick={() => setShowAll(false)}
            >
              Unread
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            {filteredNotifications.length > 0 ? (
              <div className="form-spacing-relaxed">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`card-spacing-xs rounded-lg border ${
                      !notification.read ? 'bg-muted/50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                      {notification.link && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto card-spacing-none text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = notification.link!;
                            onClose();
                          }}
                        >
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-muted-foreground">No notifications</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
