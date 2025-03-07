
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, UserCircle } from 'lucide-react';

const serviceTypes = [
  { id: 'regular', label: 'Regular Cleaning' },
  { id: 'deep', label: 'Deep Cleaning' },
  { id: 'moveInOut', label: 'Move In/Out' },
  { id: 'business', label: 'Business Cleaning' },
  { id: 'postConstruction', label: 'Post Construction' },
];

const ProviderProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    services: [] as string[],
    postalCodes: '',
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/auth/login');
          return;
        }
        
        // Fetch provider data
        const { data, error } = await supabase
          .from('service_providers')
          .select(`
            *,
            provider_service_areas(postal_code)
          `)
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching provider profile:', error);
          if (error.code === 'PGRST116') {
            // Not found - redirect to client dashboard
            navigate('/user/dashboard');
          }
          return;
        }
        
        setProfile(data);
        
        // Initialize form data
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
          services: data.services || [],
          postalCodes: data.provider_service_areas?.map((area: any) => area.postal_code).join(', ') || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId];
        
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'You must be logged in to update your profile',
        });
        return;
      }
      
      // Update provider profile
      const { error: profileError } = await supabase
        .from('service_providers')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          bio: formData.bio,
          services: formData.services,
        })
        .eq('id', user.id);
        
      if (profileError) {
        throw profileError;
      }
      
      // Update postal codes - first delete existing ones
      await supabase
        .from('provider_service_areas')
        .delete()
        .eq('provider_id', user.id);
        
      // Then add new postal codes
      const postalCodes = formData.postalCodes
        .split(',')
        .map(code => code.trim())
        .filter(Boolean);
        
      if (postalCodes.length > 0) {
        const postalCodeRecords = postalCodes.map(postal_code => ({
          provider_id: user.id,
          postal_code,
        }));
        
        const { error: postalCodeError } = await supabase
          .from('provider_service_areas')
          .insert(postalCodeRecords);
          
        if (postalCodeError) {
          console.error('Error updating postal codes:', postalCodeError);
        }
      }
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'There was an error updating your profile',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 mt-16 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Provider Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" alt="Profile picture" />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  <UserCircle className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <p className="text-lg font-medium">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              
              <Separator className="my-4" />
              
              <div className="w-full">
                <p className="text-sm font-medium mb-2">Provider Status</p>
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                    profile.status === 'approved' ? 'bg-green-500' : 
                    profile.status === 'pending_approval' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <p className="text-sm capitalize">
                    {profile.status === 'approved' ? 'Active' : 
                     profile.status === 'pending_approval' ? 'Pending Approval' : 
                     profile.status}
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/provider/dashboard')}
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="services">Services & Areas</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="personal" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio / About Me</Label>
                      <Input
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Share information about your experience and qualifications
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Services & Service Areas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Services You Provide</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {serviceTypes.map((service) => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`service-${service.id}`}
                              checked={formData.services.includes(service.id)}
                              onCheckedChange={() => toggleService(service.id)}
                            />
                            <Label htmlFor={`service-${service.id}`} className="font-normal cursor-pointer">
                              {service.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postalCodes">Service Areas (Postal Codes)</Label>
                      <Input
                        id="postalCodes"
                        name="postalCodes"
                        value={formData.postalCodes}
                        onChange={handleInputChange}
                        placeholder="e.g. 10115, 10117, 10119"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter postal codes separated by commas (e.g. 10115, 10117, 10119)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
