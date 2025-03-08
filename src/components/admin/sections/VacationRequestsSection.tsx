
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useProviderVacation } from '@/hooks/useProviderVacation';
import { Check, X } from 'lucide-react';

export const VacationRequestsSection: React.FC = () => {
  const { 
    allVacationRequests, 
    isLoadingAllVacations, 
    allVacationsError,
    updateVacationStatus 
  } = useProviderVacation();
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };
  
  if (isLoadingAllVacations) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (allVacationsError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading vacation requests.</p>
        <Button variant="outline" className="mt-4">Retry</Button>
      </div>
    );
  }
  
  if (!allVacationRequests || allVacationRequests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No vacation requests found.</p>
      </div>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allVacationRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.provider_name || 'Unknown'}</TableCell>
                <TableCell>{formatDate(request.start_date)}</TableCell>
                <TableCell>{formatDate(request.end_date)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeClass(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(request.created_at)}</TableCell>
                <TableCell className="text-right">
                  {request.status === 'pending' && (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                        onClick={() => updateVacationStatus({ id: request.id, status: 'approved' })}
                      >
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                        onClick={() => updateVacationStatus({ id: request.id, status: 'rejected' })}
                      >
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
