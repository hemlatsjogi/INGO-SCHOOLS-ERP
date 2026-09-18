import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import { AnimatedPaperAirplane } from './AnimatedPaperAirplane';
import { DoodleAccents } from './DoodleAccents';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreFeatures: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreFeatures }) => {
  const studentImage = '/assets/indian_student_hero.svg';

  return (
    <section className="relative w-full pt-6 sm:pt-10 lg:pt-14 pb-4 overflow-visible">
      <div className="ingo-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="ingo-hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Column: Value Proposition & Animated Typography */}
          <div className="ingo-hero-text-align lg:col-span-7 flex flex-col items-start z-20">

            {/* 2. Main Title: "Powering the Future of School Management" */}
            <div className="relative mb-5 sm:mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="ingo-hero-title text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight"
              >
                <span>Powering the </span>

                {/* "Future" in vibrant blue with authentic doodle brush underline */}
                <span className="relative inline-block text-blue-600">
                  Future
                  {/* Playful brush doodle stroke under "Future" */}
                  <svg
                    className="absolute -bottom-2.5 left-0 w-[108%] h-4 overflow-visible pointer-events-none"
                    viewBox="0 0 160 20"
                    fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M 4 14 C 40 4, 110 5, 154 13 C 120 18, 60 17, 18 15"
                      // stroke="#e51054ff"
                      stroke="#F59E0B"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                    />
                  </svg>
                </span>

                <br className="hidden sm:inline" />
                <span> of School Management</span>
              </motion.h1>
            </div>

            {/* 3. Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="ingo-hero-subtitle text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal"
            >
              INGO Schools is a modern and comprehensive school management system designed to simplify administration and create a better learning environment for everyone.
            </motion.p>

            {/* 4. Action Buttons: "Get Started ->" and "▷ Explore Features" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="ingo-hero-cta-group flex items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary "Get Started ->" Button */}
              <button
                id="hero-get-started-btn"
                onClick={onOpenBooking}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:scale-95 transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary "▷ Explore Features" Button */}
              <button
                id="hero-explore-features-btn"
                onClick={onExploreFeatures}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-slate-700 bg-white/80 hover:bg-white border border-slate-200/80 rounded-full shadow-sm hover:border-slate-300 hover:text-blue-600 active:scale-95 transition-all duration-200 backdrop-blur-sm"
              >
                <div className="w-6 h-6 rounded-full border border-blue-600/30 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
                  <Play className="w-3 h-3 fill-blue-600 ml-0.5" />
                </div>
                <span>Explore Features</span>
              </button>
            </motion.div>

            {/* 5. Student Community & Parents Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-slate-100 px-4 py-2 rounded-2xl shadow-sm"
            >
              <div className="flex -space-x-2 overflow-hidden items-center">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-xs bg-blue-50">
                  <img
                    src="/assets/indian_student_hero.svg"
                    alt="Indian School Student"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-xs bg-amber-50">
                  <img
                    src="/assets/indian_parents.svg"
                    alt="Indian Parents"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  +1k
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800 ml-1">4.9/5</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Trusted by students & parents across India
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Single Indian Student Visual + Animated Paper Airplane */}
          <div className="lg:col-span-5 relative flex items-center justify-center">

            {/* Background Origami Facets and Hand-drawn Doodles */}
            <DoodleAccents />

            {/* Animated Paper Airplane hovering and gliding above the student */}
            <div className="ingo-airplane-svg-container absolute -top-8 left-4 sm:-top-12 sm:left-6 z-30 pointer-events-auto">
              <AnimatedPaperAirplane />
            </div>

            {/* Single Student Image Card Container */}
            <div className="ingo-hero-image-wrapper relative z-10 w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[450px]">

              <div className="relative overflow-visible rounded-3xl flex items-end justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col items-center relative"
                >
                  {/* Single Indian Student Image in SVG format */}
                  <img
                    src={studentImage}
                    alt="INGO Schools Student"
                    className="w-full h-auto object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                  />
                </motion.div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
