import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Home, MapPin, DollarSign, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addProperty } = usePlatform();
  
  const [step, setStep] = useState(1);
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

  const amenityCategories = {
    'Building Amenities': ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Garden', 'Elevator', 'Power Backup', 'Club House'],
    'Furniture': ['Sofa Set', 'Dining Table & Chairs', 'Double Bed with Mattress', 'Single Bed with Mattress', 'Wardrobe', 'Study Table & Chair', 'TV Unit', 'Coffee Table', 'Shoe Rack', 'Bookshelf'],
    'Kitchen Appliances': ['Refrigerator', 'Microwave', 'Induction Cooktop', 'Mixer Grinder', 'Electric Kettle', 'Toaster', 'Rice Cooker'],
    'Home Appliances': ['Washing Machine', 'Air Conditioner', 'Water Heater (Geyser)', 'Ceiling Fans', 'LED TV', 'Wi-Fi Router', 'Vacuum Cleaner', 'Iron & Ironing Board']
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addProperty({
        ...formData,
        price: parseInt(formData.price),
        area: parseInt(formData.area),
        images: ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'],
        ownerId: user!.id,
        furnitureIncluded: true
      });

      alert('Property submitted for verification! You\'ll receive an email once it\'s approved.');
      navigate('/owner/dashboard');
    } catch (error) {
      alert('Failed to submit property. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Add New Property</h1>
                <p className="text-sm text-gray-500">List your property for verified family tenants</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Information</h2>
            <p className="text-gray-600">Provide detailed information about your property</p>
          </div>

          {/* Basic Information */}
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Basic Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Bandra West, Mumbai"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1 BHK</option>
                  <option value={2}>2 BHK</option>
                  <option value={3}>3 BHK</option>
                  <option value={4}>4 BHK</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <select
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1 Bathroom</option>
                  <option value={2}>2 Bathrooms</option>
                  <option value={3}>3 Bathrooms</option>
                  <option value={4}>4 Bathrooms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">Independent House</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your property, its unique features, and nearby amenities..."
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Available Amenities</h3>
            <p className="text-sm text-gray-600">
              Select all amenities currently available in your property. Missing furniture and appliances 
              will be provided by our furniture partner at no cost to you.
            </p>
            
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
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Property Documents</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">Ownership Documents</p>
                <p className="text-xs text-gray-500">Property deed, NOC, tax receipts</p>
                <button type="button" className="mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                  Choose Files
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">Property Images</p>
                <p className="text-xs text-gray-500">High-quality photos (max 10)</p>
                <button type="button" className="mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                  Choose Images
                </button>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-green-900 mb-2">🏠 Furniture Inclusion Notice</h3>
            <p className="text-green-800 text-sm">
              All properties on our platform come with complete furniture packages. Select the amenities 
              you currently have, and our furniture partner will provide any missing items. Furniture 
              rental charges are automatically included in the tenant's monthly payment.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/owner/dashboard')}
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Submit for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}