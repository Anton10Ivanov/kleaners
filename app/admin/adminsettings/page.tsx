'use client'


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card";
import { Button } from '@/components/ui/button";
import { Switch } from '@/components/ui/switch";
import { Label } from '@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs";
import { Input } from '@/components/ui/input";
import { Textarea } from '@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select";

export const AdminSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [defaultServiceDuration, setDefaultServiceDuration] = useState("2");
  
  const handleSaveNotifications = () => {
    // Here you would save to the database, but for now we'll just show a toast
    toast.success("Notification settings saved successfully");
  };
  
  const handleSaveAppearance = () => {
    toast.success("Appearance settings saved successfully");
  };
  
  const handleSaveBooking = () => {
    toast.success("Booking settings saved successfully");
  };

  return (
    <div className="container mx-auto section-spacing-xs px-2 md:section-spacing-md md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg card-spacing-sm md:card-spacing-md">
        <h1 className="text-2xl font-bold mb-6">System Settings</h1>
        
        <Tabs defaultValue="notifications" className="form-spacing-loose">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-lg mb-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing-loose">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex flex-col component-spacing-xs">
                    <span>Email Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email notifications for new bookings
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="flex flex-col component-spacing-xs">
                    <span>SMS Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive SMS notifications for urgent matters
                    </span>
                  </Label>
                  <Switch id="sms-notifications" />
                </div>
                
                <Button onClick={handleSaveNotifications} className="w-full sm:w-auto">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing-loose">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex flex-col component-spacing-xs">
                    <span>Dark Mode</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Toggle dark mode for the admin interface
                    </span>
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-view" className="flex flex-col component-spacing-xs">
                    <span>Compact View</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Show more information in less space
                    </span>
                  </Label>
                  <Switch id="compact-view" />
                </div>
                
                <Button onClick={handleSaveAppearance} className="w-full sm:w-auto">
                  Save Appearance Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="booking">
            <Card>
              <CardHeader>
                <CardTitle>Booking Settings</CardTitle>
                <CardDescription>
                  Configure default settings for new bookings
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing-loose">
                <div className="grid gap-3">
                  <Label htmlFor="default-duration">Default Service Duration (hours)</Label>
                  <Input
                    id="default-duration"
                    type="number"
                    min="1"
                    max="8"
                    value={defaultServiceDuration}
                    onChange={(e) => setDefaultServiceDuration(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="buffer-time">Buffer Time Between Bookings (minutes)</Label>
                  <Input
                    id="buffer-time"
                    type="number"
                    min="0"
                    max="60"
                    step="15"
                    defaultValue="30"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="service-type">Default Service Type</Label>
                  <Select defaultValue="regular">
                    <SelectTrigger id="service-type">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Cleaning</SelectItem>
                      <SelectItem value="deep">Deep Cleaning</SelectItem>
                      <SelectItem value="moveInOut">Move In/Out Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                  <Textarea
                    id="cancellation-policy"
                    defaultValue="Cancellations must be made at least 24 hours before the scheduled service. Late cancellations may incur a fee of 50% of the service cost."
                  />
                </div>
                
                <Button onClick={handleSaveBooking} className="w-full sm:w-auto">
                  Save Booking Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
