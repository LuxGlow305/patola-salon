import React, { useState } from 'react';
import { salonTimings, salonContact } from '../data';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  lang: 'roman' | 'urdu';
}

export default function Contact({ lang }: ContactProps) {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rosegold font-mono">
            {lang === 'urdu' ? 'رابطہ کریں' : 'Get in Touch'}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal tracking-tight">
            {lang === 'urdu' ? 'ہم سے رابطہ کریں اور تشریف لائیں' : 'Reach Out & Find Us'}
          </h3>
          <p className="text-sm sm:text-base text-charcoal/80">
            {lang === 'urdu' ? (
              'ہمارا عملہ آپ کے پیغامات کا جواب دینے اور کسٹمر سپورٹ کے لیے ہمیشہ دستیاب ہے۔'
            ) : (
              'Have any queries about our premium treatments? Reach out and we will be delighted to guide you.'
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start" id="contact-container">
          
          {/* Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-8">
            <h4 className="text-lg font-bold text-charcoal pb-2 border-b border-blush/60">
              {lang === 'urdu' ? 'معلومات برائے رابطہ' : 'Salon Location & Hours'}
            </h4>

            {/* Timings Card */}
            <div className="bg-ivory p-6 rounded-2xl border border-blush/60 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-rosegold/10 flex items-center justify-center text-rosegold shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h5 className="font-bold text-sm text-charcoal">
                  {lang === 'urdu' ? 'کام کے اوقات' : 'Operating Timings'}
                </h5>
                <div className="text-xs text-charcoal/80 space-y-1">
                  <p>
                    <span className="font-semibold">{lang === 'urdu' ? 'پیر تا جمعہ:' : 'Weekdays:'}</span>{' '}
                    <span className="font-mono">{salonTimings.weekdays}</span>
                  </p>
                  <p>
                    <span className="font-semibold">{lang === 'urdu' ? 'ہفتہ اور اتوار:' : 'Weekends:'}</span>{' '}
                    <span className="font-mono">{salonTimings.weekends}</span>
                  </p>
                  <p className="text-red-500 font-bold">
                    ⚠️ {lang === 'urdu' ? `ہفتہ وار چھٹی: ${salonTimings.closedDay}` : `Weekly Closed: ${salonTimings.closedDay}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Address phone email Card */}
            <div className="bg-ivory p-6 rounded-2xl border border-blush/60 space-y-4">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rosegold/10 flex items-center justify-center text-rosegold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-charcoal">
                    {lang === 'urdu' ? 'پتہ / لوکیشن' : 'Physical Address'}
                  </h5>
                  <p className="text-xs text-charcoal/80 leading-relaxed mt-0.5">
                    {salonContact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rosegold/10 flex items-center justify-center text-rosegold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-charcoal">
                    {lang === 'urdu' ? 'فون نمبر' : 'Phone Helpline'}
                  </h5>
                  <p className="text-xs text-charcoal/80 font-mono leading-relaxed mt-0.5">
                    {salonContact.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rosegold/10 flex items-center justify-center text-rosegold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-charcoal">
                    {lang === 'urdu' ? 'ای میل' : 'Email Address'}
                  </h5>
                  <p className="text-xs text-charcoal/80 font-mono leading-relaxed mt-0.5">
                    {salonContact.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-ivory p-6 sm:p-10 rounded-3xl border border-blush/60 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-rosegold" />
              
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg text-charcoal">
                        {lang === 'urdu' ? 'پیغام کامیابی سے موصول ہوا!' : 'Message Sent Successfully!'}
                      </h4>
                      <p className="text-xs text-charcoal/80 max-w-sm mx-auto">
                        {lang === 'urdu' ? (
                          'ہم آپ کے پیغام کو پڑھ کر جلد ہی فراہم کردہ ای میل پر رابطہ کریں گے۔'
                        ) : (
                          'Our customer service team has received your message and will get back to you shortly.'
                        )}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSendMessage}
                    className="space-y-5 text-left"
                  >
                    <h4 className="text-lg font-bold text-charcoal flex items-center gap-1.5 pb-2 border-b border-blush/60">
                      <Sparkles className="w-4 h-4 text-rosegold" />
                      <span>
                        {lang === 'urdu' ? 'کوئی سوال ہو تو پوچھیں' : 'Send a General Message'}
                      </span>
                    </h4>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal/80 block">
                        {lang === 'urdu' ? 'آپ کا نام' : 'Your Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-blush/60 bg-white focus:border-rosegold outline-none text-sm transition"
                        placeholder={lang === 'urdu' ? 'مثال: سمیرا قریشی' : 'e.g. Samira Qureshi'}
                        id="contact-name"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal/80 block">
                        {lang === 'urdu' ? 'ای میل ایڈریس' : 'Email Address'}
                      </label>
                      <input
                        type="type"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-blush/60 bg-white focus:border-rosegold outline-none text-sm transition"
                        placeholder="e.g. samira@example.com"
                        id="contact-email"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal/80 block">
                        {lang === 'urdu' ? 'پیغام' : 'Your Message'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-blush/60 bg-white focus:border-rosegold outline-none text-sm transition resize-none"
                        placeholder={lang === 'urdu' ? 'اپنا سوال یا پیغام یہاں لکھیں...' : 'Write your question or request here...'}
                        id="contact-msg"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3 bg-rosegold hover:bg-gold text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
                      id="contact-submit-btn"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'urdu' ? 'پیغام بھیجیں' : 'Send Message'}</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
