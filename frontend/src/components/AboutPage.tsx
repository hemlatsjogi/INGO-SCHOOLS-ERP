import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  Rocket,
  Shield,
  TrendingUp,
  Users,
  School,
  GraduationCap,
  Heart,
  Eye,
  Target
} from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

// Smooth reveal variants for text and components
const smoothReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: custom * 0.12,
      ease: 'easeOut'
    }
  })
};

const imageSmoothReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.15,
      ease: 'easeOut'
    }
  })
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const coreValues = [
    {
      id: 'simplicity',
      title: 'Simplicity',
      desc: 'Make technology easy for everyone.',
      icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50 text-amber-500',
      accentColor: 'text-amber-500',
      borderColor: 'hover:border-amber-200'
    },
    {
      id: 'innovation',
      title: 'Innovation',
      desc: 'Build smarter ways to manage schools.',
      icon: <Rocket className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-50 text-purple-600',
      accentColor: 'text-purple-600',
      borderColor: 'hover:border-purple-200'
    },
    {
      id: 'trust',
      title: 'Trust',
      desc: 'Keep school data secure and reliable.',
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      iconBg: 'bg-emerald-50 text-emerald-600',
      accentColor: 'text-emerald-600',
      borderColor: 'hover:border-emerald-200'
    },
    {
      id: 'growth',
      title: 'Growth',
      desc: 'Help schools grow with confidence.',
      icon: <TrendingUp className="w-6 h-6 text-pink-500" />,
      iconBg: 'bg-pink-50 text-pink-500',
      accentColor: 'text-pink-500',
      borderColor: 'hover:border-pink-200'
    }
  ];

  const impactMetrics = [
    {
      id: 'students',
      value: '10K+',
      label: 'Students',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50'
    },
    {
      id: 'schools',
      value: '500+',
      label: 'Schools',
      icon: <School className="w-5 h-5 text-purple-600" />,
      iconBg: 'bg-purple-50'
    },
    {
      id: 'teachers',
      value: '100+',
      label: 'Teachers',
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50'
    },
    {
      id: 'satisfaction',
      value: '99%',
      label: 'Satisfaction',
      icon: <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />,
      iconBg: 'bg-pink-50'
    }
  ];

  return (
    <div className="ingo-about-container w-full space-y-16 sm:space-y-24 lg:space-y-32 py-4 sm:py-8 select-none">
      
      {/* ====================================================================
          SECTION 1: HERO ("Building Better Schools, One Solution at a Time")
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Doodles, Subtitle, CTA */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Pill Badge */}
            <motion.div
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs sm:text-sm font-bold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 fill-blue-600" />
              <span>About INGO Schools</span>
            </motion.div>

            {/* Top Sparkle Doodle */}
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 left-3/4 text-amber-400 pointer-events-none"
              >
                <Sparkles className="w-6 h-6 fill-amber-400" />
              </motion.div>

              {/* Main Headline with Brush Doodle Underline */}
              <motion.h1
                variants={smoothReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]"
              >
                <span>Building Better </span>
                <span className="relative inline-block">
                  <span>Schools Systems,</span>
                  {/* Orange Doodle Brush Underline directly under Schools Systems */}
                  <svg
                    className="absolute -bottom-2.5 left-0 w-[105%] h-4 overflow-visible pointer-events-none"
                    viewBox="0 0 240 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M 6 13 C 65 4, 175 5, 232 14 C 185 19, 100 18, 30 15"
                      stroke="#F59E0B"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.85, delay: 0.4, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </svg>
                </span>
                <br className="hidden sm:inline" />
                <span className="text-blue-600">
                  One Solution at a Time
                </span>
              </motion.h1>
            </div>

            {/* Description Subtitle */}
            <motion.p
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed"
            >
              INGO Schools is designed to make school management simpler, smarter and more connected &mdash; for everyone.
            </motion.p>

            {/* CTA Button & Looping Green Spring Doodle */}
            <motion.div
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="flex items-center gap-6 pt-2"
            >
              <button
                onClick={() => {
                  const target = document.getElementById('our-story');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onOpenBooking();
                  }
                }}
                className="group inline-flex items-center gap-2.5 px-7 py-3 text-sm sm:text-base font-bold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35 active:scale-95 transition-all duration-200"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Looping Green Spring Doodle */}
              <div className="w-14 h-8 text-emerald-500 pointer-events-none">
                <svg viewBox="0 0 60 30" fill="none" className="w-full h-full">
                  <path
                    d="M 5 20 C 15 5, 25 30, 35 12 C 42 0, 52 25, 58 10"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Large Computer Classroom Photo with Pastel Background Blobs */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Ambient Background Organic Blobs */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-violet-200/50 rounded-full filter blur-2xl pointer-events-none -z-10" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-pink-200/50 rounded-full filter blur-2xl pointer-events-none -z-10" />
            
            {/* Pink Accent Tile */}
            <div className="absolute -bottom-3 -left-3 w-44 h-44 bg-[#F43F5E] rounded-3xl -rotate-6 opacity-75 pointer-events-none -z-10" />
            {/* Purple Accent Tile */}
            <div className="absolute -top-3 -right-3 w-40 h-40 bg-[#8B5CF6] rounded-3xl rotate-12 opacity-70 pointer-events-none -z-10" />

            {/* Sparkle Star on Top Right */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ rotate: { repeat: Infinity, duration: 16, ease: "linear" }, scale: { repeat: Infinity, duration: 3 } }}
              className="absolute -top-4 -right-4 text-amber-400 z-20 pointer-events-none"
            >
              <Sparkles className="w-8 h-8 fill-amber-400" />
            </motion.div>

            {/* Main Hero Classroom Image */}
            <motion.div
              variants={imageSmoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group cursor-pointer"
            >
              <img
                src="/assets/about_computer_lab.svg"
                alt="Students and teacher in modern computer lab"
                className="w-full h-[320px] sm:h-[400px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 2: "OUR STORY" ("From Challenges to a Smarter Solution")
         ==================================================================== */}
      <section id="our-story" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Pill Badge */}
            <motion.div
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 fill-blue-600" />
              <span>Our Story</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold text-slate-900 tracking-tight leading-[1.18]"
            >
              From Challenges <br />
              <span className="text-blue-600">to a Smarter Solution</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="text-base text-slate-600 leading-relaxed font-normal"
            >
              Schools are more than classrooms. They&apos;re communities. From everyday administration to long-term growth, we created INGO Schools to bring all the important parts of school management into one simple, connected platform &mdash; so schools can focus on what truly matters: their students.
            </motion.p>

            {/* Yellow Upward Trend Curve Doodle */}
            <motion.div
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="w-16 h-10 text-amber-500 pt-2"
            >
              <svg viewBox="0 0 60 40" fill="none" className="w-full h-full">
                <path
                  d="M 5 35 Q 30 30 45 12"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 36 10 L 48 10 L 47 22"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

          </div>

          {/* Right Column: Overlapping Duo Photo Gallery */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Background Mint / Teal Polygon */}
            <div className="absolute top-4 -left-4 w-28 h-36 bg-[#2DD4BF] rounded-2xl -rotate-12 opacity-80 pointer-events-none -z-10" />

            {/* Yellow Megaphone / Radiating Sunburst Doodle */}
            <div className="absolute -top-8 right-8 w-16 h-16 pointer-events-none z-20 text-amber-500">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                <line x1="30" y1="10" x2="30" y2="4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="42" y1="18" x2="48" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="44" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Overlapping Images Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              
              {/* Photo 1: Teacher & Students */}
              <motion.div
                variants={imageSmoothReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group cursor-pointer"
              >
                <img
                  src="/assets/about_teachers_meeting.svg"
                  alt="Teacher helping students with laptop"
                  className="w-full h-[220px] sm:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>

              {/* Photo 2: School Administrators Discussing */}
              <motion.div
                variants={imageSmoothReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group cursor-pointer sm:translate-y-6"
              >
                <img
                  src="/assets/about_admin_colleagues.svg"
                  alt="Administrators collaborating at desk"
                  className="w-full h-[220px] sm:h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 3: "WHAT WE BELIEVE" ("Our Core Values")
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-100 shadow-xl"
        >
          
          {/* Header Row: Title on Left, Subtitle on Right + Whimsical Accents */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-slate-100 relative">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                <Sparkles className="w-3 h-3 fill-blue-600" />
                <span>What We Believe</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Core Values
              </h2>
            </div>

            <div className="flex items-center gap-4 max-w-md">
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                These values guide everything we do &mdash; from building our product to supporting our schools.
              </p>
              
              {/* Green Squiggle & Yellow Curl Doodle */}
              <div className="shrink-0 text-emerald-500 pointer-events-none hidden sm:block">
                <svg viewBox="0 0 40 30" fill="none" className="w-10 h-7">
                  <path
                    d="M 4 20 Q 15 5 26 22 T 36 10"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 4 Core Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {coreValues.map((val, idx) => (
              <motion.div
                key={val.id}
                variants={smoothReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`bg-[#FAFBFF] hover:bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer ${val.borderColor}`}
              >
                <div className="space-y-4">
                  {/* Icon Square */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${val.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    {val.icon}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Arrow */}
                <div className="pt-4 flex justify-start">
                  <span className={`text-base font-bold ${val.accentColor} transition-transform duration-200 group-hover:translate-x-1.5`}>
                    &rarr;
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* ====================================================================
          SECTION 4: "OUR IMPACT" ("Why INGO Schools?")
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-[#F5F8FF] via-[#EEF4FF] to-[#F2F7FF] rounded-3xl p-6 sm:p-10 lg:p-12 border border-blue-100/70 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subtitle & 2x2 Metric Badges */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-blue-600 text-xs sm:text-sm font-bold border border-blue-200/80 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-blue-600" />
                <span>Our Impact</span>
              </div>

              {/* Title & Sparkle Doodle */}
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-tight">
                  Why INGO Schools?
                </h2>
                {/* Yellow Radiating Sparkle Doodle */}
                <div className="absolute -top-5 right-1/3 text-amber-400 pointer-events-none">
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                    <line x1="20" y1="4" x2="20" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <line x1="32" y1="9" x2="26" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <line x1="8" y1="9" x2="14" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                Trusted by schools and institutions worldwide to simplify operations and improve learning outcomes.
              </p>

              {/* 4 Metric Badges in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {impactMetrics.map((met, idx) => (
                  <motion.div
                    key={met.id}
                    variants={smoothReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="bg-white/95 rounded-2xl p-4 border border-white shadow-md flex items-center gap-3.5 transition-all duration-200"
                  >
                    <div className={`w-11 h-11 rounded-xl ${met.iconBg} flex items-center justify-center shrink-0 shadow-inner`}>
                      {met.icon}
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                        {met.value}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        {met.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Right Column: Wide Campus Photo with Sticky Note Card */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Angled Background Layers (Yellow & Purple tiles) */}
              <div className="absolute -top-3 -right-3 w-48 h-48 bg-[#F59E0B] rounded-3xl rotate-6 opacity-85 pointer-events-none -z-10" />
              <div className="absolute -bottom-4 right-1/4 w-44 h-44 bg-[#8B5CF6] rounded-3xl -rotate-12 opacity-85 pointer-events-none -z-10" />

              {/* Main Campus Photo */}
              <motion.div
                variants={imageSmoothReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white w-full"
              >
                <img
                  src="/assets/about_campus_students.svg"
                  alt="Students walking towards modern school campus"
                  className="w-full h-[280px] sm:h-[350px] object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Tilted Handwritten Sticky Note ("Together for a brighter future! ♡") */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ rotate: 4, scale: 1.05 }}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-100 max-w-[170px] sm:max-w-[190px] text-center cursor-pointer select-none"
                >
                  <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug font-serif italic">
                    Together
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-tight font-serif italic">
                    for a brighter
                  </p>
                  <p className="text-sm sm:text-base font-black text-purple-600 leading-snug font-serif italic mt-0.5 flex items-center justify-center gap-1">
                    <span>future!</span>
                    <span className="text-pink-500">♡</span>
                  </p>
                </motion.div>
              </motion.div>

            </div>

          </div>
        </motion.div>
      </section>

      {/* ====================================================================
          SECTION 5: "OUR VISION & MISSION"
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Smiling Schoolgirl with Books Cutout */}
          <motion.div
            variants={imageSmoothReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-4 relative flex items-center justify-center"
          >
            {/* Background Facets (Teal & Pink) */}
            <div className="absolute top-2 left-4 w-32 h-36 bg-[#2DD4BF] rounded-3xl -rotate-12 opacity-80 pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-4 w-36 h-36 bg-[#EC4899] rounded-3xl rotate-12 opacity-75 pointer-events-none -z-10" />
            
            {/* Yellow Sparkle on Left */}
            <div className="absolute -top-3 right-8 text-amber-400 pointer-events-none">
              <Sparkles className="w-6 h-6 fill-amber-400" />
            </div>

            {/* Schoolgirl Portrait Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white w-full max-w-[260px] sm:max-w-[280px]">
              <img
                src="/assets/schoolgirl_hero.svg"
                alt="INGO student with books"
                className="w-full h-[260px] sm:h-[290px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Middle Column: Our Vision Card */}
          <motion.div
            variants={smoothReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            whileHover={{ y: -5, scale: 1.01 }}
            className="lg:col-span-4 bg-white rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[260px]"
          >
            <div className="space-y-4">
              <div className="w-13 h-13 p-3 rounded-2xl bg-purple-50 text-purple-600 inline-flex items-center justify-center shadow-inner">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Our Vision
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To be the global leader in school management technology, empowering schools to build a brighter future.
              </p>
            </div>
            <div className="pt-4 flex justify-start">
              <button
                onClick={onOpenBooking}
                className="text-xs font-bold text-purple-600 hover:underline inline-flex items-center gap-1"
              >
                <span>Learn more</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Our Mission Card */}
          <motion.div
            variants={smoothReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            whileHover={{ y: -5, scale: 1.01 }}
            className="lg:col-span-4 bg-white rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[260px] relative overflow-hidden"
          >
            {/* Green Doodle Arrow on Top Right */}
            <div className="absolute top-4 right-4 text-emerald-500 pointer-events-none">
              <svg viewBox="0 0 30 30" fill="none" className="w-6 h-6">
                <path d="M 6 24 L 22 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 12 8 L 22 8 L 22 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="space-y-4">
              <div className="w-13 h-13 p-3 rounded-2xl bg-emerald-50 text-emerald-600 inline-flex items-center justify-center shadow-inner">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To simplify school management through innovative, secure and easy-to-use solutions, helping educators focus on what matters most &mdash; students.
              </p>
            </div>
            <div className="pt-4 flex justify-start">
              <button
                onClick={onOpenBooking}
                className="text-xs font-bold text-emerald-600 hover:underline inline-flex items-center gap-1"
              >
                <span>Learn more</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
