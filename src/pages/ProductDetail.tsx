import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductVariant } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-[#8b7355] mb-4">Product Not Found</h2>
        <p className="text-[#8b7355]/80 mb-8">The product you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#d4b4a4] text-white px-6 py-2 rounded-md hover:bg-[#c5a292] transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(product, selectedVariant, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Product Overview */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold text-[#8b7355] mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-[#d4b4a4]">
              <Star className="w-5 h-5 fill-[#d4b4a4]" />
              <Star className="w-5 h-5 fill-[#d4b4a4]" />
              <Star className="w-5 h-5 fill-[#d4b4a4]" />
              <Star className="w-5 h-5 fill-[#d4b4a4]" />
              <Star className="w-5 h-5 fill-[#d4b4a4]" />
            </div>
            <span className="ml-2 text-[#8b7355]/80">(5.0)</span>
          </div>
          <p className="text-[#8b7355]/80 mb-6">{product.description}</p>

          {/* Product Benefits */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#8b7355] mb-3">Benefits:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-[#8b7355]/80">
                  <Check className="w-4 h-4 text-[#d4b4a4] mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Variants */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#8b7355] mb-3">Size:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`border rounded-md py-2 px-3 text-center transition-colors ${
                    selectedVariant?.id === variant.id
                      ? 'border-[#d4b4a4] bg-[#f5ebe6] text-[#8b7355]'
                      : 'border-[#e5d5c5] text-[#8b7355]/80 hover:border-[#d4b4a4]'
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <div className="font-medium">{variant.weight}</div>
                  <div className="text-[#d4b4a4]">₹{variant.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#8b7355] mb-3">Quantity:</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-l-md bg-[#f5ebe6] flex items-center justify-center text-[#8b7355] hover:bg-[#e5d5c5] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-16 h-10 flex items-center justify-center border-t border-b border-[#e5d5c5] text-[#8b7355]">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-r-md bg-[#f5ebe6] flex items-center justify-center text-[#8b7355] hover:bg-[#e5d5c5] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#d4b4a4] hover:bg-[#c5a292] text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center"
              disabled={addedToCart}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="flex-1 border border-[#d4b4a4] text-[#d4b4a4] hover:bg-[#f5ebe6] px-6 py-3 rounded-md transition-colors"
            >
              View Cart
            </button>
          </div>

          {/* Best Before */}
          <div className="mt-6 text-[#8b7355]/80 text-sm">
            <p>Best before: {product.bestBefore}</p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
        <div className="border-b border-[#e5d5c5] mb-8">
          <h2 className="text-2xl font-semibold text-[#8b7355] pb-4">Product Details</h2>
        </div>

        {/* Usage Instructions */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-[#8b7355] mb-4">Ways to Enjoy</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.usageInstructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-5 h-5 text-[#d4b4a4] mr-3 mt-0.5" />
                <span className="text-[#8b7355]/80">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="text-xl font-medium text-[#8b7355] mb-4">Ingredients & Benefits</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.ingredients.map((ingredient, index) => (
              <div key={index} className="bg-[#f5ebe6] p-4 rounded-lg">
                <h4 className="font-medium text-[#8b7355] mb-2">{ingredient.name}</h4>
                <p className="text-[#8b7355]/80 text-sm">{ingredient.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;