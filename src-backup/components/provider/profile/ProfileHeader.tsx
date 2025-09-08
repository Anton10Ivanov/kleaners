
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  provider: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ provider }) => {
  return (
    <div className="relative pb-0">
      <div className="absolute inset-0 h-40 bg-gradient-to-r from-primary/80 to-accent rounded-t-lg" />
      
      <div className="relative z-10 flex flex-col items-center pt-8">
        <Avatar className="h-24 w-24 ring-4 ring-white bg-white shadow-lg">
          <AvatarImage 
            src={provider?.avatar_url || "/placeholder.svg"} 
            alt={provider?.first_name} 
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
            {provider?.first_name?.charAt(0)}{provider?.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <h1 className="mt-4 text-2xl font-bold text-center text-white drop-shadow-sm">
          {provider?.first_name} {provider?.last_name}
        </h1>
        
        <div className="mt-2 flex gap-2">
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-none shadow-sm">
            {provider?.position || "Cleaning Professional"}
          </Badge>
          
          {provider?.verified && (
            <Badge variant="secondary" className="bg-green-500/90 backdrop-blur-sm text-white border-none">
              Verified
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
