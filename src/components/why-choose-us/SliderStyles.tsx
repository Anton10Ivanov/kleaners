
import React from "react";

export const SliderStyles = () => {
  return (
    <>
      <style jsx="true">{`
        .slick-dots {
          bottom: -30px;
          padding: 10px 0;
        }
        .slick-dots li {
          margin: 0 5px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slick-dots li button:before {
          display: none;
        }
        .slick-prev, .slick-next {
          width: 40px;
          height: 40px;
          z-index: 10;
        }
        .slick-prev {
          left: -10px;
        }
        .slick-next {
          right: -10px;
        }
        .slick-prev:before, .slick-next:before {
          font-size: 40px;
          color: #7ebce6;
          opacity: 0.75;
        }
        .slick-prev:hover:before, .slick-next:hover:before {
          opacity: 1;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
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
        
        /* Mobile touch optimizations */
        @media (max-width: 768px) {
          .slick-dots li {
            width: 30px;
            height: 30px;
          }
          .slick-slide {
            touch-action: pan-y;
          }
          /* Larger tap targets */
          .slick-prev, .slick-next {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
      
      {/* Mobile cards view (as fallback if slider doesn't work) */}
      <style jsx="true">{`
        .slick-container {
          visibility: visible !important;
        }
        @media (max-width: 768px) {
          .slick-slider.slick-initialized {
            visibility: visible !important;
          }
        }
      `}</style>
    </>
  );
};
