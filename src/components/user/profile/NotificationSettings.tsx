
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export const NotificationSettings = () => {
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved successfully");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Email Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-booking">Booking confirmations</Label>
              <p className="text-sm text-muted-foreground">
                Receive an email when your booking is confirmed
              </p>
            </div>
            <Switch id="email-booking" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-reminder">Booking reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders 24 hours before your scheduled service
              </p>
            </div>
            <Switch id="email-reminder" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-marketing">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive promotions and updates about our services
              </p>
            </div>
            <Switch id="email-marketing" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">SMS Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-reminder">Service reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive a text message reminder before your service
              </p>
            </div>
            <Switch id="sms-reminder" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-updates">Service updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your service provider
              </p>
            </div>
            <Switch id="sms-updates" defaultChecked />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
      </CardFooter>
    </Card>
  );
};
