
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  startIndex,
  endIndex,
  totalItems
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    
    if (totalPages <= maxPagesToShow) {
      // If there are fewer pages than maxPagesToShow, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page, last page, and current page
      pages.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
      
      // Add ellipsis before middle pages if necessary
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis after middle pages if necessary
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Add last page if not already included
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-500">
          {totalItems === 0 ? (
            <span>No items found</span>
          ) : (
            <span>Showing {totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
      <div className="text-sm text-gray-500">
        {totalItems > 0 ? (
          <span>
            Showing <span className="font-medium">{startIndex}</span> to{' '}
            <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{totalItems}</span> items
          </span>
        ) : (
          <span>No items found</span>
        )}
      </div>
      
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {pageNumbers.map((page, index) => (
          typeof page === 'number' ? (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              size="icon"
            >
              {page}
            </Button>
          ) : (
            <Button key={index} variant="outline" disabled size="icon">
              …
            </Button>
          )
        ))}
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
