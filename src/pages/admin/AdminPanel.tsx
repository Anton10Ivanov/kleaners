
import React, { useEffect } from 'react';
import AdminTabs from '@/components/admin/AdminTabs';
import { useNotifications } from '@/hooks/useNotifications';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminPanel = () => {
  const { notifications, loading, unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which tab to display by default
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'questions';
  
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
                        // Update URL with tab parameter
                        const url = new URL(window.location.href);
                        url.searchParams.set('tab', 'questions');
                        window.history.pushState({}, '', url);
                        
                        // This will ensure the questions tab is active
                        const tabsElement = document.getElementById('questions-tab');
                        if (tabsElement) tabsElement.click();
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
      <AdminTabs defaultTab={defaultTab} />
    </div>
  );
};

export default AdminPanel;
