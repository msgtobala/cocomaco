export type ProductVariant = {
  id: string;
  size: string;
  price: number;
  weight: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  benefits: string[];
  ingredients: {
    name: string;
    benefits: string;
  }[];
  usageInstructions: string[];
  variants: ProductVariant[];
  bestBefore: string;
  tags: string[];
};