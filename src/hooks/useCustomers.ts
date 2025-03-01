
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import { useEffect } from "react";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

export const useCustomers = () => {
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      console.log("Fetching customers...");
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching customers:", error);
        toast({
          variant: "destructive",
          title: "Error fetching customers",
          description: error.message,
        });
        throw error;
      }

      console.log("Fetched customers:", data);
      return data;
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    console.log("Setting up real-time subscription for customers...");
    const channel = supabase
      .channel("customers-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "customers",
        },
        (payload) => {
          console.log("Real-time customer update received:", payload);
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Cleaning up customers subscription");
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const createCustomer = useMutation({
    mutationFn: async (customerData: Omit<Customer, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("customers")
        .insert(customerData)
        .select()
        .single();

      if (error) {
        console.error("Error creating customer:", error);
        toast({
          variant: "destructive",
          title: "Error creating customer",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Customer created successfully",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    }
  });

  const updateCustomer = useMutation({
    mutationFn: async ({ id, ...customerData }: Partial<Customer> & { id: string }) => {
      const { data, error } = await supabase
        .from("customers")
        .update(customerData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating customer:", error);
        toast({
          variant: "destructive",
          title: "Error updating customer",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Customer updated successfully",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    }
  });

  const deleteCustomer = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting customer:", error);
        toast({
          variant: "destructive",
          title: "Error deleting customer",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    }
  });

  return {
    customers,
    isLoading,
    createCustomer: createCustomer.mutate,
    updateCustomer: updateCustomer.mutate,
    deleteCustomer: deleteCustomer.mutate,
  };
};
