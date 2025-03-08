
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProviderVacation } from '@/hooks/useProviderVacation';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminVacationRequests = () => {
  const { 
    allVacationRequests: vacationRequests, 
    isLoadingAllVacations: isLoading, 
    updateVacationStatus 
  } = useProviderVacation();

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    updateVacationStatus({ id, status });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vacation Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-6 text-center text-muted-foreground">Loading vacation requests...</div>
          ) : vacationRequests.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">No vacation requests found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vacationRequests.map((request) => {
                  const startDate = new Date(request.start_date);
                  const endDate = new Date(request.end_date);
                  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                  
                  return (
                    <TableRow key={request.id}>
                      <TableCell>{request.provider_name}</TableCell>
                      <TableCell>{format(startDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(endDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{duration} day{duration !== 1 ? 's' : ''}</TableCell>
                      <TableCell>
                        <Badge variant={
                          request.status === 'approved' ? 'success' : 
                          request.status === 'rejected' ? 'destructive' : 
                          'outline'
                        }>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-green-500" 
                              onClick={() => handleUpdateStatus(request.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-500" 
                              onClick={() => handleUpdateStatus(request.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVacationRequests;
