import React, { useState, useEffect } from 'react';
import { services, stylists, salonTimings } from '../data';
import { Service, Stylist, Appointment } from '../types';
import { Calendar, Clock, User, Phone, Check, ArrowRight, ArrowLeft, Ticket, Trash2, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingProps {
  lang: 'roman' | 'urdu';
  preselectedService?: Service | null;
  preselectedStylist?: Stylist | null;
  customPackageServices?: Service[] | null;
  customPackagePrice?: number | null;
  onClearPreselections: () => void;
}

export default function Booking({
  lang,
  preselectedService,
  preselectedStylist,
  customPackageServices,
  customPackagePrice,
  onClearPreselections,
}: BookingProps) {
  const [activeTab, setActiveTab] = useState<'book' | 'my-bookings'>('book');
  const [step, setStep] = useState(1);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState<Appointment | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Booking Form States
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  // Load appointments from localStorage
  useEffect(() => {
    const cached = localStorage.getItem('patola_appointments');
    if (cached) {
      try {
        setAppointments(JSON.parse(cached));
      } catch (e) {
        console.error('Failed to parse appointments', e);
      }
    }
  }, []);

  // Handle preselected items passed from other components
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
      setStep(2); // Jump directly to Stylist selection step
      setActiveTab('book');
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedStylist) {
      setSelectedStylist(preselectedStylist);
      if (selectedService || customPackageServices) {
        setStep(3); // If service already selected, jump to Date-Time
      } else {
        setStep(1); // Otherwise choose service first
      }
      setActiveTab('book');
    }
  }, [preselectedStylist]);

  useEffect(() => {
    if (customPackageServices && customPackageServices.length > 0) {
      // Package uses specialized custom pricing
      setActiveTab('book');
      setStep(2); // Go to Stylist selection
    }
  }, [customPackageServices]);

  // Cancel / Delete Appointment
  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem('patola_appointments', JSON.stringify(updated));
  };

  // Form submission / Confirmation
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (!clientName || !clientPhone || !bookingDate || !bookingTime) return;

    // Check if Tuesday (Mangal) - Tuesday is closed
    const day = new Date(bookingDate).getDay();
    if (day === 2) {
      setValidationError(lang === 'urdu' ? 'منگل کو ہمارا اسٹوڈیو بند ہوتا ہے۔ برائے مہربانی کوئی اور دن منتخب کریں۔' : 'Our studio is closed on Tuesdays. Please select a different day.');
      return;
    }

    const price = customPackagePrice && customPackageServices 
      ? customPackagePrice 
      : (selectedService ? selectedService.price : 0);

    const apptId = `PAT-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAppointment: Appointment = {
      id: apptId,
      clientName,
      clientPhone,
      serviceId: customPackageServices ? 'custom-package' : (selectedService?.id || ''),
      stylistId: selectedStylist?.id || 'any',
      date: bookingDate,
      time: bookingTime,
      status: 'confirmed',
      notes,
      totalPrice: price,
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('patola_appointments', JSON.stringify(updated));
    setBookingConfirmed(newAppointment);
    
    // Clear selections
    onClearPreselections();
  };

  const handleResetBookingWizard = () => {
    setBookingConfirmed(null);
    setSelectedService(null);
    setSelectedStylist(null);
    setBookingDate('');
    setBookingTime('');
    setClientName('');
    setClientPhone('');
    setNotes('');
    setStep(1);
    setActiveTab('my-bookings');
  };

  // Disable past dates in date-picker
  const getMinDateString = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <section id="booking" className="py-20 bg-white border-b border-blush/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Official Header Badge */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-charcoal text-[#FAF8F5] text-[10px] font-mono font-bold uppercase tracking-widest border border-rosegold/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{lang === 'urdu' ? 'آفیشل آن لائن بکنگ پورٹل' : 'Official Executive Reservation Portal'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-charcoal tracking-tight">
            {lang === 'urdu' ? 'برائے مہربانی اپنی اپوائنٹمنٹ درج کریں' : 'Instant Verified Appointment Desk'}
          </h3>
        </div>

        {/* Section Tabs (Book Appt vs My Appts) */}
        <div className="flex border-b border-blush/60 mb-10 justify-center">
          <button
            onClick={() => setActiveTab('book')}
            className={`px-8 py-4 font-bold text-xs uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'border-rosegold text-charcoal font-mono'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
            id="tab-book-trigger"
          >
            {lang === 'urdu' ? 'نئی بکنگ کریں' : 'Official Booking Form'}
          </button>
          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`px-8 py-4 font-bold text-xs uppercase tracking-widest border-b-2 transition-all cursor-pointer relative ${
              activeTab === 'my-bookings'
                ? 'border-rosegold text-charcoal font-mono'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
            id="tab-my-bookings-trigger"
          >
            <span>{lang === 'urdu' ? 'میری بکنگز' : 'Verified Reservations'}</span>
            {appointments.length > 0 && (
              <span className="absolute top-2 right-1 w-5 h-5 bg-rosegold text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {appointments.length}
              </span>
            )}
          </button>
        </div>

        {/* --- BOOK APPOINTMENT FLOW --- */}
        {activeTab === 'book' && (
          <div className="bg-ivory rounded-3xl border border-blush/60 p-6 sm:p-10 shadow-lg relative overflow-hidden">
            
            {/* Inline Validation Alert Bar */}
            <AnimatePresence>
              {validationError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm rounded-xl p-4 mb-6 flex items-start justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-start gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                  <button 
                    onClick={() => setValidationError(null)} 
                    className="text-red-500 hover:text-red-700 font-extrabold cursor-pointer text-sm"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirmation Screen Overlay */}
            {bookingConfirmed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 space-y-8"
              >
                {/* Checkmark Animation */}
                <div className="w-16 h-16 bg-rosegold rounded-full flex items-center justify-center text-white mx-auto shadow-md animate-bounce">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">
                    {lang === 'urdu' ? 'اپوائنٹمنٹ کامیابی سے بک ہو گئی!' : 'Booking Successfully Confirmed!'}
                  </h3>
                  <p className="text-sm text-charcoal/80 max-w-md mx-auto">
                    {lang === 'urdu' ? (
                      'آپ کا ٹکٹ تیار ہے۔ برائے مہربانی اپوائنٹمنٹ کے وقت اپنے فون پر یہ ٹکٹ دکھائیں۔'
                    ) : (
                      'Your luxury pamper session has been registered. Please present the ticket ID below at the reception desk.'
                    )}
                  </p>
                </div>

                {/* Elegant Savable Ticket */}
                <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-rosegold/30 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-rosegold" />
                  <div className="p-6 space-y-4 text-left">
                    <div className="flex justify-between items-center pb-3 border-b border-dashed border-blush/60">
                      <div>
                        <span className="text-[10px] font-bold text-rosegold uppercase tracking-widest font-mono">
                          Ticket ID
                        </span>
                        <h4 className="text-lg font-mono font-black text-charcoal">
                          {bookingConfirmed.id}
                        </h4>
                      </div>
                      <Ticket className="w-8 h-8 text-rosegold/40" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="space-y-0.5">
                        <span className="text-gray-400 font-medium">
                          {lang === 'urdu' ? 'گاہک کا نام' : 'Guest Name'}
                        </span>
                        <p className="font-bold text-[#1A1512]">{bookingConfirmed.clientName}</p>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-gray-400 font-medium">
                          {lang === 'urdu' ? 'فون نمبر' : 'Phone'}
                        </span>
                        <p className="font-bold text-[#1A1512] font-mono">{bookingConfirmed.clientPhone}</p>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-gray-400 font-medium">
                          {lang === 'urdu' ? 'تاریخ' : 'Date'}
                        </span>
                        <p className="font-bold text-[#1A1512] font-mono">{bookingConfirmed.date}</p>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-gray-400 font-medium">
                          {lang === 'urdu' ? 'وقت' : 'Time'}
                        </span>
                        <p className="font-bold text-[#1A1512] font-mono">{bookingConfirmed.time}</p>
                      </div>

                      <div className="col-span-2 space-y-0.5 pt-2 border-t border-gray-100">
                        <span className="text-gray-400 font-medium">
                          {lang === 'urdu' ? 'سروس' : 'Treatment/Package'}
                        </span>
                        <p className="font-bold text-xs text-[#1A1512]">
                          {customPackageServices 
                            ? (lang === 'urdu' ? 'آپ کا کسٹم بیوٹی پیکیج' : 'Custom Pamper Package')
                            : (lang === 'urdu' ? (services.find(s => s.id === bookingConfirmed.serviceId)?.nameUrdu || '') : (services.find(s => s.id === bookingConfirmed.serviceId)?.name || ''))}
                        </p>
                      </div>

                      <div className="col-span-2 space-y-0.5 pt-2 border-t border-gray-100 flex justify-between items-center">
                        <div>
                          <span className="text-gray-400 font-medium">
                            {lang === 'urdu' ? 'سٹائلسٹ' : 'Your Stylist'}
                          </span>
                          <p className="font-bold text-xs text-[#1A1512]">
                            {stylists.find(s => s.id === bookingConfirmed.stylistId)?.name || 'Any Available Expert'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 font-bold block uppercase font-mono">
                            {lang === 'urdu' ? 'قابل ادائیگی رقم' : 'Price To Pay'}
                          </span>
                          <span className="font-mono text-base font-extrabold text-rosegold">
                            Rs. {bookingConfirmed.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleResetBookingWizard}
                    className="px-8 py-3 bg-charcoal hover:bg-rosegold text-white rounded-full font-bold text-xs uppercase tracking-widest transition cursor-pointer"
                    id="booking-finish-btn"
                  >
                    {lang === 'urdu' ? 'بکنگز کی فہرست دیکھیں' : 'View My Bookings'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Step Progress Indicators */}
                <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
                  {[1, 2, 3, 4].map((sNum) => {
                    const isPassed = step > sNum;
                    const isCurrent = step === sNum;
                    return (
                      <div key={sNum} className="flex items-center flex-1 last:flex-initial">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                          isPassed ? 'bg-rosegold text-white' : isCurrent ? 'bg-charcoal text-white ring-4 ring-charcoal/10' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {isPassed ? <Check className="w-4 h-4" /> : sNum}
                        </div>
                        {sNum < 4 && (
                          <div className={`h-0.5 flex-1 mx-2 transition-all ${
                            isPassed ? 'bg-rosegold' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* step content panels */}
                <div>
                  {/* STEP 1: SELECT SERVICE */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-1">
                        <h4 className="text-lg font-bold text-charcoal">
                          {lang === 'urdu' ? 'پہلا مرحلہ: سروس منتخب کریں' : 'Step 1: Choose Your Treatment'}
                        </h4>
                        <p className="text-xs text-charcoal/80">
                          {lang === 'urdu' ? 'جس سروس کی آپ بکنگ کرنا چاہتے ہیں اسے منتخب کریں۔' : 'Select which beauty service you want to schedule today.'}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => {
                              setSelectedService(service);
                              setStep(2);
                            }}
                            className={`p-4 rounded-xl border text-left flex justify-between items-center transition cursor-pointer ${
                              selectedService?.id === service.id
                                ? 'border-rosegold bg-white shadow-xs'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                            id={`bk-serv-${service.id}`}
                          >
                            <div>
                              <h5 className="font-bold text-xs sm:text-sm text-charcoal">
                                {lang === 'urdu' ? service.nameUrdu : service.name}
                              </h5>
                              <span className="text-[10px] text-rosegold font-mono tracking-wider uppercase font-bold block mt-0.5">
                                {service.category} • {service.duration} mins
                              </span>
                            </div>
                            <span className="font-mono text-xs sm:text-sm font-bold text-gray-500">
                              Rs. {service.price.toLocaleString()}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: SELECT STYLIST */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-1">
                        <h4 className="text-lg font-bold text-charcoal">
                          {lang === 'urdu' ? 'دوسرا مرحلہ: ماہر بیوٹیشن منتخب کریں' : 'Step 2: Choose Your Stylist'}
                        </h4>
                        <p className="text-xs text-charcoal/80">
                          {lang === 'urdu' ? 'اپنی مرضی کے ماہر یا دستیاب کسی بھی بیوٹیشن کا انتخاب کریں۔' : 'Select your favorite beauty specialist or select any available.'}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-4">
                        {/* Any Available Option */}
                        <button
                          onClick={() => {
                            setSelectedStylist({
                              id: 'any',
                              name: 'Any Available Expert',
                              role: 'Patola Senior Team Member',
                              roleUrdu: 'سینئر عملہ رکن',
                              roleRoman: 'Senior Team Member',
                              image: '',
                              rating: 4.8,
                              specialties: [],
                              specialtiesRoman: [],
                              bio: '',
                              bioUrdu: '',
                              bioRoman: '',
                            });
                            setStep(3);
                          }}
                          className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-3 h-48 cursor-pointer ${
                            selectedStylist?.id === 'any'
                              ? 'border-rosegold bg-white shadow-xs'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                          id="bk-stylist-any"
                        >
                          <div className="w-12 h-12 bg-rosegold/10 rounded-full flex items-center justify-center text-rosegold">
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-charcoal">
                              {lang === 'urdu' ? 'کوئی بھی دستیاب' : 'Any Available'}
                            </h5>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {lang === 'urdu' ? 'ہمارا کوالیفائیڈ بیوٹیشن' : 'Highly trained specialist'}
                            </p>
                          </div>
                        </button>

                        {/* Professional Stylists */}
                        {stylists.map((st) => (
                          <button
                            key={st.id}
                            onClick={() => {
                              setSelectedStylist(st);
                              setStep(3);
                            }}
                            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-3 h-48 cursor-pointer relative overflow-hidden ${
                              selectedStylist?.id === st.id
                                ? 'border-rosegold bg-white shadow-xs ring-1 ring-rosegold/30'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                            id={`bk-stylist-${st.id}`}
                          >
                            <img
                              src={st.image}
                              alt={st.name}
                              className="w-12 h-12 rounded-full object-cover border border-rosegold/20"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h5 className="font-bold text-sm text-charcoal line-clamp-1">
                                {st.name}
                              </h5>
                              <p className="text-[10px] text-rosegold font-semibold mt-0.5 line-clamp-1">
                                {lang === 'urdu' ? st.roleUrdu : st.roleRoman}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Go back */}
                      {!customPackageServices && (
                        <div className="flex justify-start">
                          <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/80 hover:text-charcoal focus:outline-none cursor-pointer"
                            id="bk-back-step1"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{lang === 'urdu' ? 'پیچھے جائیں' : 'Go Back'}</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 3: DATE & TIME */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-1">
                        <h4 className="text-lg font-bold text-charcoal">
                          {lang === 'urdu' ? 'تیسرا مرحلہ: تاریخ اور وقت کا انتخاب' : 'Step 3: Schedule Date & Time'}
                        </h4>
                        <p className="text-xs text-charcoal/80">
                          {lang === 'urdu' ? 'منگل کو سیلون بند ہوتا ہے۔ ورکنگ گھنٹے: صبح ۱۱ سے رات ساڑھے ۸ تک۔' : 'We are closed on Tuesdays. Working hours: 11:00 AM - 08:30 PM.'}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 items-start">
                        {/* Date Picker */}
                        <div className="space-y-2 bg-white p-5 rounded-2xl border border-gray-200">
                          <label className="text-xs font-semibold text-charcoal block flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-rosegold" />
                            <span>{lang === 'urdu' ? 'تاریخ کا انتخاب کریں' : 'Choose Booking Date'}</span>
                          </label>
                          <input
                            type="date"
                            required
                            min={getMinDateString()}
                            value={bookingDate}
                            onChange={(e) => {
                              const selectedDate = e.target.value;
                              const day = new Date(selectedDate).getDay();
                              setValidationError(null);
                              if (day === 2) {
                                setValidationError(lang === 'urdu' ? 'منگل (Tuesday) کو ہمارا اسٹوڈیو بند ہوتا ہے۔ برائے مہربانی کوئی اور تاریخ چنیں۔' : 'Our studio is closed on Tuesdays. Please choose a different date.');
                                setBookingDate('');
                              } else {
                                setBookingDate(selectedDate);
                              }
                            }}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rosegold outline-none text-sm cursor-pointer"
                            id="bk-date-input"
                          />
                          {bookingDate && (
                            <p className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 p-2 rounded">
                              ✓ {lang === 'urdu' ? 'درست دن منتخب کیا گیا' : 'Valid day selected! Ready to choose a time slot.'}
                            </p>
                          )}
                        </div>

                        {/* Time Grid */}
                        <div className="space-y-3 bg-white p-5 rounded-2xl border border-gray-200">
                          <label className="text-xs font-semibold text-charcoal block flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-rosegold" />
                            <span>{lang === 'urdu' ? 'وقت کا انتخاب کریں' : 'Select Time Slot'}</span>
                          </label>

                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((slot) => {
                              const isSelected = bookingTime === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setBookingTime(slot)}
                                  className={`py-2 px-1.5 rounded-lg border text-xs font-semibold font-mono text-center transition cursor-pointer ${
                                    isSelected
                                      ? 'border-rosegold bg-rosegold/10 text-rosegold'
                                      : 'border-gray-200 bg-white hover:border-gray-300 text-gray-500'
                                  }`}
                                  id={`bk-time-${slot.replace(':', '').replace(' ', '')}`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Footer controls */}
                      <div className="flex justify-between pt-4 border-t border-gray-100">
                        <button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/80 hover:text-charcoal focus:outline-none cursor-pointer"
                          id="bk-back-step2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>{lang === 'urdu' ? 'پیچھے جائیں' : 'Go Back'}</span>
                        </button>

                        <button
                          disabled={!bookingDate || !bookingTime}
                          onClick={() => setStep(4)}
                          className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition cursor-pointer ${
                            bookingDate && bookingTime
                              ? 'bg-charcoal text-white hover:bg-rosegold'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                          }`}
                          id="bk-next-step4"
                        >
                          <span>{lang === 'urdu' ? 'اگلا مرحلہ' : 'Next Step'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: CONTACT & REVIEW */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-1">
                        <h4 className="text-lg font-bold text-charcoal">
                          {lang === 'urdu' ? 'آخری مرحلہ: معلومات اور بکنگ کی تصدیق' : 'Final Step: Review & Book'}
                        </h4>
                        <p className="text-xs text-charcoal/80">
                          {lang === 'urdu' ? 'اپنا نام اور رابطہ نمبر درج کر کے بکنگ کی تصدیق کریں۔' : 'Provide your contact details and review your selected services.'}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-12 gap-8 items-start">
                        {/* Information Input Form */}
                        <form onSubmit={handleConfirmBooking} className="md:col-span-7 space-y-4 bg-white p-5 rounded-2xl border border-gray-200">
                          {/* Name */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-charcoal/80 block">
                              {lang === 'urdu' ? 'آپ کا مکمل نام' : 'Your Full Name'}
                            </label>
                            <input
                              type="text"
                              required
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold outline-none text-sm transition"
                              placeholder={lang === 'urdu' ? 'مثال: علینہ خان' : 'e.g. Alina Khan'}
                              id="bk-client-name"
                            />
                          </div>

                          {/* Phone */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-charcoal/80 block">
                              {lang === 'urdu' ? 'فون نمبر / رابطہ' : 'Mobile Number'}
                            </label>
                            <input
                              type="tel"
                              required
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold outline-none text-sm transition"
                              placeholder={lang === 'urdu' ? 'مثال: 03218234567' : 'e.g. 03218234567'}
                              id="bk-client-phone"
                            />
                          </div>

                          {/* Notes */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-charcoal/80 block">
                              {lang === 'urdu' ? 'خاص ہدایات (اختیاری)' : 'Special Requests (Optional)'}
                            </label>
                            <textarea
                              rows={2}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-rosegold outline-none text-sm transition resize-none"
                              placeholder={lang === 'urdu' ? 'کچھ خاص لکھنا چاہیں...' : 'e.g. sensitive skin, hair length details, etc.'}
                              id="bk-client-notes"
                            />
                          </div>

                          {/* Direct Submit Trigger from internal form */}
                          <button
                            type="submit"
                            className="w-full py-3.5 bg-rosegold hover:bg-gold text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-md hover:shadow-lg cursor-pointer"
                            id="bk-submit-form"
                          >
                            {lang === 'urdu' ? 'اپوائنٹمنٹ بک کریں' : 'Confirm & Book Appointment'}
                          </button>
                        </form>

                        {/* Ticket Summary Board */}
                        <div className="md:col-span-5 bg-white rounded-2xl border border-blush/60 p-5 space-y-4">
                          <h5 className="font-bold text-sm text-charcoal uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-rosegold" />
                            <span>{lang === 'urdu' ? 'خلاصہ کارڈ' : 'Selected Details'}</span>
                          </h5>

                          <div className="space-y-3.5 text-xs sm:text-sm">
                            {/* Service Info */}
                            <div>
                              <span className="text-gray-400 font-medium block text-xs">
                                {lang === 'urdu' ? 'منتخب سروس' : 'Treatment / Package'}
                              </span>
                              <p className="font-bold text-charcoal">
                                {customPackageServices 
                                  ? (lang === 'urdu' ? 'کسٹم بیوٹی پیکیج' : 'Custom Pamper Package')
                                  : (lang === 'urdu' ? selectedService?.nameUrdu : selectedService?.name)}
                              </p>
                              {customPackageServices && (
                                <ul className="list-disc pl-4 text-xs text-gray-500 mt-1">
                                  {customPackageServices.map((s) => (
                                    <li key={s.id}>{lang === 'urdu' ? s.nameUrdu : s.name}</li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            {/* Stylist Info */}
                            <div>
                              <span className="text-gray-400 font-medium block text-xs">
                                {lang === 'urdu' ? 'ماہر بیوٹیشن' : 'Your Stylist'}
                              </span>
                              <p className="font-bold text-charcoal">{selectedStylist?.name}</p>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                              <div>
                                <span className="text-gray-400 font-medium block text-xs">
                                  {lang === 'urdu' ? 'تاریخ' : 'Date'}
                                </span>
                                <p className="font-bold text-charcoal font-mono">{bookingDate}</p>
                              </div>
                              <div>
                                <span className="text-gray-400 font-medium block text-xs">
                                  {lang === 'urdu' ? 'وقت' : 'Time'}
                                </span>
                                <p className="font-bold text-charcoal font-mono">{bookingTime}</p>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="pt-3 border-t border-dashed border-blush/60 flex justify-between items-center">
                              <span className="text-gray-400 font-bold block text-xs uppercase tracking-wider">
                                {lang === 'urdu' ? 'ٹوٹل قیمت' : 'Total Price'}
                              </span>
                              <span className="text-lg font-black text-rosegold font-mono">
                                Rs. {customPackagePrice && customPackageServices 
                                  ? customPackagePrice.toLocaleString() 
                                  : (selectedService?.price.toLocaleString() || '0')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Go back */}
                      <div className="flex justify-start">
                        <button
                          onClick={() => setStep(3)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/80 hover:text-charcoal focus:outline-none cursor-pointer"
                          id="bk-back-step3"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>{lang === 'urdu' ? 'پیچھے جائیں' : 'Go Back'}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- MY BOOKINGS LIST PANEL --- */}
        {activeTab === 'my-bookings' && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-charcoal pb-2 border-b border-blush/60">
              {lang === 'urdu' ? 'آپ کی بک شدہ اپوائنٹمنٹس' : 'Your Upcoming Pamper Appointments'}
            </h4>

            {appointments.length === 0 ? (
              <div className="bg-ivory rounded-3xl p-10 border border-blush/60 text-center space-y-4">
                <Ticket className="w-12 h-12 text-gray-300 stroke-1 mx-auto" />
                <div className="space-y-1">
                  <h5 className="font-bold text-sm text-charcoal">
                    {lang === 'urdu' ? 'کوئی اپوائنٹمنٹ ریکارڈ نہیں ہے' : 'No upcoming appointments found'}
                  </h5>
                  <p className="text-xs text-gray-400">
                    {lang === 'urdu' ? 'نئی اپوائنٹمنٹ بک کرنے کے لیے "نئی بکنگ کریں" والے ٹیب پر کلک کریں۔' : 'Click the "Book Appointment" tab to schedule your first wellness session.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6" id="appointments-cards-list">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white rounded-2xl border border-blush/60 shadow-sm hover:shadow-md transition duration-300 overflow-hidden relative"
                  >
                    {/* Status Top bar */}
                    <div className="h-1 bg-rosegold" />
                    
                    <div className="p-5 space-y-4">
                      {/* Ticket Header */}
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-rosegold tracking-widest block uppercase">
                            Booking ID
                          </span>
                          <span className="text-sm font-mono font-bold text-charcoal">{appt.id}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {lang === 'urdu' ? 'کنفرمڈ' : appt.status}
                        </span>
                      </div>

                      {/* Ticket Body */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-gray-400 font-medium">
                            {lang === 'urdu' ? 'سروس' : 'Service/Package'}
                          </span>
                          <p className="font-bold text-charcoal line-clamp-1">
                            {appt.serviceId === 'custom-package' 
                              ? (lang === 'urdu' ? 'کسٹم بیوٹی پیکیج' : 'Custom Pamper Package')
                              : (lang === 'urdu' ? (services.find(s => s.id === appt.serviceId)?.nameUrdu || '') : (services.find(s => s.id === appt.serviceId)?.name || ''))}
                          </p>
                        </div>

                        <div>
                          <span className="text-gray-400 font-medium">
                            {lang === 'urdu' ? 'سٹائلسٹ' : 'Stylist'}
                          </span>
                          <p className="font-bold text-charcoal line-clamp-1">
                            {stylists.find(s => s.id === appt.stylistId)?.name || 'Any Available Expert'}
                          </p>
                        </div>

                        <div>
                          <span className="text-gray-400 font-medium">
                            {lang === 'urdu' ? 'تاریخ' : 'Date'}
                          </span>
                          <p className="font-bold text-charcoal font-mono">{appt.date}</p>
                        </div>

                        <div>
                          <span className="text-gray-400 font-medium">
                            {lang === 'urdu' ? 'وقت' : 'Time'}
                          </span>
                          <p className="font-bold text-charcoal font-mono">{appt.time}</p>
                        </div>
                      </div>

                      {/* Ticket Footer details */}
                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-gray-500">
                          Rs. {appt.totalPrice.toLocaleString()}
                        </span>

                        <button
                          onClick={() => {
                            if (confirm(lang === 'urdu' ? 'کیا آپ واقعی اس اپوائنٹمنٹ کو منسوخ کرنا چاہتے ہیں؟' : 'Are you sure you want to cancel this appointment?')) {
                              handleCancelAppointment(appt.id);
                            }
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 focus:outline-none cursor-pointer p-1.5 hover:bg-red-50 rounded-lg transition"
                          id={`appt-cancel-${appt.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{lang === 'urdu' ? 'منسوخ کریں' : 'Cancel'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
