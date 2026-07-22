import { Service, Stylist, Review, BeforeAfter } from './types';

export const services: Service[] = [
  // --- HAIR ---
  {
    id: 'hair-1',
    name: 'Luxury Haircut & Blowdry',
    nameUrdu: 'لکشری ہیئر کٹ اور بلو ڈرائی',
    nameRoman: 'Luxury Haircut aur Blowdry',
    price: 3500,
    duration: 60,
    description: 'Precision haircut by master stylists tailored to your face shape, including nourishing wash and custom styling.',
    descriptionUrdu: 'ہمارے ماسٹر سٹائلسٹ کی طرف سے چہرے کی مناسبت سے ہیئر کٹ، واش اور بہترین بلو ڈرائی۔',
    descriptionRoman: 'Hamare master stylist ki taraf se chehre ki munasibat se haircut, wash aur behtareen blowdry.',
    category: 'hair'
  },
  {
    id: 'hair-2',
    name: 'Balayage & Hair Color',
    nameUrdu: 'بالائیاژ اور ہیئر کلر',
    nameRoman: 'Balayage aur Hair Color',
    price: 12000,
    duration: 180,
    description: 'Expert hair painting and global color using premium organic, ammonia-free colors for multi-dimensional shine.',
    descriptionUrdu: 'اعلیٰ معیار کے کلرز کے ساتھ بالائیاژ اور گلوبل کلرنگ جو آپ کے بالوں کو چمکدار اور خوبصورت بنائے۔',
    descriptionRoman: 'Aala meyar ke colors ke sath balayage aur global coloring jo aap ke balon ko chamakdar banaye.',
    category: 'hair'
  },
  {
    id: 'hair-3',
    name: 'Keratin Smoothing Treatment',
    nameUrdu: 'کیراٹین اسموتھنگ ٹریٹمنٹ',
    nameRoman: 'Keratin Smoothing Treatment',
    price: 15000,
    duration: 150,
    description: 'Premium keratin treatment to eliminate frizz, restore hair protein, and deliver silky smooth hair for up to 6 months.',
    descriptionUrdu: 'بالوں کا کھردرا پن ختم کرنے اور انہیں چمکدار و ریشم کی طرح نرم بنانے کے لیے کیراٹین ٹریٹمنٹ۔',
    descriptionRoman: 'Balon ka khurdara pan khatam karne aur unhein chamakdar wa resham ki tarah narm banane ke liye keratin treatment.',
    category: 'hair'
  },

  // --- SKIN ---
  {
    id: 'skin-1',
    name: 'Deep Cleansing Glow Facial',
    nameUrdu: 'ڈیپ کلینزنگ گلو فیشل',
    nameRoman: 'Deep Cleansing Glow Facial',
    price: 4500,
    duration: 45,
    description: 'Deep pore extraction, exfoliation, and vitamin C infusion for instant skin brightening and rejuvenation.',
    descriptionUrdu: 'جلد کی گہرائی سے صفائی، مردہ خلیوں کا خاتمہ اور وٹامن سی کے ساتھ فوری چمک اور نکھار۔',
    descriptionRoman: 'Jild ki gehrai se safai, murda khaliyon ka khatma aur vitamin C ke sath fouri chamak aur nikhaar.',
    category: 'skin'
  },
  {
    id: 'skin-2',
    name: 'Clinical HydraFacial',
    nameUrdu: 'کلینیکل ہائیڈرا فیشل',
    nameRoman: 'Clinical HydraFacial',
    price: 8500,
    duration: 75,
    description: 'The ultimate 6-step medical-grade facial combining exfoliation, chemical peel, extraction, and antioxidant hydration.',
    descriptionUrdu: 'جلد کی نمی بحال کرنے، جھریوں کو کم کرنے اور بے عیب نکھار کے لیے 6 مراحل پر مشتمل جدید ہائیڈرا فیشل۔',
    descriptionRoman: 'Jild ki nami bahaal karne, jhuriyon ko kam karne aur be-aib nikhaar ke liye 6-marahil par mushtamil jadeed hydrafacial.',
    category: 'skin'
  },
  {
    id: 'skin-3',
    name: 'Organic Herb Skin Therapy',
    nameUrdu: 'آرگینک ہربل اسکن تھراپی',
    nameRoman: 'Organic Herbal Skin Therapy',
    price: 3800,
    duration: 60,
    description: 'Soothing therapy using fresh botanical extracts tailored for sensitive skin types to calm redness and restore balance.',
    descriptionUrdu: 'حساس جلد کے لیے خالص جڑی بوٹیوں سے تیار کردہ فیشل تھراپی جو سرخی اور سوزش کو دور کرے۔',
    descriptionRoman: 'Hassas jild ke liye khalis jari bootiyon se tayar karda facial therapy jo surkhi aur sozish ko door kare.',
    category: 'skin'
  },

  // --- MAKEUP ---
  {
    id: 'makeup-1',
    name: 'Glamorous Party Makeup',
    nameUrdu: 'گلیمرس پارٹی میک اپ',
    nameRoman: 'Glamorous Party Makeup',
    price: 6000,
    duration: 90,
    description: 'Flawless high-definition party makeup with custom false lashes and gorgeous contouring suited for any event.',
    descriptionUrdu: 'پارٹیوں اور تقریبات کے لیے بہترین ایچ ڈی میک اپ، لیشز اور آئی شیڈز کے بہترین تال میل کے ساتھ۔',
    descriptionRoman: 'Parties aur taqreebat ke liye behtareen HD makeup, lashes aur eye shades ke behtareen taal-meel ke sath.',
    category: 'makeup'
  },
  {
    id: 'makeup-2',
    name: 'Engagement & Nikah Makeup',
    nameUrdu: 'انگیجمنٹ اور نکاح میک اپ',
    nameRoman: 'Engagement aur Nikah Makeup',
    price: 15000,
    duration: 120,
    description: 'Elegant, soft, and long-lasting HD makeup designed specifically for your special day with jewelry setting.',
    descriptionUrdu: 'نکاح یا منگنی کے یادگار دن کے لیے نرم، نفیس اور دیرپا میک اپ مع جیولری اور ڈوپٹہ سیٹنگ۔',
    descriptionRoman: 'Nikah ya mangni ke yaadgar din ke liye narm, nafees aur deerpa makeup ma jewelry aur dupatta setting.',
    category: 'makeup'
  },

  // --- NAILS ---
  {
    id: 'nails-1',
    name: 'Patola Signature Pedicure',
    nameUrdu: 'پٹولہ سگنیچر پیڈیکیور',
    nameRoman: 'Patola Signature Pedicure',
    price: 3000,
    duration: 50,
    description: 'Warm organic foot soak, herbal scrub, dead skin filing, nourishing paraffin wax, and professional oil massage.',
    descriptionUrdu: 'پاؤں کی خوبصورتی کے لیے ہربل سکرب، مردہ جلد کی صفائی اور سکون بخش مساج۔',
    descriptionRoman: 'Paon ki khubsurati ke liye herbal scrub, murda jild ki safai aur sukoon-bakhsh massage.',
    category: 'nails'
  },
  {
    id: 'nails-2',
    name: 'Acrylic Nail Extensions & Art',
    nameUrdu: 'ایکریلک نیل ایکسٹینشنز اور آرٹ',
    nameRoman: 'Acrylic Nail Extensions aur Art',
    price: 4500,
    duration: 90,
    description: 'Long-lasting acrylic gel nail extensions custom-shaped with intricate hand-painted nail art of your choice.',
    descriptionUrdu: 'ہاتھوں کی دلکشی کے لیے پائیدار نیل ایکسٹینشنز اور اپنی پسند کا خوبصورت نیل آرٹ۔',
    descriptionRoman: 'Hathon ki dilkashi ke liye paidar nail extensions aur apni pasand ka khubsurat nail art.',
    category: 'nails'
  },

  // --- BRIDAL ---
  {
    id: 'bridal-1',
    name: 'Signature Royal Bridal Makeup',
    nameUrdu: 'سگنیچر رائل برائیڈل میک اپ',
    nameRoman: 'Signature Royal Bridal Makeup',
    price: 35000,
    duration: 180,
    description: 'Unmatched 3D airbrush bridal makeup by Zainab Malik, premium hair styling, dupatta draping, and professional light photography assistance.',
    descriptionUrdu: 'زینب ملک کی طرف سے دلہن کا لاجواب میک اپ، ہیئر سٹائلنگ، ڈوپٹہ ڈریپنگ اور جیولری ایڈجسٹمنٹ۔',
    descriptionRoman: 'Zainab Malik ki taraf se dulhan ka lajawab makeup, hair styling, dupatta draping aur jewelry adjustment.',
    category: 'bridal'
  },
  {
    id: 'bridal-2',
    name: 'Pre-Wedding Bridal Glow Package',
    nameUrdu: 'شادی سے پہلے برائیڈل گلو پیکیج',
    nameRoman: 'Pre-Wedding Bridal Glow Package',
    price: 18000,
    duration: 210,
    description: 'Full body wax, gold facial therapy, premium hair spa treat, and complete manicure-pedicure session, done 2 days before the wedding.',
    descriptionUrdu: 'شادی سے دو دن پہلے دلہن کے لیے فل باڈی ویکس، گولڈ فیشل، ہیئر سپا اور مینی-پیڈی سیشن۔',
    descriptionRoman: 'Shadi se do din pehle dulhan ke liye full body wax, gold facial, hair spa aur mani-pedi session.',
    category: 'bridal'
  }
];

export const stylists: Stylist[] = [
  {
    id: 'stylist-1',
    name: 'Ayesha Khan',
    role: 'Master Hair Specialist',
    roleUrdu: 'ماسٹر ہیئر سپیشلسٹ',
    roleRoman: 'Master Hair Specialist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=95',
    rating: 4.9,
    specialties: ['Precision Haircuts', 'Balayage Artistry', 'Keratin Therapy'],
    specialtiesRoman: ['Precision Haircuts', 'Balayage Artistry', 'Keratin Therapy'],
    bio: 'With over 12 years of experience in high-end salons, Ayesha is a master of creating customized styles that bring out your natural hair movement.',
    bioUrdu: '۱۲ سالہ تجربہ کار ہیئر سٹائلسٹ جو آپ کے بالوں کو ایک بالکل نیا اور جادوئی لک دینے کی صلاحیت رکھتی ہیں۔',
    bioRoman: '12-sala tajurba kar hair stylist jo aap ke balon ko aik bilkul naya aur jadooi look dene ki salahiyat rakhti hain.',
  },
  {
    id: 'stylist-2',
    name: 'Dr. Sana Alvi',
    role: 'Skin Aesthetics & Glow Expert',
    roleUrdu: 'اسکن ایستھیٹکس اور گلو ایکسپرٹ',
    roleRoman: 'Skin Aesthetics & Glow Expert',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=800&auto=format&fit=crop&q=95',
    rating: 4.8,
    specialties: ['Clinical HydraFacial', 'Organic Peels', 'Anti-Aging Therapy'],
    specialtiesRoman: ['Clinical HydraFacial', 'Organic Peels', 'Anti-Aging Therapy'],
    bio: 'Dr. Sana is a certified aesthetician specializing in medical-grade facials, skin regeneration treatments, and personalized skin care regimens.',
    bioUrdu: 'جلد کی بیماریوں اور خوبصورتی کی ماہر جو جدید فیشل ٹیکنالوجی اور جڑی بوٹیوں کے ملاپ سے چہرے پر قدرتی نکھار لاتی ہیں۔',
    bioRoman: 'Jild ki khubsurati ki mahir jo jadeed facial technology aur jari bootiyon ke milap se chehre par qadrati nikhaar lati hain.',
  },
  {
    id: 'stylist-3',
    name: 'Zainab Malik',
    role: 'Signature Bridal & Glam Artist',
    roleUrdu: 'سگنیچر برائیڈل اور گلیم آرٹسٹ',
    roleRoman: 'Signature Bridal & Glam Artist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=95',
    rating: 5.0,
    specialties: ['Bridal Makeovers', 'Airbrush Makeup', 'Event Glamour'],
    specialtiesRoman: ['Bridal Makeovers', 'Airbrush Makeup', 'Event Glamour'],
    bio: 'The visionary artist behind our bridal transformations, Zainab combines modern HD techniques with traditional elegance to make brides shine.',
    bioUrdu: 'دلہنوں کے خوابوں کو حقیقت میں بدلنے والی میک اپ آرٹسٹ، جو روایتی اور جدید میک اپ کے حسین ملاپ کی ماہر ہیں۔',
    bioRoman: 'Dulhanon ke khwabom ko haqeeqat mein badalne wali makeup artist, jo rawayati aur jadeed makeup ke haseen milap ki mahir hain.',
  }
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    clientName: 'Saba Qureshi',
    rating: 5,
    comment: 'I got my Bridal Makeup done by Zainab, and honestly, everyone was amazed. It stayed fresh and flawless all night!',
    commentUrdu: 'میں نے اپنا برائیڈل میک اپ زینب سے کروایا تھا، اور سچی بات ہے ہر کوئی دیکھتا رہ گیا۔ میک اپ رات بھر بالکل تازہ رہا۔',
    commentRoman: 'Maine apna Bridal Makeup Zainab se karwaya tha, aur sachi baat hai har koi dekhta reh gaya. Makeup raat bhar bilkul taza raha!',
    date: '2026-06-15',
    service: 'Signature Royal Bridal Makeup'
  },
  {
    id: 'rev-2',
    clientName: 'Mariam Ali',
    rating: 5,
    comment: 'The HydraFacial by Dr. Sana completely removed my blackheads and my skin is literally glowing. Best experience in town!',
    commentUrdu: 'ڈاکٹر ثنا کے ہائیڈرا فیشل نے میری سکن سے تمام داغ دھبے دور کر دیئے اور چہرہ چمکنے لگا۔ شہر کا سب سے بہترین تجربہ۔',
    commentRoman: 'Dr. Sana ka HydraFacial ne meri skin se tamam daagh dhabe door kar diye aur chehra chamakne laga. Shehar ka sab se behtareen tajurba.',
    date: '2026-07-01',
    service: 'Clinical HydraFacial'
  },
  {
    id: 'rev-3',
    clientName: 'Nida Fatima',
    rating: 4,
    comment: 'Ayesha gave me a gorgeous layer-cut and a stunning balayage. I was scared of chemical colors, but they used super mild organic stuff!',
    commentUrdu: 'عائشہ نے مجھے ایک شاندار لیئر کٹ اور خوبصورت بالائیاژ دیا۔ مجھے کیمیکل سے ڈر لگتا تھا پر انہوں نے آرگینک پروڈکٹس استعمال کیں۔',
    commentRoman: 'Ayesha ne mujhe ek shandar layer-cut aur khubsurat balayage diya. Mujhe chemical se darr lagta tha par unhone organic products istemal kien!',
    date: '2026-07-10',
    service: 'Balayage & Hair Color'
  }
];

export const beforeAfters: BeforeAfter[] = [
  {
    id: 'ba-1',
    title: 'Bridal Glow Transformation',
    titleRoman: 'Bridal Glow Transformation',
    titleUrdu: 'برائیڈل گلو ٹرانسفارمیشن',
    beforeUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1000&auto=format&fit=crop&q=95',
    afterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=95'
  },
  {
    id: 'ba-2',
    title: 'Balayage Hair Makeover',
    titleRoman: 'Balayage Hair Makeover',
    titleUrdu: 'بالائیاژ ہیئر میک اوور',
    beforeUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1000&auto=format&fit=crop&q=95',
    afterUrl: 'https://images.unsplash.com/photo-1605497746444-ac9dbd39f400?w=1000&auto=format&fit=crop&q=95'
  }
];

export const salonTimings = {
  weekdays: '11:00 AM - 08:30 PM',
  weekends: '10:00 AM - 09:00 PM',
  closedDay: 'Tuesday (Mangal)'
};

export const salonContact = {
  address: 'Plot 45-C, Lane 4, Bukhari Commercial Area, Phase 6, DHA, Karachi, Pakistan',
  phone: '+92 321 8234567',
  email: 'appointments@patolamakeover.pk'
};
