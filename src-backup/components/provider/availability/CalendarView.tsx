
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Plus, Save, Trash2 } from 'lucide-react';
import { TimeRangeSelector } from './TimeRangeSelector';

interface CalendarViewProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  unavailableDates: Date[];
  toggleDateUnavailable: (date: Date) => void;
  saveAvailability: () => void;
}

export const CalendarView = ({
  selectedDate,
  setSelectedDate,
  unavailableDates,
  toggleDateUnavailable,
  saveAvailability
}: CalendarViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Select Dates
            </CardTitle>
            <CardDescription>Mark days as unavailable</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                unavailable: unavailableDates,
              }}
              modifiersStyles={{
                unavailable: { backgroundColor: '#FEE2E2', color: '#991B1B' },
              }}
            />
            
            <div className="mt-4 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => selectedDate && toggleDateUnavailable(selectedDate)}
              >
                {selectedDate && unavailableDates.some(d => d.toDateString() === selectedDate.toDateString())
                  ? 'Mark as Available'
                  : 'Mark as Unavailable'
                }
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={saveAvailability}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a Date'}
            </CardTitle>
            <CardDescription>
              {selectedDate && unavailableDates.some(d => d.toDateString() === selectedDate.toDateString())
                ? 'You are unavailable on this date'
                : 'Manage your availability for this date'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate && unavailableDates.some(d => d.toDateString() === selectedDate.toDateString()) ? (
              <div className="section-spacing-md text-center">
                <p className="text-muted-foreground">You have marked this date as unavailable</p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => toggleDateUnavailable(selectedDate)}
                >
                  Make Available
                </Button>
              </div>
            ) : (
              <div className="form-spacing-relaxed">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Available Time Slots</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {/* Add time slot */}}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Time Slot
                  </Button>
                </div>
                
                <div className="form-spacing-tight">
                  <TimeRangeSelector />
                  <TimeRangeSelector />
                </div>
                
                <Button onClick={saveAvailability}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
