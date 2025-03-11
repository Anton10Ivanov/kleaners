
import { z } from 'zod';

// Define application steps enum
export enum ApplicationStep {
  PERSONAL_INFO = 0,
  EXPERIENCE = 1,
  DOCUMENTS = 2,
  CONFIRMATION = 3
}

// Define the form schema with Zod
export const joinTeamSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  experience: z.enum(['less-than-1', '1-3', '3-5', 'more-than-5']),
  availability: z.enum(['part-time', 'full-time', 'weekends-only']),
  resume: z.any().optional(),
  hasOwnTransportation: z.boolean(),
  hasOwnEquipment: z.boolean(),
  hasCleaningCertificates: z.boolean(),
  hasCriminalRecord: z.boolean().default(false),
  message: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Infer the type from the schema
export type JoinTeamFormData = z.infer<typeof joinTeamSchema>;
