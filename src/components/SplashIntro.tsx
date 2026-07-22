import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface SplashIntroProps {
  lang: 'roman' | 'urdu';
  onComplete: () => void;
}

export default function SplashIntro({ lang, onComplete }: SplashIntroProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Auto dismiss after completion
    const timer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-[#FAF8F5] overflow-hidden select-none"
    >
      {/* Radial Gold Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-rosegold/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-gold/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Grid subtle pattern backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#b89656_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto space-y-6">
        
        {/* Animated Official Seal & Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Rotating Outer Gold Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border border-dashed border-rosegold/50"
          />

          {/* Logo Frame */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-rosegold p-1 bg-white shadow-2xl relative z-10">
            <img
              src="/src/assets/images/patola_logo_1784638043210.jpg"
              alt="Patola Makeover Studio Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Sparkle badge */}
          <div className="absolute -bottom-1 -right-1 bg-gold text-charcoal p-1.5 rounded-full shadow-lg z-20">
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Brand Title Animation */}
        <div className="space-y-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-rosegold block"
          >
            {lang === 'urdu' ? 'گورنمنٹ رجسٹرڈ آفیشل اسٹوڈیو' : 'Official Govt. Registered Studio'}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-3xl sm:text-4xl font-serif font-bold tracking-wider text-white uppercase"
          >
            PATOLA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase"
          >
            {lang === 'urdu' ? 'میک اوور اسٹوڈیو اینڈ سپا' : 'Makeover Studio & Spa'}
          </motion.p>
        </div>

        {/* Official Certifications Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-2"
        >
          <span className="inline-flex items-center gap-1 bg-white/10 text-gray-200 border border-white/15 px-2.5 py-1 rounded text-[10px] font-mono font-bold">
            <ShieldCheck className="w-3 h-3 text-gold" />
            <span>Regd # PK-PAT-8821</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-white/10 text-gray-200 border border-white/15 px-2.5 py-1 rounded text-[10px] font-mono font-bold">
            <Award className="w-3 h-3 text-rosegold" />
            <span>ISO 9001:2015</span>
          </span>
        </motion.div>

        {/* Animated Progress Bar */}
        <div className="w-48 sm:w-64 space-y-2 pt-4">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-rosegold via-gold to-rosegold rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
            <span>{lang === 'urdu' ? 'پورٹل اپ ڈیٹ ہو رہا ہے...' : 'Initializing Portal...'}</span>
            <span className="text-rosegold font-bold">{progress}%</span>
          </div>
        </div>

        {/* Quick Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={onComplete}
          className="text-[11px] font-mono uppercase tracking-widest text-gray-400 hover:text-white underline cursor-pointer pt-2 transition-colors"
        >
          {lang === 'urdu' ? 'جاری رکھیں ➔' : 'Skip Intro ➔'}
        </motion.button>
      </div>
    </motion.div>
  );
}
