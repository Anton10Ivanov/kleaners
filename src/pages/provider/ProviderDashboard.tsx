
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, UserRole } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calendar, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const ProviderDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingApproval, setPendingApproval] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/auth/login');
          return;
        }
        
        setUser(user);
        
        // Fetch provider profile
        const { data: providerData, error: providerError } = await supabase
          .from('service_providers')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (providerError && providerError.code !== 'PGRST116') {
          console.error('Error fetching provider data:', providerError);
        }
        
        if (providerData) {
          setProfile(providerData);
          setPendingApproval(providerData.status === 'pending_approval');
        } else {
          // If no provider record exists, redirect to client dashboard
          navigate('/user/dashboard');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 mt-16">
        <Skeleton className="h-12 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (pendingApproval) {
    return (
      <div className="container mx-auto py-6 px-4 mt-16">
        <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>
        
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Account Pending Approval</AlertTitle>
          <AlertDescription>
            Your provider account is currently under review. We'll notify you once your account has been approved.
          </AlertDescription>
        </Alert>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Application Submitted</h3>
                <p className="text-sm text-muted-foreground">Your application has been received.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Account Review</h3>
                <p className="text-sm text-muted-foreground">Our team is reviewing your application and credentials.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 opacity-50">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Verification Process</h3>
                <p className="text-sm text-muted-foreground">Background checks and reference verification.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 opacity-50">
              <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Account Activation</h3>
                <p className="text-sm text-muted-foreground">Once approved, you'll gain access to job listings and scheduling.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={() => navigate('/')}>Return to Homepage</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>
      
      <Tabs defaultValue="jobs" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-6">
                  No jobs available at the moment. Check back later!
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                My Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-6">
                No scheduled jobs. Jobs you accept will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Earnings Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-6">
                No earnings data yet. Your payment history will appear here after completed jobs.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderDashboard;
