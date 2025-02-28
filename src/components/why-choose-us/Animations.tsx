
import React from "react";

const Animations: React.FC = () => (
  <style>
    {`
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.7s ease-out forwards;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .drop-shadow-sm {
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));
    }
    
    .drop-shadow-md {
      filter: drop-shadow(0 2px 2px rgba(255,255,255,0.15));
    }
    `}
  </style>
);

export default Animations;
