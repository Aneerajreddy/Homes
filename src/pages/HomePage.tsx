import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Shield, Package, Star, CheckCircle, ArrowRight, Users, TrendingUp } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { properties } = usePlatform();
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(searchLocation)}`);
  };

  const featuredProperties = properties.filter(p => p.status === 'verified').slice(0, 6);

  const stats = [
    { label: 'Verified Properties', value: '2,500+', icon: Home },
    { label: 'Happy Families', value: '10,000+', icon: Users },
    { label: 'Cities Covered', value: '25+', icon: MapPin },
    { label: 'Customer Rating', value: '4.8/5', icon: Star }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All properties undergo strict verification with legal document checks and owner validation.'
    },
    {
      icon: Package,
      title: 'Furniture Included',
      description: 'Every rental comes fully furnished with automatic delivery and setup coordination.'
    },
    {
      icon: CheckCircle,
      title: 'Transparent Process',
      description: 'Clear pricing, legal agreements, and 24/7 support for complete peace of mind.'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh & Priya Kumar',
      location: 'Mumbai',
      image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'FamilyRent made our relocation so smooth. The property was exactly as shown, and the furniture was delivered on time. Highly recommended for families!'
    },
    {
      name: 'Amit & Sneha Sharma',
      location: 'Bangalore',
      image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The verification process gave us confidence. We found our dream home with all amenities included. The platform is trustworthy and transparent.'
    },
    {
      name: 'Vikram & Anita Patel',
      location: 'Pune',
      image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Excellent service! The furniture quality exceeded our expectations, and the support team was always available to help.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Family Home</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover verified furnished homes with complete furniture packages. 
              Trusted by thousands of families across India.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter city, area, or landmark..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-medium">All Properties Verified</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Package className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700 font-medium">Furniture Always Included</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Shield className="w-6 h-6 text-purple-500" />
                <span className="text-gray-700 font-medium">Secure & Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">Handpicked verified homes perfect for families</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Furnished
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">per month (furniture included)</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.bedrooms}BHK • {property.area} sq ft
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FamilyRent?</h2>
            <p className="text-xl text-gray-600">Built specifically for families, by families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Families Say</h2>
            <p className="text-xl text-gray-600">Real experiences from verified families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Family's Next Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have found their perfect rental homes through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Start Searching</span>
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Join as Family</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}