
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useUserSettingsStore from '@/store/useUserSettingsStore';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';

/**
 * User preferences card that uses Zustand for state management
 */
export function UserPreferencesCard() {
  const {
    preferences,
    setDarkMode,
    setLanguage,
    setNotificationsEnabled,
    setEmailNotifications,
    setSmsNotifications,
    resetToDefaults
  } = useUserSettingsStore();
  
  // Sync darkMode preference with system theme
  useEffect(() => {
    // Only update document class if it doesn't match our preference
    const isDarkModeActive = document.documentElement.classList.contains('dark');
    if (preferences.darkMode && !isDarkModeActive) {
      document.documentElement.classList.add('dark');
    } else if (!preferences.darkMode && isDarkModeActive) {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>Manage your application preferences and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="flex flex-col">
              <span>Dark Mode</span>
              <span className="text-sm text-muted-foreground">Enable dark theme</span>
            </Label>
            <Switch
              id="dark-mode"
              checked={preferences.darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={preferences.language}
              onValueChange={setLanguage}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Settings</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col">
              <span>Enable Notifications</span>
              <span className="text-sm text-muted-foreground">Receive notifications from the app</span>
            </Label>
            <Switch
              id="notifications"
              checked={preferences.notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          
          {preferences.notificationsEnabled && (
            <div className="space-y-3 pl-2 border-l-2 border-muted ml-2 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch
                  id="sms-notifications"
                  checked={preferences.smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            className="flex items-center gap-1"
          >
            <Undo2 className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
