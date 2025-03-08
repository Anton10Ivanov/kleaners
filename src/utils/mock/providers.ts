
import { MockProvider } from './types';

// Generate random mock providers
export const generateMockProviders = (count: number = 5): MockProvider[] => {
  const firstNames = ['Lisa', 'Mark', 'Anna', 'Tom', 'Maria', 'Alex', 'Jessica', 'Chris', 'Laura', 'Kevin'];
  const lastNames = ['Wilson', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Moore', 'Allen'];
  const specialtiesList = [
    'Regular Cleaning', 
    'Deep Cleaning', 
    'Move-In/Out Cleaning', 
    'Post-Construction Cleaning',
    'Office Cleaning',
    'Carpet Cleaning'
  ];
  const availabilities = ['Weekdays', 'Weekends', 'Evenings', 'Mornings', 'Afternoons'];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const specialtiesCount = Math.floor(Math.random() * 3) + 1;
    const availabilityCount = Math.floor(Math.random() * 3) + 1;
    
    // Randomly select specialties without duplication
    const specialties = [...specialtiesList]
      .sort(() => 0.5 - Math.random())
      .slice(0, specialtiesCount);
      
    // Randomly select availabilities without duplication
    const availability = [...availabilities]
      .sort(() => 0.5 - Math.random())
      .slice(0, availabilityCount);
    
    return {
      id: `prov-${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
      rating: (Math.floor(Math.random() * 10) + 40) / 10, // Rating between 4.0 and 5.0
      specialties,
      availability,
      active: Math.random() > 0.2 // 80% chance of being active
    };
  });
};
