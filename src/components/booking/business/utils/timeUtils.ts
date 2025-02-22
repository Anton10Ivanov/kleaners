
export const orderDaysChronologically = (selectedDays: string[], allDays: string[]) => {
  return selectedDays.sort((a, b) => allDays.indexOf(a) - allDays.indexOf(b));
};

export const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 7; hour <= 20; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    times.push(`${formattedHour}:00`);
    times.push(`${formattedHour}:30`);
  }
  return times;
};
