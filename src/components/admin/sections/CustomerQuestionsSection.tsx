
import React, { useEffect } from 'react';
import { QuestionFilters } from './client-questions/QuestionFilters';
import { QuestionsTable } from './client-questions/QuestionsTable';
import { QuestionDetailsDialog } from './client-questions/QuestionDetailsDialog';
import { useCustomerQuestions } from './client-questions/useCustomerQuestions';

const ClientQuestionsSection = () => {
  const {
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
  } = useCustomerQuestions();

  // Calculate the count of pending questions
  const pendingCount = questions?.filter(q => q.status === 'pending').length || 0;

  if (error) return <div className="p-4 text-red-500">Error loading questions: {error.message}</div>;

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
