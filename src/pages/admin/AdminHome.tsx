
import React, { useEffect } from 'react';
import AdminTabs from '@/components/admin/AdminTabs';
import { useNotifications } from '@/hooks/useNotifications';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminHome = () => {
  const { notifications, loading, unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Filter for question notifications only
  const questionNotifications = notifications.filter(n => n.type === 'system' && n.title.includes('Question'));
  
  return (
    <div className="p-4">
      {questionNotifications.length > 0 && (
        <div className="mb-4">
          <Alert className="border-primary/20 bg-primary/5">
            <Bell className="h-5 w-5 text-primary" />
            <AlertTitle className="flex items-center gap-2">
              New Customer Questions
              {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
            </AlertTitle>
            <AlertDescription className="mt-2">
              <div className="space-y-2">
                {questionNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between rounded-md border p-2">
                    <span>{notification.message}</span>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        navigate('/admin/support-queries');
                      }}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
          <p>Welcome to the admin dashboard. Use the navigation menu to access different sections.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p>Recent system activity will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
