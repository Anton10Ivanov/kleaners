
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

interface NotificationPreferencesProps {
  defaultEmailNotifications?: boolean;
  defaultSmsNotifications?: boolean;
  onNotificationChange?: (type: 'email' | 'sms', value: boolean) => void;
}

export const NotificationPreferencesCard = ({
  defaultEmailNotifications = true,
  defaultSmsNotifications = false,
  onNotificationChange
}: NotificationPreferencesProps) => {
  const [emailNotifications, setEmailNotifications] = useState(defaultEmailNotifications);
  const [smsNotifications, setSmsNotifications] = useState(defaultSmsNotifications);

  const handleEmailChange = (checked: boolean) => {
    setEmailNotifications(checked);
    if (onNotificationChange) {
      onNotificationChange('email', checked);
    }
  };

  const handleSmsChange = (checked: boolean) => {
    setSmsNotifications(checked);
    if (onNotificationChange) {
      onNotificationChange('sms', checked);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle>Notification Preferences</CardTitle>
        </div>
        <CardDescription>Manage how we contact you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
          </div>
          <Switch 
            checked={emailNotifications} 
            onCheckedChange={handleEmailChange}
            aria-label="Toggle email notifications"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium">SMS Notifications</h4>
            <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
          </div>
          <Switch 
            checked={smsNotifications} 
            onCheckedChange={handleSmsChange}
            aria-label="Toggle SMS notifications"
          />
        </div>
      </CardContent>
    </Card>
  );
};
