import React, { useState, useEffect } from 'react';
import { reviews as initialReviews, beforeAfters } from '../data';
import { Review } from '../types';
import { Star, MessageSquare, Quote, Sparkles, User, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeAfterSliderProps {
  key?: string | number;
  beforeUrl: string;
  afterUrl: string;
  title: string;
  lang: 'roman' | 'urdu';
  onImageClick?: (src: string, title: string) => void;
}

function BeforeAfterSlider({ beforeUrl, afterUrl, title, lang, onImageClick }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const position = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1 || isDragging) {
      const container = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, container);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#E8DFD8] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col space-y-4">
      <div
        className="relative aspect-16/10 rounded-xl overflow-hidden select-none cursor-ew-resize group border border-[#E8DFD8]/60"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Before Image (Background, underlay) */}
        <img
          src={beforeUrl}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onImageClick?.(beforeUrl, `${title} - ${lang === 'urdu' ? 'پہلے' : 'Before'}`);
          }}
          className="absolute bottom-3 left-3 bg-[#120F0D]/90 hover:bg-[#C5A059] text-white font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-all z-10 shadow-md cursor-zoom-in active:scale-95"
        >
          <span>{lang === 'urdu' ? 'پہلے 🔍' : 'BEFORE 🔍'}</span>
        </button>

        {/* After Image (Overlay, clipped based on slide percent) */}
        <img
          src={afterUrl}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
          referrerPolicy="no-referrer"
        />
        <div 
          className="absolute inset-0 bg-black/5 pointer-events-none" 
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onImageClick?.(afterUrl, `${title} - ${lang === 'urdu' ? 'بعد میں' : 'After'}`);
          }}
          className="absolute bottom-3 right-3 bg-[#C5A059] hover:bg-[#120F0D] text-white font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-all z-10 shadow-md cursor-zoom-in active:scale-95"
        >
          <span>{lang === 'urdu' ? 'بعد میں 🔍' : 'AFTER 🔍'}</span>
        </button>

        {/* Split separator and elegant dragging handle */}
        <div
          className="absolute inset-y-0 w-[2px] bg-white pointer-events-none z-10 shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1A1512] border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-2xl active:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
            </svg>
          </div>
        </div>

        {/* Interactive hints */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#1A1512]/75 backdrop-blur-xs text-[9px] text-white px-2.5 py-0.5 rounded-full uppercase tracking-widest font-mono font-bold pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {lang === 'urdu' ? 'سلائیڈ کریں' : 'Drag to compare'}
        </div>
      </div>
      <div className="text-center pt-1">
        <h5 className="font-sans font-extrabold text-sm text-[#1A1512] flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <span>{title}</span>
        </h5>
      </div>
    </div>
  );
}

interface ReviewsProps {
  lang: 'roman' | 'urdu';
  onImageClick?: (src: string, title?: string) => void;
}

export default function Reviews({ lang, onImageClick }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form states
  const [clientName, setClientName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedService, setSelectedService] = useState('Luxury Haircut & Blowdry');

  // Load reviews from localStorage if available
  useEffect(() => {
    const localReviews = localStorage.getItem('patola_reviews');
    if (localReviews) {
      try {
        setReviews(JSON.parse(localReviews));
      } catch (e) {
        console.error('Failed to parse cached reviews', e);
      }
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !comment) return;

    const newReview: Review = {
      id: `custom-rev-${Date.now()}`,
      clientName,
      rating,
      comment,
      commentUrdu: comment,
      commentRoman: comment,
      date: new Date().toISOString().split('T')[0],
      service: selectedService
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('patola_reviews', JSON.stringify(updatedReviews));

    // Reset Form
    setClientName('');
    setRating(5);
    setComment('');
    setShowForm(false);
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-20 bg-[#FDFBF7] border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
            {lang === 'urdu' ? 'گاہکوں کی رائے' : 'Stories of Radiance'}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#120F0D] tracking-tight">
            {lang === 'urdu' ? 'ہمارے گاہکوں کا خوبصورت اعتماد' : 'Client Testimonials & Makeovers'}
          </h3>
          <p className="text-sm sm:text-base text-[#5E544D]">
            {lang === 'urdu' ? (
              'ہمارے مہمانوں کے حقیقی تاثرات جو ہماری اعلیٰ خدمات کی گواہی دیتے ہیں۔'
            ) : (
              'Read real words from our esteemed clients and explore some of our most stunning beauty transformations.'
            )}
          </p>
        </div>

        {/* Before and After Transformations Showcase */}
        <div className="mb-20">
          <h4 className="text-lg font-bold text-[#120F0D] mb-6 text-center flex items-center justify-center gap-2 font-serif">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <span>{lang === 'urdu' ? 'رئیل ٹائم ٹرانسفارمیشن گیلری' : 'Real-Life Client Transformations'}</span>
          </h4>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {beforeAfters.map((ba) => (
              <BeforeAfterSlider
                key={ba.id}
                beforeUrl={ba.beforeUrl}
                afterUrl={ba.afterUrl}
                title={lang === 'urdu' ? ba.titleUrdu : ba.titleRoman}
                lang={lang}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        </div>

        {/* Reviews Grid & Review Addition Actions */}
        <div className="space-y-12">
          
          {/* Add Review & Header Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-4xl mx-auto pb-6 border-b border-[#EDE6DF]">
            <h4 className="text-lg font-bold text-[#120F0D] flex items-center gap-2 font-serif">
              <MessageSquare className="w-5 h-5 text-[#C5A059]" />
              <span>
                {lang === 'urdu' ? 'حالیہ گاہکوں کے تاثرات' : 'What Our Guests are Saying'}
              </span>
            </h4>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 rounded-full border border-[#C5A059] text-xs font-bold uppercase tracking-widest bg-white hover:bg-[#120F0D] hover:text-[#FDFBF7] transition-all cursor-pointer"
              id="add-review-trigger"
            >
              {showForm 
                ? (lang === 'urdu' ? 'بند کریں' : 'Close Form') 
                : (lang === 'urdu' ? 'اپنی رائے لکھیں' : 'Write a Review')}
            </button>
          </div>

          {/* Success Alerts */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>
                  {lang === 'urdu' 
                    ? 'آپ کی رائے کے لیے بہت شکریہ! یہ کامیابی سے شائع ہو گئی ہے۔' 
                    : 'Thank you for your beautiful review! It has been published successfully.'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Review Writing Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD8] shadow-md overflow-hidden"
              >
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <h5 className="font-sans font-bold text-base text-[#1A1512] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span>
                      {lang === 'urdu' ? 'اپنی رائے اور ریٹنگ درج کریں' : 'Share Your Authentic Experience'}
                    </span>
                  </h5>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Client Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#625348] block">
                        {lang === 'urdu' ? 'آپ کا نام' : 'Your Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8DFD8] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/30 outline-none text-sm transition"
                        placeholder={lang === 'urdu' ? 'مثال: سمیرا احمد' : 'e.g. Samira Ahmed'}
                        id="rev-name-input"
                      />
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#625348] block">
                        {lang === 'urdu' ? 'سروس کا نام' : 'Treatment/Service'}
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8DFD8] focus:border-[#C5A880] bg-white outline-none text-sm transition"
                        id="rev-service-select"
                      >
                        <option value="Luxury Haircut & Blowdry">Luxury Haircut & Blowdry</option>
                        <option value="Balayage & Hair Color">Balayage & Hair Color</option>
                        <option value="Clinical HydraFacial">Clinical HydraFacial</option>
                        <option value="Glamorous Party Makeup">Glamorous Party Makeup</option>
                        <option value="Signature Royal Bridal Makeup">Signature Royal Bridal Makeup</option>
                      </select>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#625348] block">
                      {lang === 'urdu' ? 'اسٹار ریٹنگ' : 'Select Rating Stars'}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1 focus:outline-none cursor-pointer"
                          id={`star-btn-${num}`}
                        >
                          <Star
                            className={`w-6 h-6 transition-all ${
                              num <= rating ? 'fill-[#C5A880] text-[#C5A880]' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#625348] block">
                      {lang === 'urdu' ? 'تبصرہ / رائے' : 'Your Detailed Review'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DFD8] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/30 outline-none text-sm transition resize-none"
                      placeholder={lang === 'urdu' ? 'اپنا تبصرہ یہاں درج کریں...' : 'How was your treatment? Let us know!'}
                      id="rev-comment-input"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1A1512] hover:bg-[#C5A880] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow cursor-pointer"
                    id="submit-review-btn"
                  >
                    {lang === 'urdu' ? 'رائے شائع کریں' : 'Submit Review'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Testimonial Cards Slider/Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto" id="reviews-container">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD8] relative hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                {/* Quote symbol decoration */}
                <Quote className="w-10 h-10 text-[#C5A880]/10 absolute top-6 right-6" />

                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                    ))}
                    {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gray-200" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-xs sm:text-sm text-[#625348] leading-relaxed italic relative z-10">
                    "{lang === 'urdu' ? rev.commentUrdu : rev.comment}"
                  </p>
                </div>

                {/* Testimonial Author details */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-6">
                  <div className="w-9 h-9 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880] font-bold text-sm uppercase">
                    {rev.clientName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#1A1512] block">
                      {rev.clientName}
                    </h5>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{rev.date}</span>
                      <span>•</span>
                      <span>{rev.service}</span>
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
