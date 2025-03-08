import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const lowestPrice = Math.min(...product.variants.map(variant => variant.price));

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#8b7355] mb-2">{product.name}</h3>
        <p className="text-[#8b7355]/80 mb-4 line-clamp-2">{product.shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-[#d4b4a4] font-medium">Starting from ₹{lowestPrice}</span>
          <span className="bg-[#f5ebe6] text-[#8b7355] px-3 py-1 rounded-full text-sm">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;