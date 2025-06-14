
import { memo } from "react";
import { motion } from "framer-motion";

interface HeroContentProps {
  isMobile: boolean;
}

export const HeroContent = memo(({ isMobile }: HeroContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className={`space-y-6 max-w-xl ${isMobile ? 'mx-auto text-center' : 'text-left'}`}
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`${isMobile ? 'text-3xl md:text-4xl text-center' : 'text-5xl xl:text-6xl text-left'} font-black leading-tight text-gray-900 font-['Inter']`}
      >
        Professional{" "}
        <span className="text-primary font-extrabold">Cleaning Services</span>{" "}
        Near You
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`${isMobile ? 'text-base text-center' : 'text-xl text-left'} text-gray-600 font-medium leading-relaxed`}
      >
        Book trusted, insured cleaning professionals in minutes. 
        <br className="hidden lg:block" />
        Instant quotes, flexible scheduling, satisfaction guaranteed.
      </motion.p>

      {/* Trust indicators - simplified for professional look */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`flex ${isMobile ? 'justify-center' : 'justify-start'} items-center gap-6 pt-2`}
      >
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(i => (
              <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">4.9/5 from 2,300+ customers</span>
        </div>
        
        <div className="h-4 w-px bg-gray-300"></div>
        
        <div className="text-sm font-semibold text-gray-700">
          Fully Insured & Bonded
        </div>
      </motion.div>
    </motion.div>
  );
});

HeroContent.displayName = "HeroContent";
