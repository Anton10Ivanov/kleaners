import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Database } from '@/integrations/supabase/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from "react";
import { ProviderDetails } from "./ProviderDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];

interface ProvidersTableProps {
  providers: ServiceProvider[] | null;
  onEdit: (provider: ServiceProvider) => void;
  onDelete: (id: string) => void;
}

export const ProvidersTable = ({
  providers,
  onEdit,
  onDelete,
}: ProvidersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [providersPerPage] = useState(5);
  const [providerToDelete, setProviderToDelete] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = providers?.slice(indexOfFirstProvider, indexOfLastProvider) || [];
  const totalPages = Math.ceil((providers?.length || 0) / providersPerPage);

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
    setProviderToDelete(id);
  };

  const confirmDelete = () => {
    if (providerToDelete) {
      onDelete(providerToDelete);
      setProviderToDelete(null);
    }
  };

  const handleViewProvider = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProvider(null);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead className="hidden md:table-cell">Username</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden sm:table-cell">Phone</TableHead>
            <TableHead className="hidden lg:table-cell">Services</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProviders.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell>{provider.first_name}</TableCell>
              <TableCell>{provider.last_name}</TableCell>
              <TableCell className="hidden md:table-cell">{provider.username || "-"}</TableCell>
              <TableCell className="hidden md:table-cell">{provider.email}</TableCell>
              <TableCell className="hidden sm:table-cell">{provider.phone || "-"}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {provider.services?.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewProvider(provider)}
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(provider)}
                    title="Edit provider"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDeleteConfirm(provider.id)}
                    title="Delete provider"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {(!providers || providers.length === 0) && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No providers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {providers && providers.length > 0 && (
        <div className="flex justify-between items-center section-spacing-xs px-6 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstProvider + 1} to {Math.min(indexOfLastProvider, providers.length)} of {providers.length} entries
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
      
      <AlertDialog open={!!providerToDelete} onOpenChange={() => setProviderToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Provider</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this provider? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedProvider && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Provider Details</DialogTitle>
            </DialogHeader>
            <ProviderDetails 
              provider={selectedProvider}
              onClose={handleCloseDetails}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
