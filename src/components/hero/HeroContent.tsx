
import { memo } from "react";
import { motion } from "framer-motion";

interface HeroContentProps {
  isMobile: boolean;
}

export const HeroContent = memo(({ isMobile }: HeroContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`space-y-8 max-w-2xl ${isMobile ? 'mx-auto text-center' : 'text-left'}`}
    >
      <motion.h1 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className={`${isMobile ? 'text-4xl md:text-5xl text-center' : 'text-5xl xl:text-6xl text-left'} font-bold leading-[1.1] text-gray-900 font-['Inter'] tracking-tight`}
      >
        Professional Cleaning{" "}
        <span className="text-primary font-bold">
          Made Simple
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className={`${isMobile ? 'text-lg text-center' : 'text-xl text-left'} text-muted-foreground font-medium leading-relaxed max-w-xl`}
      >
        Book trusted, insured cleaning professionals in minutes.
        <br className="hidden lg:block" />
        Instant quotes, flexible scheduling, guaranteed satisfaction.
      </motion.p>

      {/* Enhanced trust indicators with better visual hierarchy */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className={`flex ${isMobile ? 'justify-center' : 'justify-start'} items-center gap-8 pt-4`}
      >
        <div className="flex items-center gap-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.svg 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">4.9/5 from 2,300+ customers</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Available today</span>
        </div>
      </motion.div>
    </motion.div>
  );
});

HeroContent.displayName = "HeroContent";
