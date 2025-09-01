import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square, Star, Heart, Calendar, Shield, Package, Phone, Mail } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { useAuth } from '../context/AuthContext';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { properties, toggleFavorite, favorites } = usePlatform();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    message: '',
    visitDate: '',
    visitTime: ''
  });

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(property.id);

  const amenityCategories = {
    'Building Amenities': property.amenities.filter(a => 
      ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Garden', 'Elevator', 'Power Backup', 'Club House'].includes(a)
    ),
    'Furniture Included': property.amenities.filter(a => 
      ['Sofa Set', 'Dining Table & Chairs', 'Double Bed with Mattress', 'Single Bed with Mattress', 'Wardrobe', 'Study Table & Chair', 'TV Unit', 'Coffee Table', 'Shoe Rack', 'Bookshelf'].includes(a)
    ),
    'Kitchen Appliances': property.amenities.filter(a => 
      ['Refrigerator', 'Microwave', 'Induction Cooktop', 'Mixer Grinder', 'Electric Kettle', 'Toaster', 'Rice Cooker'].includes(a)
    ),
    'Home Appliances': property.amenities.filter(a => 
      ['Washing Machine', 'Air Conditioner', 'Water Heater (Geyser)', 'Ceiling Fans', 'LED TV', 'Wi-Fi Router', 'Vacuum Cleaner', 'Iron & Ironing Board'].includes(a)
    )
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${property.id}`);
  };

  const handleContactOwner = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Search</span>
            </button>
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex] || property.images[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
              
              {property.images.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <p className="text-lg text-gray-600 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">₹{property.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per month</div>
                  <div className="text-xs text-green-600 font-medium">Furniture included</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
                <div className="flex items-center space-x-3">
                  <Bed className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-500">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Bath className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-500">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Square className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-500">sq ft</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-xl font-semibold text-green-600">Included</div>
                    <div className="text-sm text-gray-500">Furniture</div>
                  </div>
                </div>
              </div>

              <div className="py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">What's Included</h2>
                <div className="space-y-6">
                  {Object.entries(amenityCategories).map(([category, items]) => (
                    items.length > 0 && (
                      <div key={category}>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          {category === 'Building Amenities' && '🏢'}
                          {category === 'Furniture Included' && '🛋️'}
                          {category === 'Kitchen Appliances' && '🍳'}
                          {category === 'Home Appliances' && '🏠'}
                          <span className="ml-2">{category}</span>
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {items.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Star className={`w-4 h-4 ${
                                category === 'Building Amenities' ? 'text-yellow-500' :
                                category === 'Furniture Included' ? 'text-blue-500' :
                                category === 'Kitchen Appliances' ? 'text-green-500' :
                                'text-purple-500'
                              }`} />
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  ₹{property.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">per month</div>
                <div className="text-sm text-green-600 font-medium">+ ₹15,000 furniture (included)</div>
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Now</span>
                </button>
                
                <button
                  onClick={handleContactOwner}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Contact Owner
                </button>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Verified Property</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Package className="w-4 h-4 text-blue-500" />
                  <span>Furniture Setup Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Owner</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">PS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Priya Singh</div>
                  <div className="text-sm text-gray-500">Verified Owner</div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91-9876543211</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>priya.singh@email.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Identity Verified</span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-medium">₹{property.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Furniture Rental</span>
                  <span className="font-medium">₹15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance</span>
                  <span className="font-medium">₹2,000</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total Monthly</span>
                  <span className="font-bold text-blue-600">₹{(property.price + 17000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-orange-600">
                  <span className="font-medium">Security Deposit</span>
                  <span className="font-bold">₹{(property.price * 2).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Property Owner</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hi, I'm interested in this property..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Visit Date</label>
                    <input
                      type="date"
                      value={contactForm.visitDate}
                      onChange={(e) => setContactForm({ ...contactForm, visitDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <select
                      value={contactForm.visitTime}
                      onChange={(e) => setContactForm({ ...contactForm, visitTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="evening">Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}