import { useState } from 'react';
import { Calendar, MapPin, CheckCircle, Clock, XCircle, Package, CreditCard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';
import { Link } from 'react-router-dom';

export default function BookingHistoryPage() {
  const { user } = useAuth();
  const { bookings, properties } = usePlatform();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const userBookings = bookings.filter(b => b.tenantId === user?.id);

  const getProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'confirmed': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking History</h1>
          <p className="text-gray-600">Track all your property bookings and rental history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{userBookings.length}</div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {userBookings.filter(b => b.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Active Rentals</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {userBookings.filter(b => b.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{userBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Total Spent</div>
              </div>
              <CreditCard className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {userBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start browsing properties to make your first booking</p>
            <Link
              to="/search"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Browse Properties</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userBookings.map((booking) => {
              const property = getProperty(booking.propertyId);
              const StatusIcon = getStatusIcon(booking.status);
              
              return (
                <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex space-x-4">
                        {property && (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {property?.title || 'Property'}
                          </h3>
                          <p className="text-gray-600 flex items-center mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property?.location}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Booking ID: {booking.id.toUpperCase()}</span>
                            <span>Duration: {booking.duration} months</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{booking.status}</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900 mt-2">
                          ₹{booking.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">Total Amount</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 py-4 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Move-in Date</div>
                        <div className="font-medium text-gray-900">{booking.startDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Monthly Rent</div>
                        <div className="font-medium text-gray-900">
                          ₹{Math.round(booking.totalAmount / booking.duration).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Lease End</div>
                        <div className="font-medium text-gray-900">
                          {new Date(new Date(booking.startDate).getTime() + booking.duration * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Package className="w-4 h-4 text-green-500" />
                          <span>Furniture Included</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span>Verified Property</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        {booking.status === 'active' && (
                          <>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              Pay Rent
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              {/* Request Service button removed */}
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {selectedBooking === booking.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedBooking === booking.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Booking Timeline</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="text-sm">
                                  <div className="font-medium text-gray-900">Booking Confirmed</div>
                                  <div className="text-gray-500">{booking.startDate}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="text-sm">
                                  <div className="font-medium text-gray-900">Furniture Delivered</div>
                                  <div className="text-gray-500">{booking.startDate}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="text-sm">
                                  <div className="font-medium text-gray-900">Move-in Completed</div>
                                  <div className="text-gray-500">{booking.startDate}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Payment Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Security Deposit</span>
                                <span className="font-medium">₹{(booking.totalAmount / booking.duration * 2).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Monthly Rent</span>
                                <span className="font-medium">₹{Math.round(booking.totalAmount / booking.duration).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="font-medium">Total Paid</span>
                                <span className="font-bold text-green-600">₹{booking.totalAmount.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
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