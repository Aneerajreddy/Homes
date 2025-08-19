import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Home, Bed, Bath, Square, Star, CreditCard, Calendar, Package } from 'lucide-react';
import { usePlatform, Property } from '../context/PlatformContext';

interface TenantAppProps {
  onBack: () => void;
}

export default function TenantApp({ onBack }: TenantAppProps) {
  const { properties, createBooking } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    duration: 12,
    tenantName: 'Amit Sharma',
    tenantEmail: 'amit@email.com',
    tenantPhone: '+91-9876543210'
  });

  const filteredProperties = properties.filter(
    property => 
      property.status === 'verified' &&
      (property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       property.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBookProperty = () => {
    if (selectedProperty && bookingData.startDate) {
      createBooking({
        propertyId: selectedProperty.id,
        tenantId: 'tenant1',
        ownerId: selectedProperty.ownerId,
        startDate: bookingData.startDate,
        duration: bookingData.duration,
        totalAmount: selectedProperty.price * bookingData.duration,
        status: 'confirmed'
      });
      
      alert('Property booked successfully! Furniture delivery will be automatically arranged.');
      setShowBookingForm(false);
      setSelectedProperty(null);
    }
  };

  if (selectedProperty && showBookingForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Complete Booking</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Property Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Summary</h2>
              <div className="space-y-4">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedProperty.title}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedProperty.location}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedProperty.bedrooms}</div>
                    <div className="text-sm text-gray-500">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedProperty.bathrooms}</div>
                    <div className="text-sm text-gray-500">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedProperty.area}</div>
                    <div className="text-sm text-gray-500">sq ft</div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Furniture Included</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Complete furniture package will be automatically delivered and set up before your move-in date.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Move-in Date</label>
                  <input
                    type="date"
                    value={bookingData.startDate}
                    onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rental Duration</label>
                  <select
                    value={bookingData.duration}
                    onChange={(e) => setBookingData({...bookingData, duration: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={6}>6 Months</option>
                    <option value={12}>1 Year</option>
                    <option value={24}>2 Years</option>
                    <option value={36}>3 Years</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rent</span>
                      <span className="font-medium">₹{selectedProperty.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furniture Rental (included)</span>
                      <span className="font-medium">₹15,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total Monthly</span>
                      <span className="font-bold">₹{(selectedProperty.price + 15000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Security Deposit (2 months)</span>
                      <span className="font-bold">₹{((selectedProperty.price + 15000) * 2).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookProperty}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Pay Advance & Confirm Booking</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By proceeding, you agree to our terms and conditions. Furniture delivery will be automatically coordinated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedProperty) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Property Details</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={selectedProperty.images[0]}
              alt={selectedProperty.title}
              className="w-full h-96 object-cover"
            />
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h1>
                  <p className="text-lg text-gray-600 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {selectedProperty.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">₹{selectedProperty.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
                <div className="flex items-center space-x-3">
                  <Bed className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{selectedProperty.bedrooms}</div>
                    <div className="text-sm text-gray-500">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Bath className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{selectedProperty.bathrooms}</div>
                    <div className="text-sm text-gray-500">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Square className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{selectedProperty.area}</div>
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
                <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
              </div>

              <div className="py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="space-y-6">
                  {/* Building Amenities */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">🏢 Building Amenities</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedProperty.amenities
                        .filter(amenity => ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Garden', 'Elevator', 'Power Backup', 'Club House'].includes(amenity))
                        .map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Furniture */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">🛋️ Furniture Included</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedProperty.amenities
                        .filter(amenity => ['Sofa Set', 'Dining Table & Chairs', 'Double Bed with Mattress', 'Single Bed with Mattress', 'Wardrobe', 'Study Table & Chair', 'TV Unit', 'Coffee Table', 'Shoe Rack', 'Bookshelf'].includes(amenity))
                        .map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Kitchen Appliances */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">🍳 Kitchen Appliances</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedProperty.amenities
                        .filter(amenity => ['Refrigerator', 'Microwave', 'Induction Cooktop', 'Mixer Grinder', 'Electric Kettle', 'Toaster', 'Rice Cooker'].includes(amenity))
                        .map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Home Appliances */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">🏠 Home Appliances</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedProperty.amenities
                        .filter(amenity => ['Washing Machine', 'Air Conditioner', 'Water Heater (Geyser)', 'Ceiling Fans', 'LED TV', 'Wi-Fi Router', 'Vacuum Cleaner', 'Iron & Ironing Board'].includes(amenity))
                        .map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-purple-500" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">🏠 Fully Furnished Guarantee</h3>
                <p className="text-blue-800 text-sm">
                  This property comes with a complete furniture package including sofa set, dining table, bed sets, 
                  wardrobes, and all essential items. Furniture delivery and setup will be automatically coordinated 
                  with your move-in date at no additional charge.
                </p>
              </div>

              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book This Property</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Family Tenant Portal</h1>
                <p className="text-sm text-gray-500">Find verified furnished homes for your family</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Amit Sharma</div>
                <div className="text-xs text-gray-500">Verified Tenant</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location or property name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Available Properties</h2>
          <span className="text-sm text-gray-500">{filteredProperties.length} properties found</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedProperty(property)}
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
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </span>
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.area}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}