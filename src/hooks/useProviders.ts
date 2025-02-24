
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];

export const useProviders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const providersQuery = useQuery({
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
          title: "Error",
          description: "Failed to fetch providers: " + error.message,
        });
        throw error;
      }
      
      console.log("Providers fetched successfully:", data);
      return data;
    },
  });

  const createProvider = useMutation({
    mutationFn: async (provider: Omit<ServiceProvider, "id" | "created_at" | "updated_at">) => {
      console.log("Creating provider:", provider);
      const { data, error } = await supabase
        .from("service_providers")
        .insert(provider)
        .select()
        .single();

      if (error) {
        console.error("Error creating provider:", error);
        throw error;
      }

      console.log("Provider created successfully:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({
        title: "Success",
        description: "Provider added successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Create provider error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add provider: " + error.message,
      });
    },
  });

  const updateProvider = useMutation({
    mutationFn: async ({
      id,
      ...data
    }: Partial<ServiceProvider> & { id: string }) => {
      console.log("Updating provider:", { id, ...data });
      const { data: updatedData, error } = await supabase
        .from("service_providers")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating provider:", error);
        throw error;
      }

      console.log("Provider updated successfully:", updatedData);
      return updatedData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({
        title: "Success",
        description: "Provider updated successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Update provider error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update provider: " + error.message,
      });
    },
  });

  const deleteProvider = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting provider:", id);
      const { error } = await supabase
        .from("service_providers")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting provider:", error);
        throw error;
      }

      console.log("Provider deleted successfully");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({
        title: "Success",
        description: "Provider deleted successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Delete provider error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete provider: " + error.message,
      });
    },
  });

  return {
    providers: providersQuery.data ?? [],
    isLoading: providersQuery.isLoading,
    error: providersQuery.error,
    createProvider: createProvider.mutate,
    updateProvider: updateProvider.mutate,
    deleteProvider: deleteProvider.mutate,
  };
};

