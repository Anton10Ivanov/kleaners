
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProvidersTable } from "./providers/ProvidersTable";
import { ProviderForm } from "./providers/ProviderForm";
import { useProviders } from "@/hooks/useProviders";
import { Database } from "@/integrations/supabase/types";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];

export const ProvidersSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | undefined>();
  const { providers, isLoading, createProvider, updateProvider, deleteProvider } = useProviders();

  const handleSubmit = (data: Partial<ServiceProvider>) => {
    if (selectedProvider) {
      updateProvider({ id: selectedProvider.id, ...data });
    } else {
      createProvider(data as Omit<ServiceProvider, "id" | "created_at" | "updated_at">);
    }
    handleClose();
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedProvider(undefined);
  };

  const handleEdit = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Service Providers</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Provider
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-md border p-4">
          <p className="text-muted-foreground">Loading providers...</p>
        </div>
      ) : (
        <ProvidersTable
          providers={providers}
          onEdit={handleEdit}
          onDelete={deleteProvider}
        />
      )}

      <ProviderForm
        open={isFormOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={selectedProvider}
      />
    </div>
  );
};
