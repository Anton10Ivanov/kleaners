
import React from 'react';

interface BookingsHeaderProps {
  title: string;
  subtitle: string;
}

const BookingsHeader = ({ title, subtitle }: BookingsHeaderProps) => {
  return (
    <div className="mb-2 md:mb-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm md:text-base">
        {subtitle}
      </p>
    </div>
  );
};

export default BookingsHeader;
