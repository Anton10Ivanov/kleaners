
import { useState } from "react";
import { useCustomerQuestions } from "./client-questions/useCustomerQuestions";
import { QuestionsTable } from "./client-questions/QuestionsTable";
import { QuestionFilters } from "./client-questions/QuestionFilters";
import { Input } from "@/components/ui/input";
import { CustomerQuestion } from './client-questions/types';

export const ClientQuestionsSection = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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

  return (
    <div className="space-y-4">
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
        onViewQuestion={(question: CustomerQuestion) => {}}
      />
    </div>
  );
};
