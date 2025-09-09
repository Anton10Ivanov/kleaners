
import { useState } from "react";
import { useClients } from '@/hooks/useClients';
import { ClientForm } from "./clients/ClientForm";
import { ClientsTable } from "./clients/ClientsTable";
import { Button } from '@/components/ui/button';
import { PlusCircle } from "lucide-react";
import { Database } from '@/integrations/supabase/types';

type Client = Database["public"]["Tables"]["clients"]["Row"];

export const CustomersSection = () => {
  const { clients, isLoading, createClient, updateClient, deleteClient } = useClients();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

  const handleOpenForm = () => {
    setSelectedClient(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedClient(undefined);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Partial<Client>) => {
    if (selectedClient) {
      updateClient({ ...data, id: selectedClient.id });
    } else {
      createClient(data as Omit<Client, "id" | "created_at" | "updated_at">);
    }
    handleCloseForm();
  };

  const handleDeleteClient = (id: string) => {
    deleteClient(id);
  };

  return (
    <div className="form-spacing-relaxed">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Clients</h2>
          <p className="text-muted-foreground">Manage client records</p>
        </div>
        <Button onClick={handleOpenForm}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <ClientsTable
        clients={clients}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
      />

      <ClientForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedClient}
      />
    </div>
  );
};
