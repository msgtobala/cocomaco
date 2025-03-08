import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from '../assets/images/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-[#faf6f3] py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Coco Maco Logo" className="h-10 w-auto" />
          <span className="ml-2 text-[#8b7355] font-medium text-xl">COCOMACO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-[#8b7355] hover:text-[#d4b4a4] transition-colors ${
              location.pathname === '/' ? 'font-medium' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`text-[#8b7355] hover:text-[#d4b4a4] transition-colors ${
              location.pathname === '/shop' ? 'font-medium' : ''
            }`}
          >
            Shop
          </Link>
          <Link 
            to="/feedback" 
            className={`text-[#8b7355] hover:text-[#d4b4a4] transition-colors ${
              location.pathname === '/feedback' ? 'font-medium' : ''
            }`}
          >
            Feedback
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-[#8b7355] hover:text-[#d4b4a4] transition-colors" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4b4a4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="relative mr-4">
            <ShoppingCart className="w-6 h-6 text-[#8b7355]" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4b4a4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#8b7355] focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-[#8b7355] hover:text-[#d4b4a4] transition-colors ${
                location.pathname === '/' ? 'font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`text-[#8b7355] hover:text-[#d4b4a4] transition-colors ${
                location.pathname === '/shop' ? 'font-medium' : ''
              }`}
            >
              Shop
            </Link>
            <Link 
              to="/feedback" 
              className={`text-[#8b7355] hover:text-[#d4b4a4] transition-colors ${
                location.pathname === '/feedback' ? 'font-medium' : ''
              }`}
            >
              Feedback
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;