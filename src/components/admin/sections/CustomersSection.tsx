
import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomerForm } from "./customers/CustomerForm";
import { CustomersTable } from "./customers/CustomersTable";
import { useCustomers } from "@/hooks/useCustomers";
import { Database } from "@/integrations/supabase/types";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

export const CustomersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  const { customers, isLoading, createCustomer, updateCustomer, deleteCustomer } = useCustomers();

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.first_name.toLowerCase().includes(searchLower) ||
      customer.last_name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      (customer.phone && customer.phone.toLowerCase().includes(searchLower))
    );
  });

  const handleSubmit = async (data: Partial<Customer>) => {
    if (selectedCustomer) {
      await updateCustomer({ id: selectedCustomer.id, ...data });
    } else {
      await createCustomer(data as Omit<Customer, "id" | "created_at" | "updated_at">);
    }
    handleClose();
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedCustomer(undefined);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteCustomer(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-md border p-4">
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      ) : (
        <CustomersTable
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CustomerForm
        open={isFormOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={selectedCustomer}
      />
    </div>
  );
};
