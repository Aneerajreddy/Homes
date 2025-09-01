import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, Grid, List, Heart, Bed, Bath, Square, Star } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { useAuth } from '../context/AuthContext';

export default function PropertySearchPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { properties, toggleFavorite, favorites } = usePlatform();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('location') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'all',
    amenities: [] as string[]
  });

  const filteredProperties = properties.filter(property => {
    if (property.status !== 'verified') return false;
    
    const matchesSearch = !searchTerm || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
    const matchesBedrooms = filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;
    const matchesBathrooms = filters.bathrooms === 0 || property.bathrooms >= filters.bathrooms;
    
    return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ location: searchTerm });
  };

  const handleFavoriteToggle = (propertyId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite(propertyId);
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city, area, or landmark..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <div className="text-sm text-gray-600">
              {filteredProperties.length} properties found
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Properties</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{filters.maxPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+ Bedroom</option>
                  <option value={2}>2+ Bedrooms</option>
                  <option value={3}>3+ Bedrooms</option>
                  <option value={4}>4+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({ ...filters, bathrooms: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+ Bathroom</option>
                  <option value={2}>2+ Bathrooms</option>
                  <option value={3}>3+ Bathrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">Independent House</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Properties Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                />
              </div>
              
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                  <button
                    onClick={() => handleFavoriteToggle(property.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite(property.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                  </button>
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
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Furnished
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">per month (all inclusive)</div>
                  </div>
                  <button
                    onClick={() => navigate(`/property/${property.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  minPrice: 0,
                  maxPrice: 100000,
                  bedrooms: 0,
                  bathrooms: 0,
                  propertyType: 'all',
                  amenities: []
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}