import { LOGO_BASE64 } from '../assets/logoBase64.ts';

export interface Product {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export interface ExperienceOption {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface QuestionnaireData {
  selectedProducts: string[];
  selectedExperiences: string[];
  otherProductText?: string;
  otherExperienceText?: string;
  purchasedProduct?: string;
  appreciated?: string;
  improvement?: string;
  additionalComments?: string;
  overallExperience?: string;
  starRating: number;
}

export type ReviewLength = 'short' | 'balanced' | 'detailed';

export interface AdminSettings {
  businessName: string;
  businessAddress: string;
  businessDescription: string;
  contactInfo: string;
  logoUrl: string;
  googleReviewUrl: string;
  aiProvider: string;
  aiApiKey: string;
  aiBaseUrl: string;
  aiModel: string;
  maxTokens: number;
  temperature: number;
}

export interface GeneratedReview {
  text: string;
  length: ReviewLength;
  starRating: number;
}

export const DEFAULT_PRODUCTS: Product[] = [
  { id: 'mobiles', name: 'Mobile Phones', icon: 'Smartphone', enabled: true, order: 0 },
  { id: 'refrigerators', name: 'Refrigerators', icon: 'Refrigerator', enabled: true, order: 1 },
  { id: 'washing', name: 'Washing Machines', icon: 'Waves', enabled: true, order: 2 },
  { id: 'ac', name: 'Air Conditioners', icon: 'Wind', enabled: true, order: 3 },
  { id: 'tv', name: 'LED TVs', icon: 'Tv', enabled: true, order: 4 },
  { id: 'coolers', name: 'Coolers', icon: 'Fan', enabled: true, order: 5 },
  { id: 'fans', name: 'Fans', icon: 'Disc3', enabled: true, order: 6 },
  { id: 'microwave', name: 'Microwave Ovens', icon: 'Flame', enabled: true, order: 7 },
  { id: 'water', name: 'Water Purifiers', icon: 'Droplets', enabled: true, order: 8 },
  { id: 'kitchen', name: 'Kitchen Appliances', icon: 'Utensils', enabled: true, order: 9 },
  { id: 'speakers', name: 'Speakers', icon: 'Speaker', enabled: true, order: 10 },
  { id: 'other', name: 'Other', icon: 'PackagePlus', enabled: true, order: 11 },
];

export const DEFAULT_EXPERIENCES: ExperienceOption[] = [
  { id: 'quality', label: 'Product quality', enabled: true, order: 0 },
  { id: 'staff', label: 'Staff behavior', enabled: true, order: 1 },
  { id: 'explanation', label: 'Product explanation', enabled: true, order: 2 },
  { id: 'price', label: 'Price and value', enabled: true, order: 3 },
  { id: 'variety', label: 'Product variety', enabled: true, order: 4 },
  { id: 'atmosphere', label: 'Store atmosphere', enabled: true, order: 5 },
  { id: 'delivery', label: 'Delivery experience', enabled: true, order: 6 },
  { id: 'installation', label: 'Installation support', enabled: true, order: 7 },
  { id: 'aftersales', label: 'After-sales service', enabled: true, order: 8 },
  { id: 'other', label: 'Other', enabled: true, order: 9 },
];

export const OVERALL_OPTIONS = [
  { id: 'very_satisfied', label: 'Very satisfied', emoji: '😄' },
  { id: 'satisfied', label: 'Satisfied', emoji: '🙂' },
  { id: 'neutral', label: 'Neutral', emoji: '😐' },
  { id: 'dissatisfied', label: 'Dissatisfied', emoji: '😕' },
  { id: 'very_dissatisfied', label: 'Very dissatisfied', emoji: '😞' },
];

export const DEFAULT_SETTINGS: AdminSettings = {
  businessName: 'Modern Electronics',
  businessAddress: 'Mukerian, Punjab, India',
  businessDescription: 'Your trusted electronics and home appliance store',
  contactInfo: '',
  logoUrl: LOGO_BASE64,
  googleReviewUrl: 'https://www.google.com/search?sca_esv=b0c5f1cb68949abc&sxsrf=AKL5yDjXKyBwRHZI6l5D_Gr7yVJaVaScPQ:1795345389939&q=modern+electronics+mukerian+reviews&si=AE1YtOqiKPb2pdLXAi8quZ9vbH4aVq_aX8-3H9iFBLpRNK95c5QMlqd4pgBonGaW2_OMYweIHovXhYkdILFdz9FV1GYPDeEu_as-jAA8i7uQkfDu5MN5zRRv6hVZL82TK5tD69XxaqgTTnInXERJcBvntLDBqwi0Sw%3D%3D&sa=X&ved=2ahUKEwiLlN3htpuYAxW7DjQIHQEXBnsQyNoBKAB6BAgeEAA&ictx=1&biw=1366&bih=617&dpr=1',
  aiProvider: 'agentrouter',
  aiApiKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_AI_API_KEY) || '',
  aiBaseUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_AI_BASE_URL) || 'https://agentrouter.org/v1',
  aiModel: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_AI_MODEL) || 'gpt-4o-mini',
  maxTokens: 300,
  temperature: 0.7,
};
