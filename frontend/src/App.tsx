import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { StudentCommunity } from './components/StudentCommunity';
import FAQ from "./components/FAQ";
import { ServicesPage } from './components/ServicesPage';
import { KeyFeaturesPage } from './components/KeyFeaturesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PaperAirplaneCursor } from './components/PaperAirplaneCursor';
import { InitialLoader } from './components/InitialLoader';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'features' | 'about' | 'contact'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModuleName, setBookingModuleName] = useState<string>('');

  const handleOpenBooking = (moduleName?: string) => {
    setBookingModuleName(moduleName || '');
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setBookingModuleName('');
  };

  const handleNavigate = (page: string) => {
    const p = page.toLowerCase();
    const hashIndex = page.indexOf('#');
    let targetHash = '';
    let targetPage = p;

    if (hashIndex !== -1) {
      targetHash = page.substring(hashIndex + 1);
      targetPage = p.substring(0, hashIndex);
    }

    if (targetHash) {
      window.history.pushState(null, '', `/services#${targetHash}`);
      window.location.hash = targetHash;
    }

    if (targetPage.includes('contact') || targetHash.includes('contact')) {
      setCurrentPage('contact');
    } else if (targetPage.includes('about') || targetHash.includes('about')) {
      setCurrentPage('about');
    } else if (targetPage.includes('feature') || targetHash.includes('feature')) {
      setCurrentPage('features');
    } else if (
      targetPage.includes('service') ||
      targetHash.includes('academic-management') ||
      targetHash.includes('student-management') ||
      targetHash.includes('hr-finance-management') ||
      targetHash.includes('exam-management')
    ) {
      setCurrentPage('services');
    } else {
      setCurrentPage('home');
    }

    if (!targetHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync with browser hash if user loads #services, #features, #about, #contact, #home or service section hashes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash.includes('contact') || path.includes('contact')) {
        setCurrentPage('contact');
      } else if (hash.includes('about') || path.includes('about')) {
        setCurrentPage('about');
      } else if (hash.includes('feature') || path.includes('feature')) {
        setCurrentPage('features');
      } else if (
        hash.includes('service') ||
        path.includes('service') ||
        hash.includes('academic-management') ||
        hash.includes('student-management') ||
        hash.includes('hr-finance-management') ||
        hash.includes('exam-management')
      ) {
        setCurrentPage('services');
      } else if (hash.includes('home') || hash === '' || hash === '#') {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFBFF] flex flex-col justify-between selection:bg-blue-600 selection:text-white ">
      {/* Ambient Radial Background Lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Main App Navigation */}
      <Navbar
        activePage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Dynamic Page Views with Smooth Framer Motion Transition */}
      <main className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] pb-6">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="space-y-6"
            >
              <Hero
                onOpenBooking={handleOpenBooking}
                onExploreFeatures={() => handleNavigate('features')}
              />

              {/* 4 Bottom Feature Cards on Home Page */}
              <div id="features-section">
                <FeatureCards onNavigate={handleNavigate} />
              </div>

              {/* Group of Students Community Showcase */}
              <StudentCommunity onOpenBooking={handleOpenBooking} />
              <FAQ />
            </motion.div>
          )}

          {currentPage === 'features' && (
            <motion.div
              key="features-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Flagship Interactive Feature Showcase Section */}
              <KeyFeaturesPage onOpenBooking={handleOpenBooking} />
            </motion.div>
          )}

          {currentPage === 'services' && (
            <motion.div
              key="services-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <ServicesPage
                onOpenBooking={handleOpenBooking}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <AboutPage onOpenBooking={handleOpenBooking} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <ContactPage onOpenBooking={handleOpenBooking} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Animated Call-to-Action Banner & Main Footer */}
      <Footer onOpenBooking={handleOpenBooking} onNavigate={handleNavigate} />

      {/* Interactive VIP Demo Booking / Contact Form Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        moduleName={bookingModuleName}
      />

      {/* Custom Paper Airplane Cursor Pointing in Reference Direction */}
      <PaperAirplaneCursor />

      {/* Unique Modern Origami Paper Airplane Initial Website Loader */}
      <InitialLoader />
    </div>
  );
};

export default App;
