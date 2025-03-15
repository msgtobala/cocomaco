import React from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  total: number;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total }) => {
  const { items } = useCart();
  
  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
    const shippingCost = subtotal < 500 ? 50 : 0;
    
    let message = "Hello! I would like to place an order for:\n\n";
    
    items.forEach(item => {
      message += `• ${item.product.name} (${item.variant.weight}) x ${item.quantity} - ₹${item.variant.price * item.quantity}\n`;
    });
    
    message += `\nSubtotal: ₹${subtotal}`;
    message += `\nShipping: ${shippingCost === 0 ? 'Free' : `₹${shippingCost}`}`;
    message += `\nTotal: ₹${total}`;
    message += "\n\nPlease let me know how to proceed with the payment and delivery. Thank you!";
    
    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/917010642928?text=${generateWhatsAppMessage()}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b7355] hover:text-[#d4b4a4] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-[#f5ebe6] rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-[#d4b4a4]" />
          </div>
          <h3 className="text-xl font-semibold text-[#8b7355] mb-2">Online Checkout Coming Soon!</h3>
          <p className="text-[#8b7355] mb-6">
            Our online payment system is currently under development. Please contact us to place your order.
          </p>
          <div className="bg-[#f5ebe6] p-4 rounded-lg mb-6">
            <p className="text-[#8b7355] font-medium mb-4">Your Order Total: ₹{total}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="tel:+917010642928" 
                className="flex items-center justify-center text-[#8b7355] font-medium hover:text-[#d4b4a4] transition-colors bg-white py-2 px-4 rounded-md"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#d4b4a4] text-white font-medium hover:bg-[#c5a292] transition-colors py-2 px-4 rounded-md"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </a>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-[#d4b4a4] text-white px-6 py-2 rounded-md hover:bg-[#c5a292] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;