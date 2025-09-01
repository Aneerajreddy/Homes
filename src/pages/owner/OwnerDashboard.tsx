import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Home, CheckCircle, Clock, TrendingUp, Users, DollarSign, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const { properties } = usePlatform();

  const ownerProperties = properties.filter(p => p.ownerId === user?.id);
  const verifiedProperties = ownerProperties.filter(p => p.status === 'verified');
  const pendingProperties = ownerProperties.filter(p => p.status === 'pending');
  const rentedProperties = ownerProperties.filter(p => p.status === 'rented');

  const totalRevenue = rentedProperties.reduce((sum, p) => sum + p.price, 0);

  const stats = [
    { label: 'Total Properties', value: ownerProperties.length, icon: Home, color: 'text-blue-600' },
    { label: 'Verified', value: verifiedProperties.length, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Rented', value: rentedProperties.length, icon: Users, color: 'text-purple-600' },
    { label: 'Monthly Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {user?.firstName}! 🏠
              </h1>
              <p className="text-green-100 text-lg">
                Manage your properties and track your rental business performance
              </p>
            </div>
            <Link
              to="/owner/add-property"
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Property</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Properties Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
                <Link
                  to="/owner/properties"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              {ownerProperties.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties listed yet</h3>
                  <p className="text-gray-600 mb-4">Start by adding your first property to the platform</p>
                  <Link
                    to="/owner/add-property"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Add Your First Property
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {ownerProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-4">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{property.title}</h3>
                            <p className="text-gray-600 text-sm">{property.location}</p>
                            <div className="text-sm text-gray-500">
                              {property.bedrooms}BHK • {property.area} sq ft
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ₹{property.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">per month</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
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
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Property Verified</div>
                    <div className="text-sm text-gray-500">Modern Family Apartment was approved</div>
                  </div>
                  <div className="text-xs text-gray-400">2 hours ago</div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Property Views</div>
                    <div className="text-sm text-gray-500">Your property received 15 new views</div>
                  </div>
                  <div className="text-xs text-gray-400">1 day ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/owner/add-property"
                  className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Add New Property</span>
                </Link>
                <Link
                  to="/owner/properties"
                  className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-700">Manage Properties</span>
                </Link>
                <button className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors w-full text-left">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">View Analytics</span>
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Property Views</span>
                  <span className="font-semibold text-gray-900">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Inquiries</span>
                  <span className="font-semibold text-gray-900">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-semibold text-green-600">12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-semibold text-blue-600">2.3 hours</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Success</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Upload high-quality photos to get 3x more views</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Complete verification to appear in top search results</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Respond to inquiries within 2 hours for better ranking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}