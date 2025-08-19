import React from 'react';
import { Home, Users, Package, Shield, CheckCircle, Zap, Lock } from 'lucide-react';
import { UserRole } from '../App';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

export default function LandingPage({ onRoleSelect }: LandingPageProps) {
  const roles = [
    {
      id: 'tenant' as const,
      title: 'Family Tenant',
      description: 'Find verified furnished homes for your family',
      icon: Home,
      color: 'bg-blue-500 hover:bg-blue-600',
      features: ['Browse Properties', 'Secure Payments', 'Furniture Included']
    },
    {
      id: 'owner' as const,
      title: 'Property Owner',
      description: 'List and manage your rental properties',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600',
      features: ['List Properties', 'Document Verification', 'Reliable Tenants']
    },
    {
      id: 'furniture' as const,
      title: 'Furniture Partner',
      description: 'Manage furniture rental operations',
      icon: Package,
      color: 'bg-orange-500 hover:bg-orange-600',
      features: ['Auto Orders', 'Logistics Management', 'Inventory Tracking']
    },
    {
      id: 'admin' as const,
      title: 'Platform Admin',
      description: 'Oversee platform operations and compliance',
      icon: Shield,
      color: 'bg-purple-500 hover:bg-purple-600',
      features: ['User Verification', 'Dispute Resolution', 'Analytics']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FamilyRent</h1>
                <p className="text-sm text-gray-500">Trusted Family Property Rentals</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Family Rental
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Ecosystem</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamlined property rentals with verified homes, automatic furniture inclusion, and trusted service providers. 
            Four integrated applications working together for your family's needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">All Properties Verified</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <span className="text-gray-700">Automatic Furniture Rental</span>
            </div>
            <div className="flex items-center space-x-3">
              <Lock className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <span className="text-gray-700">Secure & Transparent</span>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
              onClick={() => onRoleSelect(role.id)}
            >
              <div className="p-6">
                <div className={`w-16 h-16 ${role.color} rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-600 mb-4">{role.description}</p>
                <div className="space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`h-2 ${role.color} rounded-b-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Properties</h3>
            <p className="text-gray-600">All properties undergo strict verification with legal document checks and owner validation.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Furniture Included</h3>
            <p className="text-gray-600">Every rental comes fully furnished with automatic delivery and setup coordination.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Support</h3>
            <p className="text-gray-600">24/7 admin support for dispute resolution, compliance, and platform oversight.</p>
          </div>
        </div>
      </section>
    </div>
  );
}