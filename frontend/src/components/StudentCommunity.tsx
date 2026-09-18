import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, BookOpen, Award, ArrowRight } from 'lucide-react';

interface StudentCommunityProps {
  onOpenBooking: () => void;
}

export const StudentCommunity: React.FC<StudentCommunityProps> = ({ onOpenBooking }) => {
  const highlights = [
    { label: 'Smart Curriculum Tracking', icon: <BookOpen className="w-4 h-4 text-blue-600" /> },
    { label: 'Real-Time Academic Analytics', icon: <Award className="w-4 h-4 text-emerald-600" /> },
    { label: 'Creative & STEM Portfolios', icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
    { label: 'Collaborative Study Spaces', icon: <Users className="w-4 h-4 text-amber-500" /> }
  ];

  return (
    <section className="w-full relative z-20 mt-12 sm:mt-16 lg:mt-20">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-100 shadow-xl overflow-hidden relative">
        
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50/70 rounded-full blur-2xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50/70 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Group of Students Photo with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            {/* Origami and doodle accents behind group */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#10B981]/15 rounded-2xl rotate-12 pointer-events-none -z-10" />
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-[#2563EB]/15 rounded-3xl -rotate-12 pointer-events-none -z-10" />

            {/* Main Group Photo */}
            <div className="relative">
              <img
                src="/assets/group_of_students.svg"
                alt="Group of diverse INGO Schools students learning together"
                className="w-full h-auto object-contain filter drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          {/* Right: Content & Community Highlights */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Designed for Happy Students & Inspired Classrooms
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every tool in INGO Schools is created to nurture curiosity, simplify homework submissions, celebrate academic milestones, and ensure no learner gets left behind.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="shrink-0">{item.icon}</div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <span>Experience Student Portal</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
