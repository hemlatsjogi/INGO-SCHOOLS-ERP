import React from 'react';
import { motion } from 'framer-motion';

export const DoodleAccents: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Origami Facets Bursting Behind Schoolgirl */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] max-w-full">
        {/* Emerald Green Origami Triangle (Left of uniform) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 0.92, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute left-[-20px] top-[140px] w-0 h-0 border-l-[65px] border-l-transparent border-r-[65px] border-r-transparent border-b-[160px] border-b-[#10B981] transform -rotate-[42deg] filter drop-shadow-sm"
        />

        {/* Cyan / Sky Blue Origami Shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="absolute left-[-45px] top-[240px] w-0 h-0 border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[110px] border-l-[#0284C7] transform rotate-[18deg]"
        />

        {/* Magenta / Hot Pink Origami Triangle (Right behind books) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 0.95, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="absolute right-[40px] top-[130px] w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[180px] border-b-[#EC4899] transform rotate-[32deg] filter drop-shadow-sm"
        />

        {/* Deep Violet / Royal Blue Origami Triangle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="absolute right-[10px] top-[220px] w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[150px] border-b-[#6366F1] transform rotate-[58deg]"
        />

        {/* Sun Yellow Accent Triangle (Top right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute right-[90px] top-[60px] w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[95px] border-b-[#FBBF24] transform rotate-[25deg]"
        />
      </div>

      {/* 2. Hand-drawn Doodle Star (Beside schoolgirl elbow/waist) */}
      <motion.div
        className="absolute right-[360px] top-[420px] w-12 h-12 z-20"
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{
          opacity: 1,
          scale: [1, 1.15, 1],
          rotate: [0, 8, -6, 0]
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.7 },
          scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <path
            d="M 50 15 L 61 38 L 86 41 L 67 58 L 72 83 L 50 70 L 28 83 L 33 58 L 14 41 L 39 38 Z"
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FEF3C7"
            fillOpacity="0.75"
          />
        </svg>
      </motion.div>

      {/* 3. Radiant Doodle Sunburst Tick Marks (Top right over girl's shoulder) */}
      <motion.div
        className="absolute right-[110px] top-[110px] w-16 h-16 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.line
            x1="20" y1="60" x2="35" y2="40"
            stroke="#F97316"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ strokeWidth: [3, 4.5, 3] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
          <motion.line
            x1="45" y1="50" x2="65" y2="25"
            stroke="#F97316"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ strokeWidth: [3, 4.5, 3] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
          />
          <motion.line
            x1="10" y1="35" x2="25" y2="15"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeLinecap="round"
            animate={{ strokeWidth: [2.5, 4, 2.5] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.6 }}
          />
        </svg>
      </motion.div>

      {/* 4. Decorative Dots Grid (Bottom Right) */}
      <div className="absolute right-6 bottom-4 grid grid-cols-6 gap-2.5 opacity-60 z-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
        ))}
      </div>

      {/* 5. Soft Translucent Pastel Triangle (Bottom Left Ambient) */}
      <div className="absolute -left-12 bottom-0 w-44 h-44 opacity-25">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <polygon points="10,90 90,90 50,20" fill="url(#pastel-grad)" />
          <defs>
            <linearGradient id="pastel-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 6. Subtle Top-Right Ambient Glow Circle */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
