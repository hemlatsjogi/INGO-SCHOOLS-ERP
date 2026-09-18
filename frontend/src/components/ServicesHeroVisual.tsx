import React from 'react';
import { motion } from 'framer-motion';

export const ServicesHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      
      {/* 1. TOP-RIGHT WHIMSICAL DOODLE ARROW */}
      <div className="absolute -top-12 right-2 sm:right-6 w-16 h-16 pointer-events-none z-20 text-[#305C5A]">
        <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Loopy 3-loop spiral arrow */}
          <path
            d="M 15 50 C 12 30, 24 15, 36 22 C 44 28, 38 42, 28 36 C 20 30, 36 12, 52 14"
            stroke="#2A5855"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead */}
          <path
            d="M 44 8 L 54 14 L 46 22"
            stroke="#2A5855"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 2. MAIN STAIRCASE MOSAIC GRID (3 Rows x 3 Columns) */}
      <div className="relative grid grid-cols-12 gap-3 sm:gap-3.5 z-0 items-center">
        
        {/* ==================== ROW 1 ==================== */}
        {/* Row 1, Col 1: Left Teal Tile */}
        <div className="col-span-5 h-[105px] sm:h-[115px] bg-[#386663] rounded-2xl relative overflow-hidden border border-[#2f5754] shadow-sm">
          {/* Faint chalk math texture */}
          <span className="absolute top-2 left-3 text-[#588e8a] font-mono text-[11px] opacity-40">
            x² + y² = r²
          </span>
        </div>

        {/* Row 1, Col 2: Amber Card (3k / Highly Trained Teachers) */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-4 h-[105px] sm:h-[115px] bg-[#EFA023] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-center text-left shadow-md border border-amber-300/40 relative z-10"
        >
          <div className="text-2xl sm:text-3xl font-black text-white leading-none tracking-tight">
            3k
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-amber-50 mt-1.5 leading-snug">
            Highly Trained Teachers
          </div>
        </motion.div>

        {/* Row 1, Col 3: 3 Radiating Golden Sunburst Rays */}
        <div className="col-span-3 h-[105px] sm:h-[115px] flex items-center justify-center relative">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-14 h-14"
          >
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Ray 1 */}
              <line x1="16" y1="44" x2="6" y2="54" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
              {/* Ray 2 */}
              <line x1="28" y1="36" x2="38" y2="18" stroke="#F59E0B" strokeWidth="5.5" strokeLinecap="round" />
              {/* Ray 3 */}
              <line x1="42" y1="44" x2="56" y2="38" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* ==================== ROW 2 ==================== */}
        {/* Row 2, Col 1: Left Teal Tile */}
        <div className="col-span-5 h-[110px] sm:h-[120px] bg-[#386663] rounded-2xl relative overflow-hidden border border-[#2f5754] shadow-sm">
          {/* Faint chalk geometry arc */}
          <svg className="absolute bottom-2 left-2 w-16 h-16 text-[#588e8a] opacity-35" viewBox="0 0 50 50" fill="none">
            <path d="M 5 45 A 40 40 0 0 1 45 45" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="25" cy="25" r="8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Row 2, Col 2: Amber Card (300+ / Study Center Worldwide) */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-4 h-[110px] sm:h-[120px] bg-[#EFA023] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-center text-left shadow-md border border-amber-300/40 relative z-10"
        >
          <div className="text-2xl sm:text-3xl font-black text-white leading-none tracking-tight">
            300+
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-amber-50 mt-1.5 leading-snug">
            Study Center Worldwide
          </div>
        </motion.div>

        {/* Row 2, Col 3: Right Teal Tile with Chalk Doodles */}
        <div className="col-span-3 h-[110px] sm:h-[120px] bg-[#386663] rounded-2xl p-3 flex flex-col justify-center items-center relative overflow-hidden border border-[#2f5754] shadow-sm">
          <svg className="w-12 h-12 text-[#588e8a] opacity-65" viewBox="0 0 50 50" fill="none">
            <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="32" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M 28 36 C 24 30, 36 24, 38 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* ==================== ROW 3 ==================== */}
        {/* Row 3, Col 1: Left Teal Tile */}
        <div className="col-span-5 h-[115px] sm:h-[125px] bg-[#386663] rounded-2xl relative overflow-hidden border border-[#2f5754] shadow-sm">
          <span className="absolute bottom-3 left-4 text-[#588e8a] font-mono text-[11px] opacity-40">
            E = mc²
          </span>
        </div>

        {/* Row 3, Col 2: Amber Card (48+ / Country we Served) */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-4 h-[115px] sm:h-[125px] bg-[#EFA023] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-center text-left shadow-md border border-amber-300/40 relative z-10"
        >
          <div className="text-2xl sm:text-3xl font-black text-white leading-none tracking-tight">
            48+
          </div>
          <div className="text-[11px] sm:text-xs font-semibold text-amber-50 mt-1.5 leading-snug">
            Country we Served
          </div>
        </motion.div>

        {/* Row 3, Col 3: Right Teal Tile with Desktop Computer Chalk Doodle */}
        <div className="col-span-3 h-[115px] sm:h-[125px] bg-[#386663] rounded-2xl p-2.5 flex items-center justify-center relative overflow-hidden border border-[#2f5754] shadow-sm">
          <svg className="w-14 h-14 text-white/70" viewBox="0 0 60 60" fill="none">
            {/* Monitor screen */}
            <rect x="10" y="8" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="2.4" />
            {/* Screen inner lines */}
            <line x1="16" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            {/* Monitor stand & base */}
            <path d="M 30 38 L 30 46" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M 22 46 L 38 46" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            {/* Mini mouse doodle */}
            <rect x="44" y="44" width="8" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

      </div>

      {/* 3. STUDENT CUTOUT OVERLAY (Placed on left over teal tiles & partially amber cards) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-[-8px] sm:left-[-12px] w-[275px] sm:w-[325px] z-20 pointer-events-none"
      >
        <img
          src="/assets/indian_student_hero.svg"
          alt="Indian School Student - INGO Schools"
          className="w-full h-auto object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.25)]"
        />
      </motion.div>

    </div>
  );
};
