import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  IndianRupee,
  Award,
  BarChart3,
  ArrowRight,
  Plus,
  TrendingUp,
  Sparkles,
  Check
} from 'lucide-react';

interface InteractiveFeatureShowcaseProps {
  onOpenBooking?: () => void;
}

export const InteractiveFeatureShowcase: React.FC<InteractiveFeatureShowcaseProps> = ({
  onOpenBooking
}) => {
  return (
    <section
      id="features-section"
      className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 lg:space-y-20">
        
        {/* ====================================================================
            PART 1: MAIN FEATURE MATRIX (6 CARDS SURROUNDING CENTRAL STUDENT)
           ==================================================================== */}
        <div className="relative w-full">
          
          {/* DESKTOP 3-COLUMN GRID (Cards Left - Central Student - Cards Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* ----------------- LEFT COLUMN (3 Cards) ----------------- */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* CARD 1: Student Management (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative bg-[#F0F7FF] hover:bg-[#E8F3FF] rounded-3xl p-6 sm:p-7 border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Icon, Title, Subtitle, CTA */}
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        Student Management
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                        Keep student records, profiles, attendance and progress all in one place.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenBooking}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Mini Student Profile Cardlet */}
                  <div className="relative shrink-0 self-center sm:self-start">
                    {/* Doodle Rays */}
                    <div className="absolute -top-3 -right-2 w-8 h-8 pointer-events-none text-blue-400">
                      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                        <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="30" y1="10" x2="26" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="10" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl p-3 shadow-md border border-blue-50 w-36 sm:w-40 transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="/assets/student_boy.svg"
                          alt="Student Avatar"
                          className="w-7 h-7 rounded-full object-cover border border-blue-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-slate-800 truncate">Student Profile</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-full h-1.5 bg-blue-100 rounded-full" />
                        <div className="w-4/5 h-1.5 bg-blue-100/70 rounded-full" />
                        <div className="w-3/5 h-1.5 bg-blue-100/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 3: Attendance (Middle Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative bg-[#F0FDF8] hover:bg-[#E6FAF2] rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Info */}
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-110 transition-transform duration-300">
                      <CalendarCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                        Attendance
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                        Track student and staff attendance with real-time updates and reports.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenBooking}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Mini Calendar Cardlet */}
                  <div className="relative shrink-0 self-center sm:self-start">
                    {/* Doodle Rays */}
                    <div className="absolute -top-3 -right-2 w-8 h-8 pointer-events-none text-emerald-500">
                      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                        <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="30" y1="10" x2="26" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="10" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl p-2.5 shadow-md border border-emerald-50 w-32 sm:w-36 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-105">
                      <div className="h-3 bg-emerald-500 rounded-t-lg mb-2 flex items-center justify-around px-2">
                        <span className="w-1 h-1 bg-white rounded-full" />
                        <span className="w-1 h-1 bg-white rounded-full" />
                        <span className="w-1 h-1 bg-white rounded-full" />
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-center py-1">
                        <span className="text-emerald-600 text-xs font-black">✓</span>
                        <span className="text-emerald-600 text-xs font-black">✓</span>
                        <span className="text-emerald-600 text-xs font-black">✓</span>
                        <span className="text-emerald-600 text-xs font-black">✓</span>
                        <span className="text-emerald-600 text-xs font-black">✓</span>
                        <span className="text-emerald-600 text-xs font-black">✓</span>
                      </div>
                    </div>

                    {/* Floating Green Check Badge */}
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 5: Exams & Results (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative bg-[#FFF2F5] hover:bg-[#FFE8EE] rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Info */}
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-md shadow-pink-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                        Exams & Results
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                        Conduct exams, manage grades and publish results effortlessly.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenBooking}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Mini Exam Cardlet */}
                  <div className="relative shrink-0 self-center sm:self-start">
                    {/* Doodle Rays */}
                    <div className="absolute -top-3 -right-2 w-8 h-8 pointer-events-none text-pink-400">
                      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                        <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="30" y1="10" x2="26" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="10" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl p-3 shadow-md border border-pink-100 w-32 sm:w-36 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105 relative overflow-hidden">
                      <div className="space-y-1.5 mb-2">
                        <div className="w-full h-1.5 bg-pink-100 rounded-full" />
                        <div className="w-4/5 h-1.5 bg-pink-100/70 rounded-full" />
                        <div className="w-2/3 h-1.5 bg-pink-100/50 rounded-full" />
                      </div>
                      <div className="flex justify-end pt-1">
                        <span className="text-pink-500 font-black text-2xl tracking-tighter border-2 border-pink-400 rounded-lg px-2 py-0.5 -rotate-12 inline-block bg-pink-50/50">
                          A+
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ----------------- CENTER COLUMN (Hero Student Cutout & Floating Stats) ----------------- */}
            <div className="lg:col-span-4 relative flex flex-col items-center justify-center order-1 lg:order-2 my-6 lg:my-0">
              
              {/* Organic Pastel Shapes in the Background */}
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center">
                
                {/* Layer 1: Golden Amber Organic Blob */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute w-72 sm:w-80 h-72 sm:h-80 bg-[#FDE68A] rounded-full filter blur-[1px] opacity-90 -top-4 -left-4 pointer-events-none"
                  style={{ borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' }}
                />

                {/* Layer 2: Vibrant Teal/Cyan Organic Blob */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], rotate: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                  className="absolute w-64 sm:w-72 h-64 sm:h-72 bg-[#99F6E4] rounded-full filter blur-[1px] opacity-85 -bottom-2 -right-4 pointer-events-none"
                  style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                />

                {/* Layer 3: Soft Lavender Accent Blob */}
                <div
                  className="absolute w-52 sm:w-60 h-52 sm:h-60 bg-[#DDD6FE] rounded-full opacity-70 -left-6 bottom-2 pointer-events-none"
                  style={{ borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%' }}
                />

                {/* Layer 4: Soft Rose Accent Blob */}
                <div
                  className="absolute w-48 sm:w-52 h-48 sm:h-52 bg-[#FECDD3] rounded-full opacity-60 top-2 right-2 pointer-events-none"
                  style={{ borderRadius: '35% 65% 60% 40% / 50% 40% 60% 50%' }}
                />

                {/* Playful Floating Doodles Around Student */}
                {/* Top-Right Sparkle Star */}
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                  transition={{ rotate: { repeat: Infinity, duration: 18, ease: "linear" }, scale: { repeat: Infinity, duration: 3 } }}
                  className="absolute top-2 right-4 sm:right-8 text-amber-500 z-20 pointer-events-none"
                >
                  <Sparkles className="w-7 h-7 fill-amber-400" />
                </motion.div>

                {/* Top-Left Sparkle Rays */}
                <div className="absolute top-6 left-6 text-amber-400 z-20 pointer-events-none">
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                    <line x1="20" y1="4" x2="20" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <line x1="32" y1="9" x2="26" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <line x1="8" y1="9" x2="14" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Mid-Right Cyan Checkmark Doodle */}
                <div className="absolute top-1/3 -right-2 text-teal-600 z-20 pointer-events-none">
                  <svg viewBox="0 0 30 30" fill="none" className="w-7 h-7">
                    <path d="M6 16L12 22L24 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Mid-Left Playful Note / Accent */}
                <div className="absolute top-1/2 -left-3 text-pink-400 z-20 pointer-events-none">
                  <svg viewBox="0 0 30 30" fill="none" className="w-6 h-6">
                    <circle cx="10" cy="15" r="2.5" fill="currentColor" />
                    <circle cx="20" cy="12" r="2.5" fill="currentColor" />
                  </svg>
                </div>

                {/* Central Smiling Schoolboy Cutout */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full flex items-center justify-center"
                >
                  <img
                    src="/assets/ingo_center_student_transparent.svg"
                    alt="Happy INGO School Student"
                    className="w-[290px] sm:w-[350px] lg:w-[380px] h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]"
                  />
                </motion.div>

                {/* Floating Glassmorphic Stat Card at Base of Student */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{ y: [-3, 3, -3] }}
                  transition={{
                    opacity: { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                  }}
                  className="absolute -bottom-4 sm:-bottom-6 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 flex items-center gap-4 sm:gap-5 min-w-[240px] sm:min-w-[270px]"
                >
                  {/* Metric Counter */}
                  <div className="space-y-0.5">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wide uppercase">
                      Total Students
                    </p>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                      1,248
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>↑ 12%</span>
                    </div>
                  </div>

                  {/* 5-Bar Mini Chart Graphic */}
                  <div className="flex items-end gap-1.5 h-10 sm:h-12 pl-3 border-l border-slate-100">
                    <motion.div
                      initial={{ height: '20%' }}
                      whileInView={{ height: '45%' }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="w-2 sm:w-2.5 bg-sky-400 rounded-full"
                    />
                    <motion.div
                      initial={{ height: '20%' }}
                      whileInView={{ height: '70%' }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="w-2 sm:w-2.5 bg-blue-500 rounded-full"
                    />
                    <motion.div
                      initial={{ height: '20%' }}
                      whileInView={{ height: '55%' }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="w-2 sm:w-2.5 bg-purple-500 rounded-full"
                    />
                    <motion.div
                      initial={{ height: '20%' }}
                      whileInView={{ height: '85%' }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="w-2 sm:w-2.5 bg-pink-500 rounded-full"
                    />
                    <motion.div
                      initial={{ height: '20%' }}
                      whileInView={{ height: '100%' }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="w-2 sm:w-2.5 bg-emerald-500 rounded-full"
                    />
                  </div>
                </motion.div>

              </div>

            </div>

            {/* ----------------- RIGHT COLUMN (3 Cards) ----------------- */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-3">
              
              {/* CARD 2: Teacher Management (Top Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative bg-[#F8F5FF] hover:bg-[#F3EFFF] rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Info */}
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                        Teacher Management
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                        Organize teacher information, schedules and responsibilities with ease.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenBooking}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Mini Teacher Cardlet */}
                  <div className="relative shrink-0 self-center sm:self-start">
                    {/* Doodle Rays */}
                    <div className="absolute -top-3 -right-2 w-8 h-8 pointer-events-none text-purple-400">
                      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                        <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="30" y1="10" x2="26" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="10" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl p-3 shadow-md border border-purple-100 w-36 sm:w-40 transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="/assets/student_girl_glasses.svg"
                          alt="Teacher Avatar"
                          className="w-7 h-7 rounded-full object-cover border border-purple-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-slate-800 truncate">Teacher</p>
                        </div>
                      </div>
                      <div className="space-y-1.5 mb-2">
                        <div className="w-full h-1.5 bg-purple-100 rounded-full" />
                        <div className="w-4/5 h-1.5 bg-purple-100/70 rounded-full" />
                      </div>
                      <div className="flex justify-end">
                        <span className="w-5 h-5 rounded-md bg-purple-500 text-white flex items-center justify-center text-[10px] shadow-sm">
                          📅
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 4: Fee Management (Middle Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative bg-[#FFF9F0] hover:bg-[#FFF4E5] rounded-3xl p-6 sm:p-7 border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Info */}
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                      <IndianRupee className="w-6 h-6 font-bold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                        Fee Management
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                        Manage payments, dues and receipts from one secure dashboard.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenBooking}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Mini Fee Receipt Cardlet */}
                  <div className="relative shrink-0 self-center sm:self-start">
                    {/* Doodle Rays */}
                    <div className="absolute -top-3 -right-2 w-8 h-8 pointer-events-none text-amber-400">
                      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                        <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="30" y1="10" x2="26" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="10" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl p-3 shadow-md border border-amber-100 w-32 sm:w-36 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-105 relative">
                      <div className="text-amber-500 font-bold text-sm mb-1.5 flex items-center gap-1">
                        <span>₹</span>
                        <div className="w-12 h-1.5 bg-amber-100 rounded-full" />
                      </div>
                      <div className="space-y-1.5 mb-2">
                        <div className="w-full h-1.5 bg-amber-100/70 rounded-full" />
                        <div className="w-3/4 h-1.5 bg-amber-100/50 rounded-full" />
                      </div>
                      
                      {/* Floating Paid Badge */}
                      <div className="flex justify-end">
                        <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                          Paid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 6: Reports & Analytics (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative bg-[#F4F2FF] hover:bg-[#ECE9FE] rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Info */}
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Reports & Analytics
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                        Get detailed insights with powerful reports and visual analytics.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenBooking}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Mini Analytics Cardlet */}
                  <div className="relative shrink-0 self-center sm:self-start">
                    {/* Doodle Rays */}
                    <div className="absolute -top-3 -right-2 w-8 h-8 pointer-events-none text-indigo-400">
                      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                        <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="30" y1="10" x2="26" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="10" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="bg-white rounded-2xl p-3 shadow-md border border-indigo-100 w-32 sm:w-36 transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105">
                      <div className="flex items-end gap-1.5 h-10 mb-2 justify-center">
                        <div className="w-2.5 h-6 bg-sky-400 rounded-t-sm" />
                        <div className="w-2.5 h-9 bg-blue-600 rounded-t-sm" />
                        <div className="w-2.5 h-7 bg-purple-500 rounded-t-sm" />
                        <div className="w-2.5 h-10 bg-pink-500 rounded-t-sm" />
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full mb-1.5" />
                      <div className="flex justify-end">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-400 border-t-pink-500 border-r-amber-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* ====================================================================
            PART 2: BOTTOM CTA BANNER WITH INTERACTIVE DASHBOARD MOCKUP
           ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl bg-gradient-to-br from-[#EBF3FF] via-[#F1F6FF] to-[#E5EFFF] border border-blue-200/70 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl"
        >
          {/* Ambient Background Wave & Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-sky-200/20 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Copy & Action */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              
              {/* Badge: "+ Ready to Get Started?" */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-blue-600 text-xs sm:text-sm font-extrabold border border-blue-200/80 shadow-sm">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Ready to Get Started?</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                Make School Management <br className="hidden sm:inline" />
                <span className="text-blue-600">Simple &amp; Smart</span>
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
                Join hundreds of schools already using INGO Schools to build a better tomorrow.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  id="features-book-demo-btn"
                  onClick={onOpenBooking}
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-bold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95 transition-all duration-200"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

            </div>

            {/* Right Side: Whimsical Doodle + 3D Dashboard Mockup Card */}
            <div className="lg:col-span-6 relative flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4">
              
              {/* Whimsical Handwritten Doodle Text */}
              <div className="text-blue-900 font-cursive text-center sm:text-right select-none transform sm:-rotate-6">
                <p className="text-lg sm:text-xl font-bold tracking-tight text-blue-950/80 italic font-serif">
                  Better Tools
                </p>
                <p className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight italic font-serif">
                  Happier Schools ♡
                </p>
                {/* Curved Arrow pointing right to dashboard */}
                <div className="w-20 h-8 mx-auto sm:ml-auto sm:mr-0 text-blue-500">
                  <svg viewBox="0 0 100 40" fill="none" className="w-full h-full">
                    <path
                      d="M 10 10 Q 50 35 90 20"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="4 3"
                    />
                    <path
                      d="M 82 12 L 92 20 L 84 27"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* INGO Schools ERP Dashboard Preview Mockup Card */}
              <motion.div
                whileHover={{ scale: 1.03, rotateY: 4, rotateX: -2 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/80 w-full max-w-[340px] sm:max-w-[360px]"
              >
                {/* Top Sparkle Rays on Dashboard */}
                <div className="absolute -top-3 -right-2 text-amber-400 z-10 pointer-events-none">
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                    <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="30" y1="10" x2="26" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="10" y1="10" x2="14" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Header: INGO Logo + Brand */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/ingo-schools-logo.svg"
                      alt="INGO Logo"
                      className="w-7 h-7 rounded-lg object-contain"
                    />
                    <div className="leading-none">
                      <span className="text-xs font-black text-slate-800 tracking-tight">INGO</span>
                      <span className="text-[10px] text-blue-600 font-bold block">SCHOOLS</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span>↑ 12%</span>
                  </div>
                </div>

                {/* Dashboard Split View: Left Mini-Nav & Right Main Content */}
                <div className="grid grid-cols-12 gap-3 pt-3">
                  
                  {/* Left Sidebar Mini-Menu */}
                  <div className="col-span-5 space-y-1.5 text-[10px] font-bold text-slate-500">
                    <div className="flex items-center gap-1.5 p-1 rounded-md bg-blue-50 text-blue-600 font-extrabold">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span className="truncate">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-50 text-slate-600">
                      <span>👥</span>
                      <span className="truncate">Students</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-50 text-slate-600">
                      <span>🎓</span>
                      <span className="truncate">Teachers</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-50 text-slate-600">
                      <span>✓</span>
                      <span className="truncate">Attendance</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-50 text-slate-600">
                      <span>₹</span>
                      <span className="truncate">Fees</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-50 text-slate-600">
                      <span>📊</span>
                      <span className="truncate">Reports</span>
                    </div>
                  </div>

                  {/* Right Dashboard Area: Total Students & Sparkline Graph */}
                  <div className="col-span-7 flex flex-col justify-between bg-slate-50/70 rounded-xl p-2.5 border border-slate-100">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Total Students</p>
                      <p className="text-base font-black text-slate-900 leading-none mt-0.5">1,248</p>
                    </div>

                    {/* Smooth Area Sparkline Curve */}
                    <div className="h-10 my-1">
                      <svg viewBox="0 0 100 40" fill="none" className="w-full h-full">
                        <defs>
                          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 32 Q 25 15 50 22 T 100 12 L 100 40 L 0 40 Z"
                          fill="url(#sparkGradient)"
                        />
                        <motion.path
                          d="M 0 32 Q 25 15 50 22 T 100 12"
                          stroke="#8B5CF6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </svg>
                    </div>

                    {/* Row of 4 App Icon Tiles */}
                    <div className="grid grid-cols-4 gap-1 pt-1">
                      <div className="h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px]">
                        👥
                      </div>
                      <div className="h-6 rounded-md bg-pink-500 text-white flex items-center justify-center text-[10px]">
                        📅
                      </div>
                      <div className="h-6 rounded-md bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ₹
                      </div>
                      <div className="h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        📊
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default InteractiveFeatureShowcase;
