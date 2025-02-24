
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
      const { data, error } = await supabase
        .from("service_providers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createProvider = useMutation({
    mutationFn: async (provider: Omit<ServiceProvider, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase
        .from("service_providers")
        .insert(provider);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({
        title: "Success",
        description: "Provider added successfully",
      });
    },
    onError: (error) => {
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
      const { error } = await supabase
        .from("service_providers")
        .update(data)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({
        title: "Success",
        description: "Provider updated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update provider: " + error.message,
      });
    },
  });

  const deleteProvider = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("service_providers")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast({
        title: "Success",
        description: "Provider deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete provider: " + error.message,
      });
    },
  });

  return {
    providers: providersQuery.data,
    isLoading: providersQuery.isLoading,
    createProvider: createProvider.mutate,
    updateProvider: updateProvider.mutate,
    deleteProvider: deleteProvider.mutate,
  };
};
