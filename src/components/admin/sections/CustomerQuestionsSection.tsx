
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type CustomerQuestion = {
  id: string;
  name: string;
  email: string;
  question: string;
  status: string;
  created_at: string;
  is_spam: boolean;
  ip_address: string | null;
  user_agent: string | null;
};

const CustomerQuestionsSection = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedQuestion, setSelectedQuestion] = useState<CustomerQuestion | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch questions with authentication
  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['customerQuestions', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('customer_questions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as CustomerQuestion[];
    }
  });

  // Update question status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('customer_questions')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      return { id, status };
    },
    onSuccess: () => {
      // Refetch questions after status update
      queryClient.invalidateQueries({ queryKey: ['customerQuestions'] });
      toast({
        title: 'Status Updated',
        description: 'Question status has been updated successfully.',
      });
      setDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error updating status:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update question status. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Delete question mutation
  const deleteQuestionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('customer_questions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      // Refetch questions after deletion
      queryClient.invalidateQueries({ queryKey: ['customerQuestions'] });
      toast({
        title: 'Question Deleted',
        description: 'The question has been deleted successfully.',
      });
      setDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error deleting question:', error);
      toast({
        title: 'Deletion Failed',
        description: 'Failed to delete the question. Please try again.',
        variant: 'destructive',
      });
    }
  });

  if (isLoading) return <div className="p-4">Loading customer questions...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading questions: {error.message}</div>;

  const openQuestionDialog = (question: CustomerQuestion) => {
    setSelectedQuestion(question);
    setDialogOpen(true);
  };

  const handleStatusUpdate = (status: string) => {
    if (selectedQuestion) {
      updateStatusMutation.mutate({ id: selectedQuestion.id, status });
    }
  };

  const handleDeleteQuestion = () => {
    if (selectedQuestion) {
      deleteQuestionMutation.mutate(selectedQuestion.id);
    }
  };

  const getStatusBadge = (status: string, isSpam: boolean) => {
    if (isSpam) return <Badge className="bg-red-500">Spam</Badge>;
    
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'answered':
        return <Badge className="bg-green-500">Answered</Badge>;
      case 'ignored':
        return <Badge className="bg-gray-500">Ignored</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Questions</h2>
        <div className="flex gap-2">
          <Button 
            variant={statusFilter === 'all' ? 'default' : 'outline'} 
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'pending' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'answered' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('answered')}
          >
            Answered
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions && questions.length > 0 ? (
              questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">
                    {format(new Date(question.created_at), 'MMM d, yyyy h:mm a')}
                  </TableCell>
                  <TableCell>{question.name}</TableCell>
                  <TableCell>{question.email}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {question.question.substring(0, 50)}
                    {question.question.length > 50 ? '...' : ''}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(question.status, question.is_spam)}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openQuestionDialog(question)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No questions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Question details dialog */}
      {selectedQuestion && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Question Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">From:</h3>
                  <p>{selectedQuestion.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Email:</h3>
                  <p>{selectedQuestion.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold">Question:</h3>
                <p className="whitespace-pre-wrap border p-3 rounded-md bg-gray-50 dark:bg-gray-900 min-h-[100px]">
                  {selectedQuestion.question}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Date:</h3>
                  <p>{format(new Date(selectedQuestion.created_at), 'PPpp')}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status:</h3>
                  <p>{getStatusBadge(selectedQuestion.status, selectedQuestion.is_spam)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">IP Address:</h3>
                  <p>{selectedQuestion.ip_address || 'Not captured'}</p>
                </div>
                <div>
                  <h3 className="font-semibold">User Agent:</h3>
                  <p className="truncate">{selectedQuestion.user_agent || 'Not captured'}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-wrap gap-2 mt-4">
              <Button 
                onClick={() => handleStatusUpdate('answered')}
                variant="outline"
                className="bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800"
              >
                Mark as Answered
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('ignored')}
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Ignore
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('spam')}
                variant="outline"
                className="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"
              >
                Mark as Spam
              </Button>
              <Button 
                onClick={handleDeleteQuestion}
                variant="destructive"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerQuestionsSection;
