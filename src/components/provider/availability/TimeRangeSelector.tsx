
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateTimeOptions, isTimeBeforeStart } from '../../../utils/timeUtils';

interface TimeRangeSelectorProps {
  startTime?: string;
  endTime?: string;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  onDelete?: () => void;
}

export const TimeRangeSelector = ({
  startTime = '09:00',
  endTime = '17:00',
  onStartChange,
  onEndChange,
  onDelete
}: TimeRangeSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Select 
        value={startTime}
        onValueChange={onStartChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Start" />
        </SelectTrigger>
        <SelectContent>
          {generateTimeOptions().map(time => (
            <SelectItem key={`slot-start-${time}`} value={time}>{time}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <span>to</span>
      
      <Select 
        value={endTime}
        onValueChange={onEndChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="End" />
        </SelectTrigger>
        <SelectContent>
          {generateTimeOptions().map(time => (
            <SelectItem 
              key={`slot-end-${time}`} 
              value={time}
              disabled={isTimeBeforeStart(time, startTime)}
            >
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
};
