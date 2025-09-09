import React from 'react';
import { MapPin, GraduationCap, Heart } from 'lucide-react';

interface GoogleMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  propertyTitle: string;
  className?: string;
}

export default function GoogleMap({ coordinates, propertyTitle, className = "" }: GoogleMapProps) {
  // Mock nearby amenities for demonstration
  const nearbySchools = [
    { name: "Delhi Public School", distance: "0.8 km" },
    { name: "Oakridge International School", distance: "1.2 km" },
    { name: "Chirec International School", distance: "1.5 km" }
  ];

  const nearbyHospitals = [
    { name: "Apollo Hospital", distance: "2.1 km" },
    { name: "Continental Hospital", distance: "2.8 km" },
    { name: "Yashoda Hospital", distance: "3.2 km" }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Location & Nearby Amenities
        </h3>
      </div>

      {/* Mock Map Display */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">{propertyTitle}</div>
            <div className="text-sm text-gray-600">
              Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Interactive Google Maps integration ready
            </div>
          </div>
        </div>
        
        {/* Map Overlay with Property Marker */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-700">Property Location</span>
          </div>
        </div>
      </div>

      {/* Nearby Amenities */}
      <div className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
              Nearby Schools
            </h4>
            <div className="space-y-2">
              {nearbySchools.map((school, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{school.name}</span>
                  <span className="text-green-600 font-medium">{school.distance}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-600" />
              Nearby Hospitals
            </h4>
            <div className="space-y-2">
              {nearbyHospitals.map((hospital, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{hospital.name}</span>
                  <span className="text-red-600 font-medium">{hospital.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">15 min</div>
              <div className="text-xs text-gray-500">to HITEC City</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">8 min</div>
              <div className="text-xs text-gray-500">to Metro Station</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">12 min</div>
              <div className="text-xs text-gray-500">to Airport</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}