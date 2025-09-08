
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getMockNotifications, markNotificationAsRead, MockNotification } from '@/utils/mock/mockDataService';

interface NotificationsContextType {
  notifications: MockNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  deleteNotification: () => {}
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<MockNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Load notifications initially
  useEffect(() => {
    const fetchNotifications = () => {
      const notifs = getMockNotifications();
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    };
    
    fetchNotifications();
    
    // Poll for new notifications every 15 seconds for demo purposes
    const interval = setInterval(fetchNotifications, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Show toast for new notifications
  useEffect(() => {
    const storedIds = localStorage.getItem('notification-seen-ids') || '[]';
    const seenIds = JSON.parse(storedIds) as string[];
    
    const newNotifications = notifications.filter(n => !n.read && !seenIds.includes(n.id));
    
    if (newNotifications.length > 0) {
      // Show only the latest notification
      const latest = newNotifications[0];
      toast.info(latest.title, {
        description: latest.message,
        duration: 4000,
      });
      
      // Mark notification as seen (not read, just seen in toast)
      const updatedSeenIds = [...seenIds, ...newNotifications.map(n => n.id)];
      localStorage.setItem('notification-seen-ids', JSON.stringify(updatedSeenIds));
    }
  }, [notifications]);
  
  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  
  const handleMarkAllAsRead = () => {
    // In a real app, this would call an API
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
    
    // Update in local storage
    const notifs = getMockNotifications();
    const updatedNotifs = notifs.map(n => ({ ...n, read: true }));
    localStorage.setItem('mock-notifications', JSON.stringify(updatedNotifs));
  };
  
  const handleDeleteNotification = (id: string) => {
    // In a real app, this would call an API
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    
    // Update unread count if needed
    if (notifications.find(n => n.id === id && !n.read)) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    
    // Update in local storage
    localStorage.setItem('mock-notifications', JSON.stringify(updated));
  };
  
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead: handleMarkAsRead,
        markAllAsRead: handleMarkAllAsRead,
        deleteNotification: handleDeleteNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
