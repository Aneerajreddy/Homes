import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Users, DollarSign, Shield, Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'preferences' | 'verification'>('personal');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    familySize: user?.familySize || 2,
    preferredBudgetMin: user?.preferredBudgetMin || 20000,
    preferredBudgetMax: user?.preferredBudgetMax || 50000,
    preferredLocations: user?.preferredLocations || []
  });

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ];

  const handleLocationToggle = (city: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(city)
        ? prev.preferredLocations.filter(l => l !== city)
        : [...prev.preferredLocations, city]
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'preferences', label: 'Preferences', icon: MapPin },
    { id: 'verification', label: 'Verification', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className={`flex items-center space-x-1 text-sm ${
                  user?.isVerified ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  <Shield className="w-4 h-4" />
                  <span>{user?.isVerified ? 'Verified Account' : 'Verification Pending'}</span>
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {user?.role} Account
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Family Size</label>
                    <select
                      value={formData.familySize}
                      onChange={(e) => setFormData({ ...formData, familySize: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 People</option>
                      <option value={3}>3 People</option>
                      <option value={4}>4 People</option>
                      <option value={5}>5+ People</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Search Preferences</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (Monthly)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        value={formData.preferredBudgetMin}
                        onChange={(e) => setFormData({ ...formData, preferredBudgetMin: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Min budget"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={formData.preferredBudgetMax}
                        onChange={(e) => setFormData({ ...formData, preferredBudgetMax: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Max budget"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Current range: ₹{formData.preferredBudgetMin?.toLocaleString()} - ₹{formData.preferredBudgetMax?.toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Cities</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {cities.map((city) => (
                      <label key={city} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.preferredLocations.includes(city)}
                          onChange={() => handleLocationToggle(city)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Verification Tab */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Account Verification</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900">Email Verification</div>
                        <div className="text-sm text-gray-500">Verify your email address</div>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="font-medium text-gray-900">Phone Verification</div>
                        <div className="text-sm text-gray-500">Verify your phone number</div>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors">
                      Verify Now
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-purple-500" />
                      <div>
                        <div className="font-medium text-gray-900">Identity Verification</div>
                        <div className="text-sm text-gray-500">Upload government ID</div>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors">
                      Upload ID
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Verification Benefits</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Higher priority in property bookings</li>
                    <li>• Access to premium properties</li>
                    <li>• Faster approval process</li>
                    <li>• Enhanced customer support</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}