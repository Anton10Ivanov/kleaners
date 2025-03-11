
import React from 'react';

interface BookingsHeaderProps {
  title: string;
  subtitle: string;
}

const BookingsHeader = ({ title, subtitle }: BookingsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

export default BookingsHeader;
