export type ServiceCategory = 'hair' | 'skin' | 'makeup' | 'nails' | 'bridal';

export interface Service {
  id: string;
  name: string;
  nameUrdu: string;
  nameRoman: string;
  price: number;
  duration: number; // in minutes
  description: string;
  descriptionUrdu: string;
  descriptionRoman: string;
  category: ServiceCategory;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  roleUrdu: string;
  roleRoman: string;
  image: string;
  rating: number;
  specialties: string[];
  specialtiesRoman: string[];
  bio: string;
  bioUrdu: string;
  bioRoman: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  totalPrice: number;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  commentUrdu: string;
  commentRoman: string;
  date: string;
  service: string;
}

export interface BeforeAfter {
  id: string;
  title: string;
  titleRoman: string;
  titleUrdu: string;
  beforeUrl: string;
  afterUrl: string;
}
