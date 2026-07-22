import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  lang: 'roman' | 'urdu';
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ lang, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-gray-400 py-16 border-t border-rosegold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-rosegold/30 flex items-center justify-center bg-white shadow-xs">
                <img
                  src="/src/assets/images/patola_logo_1784638043210.jpg"
                  alt="Patola Makeover Studio Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-sans text-lg font-black tracking-widest text-white uppercase block leading-none">
                  Patola
                </span>
                <span className="text-[9px] text-rosegold font-mono font-bold tracking-widest block uppercase mt-1">
                  {lang === 'urdu' ? 'گورنمنٹ منظور شدہ' : 'Govt. Regd. # PK-PAT-8821'}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              {lang === 'urdu' ? (
                'خوبصورتی اور اعتماد کا دوسرا نام، پٹولہ۔ گورنمنٹ لائسنس یافتہ اور آئی ایس او 9001:2015 تصدیق شدہ آفیشل میک اوور اسٹوڈیو۔'
              ) : (
                'Government Licensed & ISO 9001:2015 Certified Official Makeover Studio. Where beauty meets corporate precision and uncompromised organic care.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
              {lang === 'urdu' ? 'جلد روابط' : 'Explore'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition cursor-pointer">
                  {lang === 'urdu' ? 'سروسز مینو' : 'Services Menu'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('package-builder')} className="hover:text-white transition cursor-pointer">
                  {lang === 'urdu' ? 'پیکیج ڈیزائنر' : 'Package Builder'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stylists')} className="hover:text-white transition cursor-pointer">
                  {lang === 'urdu' ? 'ہمارا عملہ' : 'Our Specialists'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-white transition cursor-pointer">
                  {lang === 'urdu' ? 'اپوائنٹمنٹ بکنگ' : 'Book Appointment'}
                </button>
              </li>
            </ul>
          </div>

          {/* Location / Helpline */}
          <div className="space-y-3">
            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
              {lang === 'urdu' ? 'رابطہ و ہیلپ لائن' : 'Get in Touch'}
            </h5>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <span className="text-gray-400 font-bold block">{lang === 'urdu' ? 'فون نمبر' : 'Helpline'}</span>
                <span className="font-mono">+92 321 8234567</span>
              </li>
              <li>
                <span className="text-gray-400 font-bold block">{lang === 'urdu' ? 'ای میل' : 'Support'}</span>
                <span className="font-mono">appointments@patolamakeover.pk</span>
              </li>
            </ul>
          </div>

          {/* Operating Times */}
          <div className="space-y-3">
            <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
              {lang === 'urdu' ? 'کام کے اوقات' : 'Timings'}
            </h5>
            <div className="space-y-1 text-xs text-gray-500">
              <p>{lang === 'urdu' ? 'پیر تا اتوار:' : 'Mon - Sun:'} 11:00 AM - 08:30 PM</p>
              <p className="text-rosegold font-bold">{lang === 'urdu' ? 'منگل چھٹی ہے' : 'Tuesday Closed'}</p>
            </div>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {currentYear} Patola Makeover Studio. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>{lang === 'urdu' ? 'محبت اور خوبصورتی کے ساتھ تیار کردہ' : 'Crafted with elegance and precision'}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
