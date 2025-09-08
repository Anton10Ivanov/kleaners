'use client'


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import { useEffect } from "react";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];

export const useProviders = () => {
  const queryClient = useQueryClient();

  const { data: providers = [], isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      console.log("Fetching providers...");
      const { data, error } = await supabase
        .from("service_providers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching providers:", error);
        toast({
          variant: "destructive",
          title: "Error fetching providers",
          description: error.message,
        });
        throw error;
      }

      console.log("Fetched providers:", data);
      return data;
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    console.log("Setting up real-time subscription for providers...");
    const channel = supabase
      .channel("providers-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "service_providers",
        },
        (payload) => {
          console.log("Real-time provider update received:", payload);
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ["providers"] });
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Cleaning up providers subscription");
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const createProvider = useMutation({
    mutationFn: async (providerData: Omit<ServiceProvider, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("service_providers")
        .insert(providerData)
        .select()
        .single();

      if (error) {
        console.error("Error creating provider:", error);
        toast({
          variant: "destructive",
          title: "Error creating provider",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Provider created successfully",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    }
  });

  const updateProvider = useMutation({
    mutationFn: async ({ id, ...providerData }: Partial<ServiceProvider> & { id: string }) => {
      const { data, error } = await supabase
        .from("service_providers")
        .update(providerData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating provider:", error);
        toast({
          variant: "destructive",
          title: "Error updating provider",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Provider updated successfully",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    }
  });

  const deleteProvider = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("service_providers")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting provider:", error);
        toast({
          variant: "destructive",
          title: "Error deleting provider",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Provider deleted successfully",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    }
  });

  return {
    providers,
    isLoading,
    createProvider: createProvider.mutate,
    updateProvider: updateProvider.mutate,
    deleteProvider: deleteProvider.mutate,
  };
};
