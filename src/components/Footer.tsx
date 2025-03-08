import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5ebe6] text-[#8b7355] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About COCOMACO</h3>
            <p className="mb-4">
              At COCOMACO, we craft premium, all-natural wellness products that blend traditional wisdom with modern nutrition. Our commitment to quality, purity, and health drives us to create products that nourish both body and soul.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/cocomaco.in/" target="_blank" rel="noopener noreferrer" className="text-[#8b7355] hover:text-[#d4b4a4] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/917010642928" target="_blank" rel="noopener noreferrer" className="text-[#8b7355] hover:text-[#d4b4a4] transition-colors">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#d4b4a4] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/product/nutimix-premium" className="hover:text-[#d4b4a4] transition-colors">Our Products</Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-[#d4b4a4] transition-colors">Feedback</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+917010642928" className="hover:text-[#d4b4a4] transition-colors">+91 7010642928</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:cocomaco.store@gmail.com" className="hover:text-[#d4b4a4] transition-colors">cocomaco.store@gmail.com</a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1" />
                <span>Marathahalli, Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#e5d5c5] mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} COCOMACO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;