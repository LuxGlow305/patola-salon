import React, { useState } from 'react';
import { Sparkles, Menu, X, Calendar, Languages, ShieldCheck, Phone, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  lang: 'roman' | 'urdu';
  setLang: (lang: 'roman' | 'urdu') => void;
  onBookClick: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Header({
  lang,
  setLang,
  onBookClick,
  onNavigate,
  activeSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', labelUrdu: 'ہوم', labelRoman: 'Home' },
    { id: 'services', label: 'Services', labelUrdu: 'خدمات', labelRoman: 'Services' },
    { id: 'package-builder', label: 'Package Builder', labelUrdu: 'پیکیج میکر', labelRoman: 'Package Builder' },
    { id: 'stylists', label: 'Our Experts', labelUrdu: 'ماہرین', labelRoman: 'Our Experts' },
    { id: 'reviews', label: 'Reviews', labelUrdu: 'رائے', labelRoman: 'Reviews' },
    { id: 'contact', label: 'Contact', labelUrdu: 'رابطہ', labelRoman: 'Contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-ivory/98 backdrop-blur-md border-b border-blush/60 shadow-xs">
      {/* Official Executive Banner Strip */}
      <div className="bg-charcoal text-[#FAF8F5] text-[11px] py-1.5 px-4 border-b border-rosegold/30 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          {/* Left: Official Registration & ISO License */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-rosegold/20 text-rosegold border border-rosegold/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-gold" />
              <span>{lang === 'urdu' ? 'رجسٹرڈ لائسنس # PK-PAT-8821' : 'Govt. Regd # PK-PAT-8821'}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-gray-300 text-[10px]">
              <Award className="w-3 h-3 text-gold" />
              <span>{lang === 'urdu' ? 'آئی ایس او 9001:2015 تصدیق شدہ' : 'ISO 9001:2015 Certified Salon'}</span>
            </span>
          </div>

          {/* Right: Direct Helpline & Operating Hours */}
          <div className="flex items-center gap-4 text-gray-300 font-mono text-[10px]">
            <a href="tel:+923218234567" className="flex items-center gap-1 hover:text-rosegold transition-colors">
              <Phone className="w-3 h-3 text-rosegold" />
              <span>+92 321 8234567</span>
            </a>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gold" />
              <span>{lang === 'urdu' ? '11:00 AM - 08:30 PM (منگل چھٹی)' : '11:00 AM - 08:30 PM (Tue Closed)'}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none"
          id="logo-btn"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rosegold flex items-center justify-center bg-white shadow-sm group-hover:border-gold transition-colors duration-300">
            <img
              src="/src/assets/images/patola_logo_1784638043210.jpg"
              alt="Patola Makeover Studio Official Logo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl font-bold tracking-[0.15em] text-charcoal uppercase block leading-none">
                Patola
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-200 uppercase">
                {lang === 'urdu' ? 'تصدیق شدہ' : 'Verified'}
              </span>
            </div>
            <span className="text-[9px] text-rosegold font-extrabold uppercase tracking-[0.25em] block font-mono leading-none mt-1">
              {lang === 'urdu' ? 'آفیشل میک اوور اسٹوڈیو' : 'Official Makeover Studio'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-semibold uppercase tracking-widest transition-all duration-300 relative py-1 focus:outline-none cursor-pointer ${
                  isActive ? 'text-rosegold' : 'text-charcoal/80 hover:text-rosegold'
                }`}
                id={`nav-${item.id}`}
              >
                {lang === 'urdu' ? item.labelUrdu : item.labelRoman}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rosegold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Language & Book CTAs) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'roman' ? 'urdu' : 'roman')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-rosegold/30 hover:border-rosegold text-xs font-semibold text-charcoal hover:text-rosegold transition-all bg-white shadow-xs cursor-pointer"
            id="lang-toggle-btn"
            title="Switch Language / زبان تبدیل کریں"
          >
            <Languages className="w-3.5 h-3.5 text-rosegold" />
            <span>{lang === 'roman' ? 'Urdu' : 'English'}</span>
          </button>

          {/* Appointment CTA */}
          <button
            onClick={onBookClick}
            className="flex items-center gap-2 bg-charcoal hover:bg-rosegold text-ivory px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            id="header-book-btn"
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>
              {lang === 'urdu' ? 'اپوائنٹمنٹ بک کریں' : 'Book Appointment'}
            </span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Lang Button */}
          <button
            onClick={() => setLang(lang === 'roman' ? 'urdu' : 'roman')}
            className="p-2 rounded-full border border-rosegold/30 bg-white text-charcoal"
            id="mobile-lang-btn"
          >
            <Languages className="w-4 h-4 text-rosegold" />
          </button>

          {/* Toggle Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-blush bg-white text-charcoal"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-blush/60 bg-ivory overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-4 rounded-xl text-base font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-rosegold/10 text-rosegold'
                      : 'text-charcoal/80 hover:bg-rosegold/5 hover:text-charcoal'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {lang === 'urdu' ? item.labelUrdu : item.labelRoman}
                </button>
              ))}

              <div className="pt-4 border-t border-blush/60 flex flex-col gap-3">
                {/* Book Appointment CTA Mobile */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="flex items-center justify-center gap-2 bg-rosegold text-white py-3 rounded-xl font-medium shadow-md hover:bg-gold transition-colors"
                  id="mobile-book-btn"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {lang === 'urdu' ? 'اپوائنٹمنٹ بک کریں' : 'Book Appointment'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
