
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  provider: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ provider }) => {
  return (
    <div className="relative pb-0">
      <div className="absolute inset-0 h-40 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-lg" />
      <div className="relative z-10 flex flex-col items-center pt-8">
        <Avatar className="h-24 w-24 ring-4 ring-white bg-white">
          <AvatarImage src={provider?.avatar_url || "/placeholder.svg"} alt={provider?.first_name} />
          <AvatarFallback className="bg-primary text-white">
            {provider?.first_name?.charAt(0)}{provider?.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold text-center text-white">
          {provider?.first_name} {provider?.last_name}
        </h1>
        <div className="mt-1 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
          <p className="text-white font-medium">
            {provider?.position || "Cleaning Professional"}
          </p>
        </div>
      </div>
    </div>
  );
};
