import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = getCartTotal();
  const shippingCost = subtotal < 500 ? 50 : 0;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#f5ebe6] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-[#d4b4a4]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#8b7355] mb-4">Your Cart is Empty</h2>
          <p className="text-[#8b7355]/80 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link 
            to="/" 
            className="bg-[#d4b4a4] text-white px-6 py-3 rounded-md hover:bg-[#c5a292] transition-colors inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#8b7355] mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#f5ebe6] text-[#8b7355] font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            {items.map((item) => (
              <div 
                key={`${item.product.id}-${item.variant.id}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-[#e5d5c5] items-center"
              >
                {/* Product */}
                <div className="col-span-6 flex items-center">
                  <div className="w-20 h-20 rounded overflow-hidden mr-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#8b7355]">{item.product.name}</h3>
                    <p className="text-[#8b7355]/80 text-sm">{item.variant.weight}</p>
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.variant.id)}
                      className="text-[#d4b4a4] hover:text-[#c5a292] text-sm flex items-center mt-2 md:hidden"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <div className="md:hidden text-[#8b7355]/80 text-sm">Price:</div>
                  <div className="text-[#8b7355]">₹{item.variant.price}</div>
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="md:hidden text-[#8b7355]/80 text-sm mr-2">Quantity:</div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-l-md bg-[#f5ebe6] flex items-center justify-center text-[#8b7355] hover:bg-[#e5d5c5] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center border-t border-b border-[#e5d5c5] text-[#8b7355]">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-r-md bg-[#f5ebe6] flex items-center justify-center text-[#8b7355] hover:bg-[#e5d5c5] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-center">
                  <div className="md:hidden text-[#8b7355]/80 text-sm">Total:</div>
                  <div className="text-[#8b7355] font-medium">₹{item.variant.price * item.quantity}</div>
                </div>

                {/* Remove Button (Desktop) */}
                <button 
                  onClick={() => removeFromCart(item.product.id, item.variant.id)}
                  className="hidden md:block text-[#d4b4a4] hover:text-[#c5a292]"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link 
              to="/" 
              className="text-[#8b7355] hover:text-[#d4b4a4] inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#8b7355] mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[#8b7355]/80">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#8b7355]/80">
                <span>Shipping</span>
                {shippingCost > 0 ? (
                  <span>₹{shippingCost}</span>
                ) : (
                  <span className="text-[#d4b4a4]">Free</span>
                )}
              </div>
              {shippingCost > 0 && (
                <div className="bg-[#f5ebe6] p-3 rounded-md flex items-start text-sm">
                  <Truck className="w-4 h-4 text-[#d4b4a4] mr-2 mt-0.5" />
                  <p className="text-[#8b7355]">
                    Add items worth ₹{500 - subtotal} more for free shipping
                  </p>
                </div>
              )}
              <div className="border-t border-[#e5d5c5] pt-4 flex justify-between font-medium text-[#8b7355]">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckoutModal(true)}
              className="w-full bg-[#d4b4a4] hover:bg-[#c5a292] text-white py-3 rounded-md transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        total={total}
      />
    </div>
  );
};

export default Cart;