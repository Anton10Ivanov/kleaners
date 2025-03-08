
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CustomerQuestion } from './types';

export function useCustomerQuestions() {
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

  return {
    questions,
    isLoading,
    error,
    selectedQuestion,
    dialogOpen,
    statusFilter,
    setDialogOpen,
    setStatusFilter,
    openQuestionDialog,
    handleStatusUpdate,
    handleDeleteQuestion,
  };
}
