
export interface TimeOption {
  hours: number;
  minutes: number;
  label: string;
}

export function generateTimeOptions(): TimeOption[] {
  const timeOptions: TimeOption[] = [];
  
  // Generate time options from 8am to 6pm
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute > 0) continue; // Don't add times after 6pm
      
      const periodLabel = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const minuteLabel = minute === 0 ? '00' : minute;
      
      timeOptions.push({
        hours: hour,
        minutes: minute,
        label: `${displayHour}:${minuteLabel} ${periodLabel}`
      });
    }
  }
  
  return timeOptions;
}
