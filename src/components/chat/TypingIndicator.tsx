
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TypingIndicatorProps {
  isTyping: boolean;
  name?: string;
  className?: string;
}

export const TypingIndicator = ({ isTyping, name, className }: TypingIndicatorProps) => {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    if (!isTyping) return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, [isTyping]);
  
  if (!isTyping) return null;
  
  return (
    <div className={cn(
      "flex items-center text-sm text-muted-foreground animate-pulse",
      className
    )}>
      <span className="mr-1">{name || 'Someone'} is typing</span>
      <span className="w-6 text-left">{dots}</span>
    </div>
  );
};
