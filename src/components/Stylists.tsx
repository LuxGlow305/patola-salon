import React from 'react';
import { stylists } from '../data';
import { Stylist } from '../types';
import { Star, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface StylistsProps {
  lang: 'roman' | 'urdu';
  onSelectStylist: (stylist: Stylist) => void;
  onImageClick?: (src: string, title?: string) => void;
}

export default function Stylists({ lang, onSelectStylist, onImageClick }: StylistsProps) {
  return (
    <section id="stylists" className="py-20 bg-white border-b border-blush/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal text-[#FAF8F5] text-[10px] font-mono font-bold uppercase tracking-widest border border-rosegold/30 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>{lang === 'urdu' ? 'تصدیق شدہ بیوٹی کونسل پینل' : 'Official Board Certified Master Stylists'}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal tracking-tight">
            {lang === 'urdu' ? 'خوبصورتی کے سب سے تجربہ کار ماہرین' : 'Executive Beauty & Hair Consultants'}
          </h3>
          <p className="text-sm sm:text-base text-charcoal/80">
            {lang === 'urdu' ? (
              'ہمارے تمام بیوٹیشنز اور ہیئر اسٹائلسٹ بین الاقوامی اداروں سے لائسنس یافتہ اور تصدیق شدہ ہیں۔'
            ) : (
              'Every member of our senior team holds international certifications, state licensure, and strict hygienic protocols.'
            )}
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid md:grid-cols-3 gap-8" id="stylists-grid">
          {stylists.map((stylist, index) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-ivory/40 rounded-2xl overflow-hidden border border-blush/60 hover:border-rosegold transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              
              {/* Image Frame */}
              <div 
                className="relative aspect-square sm:aspect-10/9 overflow-hidden cursor-zoom-in group/img"
                onClick={() => onImageClick?.(stylist.image, stylist.name)}
              >
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out image-rendering-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover/img:from-black/50 transition-all duration-300" />
                
                {/* Rating Badge Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold font-mono text-charcoal flex items-center gap-1 shadow-md border border-rosegold/20">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>{stylist.rating.toFixed(1)}</span>
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-rosegold text-xs font-bold font-mono uppercase tracking-widest mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{lang === 'urdu' ? 'مصدقہ ماہر' : 'Certified Artist'}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-wide font-serif">
                    {stylist.name}
                  </h4>
                </div>
              </div>

              {/* Bio & Specialties */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Role Title */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-rosegold uppercase tracking-wider font-mono">
                      {lang === 'urdu' ? 'عہدہ' : 'Designation'}
                    </span>
                    <h5 className="font-semibold text-charcoal text-sm">
                      {lang === 'urdu' ? stylist.roleUrdu : stylist.role}
                    </h5>
                  </div>

                  {/* Personal Bio */}
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                    {lang === 'urdu' ? stylist.bioUrdu : stylist.bio}
                  </p>

                  {/* List of Specialties as Tags */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-mono block">
                      {lang === 'urdu' ? 'کامیاب مہارتیں' : 'Signature Skills'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stylist.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="bg-rosegold/5 text-charcoal/80 border border-rosegold/15 px-2.5 py-1 rounded-md text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Booking Link */}
                <button
                  onClick={() => onSelectStylist(stylist)}
                  className="w-full mt-6 py-3 rounded-xl border border-charcoal text-charcoal bg-white hover:bg-rosegold hover:text-white hover:border-rosegold font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xs cursor-pointer"
                  id={`stylist-book-${stylist.id}`}
                >
                  {lang === 'urdu' ? `${stylist.name.split(' ')[0]} کے ساتھ بک کریں` : `Book with ${stylist.name.split(' ')[0]}`}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
