import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  ownerId: string;
  status: 'pending' | 'verified' | 'rented';
  furnitureIncluded: boolean;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'tenant' | 'owner' | 'furniture' | 'admin';
  verified: boolean;
}

export interface FurnitureOrder {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'pending' | 'processing' | 'delivered' | 'setup_complete';
  deliveryDate: string;
  items: string[];
  totalCost: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  startDate: string;
  duration: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed';
  furnitureOrderId: string;
}

interface PlatformContextType {
  properties: Property[];
  users: User[];
  furnitureOrders: FurnitureOrder[];
  bookings: Booking[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'furnitureOrderId'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updateFurnitureOrderStatus: (id: string, status: FurnitureOrder['status']) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Family Apartment',
      location: 'Downtown, Mumbai',
      price: 45000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      images: ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'],
      amenities: ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Sofa Set', 'Dining Table & Chairs', 'Double Bed with Mattress', 'Wardrobe', 'TV Unit', 'Refrigerator', 'Microwave', 'Washing Machine', 'Air Conditioner', 'LED TV', 'Wi-Fi Router'],
      ownerId: 'owner1',
      status: 'verified',
      furnitureIncluded: true,
      description: 'Spacious family apartment with modern amenities and great connectivity.'
    },
    {
      id: '2',
      title: 'Luxury Villa',
      location: 'Banjara Hills, Hyderabad',
      price: 75000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
      amenities: ['Garden', 'Parking', 'Security', 'Sofa Set', 'Dining Table & Chairs', 'Double Bed with Mattress', 'Single Bed with Mattress', 'Wardrobe', 'Study Table & Chair', 'TV Unit', 'Coffee Table', 'Refrigerator', 'Microwave', 'Induction Cooktop', 'Washing Machine', 'Air Conditioner', 'Water Heater (Geyser)', 'LED TV', 'Wi-Fi Router'],
      ownerId: 'owner2',
      status: 'verified',
      furnitureIncluded: true,
      description: 'Luxurious villa perfect for large families with private garden.'
    }
  ]);

  const [users] = useState<User[]>([
    { id: 'tenant1', name: 'Amit Sharma', email: 'amit@email.com', phone: '+91-9876543210', role: 'tenant', verified: true },
    { id: 'owner1', name: 'Priya Singh', email: 'priya@email.com', phone: '+91-9876543211', role: 'owner', verified: true },
    { id: 'furniture1', name: 'FurniCorp Ltd', email: 'orders@furnicorp.com', phone: '+91-9876543212', role: 'furniture', verified: true },
    { id: 'admin1', name: 'System Admin', email: 'admin@platform.com', phone: '+91-9876543213', role: 'admin', verified: true }
  ]);

  const [furnitureOrders, setFurnitureOrders] = useState<FurnitureOrder[]>([
    {
      id: 'fo1',
      propertyId: '1',
      tenantId: 'tenant1',
      status: 'delivered',
      deliveryDate: '2024-01-15',
      items: ['Sofa Set', 'Dining Table', 'Bed Set', 'Wardrobe', 'TV Unit'],
      totalCost: 15000
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'b1',
      propertyId: '1',
      tenantId: 'tenant1',
      ownerId: 'owner1',
      startDate: '2024-01-15',
      duration: 12,
      totalAmount: 540000,
      status: 'active',
      furnitureOrderId: 'fo1'
    }
  ]);

  const addProperty = (propertyData: Omit<Property, 'id'>) => {
    const newProperty = {
      ...propertyData,
      id: `prop_${Date.now()}`,
      status: 'pending' as const,
      furnitureIncluded: true
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, ...updates } : prop
    ));
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'furnitureOrderId'>) => {
    const bookingId = `booking_${Date.now()}`;
    const furnitureOrderId = `fo_${Date.now()}`;
    
    const newFurnitureOrder: FurnitureOrder = {
      id: furnitureOrderId,
      propertyId: bookingData.propertyId,
      tenantId: bookingData.tenantId,
      status: 'pending',
      deliveryDate: bookingData.startDate,
      items: ['Sofa Set', 'Dining Table', 'Bed Set', 'Wardrobe', 'TV Unit'],
      totalCost: 15000
    };

    const newBooking = {
      ...bookingData,
      id: bookingId,
      furnitureOrderId,
      status: 'confirmed' as const
    };

    setFurnitureOrders(prev => [...prev, newFurnitureOrder]);
    setBookings(prev => [...prev, newBooking]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const updateFurnitureOrderStatus = (id: string, status: FurnitureOrder['status']) => {
    setFurnitureOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  return (
    <PlatformContext.Provider value={{
      properties,
      users,
      furnitureOrders,
      bookings,
      addProperty,
      updateProperty,
      createBooking,
      updateBookingStatus,
      updateFurnitureOrderStatus
    }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}