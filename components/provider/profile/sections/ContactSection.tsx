
import React from "react";
import { Mail, Phone, User } from "lucide-react";
import { Separator } from '@/components/ui/separator';

interface ContactSectionProps {
  provider: any;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ provider }) => {
  return (
    <div className="form-spacing-tight">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        Contact Information
      </h2>
      <Separator />
      <div className="form-spacing-normal pt-2">
        <div className="flex items-start gap-2">
          <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{provider?.email}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p>{provider?.phone || "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
