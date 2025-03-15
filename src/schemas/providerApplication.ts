
import { z } from 'zod';
import { ApplicationStep } from '@/types/enums';

export { ApplicationStep };

export const personalInfoSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

export const documentsSchema = z.object({
  idDocument: z.string().min(1, { message: "ID document is required" }),
  proofOfAddress: z.string().min(1, { message: "Proof of address is required" }),
  backgroundCheck: z.boolean(),
});

export const experienceSchema = z.object({
  yearsOfExperience: z.number().min(0),
  specializations: z.array(z.string()),
  certifications: z.array(z.string()),
  availability: z.array(z.string()),
});

export const agreementSchema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, { 
    message: "You must accept the terms and conditions"
  }),
  privacyPolicyAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy"
  }),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type DocumentsFormValues = z.infer<typeof documentsSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type AgreementFormValues = z.infer<typeof agreementSchema>;

export const providerApplicationSchema = z.object({
  ...personalInfoSchema.shape,
  ...documentsSchema.shape,
  ...experienceSchema.shape,
  ...agreementSchema.shape,
});

export type ProviderApplicationFormValues = z.infer<typeof providerApplicationSchema>;
