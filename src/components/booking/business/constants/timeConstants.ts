
export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
] as const;

export const TIME_SLOTS = [
  { label: 'Anytime', value: 'anytime' },
  { label: 'Morning', value: 'morning', description: '7:00–12:00' },
  { label: 'Afternoon', value: 'afternoon', description: '12:00–17:00' },
  { label: 'Evening', value: 'evening', description: '17:00–20:00' }
] as const;
