import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PackageBuilder from './components/PackageBuilder';
import Stylists from './components/Stylists';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashIntro from './components/SplashIntro';
import { Service, Stylist } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ZoomOut, ExternalLink, Sparkles } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'roman' | 'urdu'>('roman');
  const [activeSection, setActiveSection] = useState('hero');

  // Immersive Lightbox Zoom States
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openLightbox = (src: string, title?: string) => {
    setLightboxImage(src);
    setLightboxTitle(title || '');
    setZoomScale(1); // Reset zoom on new image open
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle('');
    setZoomScale(1);
  };

  const toggleZoom = () => {
    setZoomScale(prev => (prev === 1 ? 1.8 : 1));
  };

  // Interactive booking transfer states
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedStylist, setPreselectedStylist] = useState<Stylist | null>(null);
  const [customPackageServices, setCustomPackageServices] = useState<Service[] | null>(null);
  const [customPackagePrice, setCustomPackagePrice] = useState<number | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookClick = () => {
    // Clear any previous custom package selections when navigating directly to Booking
    setCustomPackageServices(null);
    setCustomPackagePrice(null);
    setPreselectedService(null);
    setPreselectedStylist(null);
    handleNavigate('booking');
  };

  const handleSelectService = (service: Service) => {
    // Select specific service and jump to Stylist selection in booking flow
    setCustomPackageServices(null);
    setCustomPackagePrice(null);
    setPreselectedService(service);
    handleNavigate('booking');
  };

  const handleSelectStylist = (stylist: Stylist) => {
    // Select stylist and jump to booking flow
    setPreselectedStylist(stylist);
    handleNavigate('booking');
  };

  const handleBookPackage = (selectedServices: Service[], discount: number, finalPrice: number) => {
    // Transfer custom package from PackageBuilder straight to Booking Form
    setPreselectedService(null);
    setPreselectedStylist(null);
    setCustomPackageServices(selectedServices);
    setCustomPackagePrice(finalPrice);
    handleNavigate('booking');
  };

  const handleClearPreselections = () => {
    setPreselectedService(null);
    setPreselectedStylist(null);
    setCustomPackageServices(null);
    setCustomPackagePrice(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#120F0D] font-sans overflow-x-hidden selection:bg-[#C5A059] selection:text-white">
      {/* Start-up Luxury Intro Animation */}
      <AnimatePresence>
        {showSplash && (
          <SplashIntro
            lang={lang}
            onComplete={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      {/* Header Navigation */}
      <Header
        lang={lang}
        setLang={setLang}
        onBookClick={handleBookClick}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Hero Board */}
      <Hero
        lang={lang}
        onBookClick={handleBookClick}
        onExploreServices={() => handleNavigate('services')}
        onImageClick={openLightbox}
      />

      {/* Services Directory */}
      <Services
        lang={lang}
        onSelectService={handleSelectService}
      />

      {/* Custom Interactive Package Builder */}
      <PackageBuilder
        lang={lang}
        onBookPackage={handleBookPackage}
      />

      {/* Elite Stylists Team */}
      <Stylists
        lang={lang}
        onSelectStylist={handleSelectStylist}
        onImageClick={openLightbox}
      />

      {/* Step-by-Step Appointment Booking System */}
      <Contact
        lang={lang} // Contact component wraps map & contact form
      />

      {/* Booking Form Board */}
      <Booking
        lang={lang}
        preselectedService={preselectedService}
        preselectedStylist={preselectedStylist}
        customPackageServices={customPackageServices}
        customPackagePrice={customPackagePrice}
        onClearPreselections={handleClearPreselections}
      />

      {/* Testimonials, Before/After & Review creation */}
      <Reviews
        lang={lang}
        onImageClick={openLightbox}
      />

      {/* Footer Details */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Immersive Cinematic Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Control Header */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A059] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
                  {lang === 'urdu' ? 'ایچ ڈی ویو' : 'HD View Studio'}
                </span>
              </div>
              <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                {/* Zoom Toggle Button */}
                <button
                  onClick={toggleZoom}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#C5A059] text-white transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider font-mono border border-white/10"
                  title="Zoom In/Out"
                >
                  {zoomScale === 1 ? (
                    <>
                      <ZoomIn className="w-4 h-4" />
                      <span className="hidden sm:inline">{lang === 'urdu' ? 'زوم ان کریں' : 'Zoom In'}</span>
                    </>
                  ) : (
                    <>
                      <ZoomOut className="w-4 h-4" />
                      <span className="hidden sm:inline">{lang === 'urdu' ? 'زوم آؤٹ کریں' : 'Zoom Out'}</span>
                    </>
                  )}
                </button>

                {/* Direct High-Res Tab Link */}
                <a
                  href={lightboxImage}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#C5A059] text-white transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider font-mono border border-white/10"
                  title="Open in Full Resolution Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">{lang === 'urdu' ? 'بڑی تصویر' : 'HD Link'}</span>
                </a>

                {/* Elegant Close Button */}
                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/15 hover:bg-red-500 hover:rotate-90 text-white transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Immersive Image Display Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative max-w-full max-h-[80vh] overflow-auto rounded-xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={lightboxImage}
                alt={lightboxTitle || "High Resolution Look"}
                animate={{ scale: zoomScale }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-all duration-300 border-2 border-white/10 ${
                  zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
                }`}
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Elegant Floating Caption Bar */}
            {lightboxTitle && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute bottom-6 bg-black/75 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl text-center max-w-lg mx-auto"
              >
                <p className="text-white font-serif text-sm tracking-wide">
                  {lightboxTitle}
                </p>
                {zoomScale === 1 && (
                  <p className="text-[10px] text-[#C5A059] font-mono tracking-wider uppercase mt-1">
                    {lang === 'urdu' ? 'تفصیلات دیکھنے کے لیے زوم بٹن دبائیں' : 'Click Zoom button to inspect details'}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
