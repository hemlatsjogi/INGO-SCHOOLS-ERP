import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Laptop } from 'lucide-react';
import { InteractiveFeatureShowcase } from './InteractiveFeatureShowcase';

interface KeyFeaturesPageProps {
  onOpenBooking: () => void;
}

export const KeyFeaturesPage: React.FC<KeyFeaturesPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full space-y-10 sm:space-y-14 py-4 sm:py-8">
      
      {/* ====================================================================
          1. KEY FEATURES HERO BANNER
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
        
       
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[3.85rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto"
        >
          <span>Intelligent Features for </span>
          <span className="relative inline-block text-blue-600">
            Smarter Schools
            {/* Playful Yellow Doodle Underline */}
            <svg
              className="absolute -bottom-2.5 left-0 w-[105%] h-4 overflow-visible pointer-events-none"
              viewBox="0 0 180 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 6 12 C 50 3, 130 4, 172 13 C 140 18, 70 17, 24 14"
                stroke="#F59E0B"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Discover how INGO Schools unifies student management, academic performance, automated attendance, fee collection, and real-time analytics under one beautifully designed experience.
        </motion.p>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm font-semibold text-slate-500"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant Real-Time Sync</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Bank-Grade Data Security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Laptop className="w-4 h-4 text-purple-500" />
            <span>100% Mobile &amp; Tablet Ready</span>
          </div>
        </motion.div>

      </section>

      {/* ====================================================================
          2. THE FLAGSHIP INTERACTIVE FEATURE SHOWCASE
             (6 Feature Cards + Smiling Boy Cutout + Bottom Dashboard CTA Banner)
         ==================================================================== */}
      <InteractiveFeatureShowcase onOpenBooking={onOpenBooking} />

    </div>
  );
};

export default KeyFeaturesPage;
