import React from 'react';
import { Calendar, Award, Sparkles, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  lang: 'roman' | 'urdu';
  onBookClick: () => void;
  onExploreServices: () => void;
  onImageClick?: (src: string, title?: string) => void;
}

export default function Hero({ lang, onBookClick, onExploreServices, onImageClick }: HeroProps) {
  // Setup generated image
  const heroImageSrc = '/src/assets/images/salon_interior_1784636953553.jpg';

  const titleUrdu = 'آپ کی خوبصورتی اور اعتماد کا مرکز';
  const descUrdu = 'جدید سائنسی فیشل، کیراٹین ٹریٹمنٹ اور سگنیچر برائیڈل میک اپ کے لیے گورنمنٹ رجسٹرڈ اور آئی ایس او تصدیق شدہ آفیشل اسٹوڈیو، پٹولہ۔ ہمارے ماہرین آپ کو دیں ایک بالکل اعلیٰ، منفرد اور خوبصورت انداز۔';
  const descEnglish = "Pakistan's premier official luxury makeover studio, Patola. ISO 9001:2015 Certified & Govt Licensed, specializing in advanced scientific facials, restorative Keratin treatments, and signature bridal makeup by certified master stylists.";

  return (
    <section className="relative bg-ivory pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden border-b border-blush/60">
      {/* Decorative patterns */}
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-rosegold/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-blush/10 blur-3xl" />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal text-[#FAF8F5] border border-rosegold/40 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-wider font-mono">
                  {lang === 'urdu' ? 'گورنمنٹ لائسنس یافتہ اسٹوڈیو' : 'Official Govt Regd. Studio'}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                  {lang === 'urdu' ? 'آئی ایس او تصدیق شدہ' : 'ISO Certified'}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-charcoal leading-tight font-serif"
            >
              {lang === 'urdu' ? (
                <span className="font-urdu text-rose-950/90 font-semibold block leading-loose">{titleUrdu}</span>
              ) : (
                <span className="block font-light">
                  Official Luxury <span className="text-rosegold italic font-serif font-medium">Beauty & Makeover</span> <br className="hidden sm:inline" /> Executive Lounge
                </span>
              )}
            </motion.h1>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl"
            >
              {lang === 'urdu' ? descUrdu : descEnglish}
            </motion.p>
 
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={onBookClick}
                className="flex items-center gap-2 bg-charcoal hover:bg-rosegold text-ivory px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                id="hero-book-now"
              >
                <Calendar className="w-5 h-5 text-gold" />
                <span>
                  {lang === 'urdu' ? 'ابھی بکنگ کریں' : 'Book Appointment Now'}
                </span>
              </button>
 
              <button
                onClick={onExploreServices}
                className="flex items-center gap-2 border border-rosegold hover:bg-rosegold/5 text-charcoal px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                id="hero-explore"
              >
                <span>
                  {lang === 'urdu' ? 'سروسز دیکھیں' : 'View Services Menu'}
                </span>
              </button>
            </motion.div>
 
            {/* Mini metrics / Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-blush/60 max-w-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-rosegold">
                  <Award className="w-4 h-4 text-gold" />
                  <span className="font-mono text-lg font-bold text-charcoal">100%</span>
                </div>
                <p className="text-[10px] text-charcoal/70 font-bold uppercase tracking-wider">
                  {lang === 'urdu' ? 'آرگینک پیکیج' : 'Organic Products'}
                </p>
              </div>
 
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-rosegold">
                  <Heart className="w-4 h-4 text-rosegold" />
                  <span className="font-mono text-lg font-bold text-charcoal">15k+</span>
                </div>
                <p className="text-[10px] text-charcoal/70 font-bold uppercase tracking-wider">
                  {lang === 'urdu' ? 'خوش گاہک' : 'Happy Clients'}
                </p>
              </div>
 
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-rosegold">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="font-mono text-lg font-bold text-charcoal">12+</span>
                </div>
                <p className="text-[10px] text-charcoal/70 font-bold uppercase tracking-wider">
                  {lang === 'urdu' ? 'سال کا تجربہ' : 'Years Experience'}
                </p>
              </div>
            </motion.div>
          </div>
 
          {/* Luxury Graphic / Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Elegant outer frame with gold border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-rosegold/20 group cursor-zoom-in"
              onClick={() => onImageClick?.(heroImageSrc, lang === 'urdu' ? 'پٹولہ میک اوور اسٹوڈیو انٹیریئر' : 'Patola Makeover Studio Interior')}
            >
              <img
                src={heroImageSrc}
                alt="Luxury Patola Makeover Studio Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out image-rendering-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300 pointer-events-none" />
              
              {/* Overlay content inside image */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-rosegold/20 shadow-lg">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-rosegold font-mono">
                    {lang === 'urdu' ? 'حالیہ فیشن ٹرینڈز' : 'Our Luxurious Vibe'}
                  </h4>
                  <p className="text-sm font-bold text-charcoal">
                    {lang === 'urdu' ? 'جدید ماحول اور سکون بخش فضا' : 'Modern, sterile & peaceful atmosphere'}
                  </p>
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-rosegold animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-rosegold" />
                </div>
              </div>
            </motion.div>
 
            {/* Decorative Gold Frame Offset */}
            <div className="absolute -inset-2 rounded-2xl border-2 border-dashed border-rosegold/30 -z-10 pointer-events-none transform translate-x-4 translate-y-4" />
          </div>
 
        </div>
      </div>
 
      {/* Premium Marquee Ribbon */}
      <div className="bg-charcoal py-5 border-t border-b border-rosegold/30 overflow-hidden relative mt-16 shadow-inner">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-smooth {
            display: flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }
        `}</style>
        <div className="animate-marquee-smooth whitespace-nowrap flex items-center gap-12 text-[#FAF8F5]">
          {[1, 2].map((idx) => (
            <div key={idx} className="flex items-center gap-12 font-sans text-[11px] uppercase tracking-[0.25em] font-extrabold">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rosegold fill-rosegold shrink-0" />
                <span className="text-gray-100">{lang === 'urdu' ? 'سگنیچر رائل برائیڈل میک اپ' : 'Signature Royal Bridal Makeup'}</span>
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rosegold fill-rosegold shrink-0" />
                <span className="text-gray-100">{lang === 'urdu' ? 'ڈیپ کلینزنگ گلو فیشل' : 'Deep Cleansing Glow Facial'}</span>
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rosegold fill-rosegold shrink-0" />
                <span className="text-gray-100">{lang === 'urdu' ? 'لکشری ہیئر کٹ اور بلو ڈرائی' : 'Luxury Haircut & Blowdry'}</span>
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rosegold fill-rosegold shrink-0" />
                <span className="text-gray-100">{lang === 'urdu' ? 'کلینیکل ہائیڈرا فیشل' : 'Clinical HydraFacial'}</span>
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rosegold fill-rosegold shrink-0" />
                <span className="text-gray-100">{lang === 'urdu' ? 'ایکریلک نیل ایکسٹینشنز' : 'Acrylic Nail Extensions'}</span>
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rosegold fill-rosegold shrink-0" />
                <span className="text-gray-100">{lang === 'urdu' ? 'انگیجمنٹ اور نکاح میک اپ' : 'Engagement & Nikah Makeup'}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
