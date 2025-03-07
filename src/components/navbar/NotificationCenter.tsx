
import { useState, useEffect, useRef } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useClickAway } from '@/hooks/useClickAway';

export interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your booking has been confirmed!', read: false, time: '2 hours ago' },
    { id: 2, text: 'Provider John Smith will arrive tomorrow at 9 AM', read: false, time: '1 day ago' },
    { id: 3, text: 'Special discount: 20% off your next booking!', read: true, time: '3 days ago' },
  ]);

  // Create a ref for the click away functionality
  const ref = useRef<HTMLDivElement>(null);
  
  // Use the useClickAway hook correctly with the ref and callback
  useClickAway(ref, () => {
    if (isOpen) onClose();
  });

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Dismiss notification
  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Mark a single notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute top-16 right-0 md:right-4 z-50 w-full max-w-sm shadow-lg rounded-lg border bg-white dark:bg-gray-800 p-1"
    >
      <div className="flex items-center justify-between border-b p-3">
        <h3 className="font-medium">Notifications</h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="max-h-[calc(100vh-15rem)] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className={`mb-2 shadow-none ${notification.read ? 'bg-white dark:bg-gray-800' : 'bg-primary/5 dark:bg-primary/10'}`}>
              <CardContent className="p-3 relative">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className={`${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                      {notification.text}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
