'use client'


import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { ErrorBoundaryWrapper } from '@/components/provider/ErrorBoundaryWrapper';
import { useTitle } from '@/hooks/useTitle';
import { ProfileCompletionIndicator } from '@/components/provider/profile/ProfileCompletionIndicator'; 
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { ProfileContent } from '@/components/provider/profile/ProfileContent';

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
    <ErrorBoundaryWrapper>
      <div className="container mx-auto card-spacing-sm">
        <div className="max-w-3xl mx-auto">
          {/* Profile Completion Indicator */}
          {provider && (
            <ProfileCompletionIndicator sections={profileSections} />
          )}
          
          <ProfileContent
            provider={provider}
            skills={skills}
            availability={availability}
            paymentInfo={paymentInfo}
          />
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default ProviderProfile;
