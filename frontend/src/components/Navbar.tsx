import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home', href: '#home' },
    { name: 'Services', page: 'services', href: '#services' },
    { name: 'Key Features', page: 'features', href: '#features' },
    { name: 'About Us', page: 'about', href: '#about' },
    { name: 'Contact Us', page: 'contact', href: '#contact' }
  ];

  return (
    <header 
      className={`ingo-navbar ${
    isScrolled ? 'ingo-navbar-scrolled' : ''
    }`}>
      <div className="ingo-nav-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching the original image */}
       <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className={`ingo-brand ${isScrolled ? 'is-scrolled' : ''}`}
        >
          <div className="ingo-logo-wrapper">

            {/* Crown */}
            <img
              src="/assets/ingo school crown.png"
              alt="school crown"
              className="ingo-crown"
            />

            {/* Text */}
            <img
              src="/assets/ingo school text.png"
              alt="INGO SCHOOLS"
              className="ingo-logo-text"
            />

          </div>
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="ingo-nav-links hidden md:flex items-center">
          {navLinks.map((link) => {
            const isActive = activePage.toLowerCase() === link.page.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.page);
                }}
                className={` ingo-nav-link relative cursor-pointer ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button (Book Now ->) */}
        <div className="ingo-nav-right hidden md:flex items-center">
          <button
            id="book-now-btn"
            onClick={onOpenBooking}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full overflow-hidden shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              Book Now
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3"
          >
            {navLinks.map((link) => {
              const isActive = activePage.toLowerCase() === link.page.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/70 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-semibold text-white bg-blue-600 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
