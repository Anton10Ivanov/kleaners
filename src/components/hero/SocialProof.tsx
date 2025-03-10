
import { memo } from "react";

export const SocialProof = memo(() => {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <div className="flex -space-x-2">
        <img 
          src="https://randomuser.me/api/portraits/women/44.jpg" 
          className="w-7 h-7 rounded-full border-2 border-white" 
          alt="Customer" 
        />
        <img 
          src="https://randomuser.me/api/portraits/men/86.jpg" 
          className="w-7 h-7 rounded-full border-2 border-white" 
          alt="Customer" 
        />
        <img 
          src="https://randomuser.me/api/portraits/women/24.jpg" 
          className="w-7 h-7 rounded-full border-2 border-white" 
          alt="Customer" 
        />
      </div>
      <span className="text-xs text-gray-500">Trusted by 2,300+ customers</span>
    </div>
  );
});

SocialProof.displayName = "SocialProof";
