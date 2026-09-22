import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialLoaderProps {
  onComplete?: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        // Accelerating ease
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(12, Math.round(remaining * 0.14)));
        return prev + step;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="ingo-screen-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#091428] overflow-hidden select-none"
        >
          {/* Ambient Glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-[360px] h-[360px] bg-sky-400/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Animated Origami Paper Airplane Gliding & Looping */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              {/* Pulsing Flight Aura */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
              />

              {/* Dotted Orbit Path */}
              <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  strokeOpacity="0.4"
                  className="animate-spin"
                  style={{ animationDuration: '8s' }}
                />
              </svg>

              {/* Soaring Paper Airplane */}
              <motion.div
                animate={{
                  x: [0, 8, -6, 4, 0],
                  y: [-4, 6, -6, 2, -4],
                  rotate: [-12, -4, -18, -8, -12],
                }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <img
                  src="/assets/airplane-cursor-pointing.png"
                  alt="Loading Airplane"
                  className="w-20 h-20 object-contain drop-shadow-[0_10px_20px_rgba(37,99,235,0.6)]"
                />
              </motion.div>
            </div>

            {/* School Logo & Title */}
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white">
                INGO<span className="text-blue-500 font-extrabold">SCHOOLS</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-[10px] font-black text-sky-400 tracking-widest uppercase">
                ERP
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-medium mb-6">
              Powering the Future of School Management
            </p>

            {/* Sleek Progress Bar */}
            <div className="w-56 sm:w-64 h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50 shadow-inner relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Percentage & Status */}
            <div className="flex items-center justify-between w-56 sm:w-64 mt-3 text-xs text-slate-400">
              <span className="font-mono font-medium text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                Preparing portal...
              </span>
              <span className="font-mono font-bold text-white text-xs">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
