import React, { useState } from 'react';
import { ArrowLeft, Plus, Home, CheckCircle, Clock, Upload, MapPin, Bed, Bath, Square } from 'lucide-react';
import { usePlatform, Property } from '../context/PlatformContext';

interface OwnerAppProps {
  onBack: () => void;
}

export default function OwnerApp({ onBack }: OwnerAppProps) {
  const { properties, addProperty } = usePlatform();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: 2,
    bathrooms: 1,
    area: '',
    description: '',
    amenities: [] as string[]
  });

  const ownerProperties = properties.filter(p => p.ownerId === 'owner1');

  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    addProperty({
      ...formData,
      price: parseInt(formData.price),
      area: parseInt(formData.area),
      images: ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'],
      ownerId: 'owner1',
      furnitureIncluded: true
    });

    setShowAddProperty(false);
    setFormData({
      title: '',
      location: '',
      price: '',
      bedrooms: 2,
      bathrooms: 1,
      area: '',
      description: '',
      amenities: []
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const amenityCategories = {
    'Building Amenities': ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Garden', 'Elevator', 'Power Backup', 'Club House'],
    'Furniture': ['Sofa Set', 'Dining Table & Chairs', 'Double Bed with Mattress', 'Single Bed with Mattress', 'Wardrobe', 'Study Table & Chair', 'TV Unit', 'Coffee Table', 'Shoe Rack', 'Bookshelf'],
    'Kitchen Appliances': ['Refrigerator', 'Microwave', 'Induction Cooktop', 'Mixer Grinder', 'Electric Kettle', 'Toaster', 'Rice Cooker'],
    'Home Appliances': ['Washing Machine', 'Air Conditioner', 'Water Heater (Geyser)', 'Ceiling Fans', 'LED TV', 'Wi-Fi Router', 'Vacuum Cleaner', 'Iron & Ironing Board']
  };

  if (showAddProperty) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddProperty(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Add New Property</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmitProperty} className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Information</h2>
              <p className="text-gray-600">All properties are automatically listed with furniture included</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Modern Family Apartment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Bandra West, Mumbai"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="45000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                <input
                  type="number"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="1200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value={1}>1 BHK</option>
                  <option value={2}>2 BHK</option>
                  <option value={3}>3 BHK</option>
                  <option value={4}>4 BHK</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your property..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="space-y-6">
                {Object.entries(amenityCategories).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {items.map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Documents</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload ownership documents</p>
                <p className="text-sm text-gray-500">Required: Ownership deed, NOC, Property tax receipts</p>
                <button type="button" className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                  Choose Files
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-green-900 mb-2">🏠 Furniture Inclusion Notice</h3>
              <p className="text-green-800 text-sm">
                Select all furniture and appliances available in your property. Our furniture partner will coordinate 
                delivery of any missing items and setup with tenants at no additional cost to you. All furniture and 
                appliance rental charges are included in the tenant's monthly payment.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowAddProperty(false)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Submit for Verification
              </button>
            </div>
          </form>
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
                <h1 className="text-xl font-semibold text-gray-900">Property Owner Portal</h1>
                <p className="text-sm text-gray-500">Manage your rental properties</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddProperty(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Priya Singh</div>
                <div className="text-xs text-gray-500">Verified Owner</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{ownerProperties.length}</div>
                <div className="text-sm text-gray-500">Total Properties</div>
              </div>
              <Home className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {ownerProperties.filter(p => p.status === 'verified').length}
                </div>
                <div className="text-sm text-gray-500">Verified</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {ownerProperties.filter(p => p.status === 'rented').length}
                </div>
                <div className="text-sm text-gray-500">Rented</div>
              </div>
              <Home className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {ownerProperties.filter(p => p.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {ownerProperties.map((property) => (
              <div key={property.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                      <p className="text-gray-600 flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </p>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms} bed
                        </span>
                        <span className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.bathrooms} bath
                        </span>
                        <span className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          {property.area} sq ft
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ₹{property.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">per month</div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      property.status === 'verified' 
                        ? 'bg-green-100 text-green-800'
                        : property.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}