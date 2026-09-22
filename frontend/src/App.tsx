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

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'features' | 'about' | 'contact'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleNavigate = (page: string) => {
    const p = page.toLowerCase();
    if (p.includes('contact')) {
      setCurrentPage('contact');
    } else if (p.includes('about')) {
      setCurrentPage('about');
    } else if (p.includes('feature')) {
      setCurrentPage('features');
    } else if (p.includes('service')) {
      setCurrentPage('services');
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser hash if user loads #services, #features, #about, #contact, or #home
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('contact')) {
        setCurrentPage('contact');
      } else if (hash.includes('about')) {
        setCurrentPage('about');
      } else if (hash.includes('feature')) {
        setCurrentPage('features');
      } else if (hash.includes('service')) {
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
      <main className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
                <FeatureCards />
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
              <ServicesPage onOpenBooking={handleOpenBooking} />
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

      {/* Interactive VIP Demo Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
      />

      {/* Custom Paper Airplane Cursor with Dashed Flight Trail */}
      <PaperAirplaneCursor />
    </div>
  );
};

export default App;
