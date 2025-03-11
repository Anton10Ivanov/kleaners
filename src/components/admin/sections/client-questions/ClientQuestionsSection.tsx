import React, { useState } from 'react';
import { QuestionFilters } from '@/components/admin/sections/client-questions/QuestionFilters';
import { QuestionsTable } from '@/components/admin/sections/client-questions/QuestionsTable';
import { QuestionDetailsDialog } from '@/components/admin/sections/client-questions/QuestionDetailsDialog';
import { useCustomerQuestions } from '@/components/admin/sections/client-questions/useCustomerQuestions';
import { CustomerQuestion } from '@/components/admin/sections/client-questions/types';

const ClientQuestionsSection = () => {
  const {
    questions,
    isLoading,
    markAsAnswered,
    markAsIgnored,
    markAsSpam,
    deleteQuestion,
  } = useCustomerQuestions();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState<CustomerQuestion | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Calculate the count of pending questions
  const pendingCount = questions?.filter(q => q.status === 'pending').length || 0;

  // Handle opening the question details dialog
  const openQuestionDialog = (question: CustomerQuestion) => {
    setSelectedQuestion(question);
    setDialogOpen(true);
  };

  // Handle status updates based on the action
  const handleStatusUpdate = (status: string) => {
    if (!selectedQuestion) return;
    
    if (status === 'answered') {
      markAsAnswered(selectedQuestion.id);
    } else if (status === 'ignored') {
      markAsIgnored(selectedQuestion.id);
    } else if (status === 'spam') {
      markAsSpam(selectedQuestion.id);
    }
    
    setDialogOpen(false);
  };

  // Handle deleting a question
  const handleDeleteQuestion = () => {
    if (selectedQuestion) {
      deleteQuestion(selectedQuestion.id);
      setDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Client Questions</h2>
        <QuestionFilters 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter}
          pendingCount={pendingCount}
        />
      </div>

      <QuestionsTable 
        questions={questions} 
        isLoading={isLoading}
        onViewQuestion={openQuestionDialog}
      />

      <QuestionDetailsDialog
        question={selectedQuestion}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onStatusUpdate={handleStatusUpdate}
        onDeleteQuestion={handleDeleteQuestion}
      />
    </div>
  );
};

export default ClientQuestionsSection;
