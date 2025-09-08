
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingsPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  isMobile: boolean;
  onPageChange: (page: number) => void;
}

export const BookingsPagination: React.FC<BookingsPaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  isMobile,
  onPageChange,
}) => {
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 flex-wrap gap-y-4">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
        <span className="font-medium">{endIndex}</span> of{" "}
        <span className="font-medium">{totalItems}</span> bookings
      </div>
      
      {isMobile ? (
        <div className="flex space-x-2 w-full justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center px-2">
            <span className="text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
