import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Users,
  BarChart2,
  ArrowRight,
  Shield,
  Lock,
  Cloud,
  BookOpen,
  Calendar,
  ListChecks,
  UserCheck,
  Trophy,
  Award,
  UserPlus,
  Contact2,
  CalendarCheck,
  MessageSquare,
  FileText,
  Clock,
  ClipboardList,
  FolderArchive,
  Compass,
  IndianRupee,
  Receipt,
  Wallet,
  WalletCards,
  PieChart,
  Bus,
  Library,
  Bed,
  Navigation,
  BookMarked,
  ShieldCheck,
  Building,
  ClipboardCheck
} from 'lucide-react';
import { ServicesHeroVisual } from './ServicesHeroVisual';
import {
  ServiceModal,
  serviceData,
  ServiceId,
  ServiceDetailData
} from './ServiceModal';

interface ServicesPageProps {
  onOpenBooking?: (moduleName?: string) => void;
  onNavigate?: (page: string) => void;
}

interface ServiceCardItem {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface ServiceCategory {
  id: ServiceId;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  cards: ServiceCardItem[];
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onNavigate: _onNavigate
}) => {
  // 5 Categories: 4 core services + Transport/Library/Hostel
  const categories: ServiceCategory[] = [
    {
      id: 'academic-management',
      name: 'Academics Management',
      icon: <GraduationCap className="w-6 h-6 text-[#7C3AED]" />,
      iconColor: 'text-[#7C3AED]',
      cards: [
        {
          number: '01',
          title: 'Curriculum & Syllabus',
          desc:
            'Plan and coordinate academic courses, syllabus milestones, classes and subject allocations.',
          icon: <BookOpen className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '02',
          title: 'Classroom & Section Setup',
          desc:
            'Configure grades, class sections, room allocations and academic term dates effortlessly.',
          icon: <Compass className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '03',
          title: 'Timetable Scheduling',
          desc:
            'Build clash-free timetables for teachers, classrooms and student batches with auto-scheduling.',
          icon: <Clock className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '04',
          title: 'Homework & Assignments',
          desc:
            'Distribute homework digitally, collect student submissions and grade coursework in one workflow.',
          icon: <ClipboardList className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '05',
          title: 'Digital Study Resources',
          desc:
            'Upload and organize syllabus notes, learning presentations and reference materials online.',
          icon: <FolderArchive className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '06',
          title: 'Academic Calendar',
          desc:
            'Coordinate examination schedules, school events, holidays and parent-teacher meeting dates.',
          icon: <Calendar className="w-5 h-5 text-[#5B4DF6]" />
        }
      ]
    },
    {
      id: 'student-management',
      name: 'Student Management',
      icon: <Users className="w-6 h-6 text-[#06B6D4]" />,
      iconColor: 'text-[#06B6D4]',
      cards: [
        {
          number: '01',
          title: 'Admissions',
          desc:
            'Manage student admissions and onboarding through a structured digital workflow.',
          icon: <UserPlus className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '02',
          title: 'Student Profiles',
          desc:
            'Keep student information, academic records and details organized in one place.',
          icon: <Contact2 className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '03',
          title: 'Attendance',
          desc:
            'Record and monitor daily attendance across classes and sections.',
          icon: <CalendarCheck className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '04',
          title: 'Parent Communication',
          desc:
            'Keep parents connected with announcements, updates and important school communication.',
          icon: <MessageSquare className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '05',
          title: 'Student Performance',
          desc:
            'Follow student progress and understand performance over time.',
          icon: <Trophy className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '06',
          title: 'Student Records',
          desc:
            'Access important student documents and records whenever they are needed.',
          icon: <FileText className="w-5 h-5 text-[#5B4DF6]" />
        }
      ]
    },
    {
      id: 'hr-finance-management',
      name: 'HR & Finance Management',
      icon: <WalletCards className="w-6 h-6 text-[#EC4899]" />,
      iconColor: 'text-[#EC4899]',
      cards: [
        {
          number: '01',
          title: 'Staff & Payroll',
          desc:
            'Automate teacher payroll, salary slips, deductions, tax compliance and allowances.',
          icon: <IndianRupee className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '02',
          title: 'Fee Collection & Invoicing',
          desc:
            'Manage fee structures, online parent payments, dues reminders and instant digital receipts.',
          icon: <Receipt className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '03',
          title: 'Staff Leave & Attendance',
          desc:
            'Track teacher biometric check-ins, leave approvals and automated substitute teacher allocation.',
          icon: <UserCheck className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '04',
          title: 'Expense Management',
          desc:
            'Track institutional expenses, departmental budgets, utility bills and vendor invoices.',
          icon: <Wallet className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '05',
          title: 'Teacher Recruitment',
          desc:
            'Coordinate job openings, candidate interviews, teacher evaluations and onboarding files.',
          icon: <UserPlus className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '06',
          title: 'Financial Reports & Audits',
          desc:
            'Generate complete balance sheets, financial summaries and audit trails effortlessly.',
          icon: <PieChart className="w-5 h-5 text-[#5B4DF6]" />
        }
      ]
    },
    {
      id: 'exam-management',
      name: 'Exam Management',
      icon: <ClipboardCheck className="w-6 h-6 text-[#F59E0B]" />,
      iconColor: 'text-[#F59E0B]',
      cards: [
        {
          number: '01',
          title: 'Exam Scheduling',
          desc:
            'Create examination schedules and coordinate subjects, classes and dates.',
          icon: <Calendar className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '02',
          title: 'Question Management',
          desc:
            'Organize question sets and examination material in one place.',
          icon: <ListChecks className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '03',
          title: 'Exam Attendance',
          desc:
            'Track student participation and examination attendance with ease.',
          icon: <UserCheck className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '04',
          title: 'Results Management',
          desc:
            'Manage marks, grades and academic results through one workflow.',
          icon: <BarChart2 className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '05',
          title: 'Performance Reports',
          desc:
            'Understand student performance through meaningful academic reports.',
          icon: <Trophy className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '06',
          title: 'Report Cards',
          desc:
            'Generate organized student report cards without repetitive manual work.',
          icon: <Award className="w-5 h-5 text-[#5B4DF6]" />
        }
      ]
    },
    {
      id: 'transport',
      name: 'Transportation / Library / Hostel',
      icon: <Building className="w-6 h-6 text-[#EF4444]" />,
      iconColor: 'text-[#EF4444]',
      cards: [
        {
          number: '01',
          title: 'GPS Bus Tracking',
          desc:
            'Live school bus location monitoring with instant arrival alerts for parents and drivers.',
          icon: <Bus className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '02',
          title: 'Library Book Catalog',
          desc:
            'Barcode scanning, book issue and return tracking, inventory management and overdue fines.',
          icon: <Library className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '03',
          title: 'Hostel Room Allocation',
          desc:
            'Manage dormitory beds, student room assignments, warden logs and mess meal plans.',
          icon: <Bed className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '04',
          title: 'Route & Driver Logs',
          desc:
            'Optimize bus routes, driver background verification and vehicle maintenance schedules.',
          icon: <Navigation className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '05',
          title: 'Digital E-Books',
          desc:
            'Provide digital library access to academic books, journals, study guides and publications.',
          icon: <BookMarked className="w-5 h-5 text-[#5B4DF6]" />
        },
        {
          number: '06',
          title: 'Gate Pass & Security',
          desc:
            'Issue digital visitor gate passes and monitor hostel check-ins and check-outs securely.',
          icon: <ShieldCheck className="w-5 h-5 text-[#5B4DF6]" />
        }
      ]
    }
  ];

  // Active category tab state - defaults to exam-management or hr-finance
  const [activeTabId, setActiveTabId] = useState<ServiceId>('hr-finance-management');
  const currentCategory =
    categories.find((c) => c.id === activeTabId) || categories[2];

  // Reusable Service modal state
  const [selectedService, setSelectedService] = useState<ServiceDetailData | null>(
    null
  );

  const handleOpenServiceModal = (id: ServiceId) => {
    if (serviceData[id]) {
      setSelectedService(serviceData[id]);
    }
  };

  const handleCloseServiceModal = () => {
    setSelectedService(null);
  };

  // Clicking "Explore Module" closes service popup and opens the Contact Form popup without redirecting
  const handleExploreModule = () => {
    const moduleTitle = selectedService?.title;
    setSelectedService(null);
    if (onOpenBooking) {
      onOpenBooking(moduleTitle);
    }
  };

  // Synchronize hash with active tab & smooth scrolling with sticky navbar offset
  const syncHashToCategory = () => {
    const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
    if (!rawHash) return;

    let targetTab: ServiceId | null = null;
    if (rawHash.includes('academic')) targetTab = 'academic-management';
    else if (rawHash.includes('student')) targetTab = 'student-management';
    else if (rawHash.includes('hr') || rawHash.includes('finance'))
      targetTab = 'hr-finance-management';
    else if (rawHash.includes('exam')) targetTab = 'exam-management';
    else if (
      rawHash.includes('transport') ||
      rawHash.includes('hostel') ||
      rawHash.includes('library')
    )
      targetTab = 'transport';

    if (targetTab) {
      setActiveTabId(targetTab);
      setTimeout(() => {
        const el =
          document.getElementById(targetTab!) ||
          document.getElementById('services-modules-section');
        if (el) {
          const navbarOffset = 88;
          const pos =
            el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
          window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
        }
      }, 120);
    }
  };

  useEffect(() => {
    syncHashToCategory();
    window.addEventListener('hashchange', syncHashToCategory);
    return () => window.removeEventListener('hashchange', syncHashToCategory);
  }, []);

  const whyChooseFeatures = [
    {
      title: 'Simple & Easy',
      desc: 'Intuitive design for smooth operation across all departments.',
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50'
    },
    {
      title: 'Secure & Reliable',
      desc: 'Your school data is encrypted and protected with 99.9% uptime.',
      icon: <Lock className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50'
    },
    {
      title: 'Cloud Based',
      desc: 'Access from any smartphone, tablet, or PC anytime, anywhere.',
      icon: <Cloud className="w-5 h-5 text-purple-600" />,
      iconBg: 'bg-purple-50'
    }
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-24 py-4 sm:py-8 select-none">
      {/* ====================================================================
          1. SERVICES HERO SECTION
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight"
            >
              <span>Everything Your </span>
              <br className="hidden sm:inline" />
              <span className="relative inline-block text-blue-600">
                School Needs
                {/* Yellow Curved Doodle Underline */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-[105%] h-4 overflow-visible pointer-events-none"
                  viewBox="0 0 180 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M 6 12 C 50 3, 130 4, 172 13 C 140 18, 70 17, 24 14"
                    stroke="#F59E0B"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal"
            >
              From student management to fee tracking, manage your complete
              school operations from one simple platform.
            </motion.p>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <ServicesHeroVisual />
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. INTERACTIVE SERVICE TABS & DYNAMIC 6 CARDS GRID
             (Exact replica of user reference image 1)
         ==================================================================== */}
      <section
        id="services-modules-section"
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 tracking-tight">
            Our Services & Modules
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Hover over or click any category below to instantly reveal comprehensive modules and workflows.
          </p>
        </div>

        {/* Top Category Tabs Bar with Exact IDs for Anchor Navigation */}
        <div className="w-full bg-[#FAF9F5] rounded-3xl p-3 sm:p-4 border border-slate-200/60 shadow-xs mb-10 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[680px] sm:min-w-0 sm:grid sm:grid-cols-5 gap-2 sm:gap-4 text-center">
            {categories.map((category) => {
              const isActive = activeTabId === category.id;
              return (
                <div
                  key={category.id}
                  id={category.id}
                  onMouseEnter={() => setActiveTabId(category.id)}
                  onClick={() => setActiveTabId(category.id)}
                  className="flex flex-col items-center justify-center cursor-pointer py-2 px-1 sm:px-2 rounded-2xl transition-all duration-200 group scroll-mt-24"
                  title={`View ${category.name}`}
                >
                  {/* Category Icon with Cream Background Pill when Active */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FFF7E8] shadow-sm scale-110'
                        : 'bg-transparent group-hover:bg-slate-100/80 group-hover:scale-105'
                    }`}
                  >
                    {category.icon}
                  </div>

                  {/* Category Title */}
                  <span
                    className={`text-xs sm:text-sm font-semibold mt-2.5 transition-colors line-clamp-1 text-center ${
                      isActive
                        ? 'text-slate-900 font-bold'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    {category.name}
                  </span>

                  {/* Active Orange/Yellow Indicator Underline */}
                  <div className="w-full h-1 mt-2.5 flex items-center justify-center overflow-hidden">
                    {isActive ? (
                      <motion.div
                        layoutId="active-category-underline"
                        className="w-16 sm:w-20 h-1 bg-[#EFA023] rounded-full"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 35
                        }}
                      />
                    ) : (
                      <div className="w-0 h-1" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic 6 Lavender Feature Cards (3 columns x 2 rows) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {currentCategory.cards.map((card, idx) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.18 } }}
                className="relative bg-[#F3F0FE] rounded-3xl p-7 sm:p-8 border border-[#E6E0FE]/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                onClick={() => handleOpenServiceModal(activeTabId)}
              >
                {/* Card Top Row: Left Icon Badge + Right Number Label */}
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-xs border border-purple-100/60 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-400/90 font-mono tracking-wider">
                    {card.number}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mt-6 mb-2 space-y-2.5">
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Subtle Hover Indication */}
                <div className="pt-4 mt-2 border-t border-purple-100/50 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs font-semibold text-[#5B4DF6]">
                    Explore Module
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5B4DF6] group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ====================================================================
          3. WHY CHOOSE OUR SERVICES SECTION
         ==================================================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-10 border border-slate-200/60 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Summary */}
          <div className="lg:max-w-lg space-y-3 text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-slate-900 tracking-tight leading-snug">
              <span>Why Choose Our </span>
              <span className="inline-flex items-center text-amber-500 mr-1">
                ✦
              </span>
              <br className="hidden sm:inline" />
              <span className="relative inline-block text-slate-900">
                Services?
                {/* Double Hand-drawn Yellow Underline Doodle */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3.5 overflow-visible pointer-events-none"
                  viewBox="0 0 140 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 2 6 C 35 1, 95 2, 136 7"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 12 12 C 45 7, 85 8, 128 12"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              Schools and districts save time and money, so they can focus on
              full-time staff and student outcomes. Subs work on their own terms
              while making a difference in students&apos; lives. The INGO
              platform makes it easy for administrators.
            </p>
          </div>

          {/* Right 3 Feature Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            {whyChooseFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left gap-3"
              >
                <div
                  className={`w-11 h-11 rounded-full ${feat.iconBg} flex items-center justify-center shadow-inner`}
                >
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. REUSABLE SERVICE DETAILS POPUP / MODAL
             (Supports Academic, Student, HR & Finance, Exam, and Transport)
         ==================================================================== */}
      <ServiceModal
        isOpen={!!selectedService}
        service={selectedService}
        onClose={handleCloseServiceModal}
        onExploreModule={handleExploreModule}
      />
    </div>
  );
};

export default ServicesPage;
