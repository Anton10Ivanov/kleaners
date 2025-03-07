
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmNewPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"]
});

type PasswordForm = z.infer<typeof passwordSchema>;

const UserSettings = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [bookingReminders, setBookingReminders] = useState(true);

  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    }
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUserProfile();
  }, []);

  const updatePassword = async (newPassword: string): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success("Password updated successfully");
      form.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PasswordForm) => {
    await updatePassword(data.newPassword);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Management Card */}
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Password Management</h3>
          <Separator className="mb-4" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter current password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Form>
        </Card>
        
        {/* Notification Settings Card */}
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via text message</p>
              </div>
              <Switch 
                checked={smsNotifications} 
                onCheckedChange={setSmsNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Booking Reminders</p>
                <p className="text-sm text-gray-500">Get reminded about upcoming bookings</p>
              </div>
              <Switch 
                checked={bookingReminders} 
                onCheckedChange={setBookingReminders} 
              />
            </div>
            
            <Button className="w-full mt-4">Save Preferences</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;
