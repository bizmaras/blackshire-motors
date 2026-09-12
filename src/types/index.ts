export type VehicleCategory = 
  | 'All'
  | 'Trucks & 4x4'
  | 'Family SUVs'
  | 'Reliable Sedans'
  | 'Under $15k'
  | 'Under $20k';

export interface VehicleCarfax {
  oneOwner: boolean;
  noAccidents: boolean;
  serviceRecordsCount: number;
  titleStatus: 'Clean' | 'Lien Free';
}

export interface Vehicle {
  id: string;
  name: string;
  year: number;
  make: string;
  brand: string;
  model: string;
  trim: string;
  category: VehicleCategory;
  price: number;
  monthlyEstimate: number;
  mileage: number;
  formattedMileage: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  interiorColor: string;
  fuelEconomy: string;
  vinCode: string;
  stockNumber: string;
  originalMSRP?: number;
  taxSavingsEstimate: number;
  tagline: string;
  description: string;
  badge: string;
  soundType: 'twin-turbo' | 'v12-roar' | 'v16-thunder' | 'v8-rumble';
  heroImage: string;
  gallery: string[];
  keyFeatures: string[];
  carfax: VehicleCarfax;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  source: 'Google' | 'CarGurus' | 'DealerRater';
  comment: string;
  vehiclePurchased: string;
}

export interface StaffMember {
  name: string;
  role: string;
  experience: string;
  bio: string;
  directPhone: string;
  email?: string;
  photo: string;
  badge?: string;
}

export interface DealershipFaq {
  question: string;
  answer: string;
}
