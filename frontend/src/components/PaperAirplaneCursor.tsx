import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  time: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

// Visual dimensions calibrated to exact user origami airplane illustration (cropped 794x745)
// Apex nose hotspot in crop is at X=785 (98.87%), Y=4 (0.54%)
const PLANE_WIDTH = 52;
const PLANE_HEIGHT = Math.round(PLANE_WIDTH * (745 / 794)); // ~49px
const NOSE_X = Math.round(PLANE_WIDTH * (785 / 794)); // ~51px
const NOSE_Y = Math.round(PLANE_HEIGHT * (4 / 745)); // ~0px

export const PaperAirplaneCursor: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ingo_airplane_cursor');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [bankingAngle, setBankingAngle] = useState(0);
  const [isHoveringPointer, setIsHoveringPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);

  // High precision position and physics refs
  const currentPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const currentBank = useRef(0);
  const animFrameId = useRef<number | null>(null);
  const pointCounter = useRef(0);
  const lastTrailTime = useRef(0);

  // Toggle handler
  const toggleCursor = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('ingo_airplane_cursor', String(next));
  };

  // Sync body cursor classes
  useEffect(() => {
    if (enabled && isVisible) {
      document.documentElement.classList.add('custom-cursor-active');
      document.body.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
    }
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled, isVisible]);

  useEffect(() => {
    // Only activate custom cursor on devices with fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable / interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], [onclick], .cursor-pointer, .interactive-hover')
        );
        setIsHoveringPointer(isInteractive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const newRipple: ClickRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClickRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Highly responsive physics animation loop
    const updatePhysics = () => {
      const now = performance.now();
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const speed = Math.hypot(dx, dy);

      // Tight interpolation for instantaneous responsiveness with smooth flight feeling
      currentPos.current.x += dx * 0.72;
      currentPos.current.y += dy * 0.72;

      // Realistic airplane banking into curves
      // Tilt slightly when moving left/right or up/down, smoothly easing to rest
      const targetBank = Math.max(-20, Math.min(20, dx * 0.42 + dy * 0.12));
      currentBank.current += (targetBank - currentBank.current) * 0.18;

      setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
      setBankingAngle(currentBank.current);

      // Stream contrail points behind the tail swooshes while in flight
      if (speed > 2.5 && now - lastTrailTime.current > 38) {
        lastTrailTime.current = now;
        pointCounter.current += 1;

        // Tail location relative to plane nose
        const tailX = currentPos.current.x - NOSE_X + 12;
        const tailY = currentPos.current.y - NOSE_Y + PLANE_HEIGHT - 6;

        setTrail((prev) => [
          ...prev.slice(-12),
          { x: tailX, y: tailY, id: pointCounter.current, time: now },
        ]);
      }

      // Expire old trail points
      setTrail((prev) => prev.filter((pt) => now - pt.time < 450));

      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  // Expire click ripples
  useEffect(() => {
    if (clickRipples.length > 0) {
      const timer = setTimeout(() => {
        setClickRipples((prev) => prev.slice(1));
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [clickRipples]);

  return (
    <>
      {/* Floating Toggle Control in Bottom-Right */}
      <div className="fixed bottom-4 right-4 z-[99999] pointer-events-auto select-none print:hidden">
        <button
          onClick={toggleCursor}
          title={enabled ? 'Switch to normal cursor' : 'Enable paper airplane cursor'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-300 border ${
            enabled
              ? 'bg-blue-600/90 text-white border-blue-400/50 shadow-blue-500/30 hover:bg-blue-600 hover:scale-105'
              : 'bg-white/95 text-slate-700 border-slate-200 shadow-slate-900/10 hover:bg-white hover:text-blue-600'
          }`}
        >
          {/* Mini Airplane Icon matching user's illustration */}
          <img
            src="/assets/airplane-cursor-cropped.svg"
            alt="Airplane Cursor"
            className={`w-4 h-4 object-contain transition-transform duration-300 ${
              enabled ? 'scale-110 drop-shadow-sm' : 'opacity-70 grayscale'
            }`}
          />
          <span className="hidden sm:inline">Cursor:</span>
          <span className="font-bold tracking-wide">{enabled ? 'Airplane' : 'Default'}</span>
        </button>
      </div>

      {/* Main Airplane Cursor & Interactive Flight Effects */}
      {enabled && isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[99998] overflow-hidden">
          {/* Dashed Flight Trail & Condensation Stream */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {trail.map((pt, i) => {
              const ageProgress = (performance.now() - pt.time) / 450;
              const opacity = Math.max(0, 1 - ageProgress) * 0.75;
              const size = Math.max(1.2, 3.2 * (1 - ageProgress * 0.6));
              const prevPt = trail[i - 1];

              return (
                <g key={pt.id}>
                  {prevPt && (
                    <line
                      x1={prevPt.x}
                      y1={prevPt.y}
                      x2={pt.x}
                      y2={pt.y}
                      stroke="#3B82F6"
                      strokeWidth="2.2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      opacity={opacity * 0.7}
                    />
                  )}
                  {/* Floating condensation puff */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={size}
                    fill="#60A5FA"
                    opacity={opacity}
                  />
                </g>
              );
            })}
          </svg>

          {/* Click Burst Shockwaves & Spark Particles */}
          <AnimatePresence>
            {clickRipples.map((ripple) => (
              <React.Fragment key={ripple.id}>
                {/* Expanding Blue Shockwave Ring */}
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.95 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  style={{ left: ripple.x, top: ripple.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-2 border-blue-500 pointer-events-none shadow-sm"
                />

                {/* Yellow Spark Particle Burst (matching top spark) */}
                <motion.div
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: -6, y: -20, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ left: ripple.x, top: ripple.y }}
                  className="absolute w-2 h-2 rounded-full bg-amber-400 pointer-events-none shadow-sm"
                />

                {/* Blue Spark Particle Burst (matching middle spark) */}
                <motion.div
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: 18, y: -14, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ left: ripple.x, top: ripple.y }}
                  className="absolute w-2 h-2 rounded-full bg-blue-500 pointer-events-none shadow-sm"
                />

                {/* Green Spark Particle Burst (matching right spark) */}
                <motion.div
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: 22, y: 4, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ left: ripple.x, top: ripple.y }}
                  className="absolute w-2 h-2 rounded-full bg-emerald-400 pointer-events-none shadow-sm"
                />
              </React.Fragment>
            ))}
          </AnimatePresence>

          {/* Paper Airplane Cursor Body */}
          {/* Positioned precisely so that the nose apex is locked to mousePos */}
          <div
            style={{
              transform: `translate3d(${mousePos.x - NOSE_X}px, ${mousePos.y - NOSE_Y}px, 0)`,
              willChange: 'transform',
            }}
            className="absolute top-0 left-0 transition-opacity duration-150 pointer-events-none"
          >
            <div
              style={{
                transform: `rotate(${bankingAngle}deg) scale(${
                  isMouseDown ? 0.9 : isHoveringPointer ? 1.15 : 1
                })`,
                transformOrigin: `${NOSE_X}px ${NOSE_Y}px`,
                transition: 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="relative select-none"
            >
              {/* Hover Glow Behind Airplane */}
              {isHoveringPointer && (
                <div
                  style={{
                    width: PLANE_WIDTH + 14,
                    height: PLANE_HEIGHT + 14,
                    left: -7,
                    top: -7,
                  }}
                  className="absolute rounded-full bg-blue-400/25 blur-md pointer-events-none animate-pulse"
                />
              )}

              {/* Exact Paper Airplane Illustration */}
              <img
                src="/assets/airplane-cursor-cropped.svg"
                alt="Airplane cursor"
                width={PLANE_WIDTH}
                height={PLANE_HEIGHT}
                draggable={false}
                className={`select-none pointer-events-none transition-all duration-150 ${
                  isHoveringPointer
                    ? 'drop-shadow-[0_8px_16px_rgba(37,99,235,0.45)]'
                    : 'drop-shadow-[0_4px_10px_rgba(15,23,42,0.18)]'
                }`}
                style={{
                  width: `${PLANE_WIDTH}px`,
                  height: `${PLANE_HEIGHT}px`,
                  display: 'block',
                }}
              />

              {/* Dynamic Shimmering Sparks when Hovering Clickable Elements */}
              {isHoveringPointer && (
                <>
                  {/* Yellow Top Spark Micro Glow */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ left: NOSE_X - 4, top: NOSE_Y - 8 }}
                    className="absolute w-2 h-2 rounded-full bg-amber-400/80 blur-[1px] pointer-events-none"
                  />
                  {/* Blue Middle Spark Micro Glow */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                    style={{ left: NOSE_X + 4, top: NOSE_Y - 4 }}
                    className="absolute w-2 h-2 rounded-full bg-blue-500/80 blur-[1px] pointer-events-none"
                  />
                  {/* Green Right Spark Micro Glow */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                    style={{ left: NOSE_X + 5, top: NOSE_Y + 6 }}
                    className="absolute w-2 h-2 rounded-full bg-emerald-400/80 blur-[1px] pointer-events-none"
                  />
                </>
              )}

              {/* Precision Target Dot at Nose Apex (only visible when hovering clickable items) */}
              {isHoveringPointer && (
                <div
                  style={{ left: NOSE_X, top: NOSE_Y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 ring-1 ring-white" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
