
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logging';

interface VacationRequest {
  id: string;
  provider_id: string;
  provider_name?: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export function VacationRequestsSection() {
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch vacation requests
  const fetchVacationRequests = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('provider_vacation_requests')
        .select(`
          id,
          provider_id,
          start_date,
          end_date,
          status,
          created_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Get provider names
      if (data && data.length > 0) {
        const providerIds = [...new Set(data.map(req => req.provider_id))];
        
        const { data: providersData, error: providersError } = await supabase
          .from('service_providers')
          .select('id, first_name, last_name')
          .in('id', providerIds);
          
        if (providersError) {
          logger.error("Failed to fetch provider names", { error: providersError.message }, "VacationRequestsSection");
        }
        
        // Map provider names to vacation requests
        const requestsWithNames = data.map(request => {
          const provider = providersData?.find(p => p.id === request.provider_id);
          return {
            ...request,
            provider_name: provider ? `${provider.first_name} ${provider.last_name}` : 'Unknown Provider'
          };
        });
        
        setVacationRequests(requestsWithNames);
      } else {
        setVacationRequests([]);
      }
    } catch (error) {
      logger.error("Failed to fetch vacation requests", { error: error instanceof Error ? error.message : 'Unknown error' }, "VacationRequestsSection");
      toast.error("Failed to fetch vacation requests");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVacationRequests();
  }, []);
  
  const updateRequestStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('provider_vacation_requests')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setVacationRequests(
        vacationRequests.map(req => 
          req.id === id ? { ...req, status } : req
        )
      );
      
      toast.success(`Vacation request ${status}`);
    } catch (error) {
      logger.error(`Failed to ${status} vacation request`, { error: error instanceof Error ? error.message : 'Unknown error', requestId: id }, "VacationRequestsSection");
      toast.error(`Failed to ${status} vacation request`);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vacation Requests</CardTitle>
        <CardDescription>
          Review and manage service provider vacation requests
        </CardDescription>
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
                            onClick={() => updateRequestStatus(request.id, 'approved')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 text-red-500" 
                            onClick={() => updateRequestStatus(request.id, 'rejected')}
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
  );
}
