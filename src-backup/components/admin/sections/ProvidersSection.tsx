
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProvidersTable } from "./providers/ProvidersTable";
import { ProviderForm } from "./providers/ProviderForm";
import { useProviders } from "@/hooks/useProviders";
import { Database } from "@/integrations/supabase/types";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];

/**
 * ProvidersSection handles the display and management of service providers.
 * It includes functionality for viewing, adding, editing, and deleting providers.
 */
export const ProvidersSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | undefined>();
  const { providers, isLoading, createProvider, updateProvider, deleteProvider } = useProviders();

  /**
   * Handles the submission of the provider form for both creation and updates.
   * @param data - The provider data to be submitted
   */
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

  const handleDelete = (id: string) => {
    deleteProvider(id);
  };

  return (
    <div className="form-spacing-relaxed">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Service Providers</h2>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Provider
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-md border card-spacing-sm">
          <p className="text-muted-foreground">Loading providers...</p>
        </div>
      ) : (
        <ProvidersTable
          providers={providers}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
