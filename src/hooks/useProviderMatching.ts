
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BookingFormData } from '@/schemas/booking';

export interface Provider {
  id: string;
  name: string;
  rating?: number;
  skills: string[];
  availability: {
    day: string;
    timeSlots: string[];
  }[];
  postalCodes: string[];
  travelDistance: number;
}

interface MatchingResult {
  providers: Provider[];
  isLoading: boolean;
  error: Error | null;
  findMatchingProviders: (bookingData: BookingFormData) => Promise<Provider[]>;
}

export function useProviderMatching(): MatchingResult {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const calculateCompatibilityScore = (
    provider: any, 
    bookingData: BookingFormData
  ): number => {
    let score = 0;
    
    // Check if provider serves this postal code (0-40 points)
    const postalCodeMatch = provider.service_areas?.some(
      (area: any) => area.postal_code === bookingData.postalCode
    );
    
    if (postalCodeMatch) {
      score += 40;
    } else {
      // Check if within travel distance (partial points)
      // This would require geocoding in a real implementation
      score += 20; // Simplified example
    }
    
    // Check if provider has the required skills (0-30 points)
    const serviceTypeSkills: Record<string, string[]> = {
      'regular': ['Residential Cleaning', 'Deep Cleaning'],
      'deep': ['Deep Cleaning', 'Residential Cleaning'],
      'move_in_out': ['Move In/Out Cleaning', 'Deep Cleaning'],
      'business': ['Commercial Cleaning', 'Office Cleaning']
    };
    
    const requiredSkills = serviceTypeSkills[bookingData.service as keyof typeof serviceTypeSkills] || [];
    
    const skillsMatched = provider.skills?.filter(
      (skill: string) => requiredSkills.includes(skill)
    ).length || 0;
    
    const skillScore = (skillsMatched / requiredSkills.length) * 30;
    score += skillScore;
    
    // Check availability match (0-20 points)
    // Simplified implementation - would need more complex logic for real scheduling
    let availabilityScore = 0;
    if (bookingData.weekdayPreference) {
      const dayAvailable = provider.availability?.some(
        (slot: any) => slot.day.toLowerCase() === bookingData.weekdayPreference?.toLowerCase()
      );
      
      if (dayAvailable) {
        availabilityScore += 10;
        
        // Check time preference
        if (bookingData.timePreference) {
          const timeAvailable = provider.availability?.some(
            (slot: any) => 
              slot.day.toLowerCase() === bookingData.weekdayPreference?.toLowerCase() &&
              slot.time_slots?.includes(bookingData.timePreference)
          );
          
          if (timeAvailable) {
            availabilityScore += 10;
          }
        } else {
          availabilityScore += 5; // Partial points if no specific time preference
        }
      }
    } else {
      availabilityScore += 10; // Default points if client has no specific day preference
    }
    
    score += availabilityScore;
    
    // Provider rating (0-10 points)
    if (provider.rating) {
      score += provider.rating * 2; // Rating usually 0-5, multiply by 2 for 0-10 scale
    } else {
      score += 5; // Default middle score for providers without ratings
    }
    
    return score;
  };

  const findMatchingProviders = async (bookingData: BookingFormData): Promise<Provider[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would query the database
      // For demo purposes, using mock data
      
      // This would be the actual Supabase query in production:
      /*
      const { data: availableProviders, error } = await supabase
        .from('service_providers')
        .select(`
          id, 
          first_name, 
          last_name,
          rating,
          skills,
          service_provider_availability (
            day,
            time_slots
          ),
          service_provider_areas (
            postal_code,
            travel_distance
          )
        `)
        .eq('status', 'active');
      
      if (error) throw error;
      */
      
      // For demo purposes - mock data
      const mockProviders = [
        {
          id: "1",
          first_name: "Maria",
          last_name: "Garcia",
          rating: 4.8,
          skills: ["Residential Cleaning", "Deep Cleaning", "Move In/Out Cleaning"],
          availability: [
            { day: "Monday", time_slots: ["morning", "afternoon"] },
            { day: "Wednesday", time_slots: ["morning", "afternoon", "evening"] },
            { day: "Friday", time_slots: ["morning", "afternoon"] }
          ],
          service_areas: [
            { postal_code: "12345", travel_distance: 15 },
            { postal_code: "23456", travel_distance: 10 }
          ]
        },
        {
          id: "2",
          first_name: "John",
          last_name: "Smith",
          rating: 4.5,
          skills: ["Commercial Cleaning", "Office Cleaning", "Deep Cleaning"],
          availability: [
            { day: "Tuesday", time_slots: ["morning", "afternoon"] },
            { day: "Thursday", time_slots: ["afternoon", "evening"] },
            { day: "Saturday", time_slots: ["morning"] }
          ],
          service_areas: [
            { postal_code: "34567", travel_distance: 20 },
            { postal_code: "45678", travel_distance: 15 }
          ]
        },
        {
          id: "3",
          first_name: "Sophie",
          last_name: "Chen",
          rating: 4.9,
          skills: ["Deep Cleaning", "Residential Cleaning", "Move In/Out Cleaning"],
          availability: [
            { day: "Monday", time_slots: ["afternoon"] },
            { day: "Wednesday", time_slots: ["morning", "afternoon"] },
            { day: "Friday", time_slots: ["morning", "afternoon", "evening"] }
          ],
          service_areas: [
            { postal_code: "12345", travel_distance: 25 },
            { postal_code: "23456", travel_distance: 20 }
          ]
        }
      ];
      
      // Calculate compatibility score for each provider
      const rankedProviders = mockProviders
        .map(provider => ({
          provider,
          score: calculateCompatibilityScore(provider, bookingData)
        }))
        .sort((a, b) => b.score - a.score);
      
      // Format provider data for display
      const formattedProviders = rankedProviders.map(({ provider }) => ({
        id: provider.id,
        name: `${provider.first_name} ${provider.last_name}`,
        rating: provider.rating,
        skills: provider.skills,
        availability: provider.availability.map(slot => ({
          day: slot.day,
          timeSlots: slot.time_slots
        })),
        postalCodes: provider.service_areas.map(area => area.postal_code),
        travelDistance: Math.max(...provider.service_areas.map(area => area.travel_distance || 0))
      }));
      
      // Update state with matched providers
      setProviders(formattedProviders);
      
      // Return the results for immediate use
      return formattedProviders;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to find matching providers');
      setError(error);
      console.error('Error finding matching providers:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    providers,
    isLoading,
    error,
    findMatchingProviders
  };
}
