
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import { useEffect } from "react";

type Client = Database["public"]["Tables"]["clients"]["Row"];

export const useClients = () => {
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      console.log("Fetching clients...");
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching clients:", error);
        toast({
          variant: "destructive",
          title: "Error fetching clients",
          description: error.message,
        });
        throw error;
      }

      console.log("Fetched clients:", data);
      return data;
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    console.log("Setting up real-time subscription for clients...");
    const channel = supabase
      .channel("clients-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "clients",
        },
        (payload) => {
          console.log("Real-time client update received:", payload);
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ["clients"] });
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Cleaning up clients subscription");
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const createClient = useMutation({
    mutationFn: async (clientData: Omit<Client, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("clients")
        .insert(clientData)
        .select()
        .single();

      if (error) {
        console.error("Error creating client:", error);
        toast({
          variant: "destructive",
          title: "Error creating client",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Client created successfully",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    }
  });

  const updateClient = useMutation({
    mutationFn: async ({ id, ...clientData }: Partial<Client> & { id: string }) => {
      const { data, error } = await supabase
        .from("clients")
        .update(clientData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating client:", error);
        toast({
          variant: "destructive",
          title: "Error updating client",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Client updated successfully",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    }
  });

  const deleteClient = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting client:", error);
        toast({
          variant: "destructive",
          title: "Error deleting client",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Client deleted successfully",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    }
  });

  return {
    clients,
    isLoading,
    createClient: createClient.mutate,
    updateClient: updateClient.mutate,
    deleteClient: deleteClient.mutate,
  };
};
