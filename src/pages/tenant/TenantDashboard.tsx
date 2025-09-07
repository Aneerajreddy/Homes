// ...existing code...
import { Link } from 'react-router-dom';
import { Home, Search, Heart, Calendar, MapPin, Star, Package, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';

export default function TenantDashboard() {
  const { user } = useAuth();
  const { properties, bookings, favorites } = usePlatform();

  const userBookings = bookings.filter(b => b.tenantId === user?.id);
  const activeBooking = userBookings.find(b => b.status === 'active');
  // Removed unused favoriteProperties variable
  const recommendedProperties = properties.filter(p => 
    p.status === 'verified' && 
    user?.preferredLocations?.some(loc => p.location.includes(loc)) &&
    p.price >= (user?.preferredBudgetMin || 0) &&
    p.price <= (user?.preferredBudgetMax || 100000)
  ).slice(0, 4);

  const stats = [
    { label: 'Active Bookings', value: userBookings.filter(b => b.status === 'active').length, icon: Home, color: 'text-blue-600' },
    { label: 'Saved Properties', value: favorites.length, icon: Heart, color: 'text-red-500' },
    { label: 'Total Bookings', value: userBookings.length, icon: Calendar, color: 'text-green-600' },
    { label: 'Profile Score', value: user?.isVerified ? '100%' : '60%', icon: Star, color: 'text-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                {activeBooking 
                  ? 'Your rental is active. Everything looks great!'
                  : 'Ready to find your perfect family home?'
                }
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Home className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
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
            {/* Active Rental */}
            {activeBooking && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Rental</h2>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Modern Family Apartment</h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Downtown, Mumbai
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-gray-200">
                    <div>
                      <div className="text-lg font-bold text-gray-900">₹45,000</div>
                      <div className="text-xs text-gray-500">Monthly Rent</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">12</div>
                      <div className="text-xs text-gray-500">Months Left</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">Jan 15</div>
                      <div className="text-xs text-gray-500">Next Payment</div>
                    </div>
                  </div>
                  <div className="pt-4 flex space-x-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Pay Rent
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      {/* Request Service button removed */}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recommended Properties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
                <Link to="/search" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedProperties.map((property) => (
                  <Link
                    key={property.id}
                    to={`/property/${property.id}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-gray-600 text-sm flex items-center mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-blue-600">
                        ₹{property.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {property.bedrooms}BHK • {property.area} sq ft
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Property Search</div>
                    <div className="text-sm text-gray-500">Searched for properties in Mumbai</div>
                  </div>
                  <div className="text-xs text-gray-400">2 hours ago</div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Added to Favorites</div>
                    <div className="text-sm text-gray-500">Saved Luxury Villa in Banjara Hills</div>
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
                  to="/search"
                  className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Search Properties</span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-700">View Favorites</span>
                </Link>
                <Link
                  to="/bookings"
                  className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-700">Booking History</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Star className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">Update Profile</span>
                </Link>
              </div>
            </div>

            {/* Profile Completion */}
            {!user?.isVerified && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Your Profile</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Basic Info</span>
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Phone Verification</span>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ID Verification</span>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors mt-4"
                >
                  Complete Verification
                </Link>
              </div>
            )}

            {/* Support */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Package className="w-4 h-4 text-blue-500" />
                  <span>Furniture Setup Assistance</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}