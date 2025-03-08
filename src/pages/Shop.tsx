import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf6f3] py-12">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#8b7355] text-center mb-4">
          Our Products
        </h1>
        <p className="text-[#8b7355]/80 text-center max-w-2xl mx-auto">
          Discover our range of premium, all-natural wellness products crafted with care and commitment to your health.
        </p>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;