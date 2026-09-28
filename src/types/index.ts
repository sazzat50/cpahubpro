export type OfferCategory = 
  | 'All'
  | 'Dating'
  | 'Gaming'
  | 'E-commerce'
  | 'Finance & Crypto'
  | 'Nutra & Health'
  | 'Sweepstakes'
  | 'Software & Utilities'
  | 'Smartlinks'
  | 'Surveys & Rewards';

export type OfferType = 'All' | 'CPA' | 'CPL' | 'Smartlink' | 'RevShare' | 'CPI';

export type DeviceType = 'All Devices' | 'Mobile Only' | 'Desktop Only';

export interface Offer {
  id: string;
  title: string;
  category: OfferCategory;
  payout: string;
  payoutValue: number;
  currency: string;
  affiliateUrl: string;
  targetGeos: string[];
  network: string;
  networkLogo?: string;
  type: OfferType;
  device: DeviceType;
  cr: string;
  epc: string;
  featured: boolean;
  description: string;
  terms: string;
  dateAdded: string;
  flowType?: 'Single Opt-in (SOI)' | 'Double Opt-in (DOI)' | 'Credit Card Submit (CC)' | 'First Time Deposit (FTD)' | 'App Install';
}

export interface FeaturedSponsor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  link: string;
  minPayout: string;
  paymentFrequency: string;
  tagline: string;
  order: number;
  verified: boolean;
  topGeos?: string[];
  specialty?: string;
}

export type AdType = 'Raw HTML Script Code (Adsterra/Popads)' | 'Image Banner with Link';

export interface AdSpace {
  id: string;
  name: string;
  key: 'top_banner' | 'sidebar_ad' | 'infeed_ad' | 'footer_banner';
  adType: AdType;
  active: boolean;
  htmlCode?: string;
  imageUrl?: string;
  targetUrl?: string;
  altText?: string;
}

export type ActiveTab = 'offers' | 'smartlinks' | 'categories' | 'blog' | 'contact';

export interface FilterState {
  searchQuery: string;
  category: OfferCategory;
  geo: string;
  type: OfferType;
  sortBy: 'payout-desc' | 'payout-asc' | 'epc-desc' | 'cr-desc' | 'newest';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: string;
}
