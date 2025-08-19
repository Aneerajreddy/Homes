import React, { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Calendar } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

interface FurnitureAppProps {
  onBack: () => void;
}

export default function FurnitureApp({ onBack }: FurnitureAppProps) {
  const { furnitureOrders, properties, updateFurnitureOrderStatus } = usePlatform();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'setup_complete': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    updateFurnitureOrderStatus(orderId, newStatus);
  };

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
                <h1 className="text-xl font-semibold text-gray-900">Furniture Rental Operations</h1>
                <p className="text-sm text-gray-500">Manage furniture orders and logistics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">FurniCorp Ltd</div>
                <div className="text-xs text-gray-500">Logistics Partner</div>
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
                <div className="text-2xl font-bold text-gray-900">
                  {furnitureOrders.filter(o => o.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-500">New Orders</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {furnitureOrders.filter(o => o.status === 'processing').length}
                </div>
                <div className="text-sm text-gray-500">Processing</div>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {furnitureOrders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-gray-500">Delivered</div>
              </div>
              <Truck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {furnitureOrders.filter(o => o.status === 'setup_complete').length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Orders List */}
<div className="bg-white rounded-xl shadow-lg">
  <div className="px-6 py-4 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-900">Furniture Orders</h2>
  </div>
  <div className="divide-y divide-gray-200">
    {furnitureOrders.map((order) => {
      const property = getProperty(order.propertyId);
      return (
        <div
          key={order.id}
          className="px-6 py-6 hover:bg-gray-50 transition-colors"
        >
          {/* Order Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order.id.toUpperCase()}
                </h3>
                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status
                    .replace("_", " ")
                    .charAt(0)
                    .toUpperCase() + order.status.replace("_", " ").slice(1)}
                </div>
              </div>

              {property && (
                <div className="mb-3">
                  <p className="text-gray-900 font-medium">{property.title}</p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                </div>
              )}

              {/* Items & Amenities */}
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Furniture Items
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Package className="w-3 h-3 mr-2 text-gray-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">
                      Required Items:
                    </span>
                    <ul className="mt-1 space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Package className="w-3 h-3 mr-2 text-gray-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {property && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Property Amenities:
                      </span>
                      <div className="mt-1 text-xs text-gray-500">
                        {property.amenities
                          .filter((a) =>
                            [
                              "Sofa Set",
                              "Dining Table & Chairs",
                              "Double Bed with Mattress",
                              "Single Bed with Mattress",
                              "Wardrobe",
                              "Study Table & Chair",
                              "TV Unit",
                              "Coffee Table",
                              "Shoe Rack",
                              "Bookshelf",
                              "Refrigerator",
                              "Microwave",
                              "Induction Cooktop",
                              "Mixer Grinder",
                              "Electric Kettle",
                              "Toaster",
                              "Rice Cooker",
                              "Washing Machine",
                              "Air Conditioner",
                              "Water Heater (Geyser)",
                              "Ceiling Fans",
                              "LED TV",
                              "Wi-Fi Router",
                              "Vacuum Cleaner",
                              "Iron & Ironing Board",
                            ].includes(a)
                          )
                          .join(", ")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions (moved inside same parent container to fix JSX error) */}
          <div className="flex space-x-2 mt-4">
            {order.status === "pending" && (
              <button
                onClick={() => handleStatusUpdate(order.id, "processing")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Start Processing
              </button>
            )}
            {order.status === "processing" && (
              <button
                onClick={() => handleStatusUpdate(order.id, "delivered")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Mark as Delivered
              </button>
            )}
            {order.status === "delivered" && (
              <button
                onClick={() => handleStatusUpdate(order.id, "setup_complete")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Complete Setup
              </button>
            )}
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
              View Details
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>


        {/* Inventory Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Inventory Management</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Available Stock</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sofa Sets</span>
                    <span className="font-medium">45 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining Tables</span>
                    <span className="font-medium">32 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bed Sets</span>
                    <span className="font-medium">38 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wardrobes</span>
                    <span className="font-medium">28 units</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Low Stock Alert</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>TV Units</span>
                    <span className="font-medium text-yellow-800">8 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Office Chairs</span>
                    <span className="font-medium text-yellow-800">5 units</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Recent Restocks</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sofa Sets</span>
                    <span className="font-medium text-green-800">+20 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining Tables</span>
                    <span className="font-medium text-green-800">+15 units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}