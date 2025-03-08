import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Leaf } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#f5ebe6] py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#8b7355] mb-4">
              Natural Wellness, Crafted with Care
            </h1>
            <p className="text-[#8b7355]/80 text-lg mb-8">
              Welcome to COCOMACO, where we blend nature's finest ingredients to create premium wellness products. Our commitment to quality and purity ensures that every product delivers the perfect balance of nutrition and taste.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/product/nutimix-premium" 
                className="bg-[#d4b4a4] hover:bg-[#c5a292] text-white px-6 py-3 rounded-md transition-colors inline-flex items-center"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                to="/feedback" 
                className="bg-white border border-[#d4b4a4] text-[#d4b4a4] hover:bg-[#f5ebe6] px-6 py-3 rounded-md transition-colors"
              >
                Give Feedback
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="COCOMACO Premium Products" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#8b7355] text-center mb-12">
            The COCOMACO Difference
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#f5ebe6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-[#d4b4a4]" />
              </div>
              <h3 className="text-xl font-medium text-[#8b7355] mb-3">100% Natural</h3>
              <p className="text-[#8b7355]/80">
                We source only the finest natural ingredients, ensuring every product is pure, wholesome, and free from artificial additives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#f5ebe6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#d4b4a4]" />
              </div>
              <h3 className="text-xl font-medium text-[#8b7355] mb-3">Quality Assured</h3>
              <p className="text-[#8b7355]/80">
                Every product undergoes strict quality checks to ensure you receive only the best, most nutritious blends for your wellness journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#f5ebe6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#d4b4a4]" />
              </div>
              <h3 className="text-xl font-medium text-[#8b7355] mb-3">Crafted with Care</h3>
              <p className="text-[#8b7355]/80">
                Each product is thoughtfully crafted in small batches to maintain freshness and ensure consistent quality in every package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-[#faf6f3]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#8b7355] text-center mb-12">
            Our Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#8b7355] text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#f5ebe6] p-6 rounded-lg">
              <div className="flex text-[#d4b4a4] mb-4">
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
              </div>
              <p className="text-[#8b7355] mb-4">
                "I've been adding Nutimix to my morning smoothies, and I can feel the difference in my energy levels throughout the day. Absolutely love it!"
              </p>
              <p className="font-medium text-[#8b7355]">- Priya S.</p>
            </div>
            <div className="bg-[#f5ebe6] p-6 rounded-lg">
              <div className="flex text-[#d4b4a4] mb-4">
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
              </div>
              <p className="text-[#8b7355] mb-4">
                "My kids love the taste when mixed with milk. It's a relief to find a healthy option they actually enjoy. Great product!"
              </p>
              <p className="font-medium text-[#8b7355]">- Rahul M.</p>
            </div>
            <div className="bg-[#f5ebe6] p-6 rounded-lg">
              <div className="flex text-[#d4b4a4] mb-4">
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
                <Star className="w-5 h-5 fill-[#d4b4a4]" />
              </div>
              <p className="text-[#8b7355] mb-4">
                "The quality of ingredients is exceptional. I appreciate that it's homemade with no preservatives. Will definitely order again!"
              </p>
              <p className="font-medium text-[#8b7355]">- Anita K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#d4b4a4]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Experience Natural Wellness Today
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join the growing community of health-conscious individuals who trust COCOMACO for their daily nutrition needs.
          </p>
          <Link 
            to="/product/nutimix-premium" 
            className="bg-white text-[#d4b4a4] hover:bg-[#f5ebe6] px-8 py-3 rounded-md transition-colors inline-flex items-center"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;