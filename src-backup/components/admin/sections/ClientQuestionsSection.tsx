
import { useState } from "react";
import { useCustomerQuestions } from "./client-questions/useCustomerQuestions";
import { QuestionsTable } from "./client-questions/QuestionsTable";
import { QuestionFilters } from "./client-questions/QuestionFilters";
import { Input } from "@/components/ui/input";
import { CustomerQuestion } from './client-questions/types';
import { QuestionDetailsDialog } from './client-questions/QuestionDetailsDialog';

export const ClientQuestionsSection = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<CustomerQuestion | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { questions, isLoading, markAsAnswered, markAsIgnored, markAsSpam, deleteQuestion } = useCustomerQuestions();

  // Filter questions by status and search term
  const filteredQuestions = questions.filter((question) => {
    const matchesStatus = statusFilter === "all" || question.status === statusFilter;
    const matchesSearch = 
      question.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Count of pending questions for badge
  const pendingCount = questions.filter(q => q.status === 'pending').length;

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
    <div className="form-spacing-relaxed">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <QuestionFilters 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
          pendingCount={pendingCount}
        />
        <Input
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <QuestionsTable
        questions={filteredQuestions}
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
