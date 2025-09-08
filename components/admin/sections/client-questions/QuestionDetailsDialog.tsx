
import React from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QuestionStatusBadge } from './QuestionStatusBadge';
import { CustomerQuestion } from './types';

interface QuestionDetailsDialogProps {
  question: CustomerQuestion | null;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onStatusUpdate: (status: string) => void;
  onDeleteQuestion: () => void;
}

export const QuestionDetailsDialog: React.FC<QuestionDetailsDialogProps> = ({
  question,
  dialogOpen,
  setDialogOpen,
  onStatusUpdate,
  onDeleteQuestion
}) => {
  if (!question) return null;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Question Details</DialogTitle>
        </DialogHeader>
        
        <div className="form-spacing-relaxed mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">From:</h3>
              <p>{question.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email:</h3>
              <p>{question.email}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold">Question:</h3>
            <p className="whitespace-pre-wrap border card-spacing-xs rounded-md bg-gray-50 dark:bg-gray-900 min-h-[100px]">
              {question.question}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Date:</h3>
              <p>{format(new Date(question.created_at), 'PPpp')}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status:</h3>
              <p><QuestionStatusBadge status={question.status} isSpam={question.is_spam} /></p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">IP Address:</h3>
              <p>{question.ip_address || 'Not captured'}</p>
            </div>
            <div>
              <h3 className="font-semibold">User Agent:</h3>
              <p className="truncate">{question.user_agent || 'Not captured'}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-wrap gap-2 mt-4">
          <Button 
            onClick={() => onStatusUpdate('answered')}
            variant="outline"
            className="bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800"
          >
            Mark as Answered
          </Button>
          <Button 
            onClick={() => onStatusUpdate('ignored')}
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Ignore
          </Button>
          <Button 
            onClick={() => onStatusUpdate('spam')}
            variant="outline"
            className="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"
          >
            Mark as Spam
          </Button>
          <Button 
            onClick={onDeleteQuestion}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
