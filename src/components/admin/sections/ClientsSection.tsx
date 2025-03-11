
import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientForm } from "./clients/ClientForm";
import { ClientsTable } from "./clients/ClientsTable";
import { useClients } from "@/hooks/useClients";
import { Database } from "@/integrations/supabase/types";

type Client = Database["public"]["Tables"]["clients"]["Row"];

export const ClientsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const { clients, isLoading, createClient, updateClient, deleteClient } = useClients();

  const filteredClients = clients.filter((client) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.first_name.toLowerCase().includes(searchLower) ||
      client.last_name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      (client.phone && client.phone.toLowerCase().includes(searchLower))
    );
  });

  const handleSubmit = async (data: Partial<Client>) => {
    if (selectedClient) {
      await updateClient({ id: selectedClient.id, ...data });
    } else {
      await createClient(data as Omit<Client, "id" | "created_at" | "updated_at">);
    }
    handleClose();
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedClient(undefined);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteClient(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-md border p-4">
          <p className="text-muted-foreground">Loading clients...</p>
        </div>
      ) : (
        <ClientsTable
          clients={filteredClients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ClientForm
        open={isFormOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={selectedClient}
      />
    </div>
  );
};
