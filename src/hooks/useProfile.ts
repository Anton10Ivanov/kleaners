
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

export const profileFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  avatar_url: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const useProfile = (user: User) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
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

  const handleAvatarChange = (url: string | null) => {
    form.setValue('avatar_url', url || '');
  };

  return {
    form,
    loading,
    saving,
    avatarUrl,
    setAvatarUrl,
    onSubmit,
    handleAvatarChange,
  };
};
