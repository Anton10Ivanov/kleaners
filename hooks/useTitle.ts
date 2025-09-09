'use client'


import { useEffect } from 'react';

/**
 * Hook to set the document title
 * 
 * @param title - The title to set for the page
 */
export function useTitle(title: string): void {
  useEffect(() => {
    // Set the document title
    const previousTitle = document.title;
    document.title = title;
    
    // Restore the previous title when the component unmounts
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
