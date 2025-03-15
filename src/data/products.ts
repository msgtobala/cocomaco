import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'nutimix-premium',
    name: 'Nutimix Premium Nuts Powder',
    shortDescription: 'A 100% homemade, all-natural blend packed with the richness of premium nuts and seeds.',
    description: 'Experience the goodness of nature with Nutimix Premium Nuts Powder, a 100% homemade, all-natural blend packed with the richness of Almonds, Cashews, Pistachios, Chia Seeds, Flax Seeds, Sunflower Seeds, Pumpkin Seeds, Watermelon Seeds, and Jaggery.',
    image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?q=80&w=3494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    benefits: [
      'No Added Sugar',
      'No Preservatives',
      'Purely Vegetarian',
      'Perfect for the whole family',
      'Nutrient-dense superfood blend'
    ],
    ingredients: [
      {
        name: 'Almonds',
        benefits: 'Rich in Vitamin E, promotes brain health, boosts immunity'
      },
      {
        name: 'Cashews',
        benefits: 'Good source of healthy fats, supports heart health'
      },
      {
        name: 'Pistachios',
        benefits: 'High in antioxidants, helps in weight management'
      },
      {
        name: 'Chia Seeds',
        benefits: 'Rich in fiber & Omega-3, supports digestion'
      },
      {
        name: 'Flax Seeds',
        benefits: 'Excellent for heart health, maintains cholesterol levels'
      },
      {
        name: 'Sunflower Seeds',
        benefits: 'Loaded with Vitamin B6, improves skin & hair health'
      },
      {
        name: 'Pumpkin Seeds',
        benefits: 'Great for bone strength and immunity'
      },
      {
        name: 'Watermelon Seeds',
        benefits: 'Supports metabolism and provides essential minerals'
      },
      {
        name: 'Jaggery',
        benefits: 'Natural sweetener, helps digestion & boosts energy'
      }
    ],
    usageInstructions: [
      'Mix it with warm milk for a nourishing drink',
      'Add to cake or pancake batter for a health boost',
      'Sprinkle over smoothies, yogurt, or cereals',
      'Consume directly for a quick energy boost'
    ],
    variants: [
      {
        id: 'nutimix-100g',
        size: 'Small',
        weight: '100g',
        price: 150
      },
      {
        id: 'nutimix-250g',
        size: 'Medium',
        weight: '250g',
        price: 370
      },
      {
        id: 'nutimix-500g',
        size: 'Large',
        weight: '500g',
        price: 740
      },
      {
        id: 'nutimix-1kg',
        size: 'Family Pack',
        weight: '1kg',
        price: 1400
      }
    ],
    bestBefore: '3 months from the packed date for optimal freshness',
    tags: ['Superfood', 'Natural', 'Homemade', 'Healthy', 'Nuts', 'Seeds']
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};