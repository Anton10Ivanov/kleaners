
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export const SecuritySettings = () => {
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password change request submitted. Check your email for the next steps.");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password or enable two-factor authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <Button type="submit">Update Password</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Two-factor authentication</Label>
              <p className="text-sm text-muted-foreground">
                Receive a verification code via SMS when signing in
              </p>
            </div>
            <Switch id="2fa" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Setup Two-Factor Authentication
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
