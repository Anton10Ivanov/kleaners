
import { addMinutes, format, parse, isAfter, isBefore } from 'date-fns';

// Generate time options in 30-minute intervals
export function generateTimeOptions() {
  const times = [];
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  
  for (let i = 6; i <= 22; i++) { // From 6:00 to 22:00
    for (let j = 0; j < 60; j += 30) { // 30 minute intervals
      const time = addMinutes(new Date(baseDate), i * 60 + j);
      times.push(format(time, 'HH:mm'));
    }
  }
  
  return times;
}

// Check if end time is before start time
export function isTimeBeforeStart(endTime: string, startTime: string) {
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  
  const startDate = parse(startTime, 'HH:mm', baseDate);
  const endDate = parse(endTime, 'HH:mm', baseDate);
  
  return isBefore(endDate, startDate) || endDate.getTime() === startDate.getTime();
}
