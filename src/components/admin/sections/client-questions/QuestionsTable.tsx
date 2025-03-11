
import React from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { QuestionStatusBadge } from './QuestionStatusBadge';
import { CustomerQuestion } from './types';

interface QuestionsTableProps {
  questions: CustomerQuestion[] | null;
  isLoading: boolean;
  onViewQuestion: (question: CustomerQuestion) => void;
}

export const QuestionsTable: React.FC<QuestionsTableProps> = ({ 
  questions, 
  isLoading, 
  onViewQuestion 
}) => {
  if (isLoading) return <div className="p-4">Loading customer questions...</div>;

  return (
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
                  <QuestionStatusBadge status={question.status} isSpam={question.is_spam} />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewQuestion(question)}
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
  );
};
