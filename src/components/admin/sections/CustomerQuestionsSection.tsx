
import React from 'react';
import { QuestionFilters } from './customer-questions/QuestionFilters';
import { QuestionsTable } from './customer-questions/QuestionsTable';
import { QuestionDetailsDialog } from './customer-questions/QuestionDetailsDialog';
import { useCustomerQuestions } from './customer-questions/useCustomerQuestions';

const CustomerQuestionsSection = () => {
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

  if (error) return <div className="p-4 text-red-500">Error loading questions: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Questions</h2>
        <QuestionFilters 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
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

export default CustomerQuestionsSection;
