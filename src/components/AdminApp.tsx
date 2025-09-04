import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, XCircle, Users, Home, Package, AlertTriangle } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

interface AdminAppProps {
  onBack: () => void;
}

export default function AdminApp({ onBack }: AdminAppProps) {
  const { properties, users, furnitureOrders, bookings, updateProperty } = usePlatform();
  const [activeTab, setActiveTab] = useState<'verification' | 'properties' | 'users' | 'orders' | 'reports'>('verification');

  const pendingProperties = properties.filter(p => p.status === 'pending');
  const verifiedProperties = properties.filter(p => p.status === 'verified');

  const handlePropertyAction = (propertyId: string, action: 'approve' | 'reject') => {
    updateProperty(propertyId, { 
      status: action === 'approve' ? 'verified' : 'pending' 
    });
  };

  const tabs = [
    { id: 'verification', label: 'Verification Queue', icon: Shield, count: pendingProperties.length },
    { id: 'properties', label: 'Properties', icon: Home, count: properties.length },
    { id: 'users', label: 'Users', icon: Users, count: users.length },
    { id: 'orders', label: 'Furniture Orders', icon: Package, count: furnitureOrders.length },
    { id: 'reports', label: 'Reports', icon: AlertTriangle, count: 0 }
  ];

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
                <h1 className="text-xl font-semibold text-gray-900">Platform Administration</h1>
                <p className="text-sm text-gray-500">System oversight and compliance management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">System Admin</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                <div className="text-2xl font-bold text-gray-900">{furnitureOrders.length}</div>
                <div className="text-sm text-gray-500">Furniture Orders</div>
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
                  onClick={() => setActiveTab(tab.id as 'verification' | 'properties' | 'users' | 'orders' | 'reports')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
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
                              <div>Amenities: {property.amenities.join(', ')}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-yellow-900 mb-2">📋 Verification Checklist</h4>
                          <div className="text-sm text-yellow-800 space-y-1">
                            <div>✓ Ownership documents submitted</div>
                            <div>✓ Property photos provided</div>
                            <div>✓ Basic information complete</div>
                            <div>⏳ Awaiting admin approval</div>
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

            {activeTab === 'properties' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">All Properties</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img src={property.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                <div className="text-sm text-gray-500">{property.bedrooms}BHK, {property.area} sq ft</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{property.price.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              property.status === 'verified' 
                                ? 'bg-green-100 text-green-800'
                                : property.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {property.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.ownerId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Furniture Order Analytics</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
                    <div className="space-y-3">
                      {['pending', 'processing', 'delivered', 'setup_complete'].map((status) => {
                        const count = furnitureOrders.filter(o => o.status === status).length;
                        return (
                          <div key={status} className="flex justify-between items-center">
                            <span className="capitalize">{status.replace('_', ' ')}</span>
                            <span className="font-medium">{count} orders</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="space-y-2">
                      {furnitureOrders.slice(-3).map((order) => (
                        <div key={order.id} className="text-sm">
                          <div className="font-medium">Order #{order.id.toUpperCase()}</div>
                          <div className="text-gray-600">₹{order.totalCost.toLocaleString()} - {order.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Reports</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Monthly Revenue</h3>
                    <div className="text-2xl font-bold text-blue-800">₹12,45,000</div>
                    <div className="text-sm text-blue-600">+8.5% from last month</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Active Rentals</h3>
                    <div className="text-2xl font-bold text-green-800">{bookings.filter(b => b.status === 'active').length}</div>
                    <div className="text-sm text-green-600">98% occupancy rate</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Platform Health</h3>
                    <div className="text-2xl font-bold text-purple-800">Excellent</div>
                    <div className="text-sm text-purple-600">All systems operational</div>
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