
import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UserCircle, Save, Phone, Mail, MapPin, Camera, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserContextType {
  user: User;
}

const profileFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  avatar_url: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfile = () => {
  const { user } = useOutletContext<UserContextType>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
      email: user?.email || "",
      avatar_url: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        form.reset({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          address: data.address || "",
          email: data.email || user.email || "",
          avatar_url: data.avatar_url || "",
        });

        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: "We couldn't load your profile. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, form, toast]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('customers')
        .update({
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
          address: values.address,
          avatar_url: avatarUrl,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: "We couldn't update your profile. Please try again later."
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      if (data) {
        setAvatarUrl(data.publicUrl);
        form.setValue('avatar_url', data.publicUrl);
      }
      
      toast({
        title: "Avatar uploaded",
        description: "Your profile picture has been updated."
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "We couldn't upload your avatar. Please try again later."
      });
    } finally {
      setUploading(false);
      // Reset file input value to allow selecting the same file again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAvatar = async () => {
    if (!avatarUrl) return;
    
    try {
      setUploading(true);
      
      // Extract file path from the URL
      const filePathMatch = avatarUrl.match(/avatars\/(.+)$/);
      if (filePathMatch && filePathMatch[1]) {
        const filePath = `avatars/${filePathMatch[1]}`;
        
        // Delete the file from storage
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([filePath]);
        
        if (deleteError) throw deleteError;
      }
      
      // Update profile to remove avatar_url
      const { error: updateError } = await supabase
        .from('customers')
        .update({ avatar_url: null })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(null);
      form.setValue('avatar_url', '');
      
      toast({
        title: "Avatar removed",
        description: "Your profile picture has been removed."
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        variant: "destructive",
        title: "Error removing avatar",
        description: "We couldn't remove your avatar. Please try again later."
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Email" 
                            {...field} 
                            disabled 
                            className="flex-1"
                          />
                        </FormControl>
                        <Mail className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Phone number" 
                            {...field} 
                            className="flex-1"
                          />
                        </FormControl>
                        <Phone className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input 
                            placeholder="Your address" 
                            {...field} 
                            className="flex-1"
                          />
                        </FormControl>
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button 
                    type="button" 
                    variant="outline"
                    disabled={saving}
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={saving || !form.formState.isDirty}
                    className="flex gap-2 items-center"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-secondary">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div 
              className="relative group cursor-pointer mb-4"
              onClick={handleAvatarClick}
            >
              <div className="bg-primary/10 p-6 rounded-full overflow-hidden w-24 h-24 flex items-center justify-center">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="User avatar" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                ) : (
                  <UserCircle className="h-16 w-16 text-primary" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={uploadAvatar}
                className="hidden"
              />
            </div>
            
            {uploading && (
              <div className="mb-4 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm">Processing...</span>
              </div>
            )}
            
            {avatarUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-4" 
                onClick={removeAvatar}
                disabled={uploading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Photo
              </Button>
            )}
            
            <h3 className="text-lg font-medium">{form.watch('first_name')} {form.watch('last_name')}</h3>
            <p className="text-sm text-muted-foreground mb-6">{user?.email}</p>
            
            <div className="w-full space-y-4">
              <div className="flex justify-between text-sm px-4 py-3 bg-muted rounded-md">
                <span className="text-muted-foreground">Member since:</span>
                <span className="font-medium">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm px-4 py-3 bg-muted rounded-md">
                <span className="text-muted-foreground">Last login:</span>
                <span className="font-medium">{new Date(user?.last_sign_in_at || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="w-full mt-6">
              <Button variant="outline" className="w-full" disabled>
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
