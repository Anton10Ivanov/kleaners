
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 mt-1 mb-2 px-4">
      <div className="text-xs text-muted-foreground">Someone is typing</div>
      <div className="flex space-x-1">
        <div className="h-1.5 w-1.5 bg-primary/70 rounded-full animate-pulse"></div>
        <div className="h-1.5 w-1.5 bg-primary/70 rounded-full animate-pulse delay-150"></div>
        <div className="h-1.5 w-1.5 bg-primary/70 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
