import React from 'react';
import { motion } from 'framer-motion';
import {
 ArrowUpRight,
 ArrowRight,
 Mail,
 Phone,
 MapPin,
 Facebook,
 Linkedin,
 Youtube
} from 'lucide-react';
interface FooterProps {
 onOpenBooking: () => void;
 onNavigate?: (page: string) => void;
}
export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate }) => {
 const quickLinks = [
   { label: 'Home', href: '#home' },
   { label: 'Services', href: '#services' },
   { label: 'Key Features', href: '#features' },
   { label: 'About Us', href: '#about' },
   { label: 'Contact Us', href: '#contact' }
 ];
 const servicesLinks = [
   { label: 'Student Management', href: '#services' },
   { label: 'Teacher Management', href: '#services' },
   { label: 'Attendance', href: '#services' },
   { label: 'Fees Management', href: '#services' },
   { label: 'Exams & Results', href: '#services' }
 ];
 const resourcesLinks = [
   { label: 'Documentation', href: '#docs' },
   { label: 'Support', href: '#support' },
   { label: 'Privacy Policy', href: '#privacy' },
   { label: 'Terms & Conditions', href: '#terms' }
 ];
 return (
     <footer className="footer w-full relative z-30 pt-10 sm:pt-16 pb-8 overflow-hidden">
     <div className="footer-motion" aria-hidden="true">
         <span className="footer-arc footer-arc-blue"></span>
         <span className="footer-arc footer-arc-teal"></span>
         <span className="footer-arc footer-arc-gold"></span>
         <span className="footer-arc footer-arc-violet"></span>
     </div>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
       
       {/* ==================================================================
           1. TOP CTA BANNER: "Join our community of school partners"
          ================================================================== */}
       <motion.div
         initial={{ opacity: 0, y: 35 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: '-50px' }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-blue-100/50 bg-white"
       >
         <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px] sm:min-h-[240px] items-stretch">
           
           {/* Left Portion: Schoolgirl + Doodles + Origami Facets */}
           {/* Left Portion: Schoolgirl Partner Artwork */}
           <div className="lg:col-span-4 relative bg-[#FAFBFF] flex items-end justify-center lg:justify-start px-4 sm:px-6 pt-4 sm:pt-6 overflow-hidden min-h-[200px] lg:min-h-[240px]">
             {/* Soft background ambient glow */}
             <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-48 h-48 bg-blue-100/40 rounded-full blur-2xl pointer-events-none -z-0" />
             {/* Schoolgirl Photo Cutout with Native Origami Shapes & Doodles */}
             <div className="relative z-10 w-56 sm:w-64 lg:w-72 xl:w-80 h-auto self-end">
               <img
                 src="/assets/footer_student.svg"
                 alt="INGO Schools smiling partner"
                 className="w-full h-auto object-contain filter drop-shadow-lg transition-transform duration-300 hover:scale-105"
               />
             </div>
           </div>
           {/* Right Portion: Curved Blue-to-Violet Gradient Banner */}
           <div className="lg:col-span-8 relative bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] p-8 sm:p-10 lg:p-12 flex flex-col justify-center overflow-hidden">
             
             {/* Background translucent polygon aesthetics */}
             <div className="absolute top-0 right-1/4 w-48 h-48 bg-white/5 rotate-45 pointer-events-none" />
             <div className="absolute -bottom-10 right-28 w-40 h-40 bg-white/5 -rotate-12 pointer-events-none" />
             {/* Animated Asterisk / Golden Starburst in bottom right */}
             <motion.div
               className="absolute right-6 sm:right-10 bottom-4 sm:bottom-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none z-10"
               animate={{
                 rotate: [0, 360],
                 scale: [1, 1.08, 0.96, 1]
               }}
               transition={{
                 rotate: { repeat: Infinity, duration: 24, ease: "linear" },
                 scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
               }}
             >
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                 {/* 8-pointed golden star / asterisk with rounded thick lines */}
                 <g stroke="#F59E0B" strokeWidth="9" strokeLinecap="round">
                   <line x1="50" y1="8" x2="50" y2="92" />
                   <line x1="8" y1="50" x2="92" y2="50" />
                   <line x1="20" y1="20" x2="80" y2="80" />
                   <line x1="20" y1="80" x2="80" y2="20" />
                 </g>
               </svg>
             </motion.div>
             {/* Floating Top-Right White Arrow Button */}
             <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
               <motion.button
                 onClick={onOpenBooking}
                 whileHover={{ scale: 1.12, rotate: 5 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-xl shadow-blue-900/30 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors p-3.5 group cursor-pointer"
                 aria-label="Join our community"
               >
                 <ArrowUpRight className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
               </motion.button>
             </div>
             {/* Content Text */}
             <div className="relative z-10 max-w-xl space-y-2 sm:space-y-3 pr-16 sm:pr-20">
               {/* Yellow "Get in Touch" text */}
               <div className="text-[#FBBF24] font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2">
                 <span>Get in Touch</span>
               </div>
               {/* Main Headline */}
               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                 Join our community of school partners
               </h2>
               {/* Subtitle */}
               <p className="text-blue-100/90 text-sm sm:text-base font-normal leading-relaxed">
                 Let's build a smarter and brighter future for education — together.
               </p>
             </div>
           </div>
         </div>
       </motion.div>
       {/* ==================================================================
           2. MAIN 5-COLUMN FOOTER NAVIGATION
          ================================================================== */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pt-4">
         
         {/* Column 1: Brand & Socials (Span 4) */}
         <div className="lg:col-span-4 space-y-4">
           <a href="#home" className="inline-block group">
             <img
               src="/assets/ingo-schools-logo.svg"
               alt="INGO SCHOOLS"
               className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
             />
           </a>
           <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
             Empowering schools with smarter technology and simpler management.
           </p>
           {/* Social Icons Row */}
           <div className="flex items-center gap-3 pt-2">
             <motion.a
               href="https://facebook.com"
               target="_blank"
               rel="noreferrer"
               whileHover={{ y: -3, scale: 1.08 }}
               className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors shadow-sm"
               aria-label="Facebook"
             >
               <Facebook className="w-4 h-4" />
             </motion.a>
             <motion.a
               href="https://twitter.com"
               target="_blank"
               rel="noreferrer"
               whileHover={{ y: -3, scale: 1.08 }}
               className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors shadow-sm text-xs font-bold"
               aria-label="X (formerly Twitter)"
             >
               𝕏
             </motion.a>
             <motion.a
               href="https://linkedin.com"
               target="_blank"
               rel="noreferrer"
               whileHover={{ y: -3, scale: 1.08 }}
               className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors shadow-sm"
               aria-label="LinkedIn"
             >
               <Linkedin className="w-4 h-4" />
             </motion.a>
             <motion.a
               href="https://youtube.com"
               target="_blank"
               rel="noreferrer"
               whileHover={{ y: -3, scale: 1.08 }}
               className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors shadow-sm"
               aria-label="YouTube"
             >
               <Youtube className="w-4 h-4" />
             </motion.a>
           </div>
         </div>
         {/* Column 2: Quick Links (Span 2) */}
         <div className="lg:col-span-2 space-y-3.5">
           <h4 className="text-sm font-bold text-slate-900 tracking-tight">
             Quick Links
           </h4>
           <ul className="space-y-2.5">
             {quickLinks.map((item, idx) => (
               <li key={idx}>
                 <a
                   href={item.href}
                   onClick={(e) => {
                     if (onNavigate) {
                       const target = item.label.toLowerCase();
                       if (target.includes('contact')) {
                         e.preventDefault();
                         onNavigate('contact');
                       } else if (target.includes('about')) {
                         e.preventDefault();
                         onNavigate('about');
                       } else if (target.includes('feature')) {
                         e.preventDefault();
                         onNavigate('features');
                       } else if (target.includes('service')) {
                         e.preventDefault();
                         onNavigate('services');
                       } else if (target.includes('home')) {
                         e.preventDefault();
                         onNavigate('home');
                       }
                     }
                   }}
                   className="group inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                 >
                   <span>{item.label}</span>
                   <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-70 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-blue-600" />
                 </a>
               </li>
             ))}
           </ul>
         </div>
         {/* Column 3: Services (Span 2) */}
         <div className="lg:col-span-2 space-y-3.5">
           <h4 className="text-sm font-bold text-slate-900 tracking-tight">
             Services
           </h4>
           <ul className="space-y-2.5">
             {servicesLinks.map((item, idx) => (
               <li key={idx}>
                 <a
                   href={item.href}
                   onClick={(e) => {
                     if (onNavigate) {
                       e.preventDefault();
                       onNavigate('services');
                     }
                   }}
                   className="group inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                 >
                   <span>{item.label}</span>
                   <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-70 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-blue-600" />
                 </a>
               </li>
             ))}
           </ul>
         </div>
         {/* Column 4: Resources (Span 2) */}
         <div className="lg:col-span-2 space-y-3.5">
           <h4 className="text-sm font-bold text-slate-900 tracking-tight">
             Resources
           </h4>
           <ul className="space-y-2.5">
             {resourcesLinks.map((item, idx) => (
               <li key={idx}>
                 <a
                   href={item.href}
                   className="group inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                 >
                   <span>{item.label}</span>
                   <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-70 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-blue-600" />
                 </a>
               </li>
             ))}
           </ul>
         </div>
         {/* Column 5: Contact (Span 2) */}
         <div className="lg:col-span-2 space-y-3.5">
           <h4 className="text-sm font-bold text-slate-900 tracking-tight">
             Contact
           </h4>
           <ul className="space-y-3">
             <li>
               <a
                 href="mailto:hello@ingoschools.com"
                 className="group flex items-center gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors"
               >
                 <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                 <span className="truncate">hello@ingoschools.com</span>
               </a>
             </li>
             <li>
               <a
                 href="tel:+919876543210"
                 className="group flex items-center gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors"
               >
                 <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                 <span>+91 98765 43210</span>
               </a>
             </li>
             <li>
               <div className="flex items-center gap-2.5 text-sm text-slate-600">
                 <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                 <span>India</span>
               </div>
             </li>
           </ul>
         </div>
       </div>
       {/* ==================================================================
           3. BOTTOM COPYRIGHT & MOTTO BAR
          ================================================================== */}
       <div className="border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
         <div>
           &copy; 2026 INGO Schools. All rights reserved.
         </div>
         <div className="flex items-center gap-2 text-slate-600 font-medium">
           <img
             src="/assets/ingo-schools-logo.svg"
             alt="Logo Icon"
             className="w-4 h-4 object-contain"
           />
           <span>Smarter Schools</span>
           <span>&bull;</span>
           <span>Brighter Futures</span>
         </div>
       </div>
     </div>
   </footer>
 );
};
