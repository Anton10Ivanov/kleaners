
import { useState, useEffect } from "react";
import { ProfileSection } from "@/components/provider/profile/ProfileCompletionIndicator";

export const useProfileCompletion = (profile: any) => {
  const [profileSections, setProfileSections] = useState<ProfileSection[]>([]);

  useEffect(() => {
    if (!profile) return;

    const sections: ProfileSection[] = [
      {
        name: "Contact Information",
        isComplete: Boolean(profile.email && profile.phone),
        weight: 15
      },
      {
        name: "Personal Details",
        isComplete: Boolean(profile.first_name && profile.last_name),
        weight: 15
      },
      {
        name: "Professional Experience",
        isComplete: Boolean(profile.experience && profile.experience.length > 0),
        weight: 15
      },
      {
        name: "Skills",
        isComplete: Array.isArray(profile.skills) && profile.skills.length > 0,
        weight: 15
      },
      {
        name: "Availability",
        isComplete: Array.isArray(profile.availability) && profile.availability.length > 0,
        weight: 15
      },
      {
        name: "Payment Information",
        isComplete: Boolean(profile.paymentInfo && 
          (profile.paymentInfo.payment_method === 'bank_transfer' ? 
            (profile.paymentInfo.bank_name && profile.paymentInfo.account_name && profile.paymentInfo.iban) : 
            profile.paymentInfo.paypal_email)),
        weight: 15
      },
      {
        name: "Profile Picture",
        isComplete: Boolean(profile.avatar_url),
        weight: 10
      }
    ];

    setProfileSections(sections);
  }, [profile]);

  return profileSections;
};
