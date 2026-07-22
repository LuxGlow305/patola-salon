import React, { useState } from 'react';
import { services } from '../data';
import { ServiceCategory, Service } from '../types';
import { Scissors, Sparkles, Smile, Brush, Heart, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesProps {
  lang: 'roman' | 'urdu';
  onSelectService: (service: Service) => void;
}

export default function Services({ lang, onSelectService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('hair');

  const categories: { id: ServiceCategory; label: string; labelUrdu: string; labelRoman: string; icon: React.ReactNode }[] = [
    { id: 'hair', label: 'Hair Care', labelUrdu: 'ہیئر کیئر', labelRoman: 'Hair Care', icon: <Scissors className="w-4 h-4" /> },
    { id: 'skin', label: 'Skin & Facial', labelUrdu: 'اسکن و فیشل', labelRoman: 'Skin & Facial', icon: <Smile className="w-4 h-4" /> },
    { id: 'makeup', label: 'Makeup', labelUrdu: 'میک اپ', labelRoman: 'Makeup & Styling', icon: <Brush className="w-4 h-4" /> },
    { id: 'nails', label: 'Nails', labelUrdu: 'ناخن اور مینی پیڈی', labelRoman: 'Nail Salon', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'bridal', label: 'Bridal', labelUrdu: 'برائیڈل پیکیجز', labelRoman: 'Bridal Specials', icon: <Heart className="w-4 h-4" /> },
  ];

  const filteredServices = services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-ivory border-b border-blush/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal text-[#FAF8F5] text-[10px] font-mono font-bold uppercase tracking-widest border border-rosegold/30 shadow-xs">
            <span>{lang === 'urdu' ? 'سرکاری رجسٹرڈ ٹریٹمنٹس مینو' : 'Official Registered Treatment Catalogue'}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal tracking-tight">
            {lang === 'urdu' ? 'پریمیم بیوٹی سروسز مینو' : 'Certified Executive Beauty & Styling Menu'}
          </h3>
          <p className="text-sm sm:text-base text-charcoal/80">
            {lang === 'urdu' ? (
              'ہمارے تمام ٹریٹمنٹس بین الاقوامی معیار کی ہربل اور نامیاتی مصنوعات، گورنمنٹ منظور شدہ ہائیجین اور جدید آلات کے ساتھ کئے جاتے ہیں۔'
            ) : (
              'Every treatment is conducted using ISO-standard organic ingredients, strictly sterilized medical-grade tools, and certified master precision.'
            )}
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rosegold text-white shadow-md'
                    : 'bg-white text-charcoal/80 border border-blush/60 hover:border-rosegold hover:bg-white'
                }`}
                id={`cat-btn-${cat.id}`}
              >
                {cat.icon}
                <span>{lang === 'urdu' ? cat.labelUrdu : cat.labelRoman}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8" id="services-grid">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-blush/50 hover:border-rosegold bg-white transition-all duration-300 shadow-xs hover:shadow-lg relative overflow-hidden"
              >
                {/* Thin top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-rosegold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="space-y-4">
                  {/* Service Title and Price */}
                  <div className="flex justify-between items-start gap-4 border-b border-blush/30 pb-3">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-charcoal group-hover:text-rosegold transition-colors">
                        {lang === 'urdu' ? service.nameUrdu : service.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-extrabold text-charcoal">
                        Rs. {service.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {lang === 'urdu' ? service.descriptionUrdu : service.description}
                  </p>
                </div>

                {/* Footer details & Action */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-blush/20">
                  <div className="flex items-center gap-1.5 text-xs text-charcoal/70 font-semibold font-mono">
                    <Clock className="w-3.5 h-3.5 text-rosegold" />
                    <span>
                      {service.duration} {lang === 'urdu' ? 'منٹ' : 'mins'}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-bold tracking-widest uppercase border border-rosegold text-charcoal bg-white hover:bg-rosegold hover:text-white hover:border-rosegold px-4 py-2 rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                    id={`service-book-${service.id}`}
                  >
                    {lang === 'urdu' ? 'بک کریں' : 'Book Service'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
