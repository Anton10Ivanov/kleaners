
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBoundary } from "react-error-boundary";
import { Separator } from "@/components/ui/separator";
import { useTitle } from "@/hooks/useTitle";
import { FileText, Mail, Phone, User, Award, Briefcase, Clock, MapPin, CreditCard, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProfileCompletionIndicator } from "@/components/provider/profile/ProfileCompletionIndicator";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-md">
      <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
      <p className="text-red-600 mt-2">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};

const ProviderProfile = () => {
  useTitle('Provider Profile');
  
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  
  // Fetch provider profile data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("User not found, please login again");
        return;
      }
      
      // Get provider profile
      const { data: providerData, error: providerError } = await supabase
        .from('service_providers')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (providerError) {
        console.error("Error fetching provider profile:", providerError);
        toast.error("Failed to load profile data");
        return;
      }
      
      // Get application data to display complete information
      const { data: applicationData, error: applicationError } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (applicationError && applicationError.code !== 'PGRST116') {
        console.error("Error fetching application data:", applicationError);
      }
      
      // Fetch payment settings data
      const { data: paymentData, error: paymentError } = await supabase
        .from('provider_payment_settings')
        .select('*')
        .eq('provider_id', user.id)
        .single();
        
      if (paymentError && paymentError.code !== 'PGRST116') {
        console.error("Error fetching payment data:", paymentError);
      }
      
      if (paymentData) {
        setPaymentInfo(paymentData);
      }
      
      if (providerData) {
        setProvider({
          ...providerData,
          position: applicationData?.position || 'Cleaning Professional',
          experience: applicationData?.experience || '1-3 years',
          message: applicationData?.message || '',
          paymentInfo: paymentData || null
        });
        
        // Parse skills and availability from application if available
        if (applicationData?.skills) {
          try {
            const parsedSkills = typeof applicationData.skills === 'string' 
              ? JSON.parse(applicationData.skills) 
              : applicationData.skills;
            setSkills(Array.isArray(parsedSkills) ? parsedSkills : []);
          } catch (e) {
            console.error("Error parsing skills:", e);
            setSkills([]);
          }
        }
        
        if (applicationData?.availability) {
          try {
            const parsedAvailability = typeof applicationData.availability === 'string' 
              ? JSON.parse(applicationData.availability) 
              : applicationData.availability;
            setAvailability(Array.isArray(parsedAvailability) ? parsedAvailability : []);
          } catch (e) {
            console.error("Error parsing availability:", e);
            setAvailability([]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Calculate profile completion from the hook
  const profileSections = useProfileCompletion({
    ...provider,
    skills,
    availability,
    paymentInfo
  });

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container mx-auto p-4">
        <div className="max-w-3xl mx-auto">
          {/* Profile Completion Indicator */}
          {provider && (
            <ProfileCompletionIndicator sections={profileSections} />
          )}
          
          <Card className="shadow-lg border-0">
            <CardHeader className="relative pb-0">
              <div className="absolute inset-0 h-40 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-lg" />
              <div className="relative z-10 flex flex-col items-center pt-8">
                <Avatar className="h-24 w-24 ring-4 ring-white bg-white">
                  <AvatarImage src={provider?.avatar_url || "/placeholder.svg"} alt={provider?.first_name} />
                  <AvatarFallback className="bg-primary text-white">
                    {provider?.first_name?.charAt(0)}{provider?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold text-center text-white">
                  {provider?.first_name} {provider?.last_name}
                </h1>
                <div className="mt-1 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                  <p className="text-white font-medium">
                    {provider?.position || "Cleaning Professional"}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-12 px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Contact Information
                    </h2>
                    <Separator />
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{provider?.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p>{provider?.phone || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Professional Experience
                    </h2>
                    <Separator />
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Experience Level</p>
                          <p>{provider?.experience || "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Information
                    </h2>
                    <Separator />
                    {paymentInfo ? (
                      <div className="space-y-3 pt-2">
                        {paymentInfo.payment_method === 'bank_transfer' && (
                          <>
                            <div className="flex items-start gap-2">
                              <div>
                                <p className="text-sm text-gray-500">Bank Name</p>
                                <p>{paymentInfo.bank_name || "Not provided"}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div>
                                <p className="text-sm text-gray-500">Account Name</p>
                                <p>{paymentInfo.account_name || "Not provided"}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div>
                                <p className="text-sm text-gray-500">IBAN</p>
                                <p>{paymentInfo.iban ? "••••" + paymentInfo.iban.slice(-4) : "Not provided"}</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {paymentInfo.payment_method === 'paypal' && (
                          <div className="flex items-start gap-2">
                            <div>
                              <p className="text-sm text-gray-500">PayPal Email</p>
                              <p>{paymentInfo.paypal_email || "Not provided"}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="pt-3">
                        <p className="text-gray-500 text-sm mb-3">No payment information has been added yet</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/provider/settings?tab=payment" className="flex items-center gap-1">
                            Add payment information <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {provider?.message && (
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Personal Statement
                      </h2>
                      <Separator />
                      <p className="text-gray-700 whitespace-pre-line text-sm pt-2">
                        {provider.message}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Skills & Specialties
                    </h2>
                    <Separator />
                    <div className="flex flex-wrap gap-2 pt-3">
                      {skills.length > 0 ? (
                        skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No specific skills listed</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Availability
                    </h2>
                    <Separator />
                    <div className="pt-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                          {availability.length > 0 ? (
                            availability.map((time, index) => (
                              <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                                {time}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm mb-3">No availability information</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm" asChild className="self-start">
                          <Link to="/provider/availability" className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> Manage availability
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Employment Details
                    </h2>
                    <Separator />
                    <div className="pt-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Employment Type</p>
                        <Badge>Full-time</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Transportation</p>
                        <Badge variant="outline">Has Own Transportation</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Equipment</p>
                        <Badge variant="outline">Has Own Equipment</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t text-center text-gray-500 text-sm">
                <p>Joined on {new Date(provider?.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProviderProfile;
