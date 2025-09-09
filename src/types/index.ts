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
  coordinates: {
    lat: number;
    lng: number;
  };
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