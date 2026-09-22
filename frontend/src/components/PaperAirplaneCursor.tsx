import React, { useEffect, useState, useRef } from 'react';

// Airplane Dimensions:
// airplane-cursor-pointing.png aspect ratio: 631 x 851
const PLANE_WIDTH = 38;
const PLANE_HEIGHT = Math.round(PLANE_WIDTH * (851 / 631)); // ~51px
// Apex nose hotspot in pointing orientation: x = 13/631 (~2% from left), y = 1/851 (~0% from top)
const NOSE_X = Math.round(PLANE_WIDTH * (13 / 631)); // ~1px
const NOSE_Y = Math.round(PLANE_HEIGHT * (1 / 851)); // ~0px

export const PaperAirplaneCursor: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ingo_airplane_cursor');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringPointer, setIsHoveringPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position and physics refs for instantaneous tracking without lag
  const currentPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  // Detect touch or coarse pointer devices
  useEffect(() => {
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isFine = window.matchMedia('(pointer: fine)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice((hasTouch && !isFine) || isCoarse);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Toggle handler
  const toggleCursor = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('ingo_airplane_cursor', String(next));
  };

  // Sync body cursor classes - only hide default cursor when custom cursor is active on fine-pointer devices
  useEffect(() => {
    if (enabled && isVisible && !isTouchDevice) {
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
  }, [enabled, isVisible, isTouchDevice]);

  useEffect(() => {
    // Completely disable custom cursor on touch/mobile devices
    if (isTouchDevice) return;

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

    const handleMouseDown = () => {
      setIsMouseDown(true);
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

    // Highly responsive physics loop (0.85 interpolation factor for ultra-crisp follow without lag)
    const updatePhysics = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
      } else {
        currentPos.current.x += dx * 0.85;
        currentPos.current.y += dy * 0.85;
      }

      setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
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
  }, [isVisible, isTouchDevice]);

  // If touch device, return nothing
  if (isTouchDevice) {
    return null;
  }

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
          {/* Mini Paper Airplane Icon */}
          <img
            src="/assets/airplane-cursor-pointing.png"
            alt="Airplane Cursor"
            className={`w-4 h-4 object-contain transition-transform duration-300 ${
              enabled ? 'scale-110 drop-shadow-sm' : 'opacity-70 grayscale'
            }`}
          />
          <span className="hidden sm:inline">Cursor:</span>
          <span className="font-bold tracking-wide">{enabled ? 'Airplane' : 'Default'}</span>
        </button>
      </div>

      {/* Main Paper Airplane Cursor - Clean, Lightweight, Accurate, Pointing in Reference Direction */}
      {enabled && isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[99998] overflow-hidden">
          {/* Paper Airplane Cursor Body */}
          {/* Positioned accurately so that the nose apex is locked to mouse position */}
          <div
            style={{
              transform: `translate3d(${mousePos.x - NOSE_X}px, ${mousePos.y - NOSE_Y}px, 0)`,
              willChange: 'transform',
            }}
            className="absolute top-0 left-0 pointer-events-none transition-opacity duration-150"
          >
            <div
              style={{
                transform: `scale(${isMouseDown ? 0.9 : isHoveringPointer ? 1.08 : 1})`,
                transformOrigin: `${NOSE_X}px ${NOSE_Y}px`,
                transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="relative select-none"
            >
              {/* Paper Airplane in Reference Pointing Direction */}
              <img
                src="/assets/airplane-cursor-pointing.png"
                alt="Airplane cursor"
                width={PLANE_WIDTH}
                height={PLANE_HEIGHT}
                draggable={false}
                className="select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(15,23,42,0.22)]"
                style={{
                  width: `${PLANE_WIDTH}px`,
                  height: `${PLANE_HEIGHT}px`,
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaperAirplaneCursor;
