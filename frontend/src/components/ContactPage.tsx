import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
  Building,
  User,
  MessageSquare,
  AlertCircle,
  FileText,
  X
} from 'lucide-react';

interface ContactPageProps {
  onOpenBooking?: () => void;
}

const smoothReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      delay: custom * 0.1,
      ease: 'easeOut'
    }
  })
};

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    role: 'Principal / Administrator',
    studentCount: '500 - 1,500',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Auto-dismiss success popup after exactly 10 seconds
  React.useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Auto-scroll to contact form if hash is present
  React.useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('contact-form') || hash.includes('form') || hash.includes('inquiry')) {
      setTimeout(() => {
        const formEl = document.getElementById('contact-form');
        if (formEl) {
          const navbarOffset = 88;
          const pos = formEl.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
          window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const roles = [
    'Principal / Administrator',
    'IT Director',
    'Teacher / Academic Lead',
    'Trustee / Board Member',
    'Parent / Student'
  ];

  const studentRanges = [
    '< 500',
    '500 - 1,500',
    '1,500 - 5,000',
    '5,000+'
  ];

  const faqs = [
    {
      question: 'How quickly can INGO Schools ERP be deployed in our school?',
      answer:
        'Most schools are fully operational within 3 to 7 business days. Our dedicated migration team handles all existing student, staff, and fee records from spreadsheets or older legacy systems without any downtime.'
    },
    {
      question: 'Do you provide teacher and staff training sessions?',
      answer:
        'Yes, absolutely! We provide complimentary interactive training workshops for your administrators, teachers, and accountants, complete with video walkthroughs, role-based cheat sheets, and 24/7 dedicated chat support.'
    },
    {
      question: 'Can INGO Schools integrate with RFID turnstiles and biometric hardware?',
      answer:
        'Yes. INGO Schools offers plug-and-play APIs and automated connectors for RFID gates, biometric thumb scanners, GPS school bus trackers, and major online payment gateways (UPI, NetBanking, Cards).'
    },
    {
      question: 'Is our student, financial, and academic data completely secure?',
      answer:
        'We adhere to ISO 27001 standards with bank-grade 256-bit AES encryption at rest and in transit. Your school data is stored in localized, automated-backup cloud data centers with strict role-based access controls.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Frontend Validations
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[1-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (cannot start with 0).');
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 3) {
      setErrorMessage('Please enter a message describing your requirements.');
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);

    // Friendly fallback ticket ID
    const randomTicket = `INGO-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: trimmedName,
          email: trimmedEmail,
          phone: cleanPhone,
          message: trimmedMessage,
          ticketId: randomTicket
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSubmitted(true);
        setTicketId(data.ticketId || randomTicket);
        setSuccessMessage(data.message || 'Thank you! Your message has been sent successfully. We will contact you soon.');
        // Clear/reset form fields after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          schoolName: '',
          role: 'Principal / Administrator',
          studentCount: '500 - 1,500',
          subject: '',
          message: ''
        });
      } else {
        setSubmitted(false);
        setErrorMessage(
          data?.message || 'Something went wrong. Please try again or contact us directly.'
        );
      }
    } catch {
      setSubmitted(false);
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ingo-contact-container w-full space-y-16 sm:space-y-24 lg:space-y-28 py-4 sm:py-8 select-none">
      
      {/* ====================================================================
          FULL-SCREEN SUCCESS POPUP MODAL (AUTO-DISMISSES AFTER 10 SECONDS)
         ==================================================================== */}
      <AnimatePresence>
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop with Soft Dark Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmitted(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 text-center overflow-hidden z-10 space-y-5"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated Success Checkmark Badge */}
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Thank you!
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                  {successMessage || "Your message has been sent successfully. We will contact you soon."}
                </p>
              </div>

              {/* Reference Ticket ID Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl py-3 px-4 text-xs text-slate-600 space-y-0.5">
                <div>
                  <span>Reference Ticket ID: </span>
                  <strong className="font-mono text-blue-600 font-bold text-sm ml-1">{ticketId}</strong>
                </div>
                <p className="text-[11px] text-slate-400">An INGO Schools specialist will reach out within 15 minutes.</p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Got It
                </button>
              </div>

              {/* 10-Second Auto-dismiss Progress Bar Indicator */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 10, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-1.5 bg-emerald-500"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* ====================================================================
          SECTION 1: HERO HEADER
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
        
       
        {/* Main Headline with Brush Underline */}
        <motion.h1
          variants={smoothReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-4xl sm:text-5xl lg:text-[4.1rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto"
        >
          <span>Let&apos;s Build a </span>
          <span className="relative inline-block text-blue-600">
            Smarter Campus
            {/* Hand-drawn Yellow Doodle Brush Stroke */}
            <svg
              className="absolute -bottom-2.5 left-0 w-[105%] h-4 overflow-visible pointer-events-none"
              viewBox="0 0 200 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 6 12 C 55 3, 145 4, 192 13 C 150 18, 80 17, 26 14"
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
          <span> Together</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={smoothReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Have questions about INGO Schools ERP? Looking for a personalized demo tailored to your school board? Our dedicated education technology team is here to help.
        </motion.p>

      </section>

      {/* ====================================================================
          SECTION 2: 3 QUICK CHANNELS
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Channel 1: Live Support */}
          <motion.div
            variants={smoothReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-blue-50 text-blue-600 inline-flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Email Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Fast inquiries &amp; campus onboarding assistance.
                </p>
              </div>
              <div className="space-y-1 pt-1">
                <a
                  href="mailto:Ingoschoolerp@gmail.com"
                  className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors block"
                >
                  Ingoschoolerp@gmail.com
                </a>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  ⚡ Avg. response &lt; 15 mins
                </span>
              </div>
            </div>
            <div className="pt-5 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Write to us</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
            </div>
          </motion.div>

          {/* Channel 2: Phone Hotline */}
          <motion.div
            variants={smoothReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 inline-flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Phone Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Mon &ndash; Sat from 8:00 AM to 7:00 PM IST.
                </p>
              </div>
              <div className="space-y-1 pt-1">
                <a
                  href="tel:+919981966037"
                  className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors block"
                >
                  99819 66037
                </a>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                  📞 Dedicated School ERP Team
                </span>
              </div>
            </div>
            <div className="pt-5 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Call direct</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
            </div>
          </motion.div>

          {/* Channel 3: Headquarters */}
          <motion.div
            variants={smoothReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-purple-50 text-purple-600 inline-flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Office Location
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Nagpur, Maharashtra, India
                </p>
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-xs font-semibold text-slate-700 leading-snug">
                  Subhagya Nagar, Hudkeshwar Road, Nagpur, Maharashtra, India
                </p>
                <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block">
                  📍 Campus Visits Welcome
                </span>
              </div>
            </div>
            <div className="pt-5 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Visit office</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 3: SPLIT INQUIRY FORM & SPECIALIST TRUST HUB
         ==================================================================== */}
      <section id="contact-form" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form (7 Cols) */}
          <motion.div
            variants={smoothReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Radial Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full filter blur-2xl pointer-events-none -z-10" />

            <div className="space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Send Us an Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Tell us about your campus. We will configure a custom demo suited to your academic curriculum.
              </p>
            </div>

            {/* Submission Failure / Validation Error Alert */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Unable to Send Message</p>
                    <p className="text-xs text-red-700 leading-relaxed">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Official Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. principal@greenwood.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: School Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    School / Institution Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Greenwood International School"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-2.5 flex items-center gap-1.5 text-slate-500 font-bold border-r border-slate-200 pr-2">
                      <span className="text-sm">+91</span>
                    </div>
                    <input
                      type="text"
                      maxLength={10}
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 10) {
                          setFormData({ ...formData, phone: val });
                        }
                      }}
                      className="w-full pl-[4.5rem] pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Role Selector Pills */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Your Role at the School
                </label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: r })}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        formData.role === r
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Count Range */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Total Students Enrolled
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {studentRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData({ ...formData, studentCount: range })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        formData.studentCount === range
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Subject Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Subject
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. ERP Demonstration & Pricing Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  How can we help your campus? *
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what modules you are looking for (e.g. Fee Management, Biometric Attendance, Parent App, Report Cards)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending inquiry...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send Inquiry &amp; Request VIP Demo</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

          {/* Right Column: Support Specialist Portrait & Trust Badges (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Specialist Photo Card */}
            <motion.div
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group cursor-pointer"
            >
              <img
                src="/assets/contact_support_specialist.svg"
                alt="INGO Schools Education Advisor"
                className="w-full h-[280px] sm:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Online Status Pill */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-100 shadow-md flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-slate-800">Support Advisors Online</p>
                  <p className="text-[10px] text-slate-500">Live assistance available</p>
                </div>
              </div>
            </motion.div>

            {/* Why Schools Love Reaching Out Card */}
            <motion.div
              variants={smoothReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4"
            >
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>The INGO Campus Experience</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">15-Minute Response Time</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Direct connection with education consultants, never automated bots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Complimentary Guided Demo</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Customized presentation tailored to your specific school board curriculum.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Zero Data Migration Burden</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      We import all your existing excel files and legacy data for free.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 4: FREQUENTLY ASKED QUESTIONS ACCORDION
         ==================================================================== */}
      <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="text-center space-y-2 mb-8">
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              Everything you need to know about switching to INGO Schools ERP.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-slate-400"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </section>

      {/* ====================================================================
          SECTION 5: BOTTOM CALL-TO-ACTION BANNER
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          {/* Background Ambient circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-2xl pointer-events-none" />

          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Upgrade Your Institution?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Book a live 20-minute 1-on-1 walkthrough with an education ERP specialist.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-50 font-extrabold text-sm sm:text-base shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              Book a Free Demo Now
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default ContactPage;
