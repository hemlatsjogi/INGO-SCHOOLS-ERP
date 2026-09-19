import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  GraduationCap,
  Users,
  WalletCards,
  ClipboardCheck,
  Building,
  CheckCircle2
} from 'lucide-react';

export type ServiceId =
  | 'academic-management'
  | 'student-management'
  | 'hr-finance-management'
  | 'exam-management'
  | 'transport';

export interface ServiceDetailData {
  id: ServiceId;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  image: string;
  imageAlt: string;
}

export const serviceData: Record<ServiceId, ServiceDetailData> = {
  'academic-management': {
    id: 'academic-management',
    title: 'Academic Management',
    description:
      'Simplify academic planning, classes, subjects, curriculum and day-to-day academic operations.',
    features: [
      'Class & Subject Management',
      'Curriculum Planning',
      'Academic Scheduling',
      'Teacher Allocation'
    ],
    icon: GraduationCap,
    iconBg: 'bg-blue-50 text-blue-600',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 border-blue-100 text-blue-700',
    image: '/assets/about_teachers_meeting.jpg',
    imageAlt: 'Academic Management & Curriculum Planning'
  },
  'student-management': {
    id: 'student-management',
    title: 'Student Management',
    description:
      'Manage complete student information, attendance, profiles and day-to-day student activities.',
    features: [
      'Student Profiles',
      'Attendance Management',
      'Student Records',
      'Parent & Student Information'
    ],
    icon: Users,
    iconBg: 'bg-cyan-50 text-cyan-600',
    iconColor: 'text-cyan-600',
    badgeBg: 'bg-cyan-50 border-cyan-100 text-cyan-700',
    image: '/assets/about_campus_students.jpg',
    imageAlt: 'Student Management & Campus Activities'
  },
  'hr-finance-management': {
    id: 'hr-finance-management',
    title: 'HR & Finance Management',
    description:
      'Manage staff, payroll, fees and financial operations from one centralized system.',
    features: [
      'Staff Management',
      'Payroll Management',
      'Fee Management',
      'Financial Records'
    ],
    icon: WalletCards,
    iconBg: 'bg-pink-50 text-pink-600',
    iconColor: 'text-pink-600',
    badgeBg: 'bg-pink-50 border-pink-100 text-pink-700',
    image: '/assets/about_admin_colleagues.jpg',
    imageAlt: 'HR and Institutional Finance Administration'
  },
  'exam-management': {
    id: 'exam-management',
    title: 'Exam Management',
    description:
      'Plan examinations, schedules, assessments and results efficiently.',
    features: [
      'Exam Scheduling',
      'Marks & Assessments',
      'Result Management',
      'Report Generation'
    ],
    icon: ClipboardCheck,
    iconBg: 'bg-amber-50 text-amber-600',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-50 border-amber-100 text-amber-700',
    image: '/assets/about_computer_lab.jpg',
    imageAlt: 'Exam Management & Assessment Systems'
  },
  'transport': {
    id: 'transport',
    title: 'Transportation / Library / Hostel',
    description:
      'Manage school bus GPS tracking, library catalog inventory, hostel room allocations and campus security.',
    features: [
      'GPS Live Bus Tracking & Arrival Alerts',
      'Barcode Library Book Catalog & Issues',
      'Hostel Room Allocation & Warden Logs',
      'Digital Visitor Gate Pass & Security'
    ],
    icon: Building,
    iconBg: 'bg-rose-50 text-rose-600',
    iconColor: 'text-rose-600',
    badgeBg: 'bg-rose-50 border-rose-100 text-rose-700',
    image: '/assets/services_student_globe.jpg',
    imageAlt: 'Transportation, Library and Hostel Management'
  }
};

export interface ServiceModalProps {
  isOpen: boolean;
  service: ServiceDetailData | null;
  onClose: () => void;
  onExploreModule: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  service,
  onClose,
  onExploreModule
}) => {
  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !service) {
    return null;
  }

  const IconComponent = service.icon;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{
              type: 'spring',
              damping: 26,
              stiffness: 320
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[92vh] flex flex-col"
          >
            {/* Close Button at Top Right */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/90 sm:bg-slate-100/80 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 shadow-xs active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Body Content */}
            <div className="overflow-y-auto p-5 sm:p-7 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* LEFT: Service Image in Rounded Container */}
                <div className="md:col-span-5 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative w-full h-52 sm:h-64 md:h-[340px] rounded-2xl overflow-hidden shadow-md bg-slate-100 border border-slate-100 group"
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* RIGHT: Icon, Title, Description, Features & CTA Button */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
                  {/* Service Icon Badge */}
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${service.iconBg}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Service Title & Description */}
                  <div className="space-y-2">
                    <h3
                      id="service-modal-title"
                      className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug"
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* 3-5 Relevant Feature Points */}
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Capabilities
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-[13px] sm:text-sm font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Module Action Button */}
                  <div className="pt-3 sm:pt-4 border-t border-slate-100">
                    <button
                      onClick={onExploreModule}
                      className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/25 transition-all text-sm sm:text-base cursor-pointer"
                    >
                      <span>Explore Module</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ServiceModal;
