
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Bell, Shield, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  user: User;
}

const UserSettings = () => {
  const { user } = useOutletContext<UserContextType>();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match."
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long."
      });
      return;
    }
    
    try {
      setPasswordLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully."
      });
      
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update password."
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // This is a simplified version - in a real app, you'd want to:
      // 1. Delete the user's data from your database
      // 2. Then delete the auth account
      // Here we'll just sign the user out
      
      await supabase.auth.signOut();
      
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully."
      });
      
      navigate("/");
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account."
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

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
              onCheckedChange={setEmailNotifications}
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
              onCheckedChange={setSmsNotifications}
              aria-label="Toggle SMS notifications"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Password</CardTitle>
          </div>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent>
          {isChangingPassword ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                <Input 
                  id="new-password"
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                <Input 
                  id="confirm-password"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={passwordLoading}
                >
                  {passwordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : "Update Password"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button onClick={() => setIsChangingPassword(true)}>
              Change Password
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Privacy & Security</CardTitle>
          </div>
          <CardDescription>Manage your data and account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium">Data Privacy</h4>
            <p className="text-sm text-muted-foreground">
              We collect and process your data as described in our{" "}
              <a href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-medium">Terms of Service</h4>
            <p className="text-sm text-muted-foreground">
              By using our service, you agree to our{" "}
              <a href="/legal/terms" className="text-primary hover:underline">Terms of Service</a>.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-red-500" />
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Actions here can't be undone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Deleting your account will remove all of your information from our database. This cannot be undone.
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
