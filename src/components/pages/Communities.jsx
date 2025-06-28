import React, { useState, useEffect } from 'react';
import { communityService } from '@/services/api/communityService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const categories = ['All', 'General Community', 'Professional', 'Family & Culture', 'Students', 'Seniors'];
  const locations = ['All', 'California', 'New Jersey', 'Texas', 'New York', 'Illinois'];

  const loadCommunities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await communityService.getAll();
      setCommunities(data);
      setFilteredCommunities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommunities();
  }, []);

  useEffect(() => {
    let filtered = [...communities];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(community =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(community => community.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'All') {
      filtered = filtered.filter(community => community.location.state === selectedLocation);
    }

    setFilteredCommunities(filtered);
  }, [communities, searchQuery, selectedCategory, selectedLocation]);

  const handleJoinCommunity = async (communityId) => {
    try {
      const result = await communityService.joinCommunity(communityId, 1);
      toast.success(result.message);
      // Update community in state
      setCommunities(prev => prev.map(community => 
        community.Id === communityId 
          ? { ...community, memberCount: community.memberCount + 1 }
          : community
      ));
    } catch (err) {
      toast.error('Failed to join community');
    }
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadCommunities} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Discover Communities</h1>
        <p className="text-lg text-white text-opacity-90">
          Find and join Indian communities in your neighborhood
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface rounded-xl p-6 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search communities..."
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
        </div>
      </div>

      {/* Communities Grid */}
      {filteredCommunities.length === 0 ? (
        <Empty type="communities" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div key={community.Id} className="bg-surface rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-200 hover:scale-105">
              {/* Cover Image */}
              <div className="relative">
                <img
                  src={community.coverImage}
                  alt={community.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {community.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {community.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {community.description}
                  </p>
                </div>

                {/* Location and Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="MapPin" size={16} />
                    <span>{community.location.city}, {community.location.state}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Users" size={16} className="text-primary-500" />
                        <span className="font-medium">{community.memberCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="MessageSquare" size={16} className="text-secondary-500" />
                        <span className="font-medium">{community.stats.posts}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Calendar" size={16} className="text-accent-500" />
                        <span className="font-medium">{community.stats.events}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleJoinCommunity(community.Id)}
                    className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover:scale-105"
                  >
                    Join Community
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <ApperIcon name="Eye" size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Community CTA */}
      <div className="bg-gradient-to-r from-accent-400 to-primary-500 rounded-xl p-8 text-white text-center">
        <ApperIcon name="Plus" size={48} className="mx-auto mb-4 opacity-80" />
        <h3 className="text-2xl font-display font-bold mb-2">Start Your Own Community</h3>
        <p className="text-lg mb-6 opacity-90">
          Don't see your neighborhood? Create a community and bring people together!
        </p>
        <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Create Community
        </button>
      </div>
    </div>
  );
};

export default Communities;