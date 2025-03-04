import React, { useState, useRef, useEffect } from 'react';
import { Star, Send, ChevronDown, X } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import Logo from './assets/images/logo.png';

type FormData = {
  name: string;
  satisfaction: string;
  likedMost: string;
  productQuality: string;
  recommendation: number;
  improvements: string;
  productSuggestion: string;
};

type CustomSelectProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
};

function CustomSelect({ options, value, onChange, placeholder = "Select an option", required = false }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={selectRef} className="relative">
      <div
        className={`w-full bg-white border border-[#e5d5c5] rounded-md px-4 py-2.5 text-[#8b7355] cursor-pointer flex justify-between items-center ${
          isOpen ? 'border-[#d4b4a4] ring ring-[#d4b4a4]/10' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-[#8b7355]' : 'text-[#8b7355]/60'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-[#8b7355] transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#e5d5c5] rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2.5 cursor-pointer transition-colors ${
                option.value === value
                  ? 'bg-[#f5ebe6] text-[#8b7355]'
                  : 'text-[#8b7355] hover:bg-[#faf6f3]'
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {required && <input type="hidden" value={value} required />}
    </div>
  );
}

function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b7355] hover:text-[#d4b4a4] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-[#f5ebe6] rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-[#d4b4a4] fill-[#d4b4a4]" />
          </div>
          <h3 className="text-xl font-semibold text-[#8b7355] mb-2">Thank You!</h3>
          <p className="text-[#8b7355] mb-6">
            Your feedback has been successfully submitted. We truly appreciate your time and input!
          </p>
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
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    satisfaction: '',
    likedMost: '',
    productQuality: '',
    recommendation: 3,
    improvements: '',
    productSuggestion: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const satisfactionOptions = [
    { value: 'very-satisfied', label: 'Very satisfied 😊' },
    { value: 'satisfied', label: 'Satisfied 🙂' },
    { value: 'neutral', label: 'Neutral 😐' },
    { value: 'unsatisfied', label: 'Unsatisfied 🙁' },
    { value: 'very-unsatisfied', label: 'Very unsatisfied 😞' },
  ];

  const productQualityOptions = [
    { value: 'excellent', label: 'Excellent - Perfect taste and quality ⭐️' },
    { value: 'good', label: 'Good - Enjoyable taste and quality 😋' },
    { value: 'average', label: 'Average - Could be better 🤔' },
    { value: 'below-average', label: 'Below Average - Needs improvement 😕' },
    { value: 'poor', label: 'Poor - Not up to expectations 😢' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        submittedAt: new Date(),
      });

      setShowSuccessModal(true);
      setFormData({
        name: '',
        satisfaction: '',
        likedMost: '',
        productQuality: '',
        recommendation: 3,
        improvements: '',
        productSuggestion: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <img 
            src={Logo}
            alt="Coco Maco Logo" 
            className="w-32 mx-auto mb-8"
          />
          <p className="text-[#8b7355] text-lg font-light max-w-xl mx-auto">
            Thank you for supporting Coco Maco! We value your feedback and would love to hear your thoughts.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Name */}
            <div>
              <label className="block text-[#8b7355] text-sm mb-3 required">
                Your Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-white border border-[#e5d5c5] rounded-md px-4 py-2.5 text-[#8b7355] focus:border-[#d4b4a4] focus:ring focus:ring-[#d4b4a4]/10 transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>

            {/* Satisfaction */}
            <div>
              <label className="block text-[#8b7355] text-sm mb-3 required">
                How satisfied are you with our product?
              </label>
              <CustomSelect
                options={satisfactionOptions}
                value={formData.satisfaction}
                onChange={(value) => setFormData({ ...formData, satisfaction: value })}
                required
              />
            </div>

            {/* Liked Most */}
            <div>
              <label className="block text-[#8b7355] text-sm mb-3">
                What did you like the most about our product?
              </label>
              <input
                type="text"
                className="w-full bg-white border border-[#e5d5c5] rounded-md px-4 py-2.5 text-[#8b7355] focus:border-[#d4b4a4] focus:ring focus:ring-[#d4b4a4]/10 transition-colors"
                value={formData.likedMost}
                onChange={(e) => setFormData({ ...formData, likedMost: e.target.value })}
                placeholder="Share your thoughts..."
              />
            </div>

            {/* Product Quality */}
            <div>
              <label className="block text-[#8b7355] text-sm mb-3 required">
                How would you rate the taste and quality of our product?
              </label>
              <CustomSelect
                options={productQualityOptions}
                value={formData.productQuality}
                onChange={(value) => setFormData({ ...formData, productQuality: value })}
                required
              />
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-[#8b7355] text-sm mb-3">
                How likely are you to recommend Coco Maco to others?
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="focus:outline-none transform hover:scale-105 transition-transform"
                    onClick={() => setFormData({ ...formData, recommendation: value })}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        value <= formData.recommendation
                          ? 'fill-[#d4b4a4] text-[#d4b4a4]'
                          : 'text-[#e5d5c5]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div>
              <label className="block text-[#8b7355] text-sm mb-3">
                What could we improve to serve you better?
              </label>
              <textarea
                className="w-full bg-white border border-[#e5d5c5] rounded-md px-4 py-2.5 text-[#8b7355] focus:border-[#d4b4a4] focus:ring focus:ring-[#d4b4a4]/10 transition-colors"
                rows={3}
                value={formData.improvements}
                onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                placeholder="We appreciate your suggestions..."
              />
            </div>

            {/* Product Suggestion */}
            <div>
              <label className="block text-[#8b7355] text-sm mb-3">
                What new products would you like to see from Coco Maco? 🌟
              </label>
              <textarea
                className="w-full bg-white border border-[#e5d5c5] rounded-md px-4 py-2.5 text-[#8b7355] focus:border-[#d4b4a4] focus:ring focus:ring-[#d4b4a4]/10 transition-colors"
                rows={3}
                value={formData.productSuggestion}
                onChange={(e) => setFormData({ ...formData, productSuggestion: e.target.value })}
                placeholder="Share your product ideas with us..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center space-x-2 py-3 px-6 bg-[#d4b4a4] hover:bg-[#c5a292] text-white rounded-md font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4b4a4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
            </button>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default App;