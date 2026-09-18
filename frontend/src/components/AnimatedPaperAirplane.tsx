import React, { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface AnimatedPaperAirplaneProps {
  className?: string;
}

export const AnimatedPaperAirplane: React.FC<AnimatedPaperAirplaneProps> = ({ className = '' }) => {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  // Trigger playful loop-de-loop on click
  const handleLoopTrick = async () => {
    await controls.start({
      rotate: [0, -25, 360, 340, 0],
      scale: [1, 1.25, 1.15, 0.95, 1],
      transition: { duration: 1.2, ease: "easeInOut" }
    });
  };

  return (
    <div className={`relative pointer-events-auto select-none ${className}`}>
      {/* SVG Flight Trail Container */}
      <svg
        className="absolute -top-16 -left-20 w-72 h-64 overflow-visible pointer-events-none z-0"
        viewBox="0 0 280 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle Background Glow Path */}
        <path
          d="M 20 180 C 15 140, 45 105, 75 125 C 105 145, 80 195, 125 170 C 175 140, 160 80, 220 50"
          stroke="rgba(59, 130, 246, 0.18)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Animated Dashed Flight Path Trail */}
        <motion.path
          d="M 20 180 C 15 140, 45 105, 75 125 C 105 145, 80 195, 125 170 C 175 140, 160 80, 220 50"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0.3, 1, 0.8, 1],
            strokeDashoffset: [0, -48],
            opacity: 1
          }}
          transition={{
            strokeDashoffset: { repeat: Infinity, duration: 1.6, ease: "linear" },
            pathLength: { duration: 1.5, ease: "easeInOut" },
            opacity: { duration: 0.8 }
          }}
        />

        {/* Motion trail secondary swirls */}
        <motion.circle
          cx="20"
          cy="180"
          r="3"
          fill="#60A5FA"
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="75"
          cy="125"
          r="2.5"
          fill="#3B82F6"
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 0.3 }}
        />
      </svg>

      {/* Floating and Soaring Paper Airplane Element */}
      <motion.div
        className="relative z-10 cursor-pointer group"
        onClick={handleLoopTrick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          x: [0, 18, 6, -12, 0],
          y: [0, -16, -26, -10, 0],
          rotate: [0, 8, -4, 5, 0],
          scale: [1, 1.04, 0.98, 1.02, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 5.5,
          ease: "easeInOut"
        }}
      >
        <motion.div animate={controls}>
          {/* Hand-drawn / Geometric Paper Airplane SVG matching image */}
          <div className="relative transform -rotate-12 transition-transform duration-300 group-hover:scale-110">
            <img
              src="/assets/airplane-cursor-cropped.svg"
              alt="INGO Paper Airplane"
              className="w-[78px] h-auto object-contain drop-shadow-xl filter transition-all duration-300 group-hover:drop-shadow-2xl select-none pointer-events-none"
              draggable={false}
            />

            {/* Micro wind gusts / speed streaks on hover */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute -bottom-1 -left-5 text-[10px] font-bold text-blue-500 tracking-wider bg-blue-50/90 px-2 py-0.5 rounded-full shadow-sm border border-blue-200 pointer-events-none whitespace-nowrap"
              >
                Click for loop! ✨
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
