
import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Shield, 
  CreditCard, 
  Settings,
  Smartphone,
  Mail,
  Calendar
} from "lucide-react";

interface UserProfileSettingsProps {
  settings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    bookingReminders: boolean;
    marketingEmails: boolean;
    twoFactorEnabled: boolean;
  };
  onSettingChange: (setting: string, value: boolean) => void;
  onManagePayment: () => void;
  onChangePassword: () => void;
  className?: string;
}

/**
 * User profile settings component with design system integration
 * Mobile-optimized settings interface with touch-friendly switches
 */
export function UserProfileSettings({
  settings,
  onSettingChange,
  onManagePayment,
  onChangePassword,
  className,
}: UserProfileSettingsProps) {
  const { getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();

  const settingsSections = [
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      items: [
        {
          key: "emailNotifications",
          label: "Email Notifications",
          description: "Receive booking updates via email",
          icon: <Mail className="h-4 w-4" />,
          value: settings.emailNotifications
        },
        {
          key: "smsNotifications", 
          label: "SMS Notifications",
          description: "Get text updates for urgent matters",
          icon: <Smartphone className="h-4 w-4" />,
          value: settings.smsNotifications
        },
        {
          key: "bookingReminders",
          label: "Booking Reminders", 
          description: "Reminders before scheduled cleanings",
          icon: <Calendar className="h-4 w-4" />,
          value: settings.bookingReminders
        },
        {
          key: "marketingEmails",
          label: "Marketing Emails",
          description: "Special offers and cleaning tips",
          icon: <Mail className="h-4 w-4" />,
          value: settings.marketingEmails
        }
      ]
    },
    {
      title: "Security",
      icon: <Shield className="h-5 w-5" />,
      items: [
        {
          key: "twoFactorEnabled",
          label: "Two-Factor Authentication",
          description: "Add extra security to your account",
          icon: <Shield className="h-4 w-4" />,
          value: settings.twoFactorEnabled,
          badge: settings.twoFactorEnabled ? "Enabled" : "Recommended"
        }
      ]
    }
  ];

  return (
    <div className={cn("form-spacing-relaxed", className)}>
      {settingsSections.map((section) => (
        <Card key={section.title} className="card-primary">
          <CardHeader className={getMobileSpacing('md')}>
            <CardTitle className="flex items-center gap-2 text-lg">
              {section.icon}
              {section.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className={cn("form-spacing-relaxed", getMobileSpacing('md'))}>
            {section.items.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between section-spacing-xs"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-muted-foreground mt-1">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge 
                          variant={item.value ? "default" : "outline"}
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                <Switch
                  checked={item.value}
                  onCheckedChange={(checked) => onSettingChange(item.key, checked)}
                  className="touch-comfortable"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      
      {/* Quick Actions */}
      <Card className="card-primary">
        <CardHeader className={getMobileSpacing('md')}>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5" />
            Account Actions
          </CardTitle>
        </CardHeader>
        
        <CardContent className={cn("form-spacing-normal", getMobileSpacing('md'))}>
          <Button
            onClick={onManagePayment}
            variant="outline"
            className={cn(
              "w-full justify-start",
              getMobileButtonSize('md')
            )}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Payment Methods
          </Button>
          
          <Button
            onClick={onChangePassword}
            variant="outline"
            className={cn(
              "w-full justify-start",
              getMobileButtonSize('md')
            )}
          >
            <Shield className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
