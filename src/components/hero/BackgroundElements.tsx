
import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundElements = () => {
  return (
    <>
      {/* Mobile gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#1a2234] md:hidden" />
      
      {/* Desktop gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#14213c] to-[#162442] hidden md:block" />
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Left floating element */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute left-10 top-40 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl hidden md:block"
      />
      
      {/* Right floating element */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute right-10 top-60 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl hidden md:block"
      />
      
      {/* Bottom floating element */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-full blur-3xl hidden md:block"
      />
      
      {/* Main hero background image with proper spacing from navbar */}
      <div className="absolute inset-0 z-0 hidden md:block pt-20">
        <img 
          src="/lovable-uploads/opciya1 (1) 2.png"
          className="w-full h-full object-cover opacity-10"
          alt=""
        />
      </div>
    </>
  );
};
