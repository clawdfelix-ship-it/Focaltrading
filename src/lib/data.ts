import type { Product, Category } from './types';

export function getProducts(): Product[] {
  const data = require('@/content/products.json');
  return data.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  const products = getProducts();
  return products.filter(p => p.category === category);
}

export function getCategories(): Category[] {
  const data = require('@/content/categories.json');
  return data.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getCategories();
  return categories.find(c => c.slug === slug);
}

export function getRelatedProducts(slug: string, category: string, limit = 4): Product[] {
  const products = getProducts();
  return products
    .filter(p => p.slug !== slug && p.category === category)
    .slice(0, limit);
}