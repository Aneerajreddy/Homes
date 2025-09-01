import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square, Trash2 } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export default function FavoritesPage() {
  const { properties, favorites, toggleFavorite } = usePlatform();

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Properties</h1>
          <p className="text-gray-600">Properties you've saved for later consideration</p>
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved properties yet</h3>
            <p className="text-gray-600 mb-6">Start browsing and save properties you're interested in</p>
            <Link
              to="/search"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Browse Properties</span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Furnished
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm flex items-center mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms}
                      </span>
                      <span className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {property.area}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">per month (all inclusive)</div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/property/${property.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}