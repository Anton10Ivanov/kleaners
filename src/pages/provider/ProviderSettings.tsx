
import { useState, useEffect } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';
import { useLocation } from 'react-router-dom';

const ProviderSettings = () => {
  useTitle('Provider Settings');
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('notifications');

  // Parse tab from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    
    if (tabParam && ['notifications', 'payment', 'account'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Provider Settings</h1>
        <p className="text-muted-foreground">Manage your provider account preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment Info</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <PaymentSettings />
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const notificationSchema = z.object({
  newAssignments: z.boolean().default(true),
  bookingChanges: z.boolean().default(true),
  reviewNotifications: z.boolean().default(true),
  paymentNotifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
});

const NotificationSettings = () => {
  const form = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      newAssignments: true,
      bookingChanges: true,
      reviewNotifications: true,
      paymentNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    },
  });

  const onSubmit = (data: z.infer<typeof notificationSchema>) => {
    toast.success("Notification preferences updated");
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Configure how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Types</h3>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="newAssignments"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>New Job Assignments</FormLabel>
                        <FormDescription>Get notified when you're assigned to a new booking</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bookingChanges"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Booking Changes</FormLabel>
                        <FormDescription>Get notified when a booking is updated or cancelled</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviewNotifications"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Reviews and Ratings</FormLabel>
                        <FormDescription>Get notified when you receive a review</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentNotifications"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Payment Updates</FormLabel>
                        <FormDescription>Get notified about payment status changes</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Communication Channels</h3>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Email Notifications</FormLabel>
                        <FormDescription>Receive notifications via email</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>SMS Notifications</FormLabel>
                        <FormDescription>Receive notifications via SMS</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <div>
                        <FormLabel>Push Notifications</FormLabel>
                        <FormDescription>Receive push notifications</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Save Notification Preferences</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const paymentSchema = z.object({
  paymentMethod: z.enum(['bank_transfer', 'paypal']),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  iban: z.string().optional(),
  swift: z.string().optional(),
  paypalEmail: z.string().email().optional(),
});

const PaymentSettings = () => {
  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'bank_transfer' as const,
      bankName: '',
      accountName: '',
      iban: '',
      swift: '',
      paypalEmail: '',
    },
  });

  const watchPaymentMethod = form.watch('paymentMethod');

  const onSubmit = (data: z.infer<typeof paymentSchema>) => {
    toast.success("Payment settings updated");
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>Set up how you want to receive payments for your services</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bank_transfer" />
                        </FormControl>
                        <FormLabel className="font-normal">Bank Transfer</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="paypal" />
                        </FormControl>
                        <FormLabel className="font-normal">PayPal</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchPaymentMethod === 'bank_transfer' && (
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="iban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IBAN</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="swift"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SWIFT/BIC</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {watchPaymentMethod === 'paypal' && (
              <FormField
                control={form.control}
                name="paypalEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PayPal Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit">Save Payment Information</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const AccountSettings = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>View and update your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Account Type</h4>
              <p className="text-base">Service Provider</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Account Status</h4>
              <p className="text-base">Active</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Member Since</h4>
              <p className="text-base">April 2023</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Last Login</h4>
              <p className="text-base">Today at 9:41 AM</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Edit Account Details</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>
      
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            Deactivating your account will temporarily suspend your provider profile.
            You won't receive new bookings, but can still access your account.
          </p>
          <Button variant="outline" className="border-destructive text-destructive">
            Deactivate Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderSettings;
