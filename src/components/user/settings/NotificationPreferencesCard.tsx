
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";
import { Label } from "@/components/ui/label";

/**
 * NotificationPreferencesProps interface
 */
interface NotificationPreferencesProps {
  /**
   * Default state for email notifications
   * @default true
   */
  defaultEmailNotifications?: boolean;
  
  /**
   * Default state for SMS notifications
   * @default false
   */
  defaultSmsNotifications?: boolean;
  
  /**
   * Callback function triggered when notification preferences change
   * @param {string} type - The notification type ('email' or 'sms')
   * @param {boolean} value - The new state value
   */
  onNotificationChange?: (type: 'email' | 'sms', value: boolean) => void;
}

/**
 * NotificationPreferencesCard Component
 * 
 * Allows users to manage their notification preferences for email and SMS communications.
 * 
 * @param {NotificationPreferencesProps} props - Component props
 * @returns {JSX.Element} A card component with notification toggle switches
 */
export const NotificationPreferencesCard = ({
  defaultEmailNotifications = true,
  defaultSmsNotifications = false,
  onNotificationChange
}: NotificationPreferencesProps): JSX.Element => {
  const [emailNotifications, setEmailNotifications] = useState(defaultEmailNotifications);
  const [smsNotifications, setSmsNotifications] = useState(defaultSmsNotifications);

  // Reset state if props change
  useEffect(() => {
    setEmailNotifications(defaultEmailNotifications);
    setSmsNotifications(defaultSmsNotifications);
  }, [defaultEmailNotifications, defaultSmsNotifications]);

  /**
   * Handles changes to email notification preference
   * @param {boolean} checked - The new state value
   */
  const handleEmailChange = (checked: boolean) => {
    setEmailNotifications(checked);
    if (onNotificationChange) {
      onNotificationChange('email', checked);
    }
  };

  /**
   * Handles changes to SMS notification preference
   * @param {boolean} checked - The new state value
   */
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
          <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
          <CardTitle>Notification Preferences</CardTitle>
        </div>
        <CardDescription>Manage how we contact you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
          </div>
          <Switch 
            id="email-notifications"
            checked={emailNotifications} 
            onCheckedChange={handleEmailChange}
            aria-label="Toggle email notifications"
            aria-describedby="email-notifications-description"
          />
          <span id="email-notifications-description" className="sr-only">
            {emailNotifications ? "Email notifications are enabled" : "Email notifications are disabled"}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
          </div>
          <Switch 
            id="sms-notifications"
            checked={smsNotifications} 
            onCheckedChange={handleSmsChange}
            aria-label="Toggle SMS notifications"
            aria-describedby="sms-notifications-description"
          />
          <span id="sms-notifications-description" className="sr-only">
            {smsNotifications ? "SMS notifications are enabled" : "SMS notifications are disabled"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
