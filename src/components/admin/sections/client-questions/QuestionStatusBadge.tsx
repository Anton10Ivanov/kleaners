
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface QuestionStatusBadgeProps {
  status: string;
  isSpam: boolean;
}

export const QuestionStatusBadge: React.FC<QuestionStatusBadgeProps> = ({ status, isSpam }) => {
  if (isSpam) return <Badge variant="destructive">Spam</Badge>;
  
  switch (status) {
    case 'pending':
      return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Pending</Badge>;
    case 'answered':
      return <Badge variant="success">Answered</Badge>;
    case 'ignored':
      return <Badge className="bg-gray-500">Ignored</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
