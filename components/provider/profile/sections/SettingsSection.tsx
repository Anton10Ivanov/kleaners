
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, LogOut, Bell, Shield, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const SettingsSection: React.FC = () => {
  const navigate = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="form-spacing-relaxed pt-2">
        <div className="form-spacing-relaxed">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary/70" />
              <Label htmlFor="notifications" className="text-sm">Email Notifications</Label>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-primary/70" />
              <Label htmlFor="darkMode" className="text-sm">Dark Mode</Label>
            </div>
            <Switch id="darkMode" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary/70" />
              <Label htmlFor="privacy" className="text-sm">Profile Privacy</Label>
            </div>
            <Switch id="privacy" />
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <Button
          variant="destructive"
          size="sm"
          className="w-full flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
};
