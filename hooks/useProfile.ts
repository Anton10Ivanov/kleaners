'use client'


import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/supabase";
import { logError } from '@/utils/console-cleanup';

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
        logError('Error fetching profile', error, 'useProfile');
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
      logError('Error updating profile', error, 'useProfile');
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: "We couldn't update your profile. Please try again later."
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        // Update user profile with avatar URL
        const { error: updateError } = await supabase
          .from('customers')
          .update({ avatar_url: data.publicUrl })
          .eq('id', user.id);

        if (updateError) throw updateError;

        setAvatarUrl(data.publicUrl);
        form.setValue('avatar_url', data.publicUrl);
      }
    } catch (error) {
      logError('Error uploading avatar', error, 'useProfile');
      throw error;
    }
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
