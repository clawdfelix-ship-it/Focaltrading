import type { Product, Category } from './types';
import productsJson from '@/content/products.json';
import categoriesJson from '@/content/categories.json';

export function getProducts(): Product[] {
  return productsJson.products;
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
  return categoriesJson.categories;
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