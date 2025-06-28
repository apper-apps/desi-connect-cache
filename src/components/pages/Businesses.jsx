import React, { useState, useEffect } from 'react';
import { businessService } from '@/services/api/businessService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    'All',
    'Restaurant',
    'Healthcare',
    'Retail',
    'Grocery',
    'Professional Services',
    'Beauty & Wellness',
    'Education',
    'Technology'
  ];

  const locations = ['All', 'Fremont, CA', 'Edison, NJ', 'Sugar Land, TX', 'Jersey City, NJ'];

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await businessService.getAll();
      setBusinesses(data);
      setFilteredBusinesses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  useEffect(() => {
    let filtered = [...businesses];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'All') {
      const [city, state] = selectedLocation.split(', ');
      filtered = filtered.filter(business => 
        business.location.city === city && business.location.state === state
      );
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchQuery, selectedCategory, selectedLocation]);

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Restaurant': 'ChefHat',
      'Healthcare': 'Heart',
      'Retail': 'ShoppingBag',
      'Grocery': 'ShoppingCart',
      'Professional Services': 'Briefcase',
      'Beauty & Wellness': 'Sparkles',
      'Education': 'BookOpen',
      'Technology': 'Laptop'
    };
    return iconMap[category] || 'Store';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Restaurant': 'text-orange-600 bg-orange-100',
      'Healthcare': 'text-red-600 bg-red-100',
      'Retail': 'text-purple-600 bg-purple-100',
      'Grocery': 'text-green-600 bg-green-100',
      'Professional Services': 'text-blue-600 bg-blue-100',
      'Beauty & Wellness': 'text-pink-600 bg-pink-100',
      'Education': 'text-indigo-600 bg-indigo-100',
      'Technology': 'text-gray-600 bg-gray-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadBusinesses} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Indian Business Directory</h1>
        <p className="text-lg text-white text-opacity-90">
          Discover and support Indian-owned businesses in your community
        </p>
      </div>

      {/* Search, Filters and Controls */}
      <div className="bg-surface rounded-xl p-6 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 flex items-center space-x-2 ${
                viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ApperIcon name="Grid3X3" size={16} />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 flex items-center space-x-2 border-l border-gray-300 ${
                viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ApperIcon name="List" size={16} />
              <span>List</span>
            </button>
          </div>

          {/* Add Business Button */}
          <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover:scale-105">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Plus" size={18} />
              <span>Add Business</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.slice(1).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`p-4 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
              selectedCategory === category
                ? 'bg-primary-500 text-white shadow-medium'
                : 'bg-surface border border-gray-200 text-gray-700 hover:shadow-soft'
            }`}
          >
            <ApperIcon 
              name={getCategoryIcon(category)} 
              size={24} 
              className={`mx-auto mb-2 ${selectedCategory === category ? 'text-white' : 'text-primary-500'}`}
            />
            <div className="text-sm font-medium">{category}</div>
          </button>
        ))}
      </div>

      {/* Businesses Display */}
      {filteredBusinesses.length === 0 ? (
        <Empty type="businesses" />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <div key={business.Id} className="bg-surface rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-200 hover:scale-105">
              {/* Business Image */}
              <div className="relative">
                <img
                  src={business.images[0]}
                  alt={business.name}
                  className="w-full h-48 object-cover"
                />
                {business.verified && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-medium">
                    <ApperIcon name="Check" size={16} className="text-white" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(business.category)}`}>
                    <ApperIcon name={getCategoryIcon(business.category)} size={14} className="mr-1" />
                    {business.category}
                  </span>
                </div>
              </div>

              {/* Business Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 line-clamp-1">
                    {business.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {business.description}
                  </p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <ApperIcon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < Math.floor(business.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{business.rating}</span>
                  <span className="text-sm text-gray-500">({business.reviewCount} reviews)</span>
                </div>

                {/* Location and Contact */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="MapPin" size={14} />
                    <span className="truncate">{business.location.city}, {business.location.state}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="Phone" size={14} />
                    <span>{business.contact.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="DollarSign" size={14} />
                    <span className="font-medium">{business.priceRange}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {business.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                    {business.services.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{business.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200">
                    Contact
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <ApperIcon name="Directions" size={18} />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <ApperIcon name="Share2" size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBusinesses.map((business) => (
            <div key={business.Id} className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200">
              <div className="flex items-start space-x-6">
                {/* Business Image */}
                <div className="flex-shrink-0">
                  <img
                    src={business.images[0]}
                    alt={business.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-gray-900 line-clamp-1">
                        {business.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(business.category)}`}>
                          <ApperIcon name={getCategoryIcon(business.category)} size={10} className="mr-1" />
                          {business.category}
                        </span>
                        {business.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <ApperIcon name="Check" size={10} className="mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Star" size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{business.rating}</span>
                      <span className="text-xs text-gray-500">({business.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {business.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="MapPin" size={14} />
                      <span>{business.location.city}, {business.location.state}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Phone" size={14} />
                      <span>{business.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="DollarSign" size={14} />
                      <span className="font-medium">{business.priceRange}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {business.services.slice(0, 4).map((service, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200">
                        Contact
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                        <ApperIcon name="Directions" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Businesses;