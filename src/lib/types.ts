export interface LocalizedString {
  zh: string;
  en: string;
}

export interface Product {
  slug: string;
  name: LocalizedString;
  category: string;
  description: LocalizedString;
  images: string[];
  priceRange: LocalizedString;
  minOrder: LocalizedString;
  specs: LocalizedString;
}

export interface Category {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
}

export type Lang = 'zh' | 'en';