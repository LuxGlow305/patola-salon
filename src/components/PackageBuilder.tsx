import React, { useState } from 'react';
import { services } from '../data';
import { Service } from '../types';
import { Plus, Check, Trash2, Percent, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PackageBuilderProps {
  lang: 'roman' | 'urdu';
  onBookPackage: (selectedServices: Service[], discount: number, finalPrice: number) => void;
}

export default function PackageBuilder({ lang, onBookPackage }: PackageBuilderProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleService = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  // Calculations
  const selectedServices = services.filter((s) => selectedIds.includes(s.id));
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  
  // Custom discount logic: 
  // 2 items = 5% off, 3 or more items = 10% off!
  let discountPercent = 0;
  if (selectedIds.length === 2) {
    discountPercent = 5;
  } else if (selectedIds.length >= 3) {
    discountPercent = 10;
  }
  
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalPrice = subtotal - discountAmount;

  return (
    <section id="package-builder" className="py-20 bg-ivory border-b border-blush/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rosegold font-mono">
            {lang === 'urdu' ? 'پیکیج ڈیزائنر' : 'Create Your Own Experience'}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal tracking-tight">
            {lang === 'urdu' ? 'اپنا بیوٹی پیکیج خود بنائیں' : 'Interactive Beauty Package Builder'}
          </h3>
          <p className="text-sm sm:text-base text-charcoal/80">
            {lang === 'urdu' ? (
              '۲ سروسز منتخب کرنے پر ۵٪ جبکہ ۳ یا اس سے زیادہ سروسز منتخب کرنے پر پائیں پورے ۱۰٪ کی رعایت!'
            ) : (
              'Select multiple services to design your custom pamper session. Get 5% OFF on 2 services, and 10% OFF on 3 or more services!'
            )}
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Selection Board */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-lg font-bold text-charcoal pb-2 border-b border-blush/60 font-serif">
              {lang === 'urdu' ? 'سروسز کی فہرست' : 'Select Pamper Services'}
            </h4>

            <div className="grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {services.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => handleToggleService(service.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between h-44 relative overflow-hidden group cursor-pointer ${
                      isSelected
                        ? 'border-rosegold bg-white ring-1 ring-rosegold/30 shadow-md'
                        : 'border-blush/50 bg-white hover:border-rosegold/50 hover:shadow-xs'
                    }`}
                    id={`pkg-select-${service.id}`}
                  >
                    {/* Tick Mark Corner Badge */}
                    <div className={`absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-bl-xl transition-all ${
                      isSelected ? 'bg-rosegold text-white' : 'bg-transparent text-transparent group-hover:text-gray-300'
                    }`}>
                      <Check className="w-4 h-4" />
                    </div>

                    <div className="space-y-1.5 pr-6">
                      <span className="text-[10px] font-bold text-rosegold uppercase tracking-widest font-mono">
                        {service.category}
                      </span>
                      <h5 className="font-bold text-sm text-charcoal line-clamp-2">
                        {lang === 'urdu' ? service.nameUrdu : service.name}
                      </h5>
                      <p className="text-xs text-charcoal/70 line-clamp-2">
                        {lang === 'urdu' ? service.descriptionUrdu : service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                      <span className="text-xs text-gray-400 font-mono">
                        {service.duration} mins
                      </span>
                      <span className="font-bold text-sm text-charcoal font-mono">
                        Rs. {service.price.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Luxury Custom Ticket / Invoice Display */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-blush/60 shadow-xl overflow-hidden relative">
              {/* Ticket Jagged top decoration */}
              <div className="h-2 bg-gradient-to-r from-rosegold via-blush to-rosegold" />
              
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-rosegold" />
                    <h4 className="text-md font-bold uppercase tracking-wider text-charcoal font-serif">
                      {lang === 'urdu' ? 'آپ کا کسٹم پیکیج' : 'Your Custom Pamper Package'}
                    </h4>
                  </div>
                  {selectedIds.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 focus:outline-none cursor-pointer"
                      id="pkg-clear-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'urdu' ? 'صاف کریں' : 'Clear'}</span>
                    </button>
                  )}
                </div>

                {/* Selected List */}
                <div className="min-h-[160px] border-y border-dashed border-blush/60 py-4 space-y-3">
                  <AnimatePresence mode="popLayout">
                    {selectedServices.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-[120px] flex flex-col items-center justify-center text-center text-gray-400 space-y-2"
                      >
                        <Sparkles className="w-8 h-8 text-gray-300 stroke-1" />
                        <p className="text-xs font-medium">
                          {lang === 'urdu' ? 'سروسز منتخب کر کے اپنا پیکیج تیار کریں' : 'Click on services on the left to add them to your package.'}
                        </p>
                      </motion.div>
                    ) : (
                      selectedServices.map((service) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex justify-between items-center bg-ivory/50 p-3 rounded-xl border border-blush/30"
                        >
                          <div className="pr-4">
                            <span className="text-[9px] uppercase font-mono tracking-widest text-rosegold font-bold">
                              {service.category}
                            </span>
                            <h6 className="text-xs font-bold text-charcoal line-clamp-1">
                              {lang === 'urdu' ? service.nameUrdu : service.name}
                            </h6>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-charcoal font-mono">
                              Rs. {service.price.toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleToggleService(service.id)}
                              className="text-gray-400 hover:text-red-500 p-1 rounded-full cursor-pointer hover:bg-red-50"
                              id={`pkg-remove-${service.id}`}
                            >
                              <XIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                {/* Cost Calculations */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs text-charcoal/80 font-medium">
                    <span>{lang === 'urdu' ? 'ذیلی کل قیمت' : 'Subtotal'}</span>
                    <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-xs text-emerald-600 font-semibold items-center bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                      <span className="flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'urdu' ? `کسٹم پیکیج ڈسکاؤنٹ (${discountPercent}%)` : `Custom Multi-Service Discount (${discountPercent}%)`}
                        </span>
                      </span>
                      <span className="font-mono">- Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                        {lang === 'urdu' ? 'کل رقم' : 'Grand Total'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {selectedServices.reduce((sum, s) => sum + s.duration, 0)} {lang === 'urdu' ? 'منٹ' : 'mins total'}
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-charcoal font-mono">
                      Rs. {finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onBookPackage(selectedServices, discountPercent, finalPrice)}
                  disabled={selectedIds.length === 0}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
                    selectedIds.length > 0
                      ? 'bg-rosegold text-white hover:bg-gold shadow-lg cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  }`}
                  id="pkg-book-now"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>
                    {lang === 'urdu' ? 'بکنگ فارم میں منتقل کریں' : 'Book Custom Package'}
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Simple internal X icon for removal
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
