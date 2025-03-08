
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ProfileErrorStateProps {
  /** Error message to display */
  message: string;
}

/**
 * ProfileErrorState Component
 * 
 * Displays an error state for the user profile
 * 
 * @param {ProfileErrorStateProps} props Component props
 * @returns {JSX.Element} Profile error state component
 */
export function ProfileErrorState({ message }: ProfileErrorStateProps): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center text-center">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
      <h2 className="text-xl font-semibold">Error Loading Profile</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{message}</p>
    </div>
  );
}
