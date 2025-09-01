import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Bed, Bath, Square, Eye, Edit, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';

export default function OwnerPropertiesPage() {
  const { user } = useAuth();
  const { properties } = usePlatform();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const ownerProperties = properties.filter(p => p.ownerId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'rented': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Properties</h1>
            <p className="text-gray-600">Manage all your listed properties</p>
          </div>
          <Link
            to="/owner/add-property"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{ownerProperties.length}</div>
                <div className="text-sm text-gray-500">Total Properties</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-blue-600 font-bold">{ownerProperties.length}</div>
              </div>
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
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="text-purple-600 text-sm font-bold">R</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{ownerProperties.filter(p => p.status === 'rented').reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Monthly Revenue</div>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="text-orange-600 text-sm font-bold">₹</div>
              </div>
            </div>
          </div>
        </div>

        {ownerProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-gray-400 text-2xl">🏠</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties listed yet</h3>
            <p className="text-gray-600 mb-6">Start earning by listing your first property on our platform</p>
            <Link
              to="/owner/add-property"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Property</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {ownerProperties.map((property) => {
              const StatusIcon = getStatusIcon(property.status);
              
              return (
                <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex space-x-4">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.title}</h3>
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
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span className="capitalize">{property.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>234 views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>12 inquiries</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Property Status Details */}
                    {property.status === 'pending' && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-900 mb-2">⏳ Verification in Progress</h4>
                        <p className="text-sm text-yellow-800">
                          Your property is being reviewed by our team. This typically takes 24-48 hours. 
                          You'll receive an email once verification is complete.
                        </p>
                      </div>
                    )}

                    {property.status === 'verified' && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2">✅ Property Verified & Live</h4>
                        <p className="text-sm text-green-800">
                          Your property is now live on our platform and visible to potential tenants. 
                          You'll receive notifications for any inquiries.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}