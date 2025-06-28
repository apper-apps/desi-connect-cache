import React, { useState, useEffect } from 'react';
import { userService } from '@/services/api/userService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const People = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedProfession, setSelectedProfession] = useState('All');

  const locations = ['All', 'Fremont, CA', 'Edison, NJ', 'Sugar Land, TX'];
  const professions = [
    'All',
    'Software Engineer',
    'Data Scientist',
    'Doctor',
    'Business Analyst',
    'Marketing',
    'Finance',
    'Healthcare',
    'Education'
  ];

  const loadPeople = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userService.getAll();
      setPeople(data);
      setFilteredPeople(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    let filtered = [...people];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by location
    if (selectedLocation !== 'All') {
      const [city, state] = selectedLocation.split(', ');
      filtered = filtered.filter(person => 
        person.location.city === city && person.location.state === state
      );
    }

    // Filter by profession
    if (selectedProfession !== 'All') {
      filtered = filtered.filter(person => 
        person.profession.toLowerCase().includes(selectedProfession.toLowerCase())
      );
    }

    setFilteredPeople(filtered);
  }, [people, searchQuery, selectedLocation, selectedProfession]);

  const handleConnect = async (personId) => {
    try {
      // Simulate connection request
      toast.success('Connection request sent!');
    } catch (err) {
      toast.error('Failed to send connection request');
    }
  };

  const handleMessage = async (personId) => {
    try {
      // Simulate message sending
      toast.success('Message sent!');
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadPeople} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Connect with People</h1>
        <p className="text-lg text-white text-opacity-90">
          Network with Indian professionals and community members in your area
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
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

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

          {/* Profession Filter */}
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {professions.map(profession => (
              <option key={profession} value={profession}>{profession}</option>
            ))}
          </select>
        </div>
      </div>

      {/* People Grid */}
      {filteredPeople.length === 0 ? (
        <Empty type="people" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPeople.map((person) => (
            <div key={person.Id} className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105">
              {/* Profile Picture */}
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full mandala-border mb-3">
                    <img
                      src={person.profilePhoto}
                      alt={person.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {person.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <ApperIcon name="Check" size={12} className="text-white" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
                  {person.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {person.profession}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <ApperIcon name="MapPin" size={14} />
                  <span>{person.location.city}, {person.location.state}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 text-center line-clamp-3">
                  {person.bio}
                </p>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {person.languages.map((language, index) => (
                    <span key={index} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-1 justify-center">
                  {person.interests.slice(0, 3).map((interest, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {interest}
                    </span>
                  ))}
                  {person.interests.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{person.interests.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConnect(person.Id)}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-3 rounded-lg font-medium text-sm hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
                >
                  Connect
                </button>
                <button
                  onClick={() => handleMessage(person.Id)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ApperIcon name="MessageCircle" size={16} />
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <ApperIcon name="MoreHorizontal" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Networking Tips */}
      <div className="bg-gradient-to-r from-accent-400 to-secondary-500 rounded-xl p-8 text-white">
        <div className="text-center">
          <ApperIcon name="Users" size={48} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-display font-bold mb-2">Build Meaningful Connections</h3>
          <p className="text-lg mb-6 opacity-90">
            Connect with fellow Indians for professional growth, cultural exchange, and lasting friendships
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <ApperIcon name="Briefcase" size={32} className="mx-auto mb-2 opacity-80" />
              <h4 className="font-semibold mb-1">Professional Growth</h4>
              <p className="text-sm opacity-80">Network for career opportunities</p>
            </div>
            <div className="text-center">
              <ApperIcon name="Heart" size={32} className="mx-auto mb-2 opacity-80" />
              <h4 className="font-semibold mb-1">Cultural Connection</h4>
              <p className="text-sm opacity-80">Share traditions and values</p>
            </div>
            <div className="text-center">
              <ApperIcon name="Users" size={32} className="mx-auto mb-2 opacity-80" />
              <h4 className="font-semibold mb-1">Community Support</h4>
              <p className="text-sm opacity-80">Help each other succeed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;