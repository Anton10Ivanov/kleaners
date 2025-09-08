
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table";
import { Database } from '@/integrations/supabase/types";
import { Edit, Trash } from "lucide-react";
import { Button } from '@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Client = Database["public"]["Tables"]["clients"]["Row"];

interface CustomersTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export const CustomersTable = ({ clients, onEdit, onDelete }: CustomersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  // Get current clients
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleDeleteConfirm = (id: string) => {
    setClientToDelete(id);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      onDelete(clientToDelete);
      setClientToDelete(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.first_name}</TableCell>
              <TableCell>{client.last_name}</TableCell>
              <TableCell>{client.username || "-"}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone || "-"}</TableCell>
              <TableCell>{client.address || "-"}</TableCell>
              <TableCell>{client.notes || "-"}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(client)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDeleteConfirm(client.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {clients.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                No clients found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {clients.length > 0 && (
        <div className="flex justify-between items-center section-spacing-xs px-6 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, clients.length)} of {clients.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8 card-spacing-none"
              >
                {page}
              </Button>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <AlertDialog open={!!clientToDelete} onOpenChange={() => setClientToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Client</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
