
import { useState, useEffect, useRef } from "react";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useClickAway } from '@/hooks/useClickAway';
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);
  
  useClickAway(notificationRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    onClose();
  };

  return (
    <div ref={notificationRef} className="absolute top-16 right-2 md:right-4 z-50 w-[95vw] max-w-md">
      <Card className="p-4 shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs h-8"
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <Separator className="my-2" />
        
        <ScrollArea className="h-[60vh] max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="mb-2 h-8 w-8 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    notification.read ? "bg-card" : "bg-muted/50"
                  } hover:bg-muted`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm flex items-center">
                      {notification.title}
                      {!notification.read && (
                        <Badge variant="default" className="ml-2 h-1.5 w-1.5 rounded-full p-0" />
                      )}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};

export const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>
      {isOpen && <NotificationCenter isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

// For NavigationMenu to correctly import
export default NotificationButton;
