import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, Users, Home, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export default function AdminDashboard() {
  const { properties, users, furnitureOrders, bookings, updateProperty } = usePlatform();
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'users' | 'analytics'>('overview');

  const pendingProperties = properties.filter(p => p.status === 'pending');
  const verifiedProperties = properties.filter(p => p.status === 'verified');
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  const handlePropertyAction = (propertyId: string, action: 'approve' | 'reject') => {
    updateProperty(propertyId, { 
      status: action === 'approve' ? 'verified' : 'pending' 
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'verification', label: 'Verification Queue', icon: Shield, count: pendingProperties.length },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Platform Administration</h1>
              <p className="text-purple-100 text-lg">System oversight and compliance management</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">System Admin</div>
              <div className="text-xs text-purple-200">Administrator</div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{pendingProperties.length}</div>
                <div className="text-sm text-gray-500">Pending Verification</div>
              </div>
              <Shield className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{verifiedProperties.length}</div>
                <div className="text-sm text-gray-500">Verified Properties</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
                <div className="text-sm text-gray-500">Active Bookings</div>
              </div>
              <Home className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">₹{(totalRevenue / 100000).toFixed(1)}L</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.count && tab.count > 0 && (
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Platform Overview</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Platform Health</h3>
                    <div className="text-2xl font-bold text-blue-800">Excellent</div>
                    <div className="text-sm text-blue-600">All systems operational</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">User Satisfaction</h3>
                    <div className="text-2xl font-bold text-green-800">4.8/5</div>
                    <div className="text-sm text-green-600">Based on 1,200+ reviews</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Growth Rate</h3>
                    <div className="text-2xl font-bold text-purple-800">+23%</div>
                    <div className="text-sm text-purple-600">Month over month</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Verification Queue</h2>
                {pendingProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">No properties pending verification at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pendingProperties.map((property) => (
                      <div key={property.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                            <p className="text-gray-600">{property.location}</p>
                            <p className="text-sm text-gray-500 mt-1">Owner: {property.ownerId}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">
                              ₹{property.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">per month</div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms</div>
                              <div>{property.area} sq ft</div>
                              <div>Amenities: {property.amenities.slice(0, 3).join(', ')}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => handlePropertyAction(property.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve Property</span>
                          </button>
                          <button
                            onClick={() => handlePropertyAction(property.id, 'reject')}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Request Changes</span>
                          </button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                            View Documents
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Users</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Email: {user.email}</div>
                        <div>Phone: {user.phone}</div>
                        <div>Role: {user.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Platform Analytics</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>This Month</span>
                        <span className="font-medium">₹{(totalRevenue * 0.1).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Last Month</span>
                        <span className="font-medium">₹{(totalRevenue * 0.08).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-green-600">
                        <span>Growth</span>
                        <span className="font-medium">+25%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">User Activity</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Daily Active Users</span>
                        <span className="font-medium">2,340</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>New Registrations</span>
                        <span className="font-medium">45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Property Views</span>
                        <span className="font-medium">8,920</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}