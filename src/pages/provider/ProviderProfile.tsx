
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ErrorBoundary } from "react-error-boundary";

// Define the profile schema
const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Skills
const skillSchema = z.object({
  skill: z.string().min(1, "Skill name is required"),
  experience_years: z.number().min(0, "Experience must be 0 or greater"),
  certification: z.string().optional(),
});

type SkillFormValues = z.infer<typeof skillSchema>;

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-md">
      <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
      <p className="text-red-600 mt-2">{error.message}</p>
      <Button 
        onClick={resetErrorBoundary}
        variant="outline" 
        className="mt-4"
      >
        Try again
      </Button>
    </div>
  );
};

const ProviderProfile = () => {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      bio: "",
    }
  });

  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skill: "",
      experience_years: 0,
      certification: "",
    }
  });

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
        return;
      }
      
      if (providerData) {
        setProvider(providerData);
        
        // Set form default values
        profileForm.reset({
          first_name: providerData.first_name || "",
          last_name: providerData.last_name || "",
          email: providerData.email || "",
          phone: providerData.phone || "",
          bio: providerData.bio || "",
        });
        
        // Get skills
        try {
          const { data: skillsData, error: skillsError } = await supabase
            .from('provider_skills')
            .select('*')
            .eq('provider_id', user.id);
            
          if (!skillsError && skillsData) {
            setSkills(skillsData);
          }
        } catch (error) {
          console.error("Error fetching skills:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const onProfileSubmit = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      
      if (!provider?.id) {
        toast.error("Provider ID not found");
        return;
      }
      
      const { error } = await supabase
        .from('service_providers')
        .update({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          bio: values.bio,
        })
        .eq('id', provider.id);
        
      if (error) {
        throw error;
      }
      
      toast.success("Profile updated successfully");
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (values: SkillFormValues) => {
    try {
      if (!provider?.id) {
        toast.error("Provider ID not found");
        return;
      }
      
      const { error } = await supabase
        .from('provider_skills')
        .insert({
          provider_id: provider.id,
          skill: values.skill,
          experience_years: values.experience_years,
          certification: values.certification,
        });
        
      if (error) {
        throw error;
      }
      
      toast.success("Skill added");
      skillForm.reset();
      fetchProfile();
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill");
    }
  };

  const removeSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('provider_skills')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast.success("Skill removed");
      fetchProfile();
    } catch (error) {
      console.error("Error removing skill:", error);
      toast.error("Failed to remove skill");
    }
  };

  if (loading && !provider) {
    return (
      <div className="container flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Provider" />
                  <AvatarFallback>
                    {provider?.first_name?.charAt(0)}{provider?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">
                  {provider?.first_name} {provider?.last_name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{provider?.email}</p>
                {!isEditing && (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Edit Profile
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {provider?.phone && (
                    <div>
                      <h4 className="text-sm font-semibold">Phone</h4>
                      <p>{provider.phone}</p>
                    </div>
                  )}
                  {provider?.bio && (
                    <div>
                      <h4 className="text-sm font-semibold">About</h4>
                      <p className="text-sm">{provider.bio}</p>
                    </div>
                  )}
                  {provider?.services && provider.services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold">Services</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {provider.services.map((service: string) => (
                          <Badge key={service} variant="secondary">{service}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Edit Profile" : "Provider Details"}</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Tell clients about yourself"
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <Tabs defaultValue="skills">
                    <TabsList className="mb-4">
                      <TabsTrigger value="skills">Skills & Certifications</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="skills" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {skills.length > 0 ? (
                          skills.map((skill) => (
                            <Card key={skill.id} className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{skill.skill}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {skill.experience_years} years experience
                                  </p>
                                  {skill.certification && (
                                    <Badge variant="outline" className="mt-1">
                                      {skill.certification}
                                    </Badge>
                                  )}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeSkill(skill.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </Button>
                              </div>
                            </Card>
                          ))
                        ) : (
                          <p className="text-muted-foreground">No skills added yet.</p>
                        )}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <Form {...skillForm}>
                        <form onSubmit={skillForm.handleSubmit(addSkill)} className="space-y-4">
                          <h3 className="text-lg font-medium">Add Skill</h3>
                          <FormField
                            control={skillForm.control}
                            name="skill"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skill Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="e.g., Deep Cleaning" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={skillForm.control}
                              name="experience_years"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Years of Experience</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={skillForm.control}
                              name="certification"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Certification (optional)</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="e.g., Certified Professional Cleaner" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button type="submit" className="mt-2">Add Skill</Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProviderProfile;
