import React, { useState, useEffect } from 'react';
import { eventService } from '@/services/api/eventService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    'All',
    'Cultural Celebration',
    'Professional Development',
    'Workshop',
    'Sports',
    'Community Service',
    'Food & Dining',
    'Arts & Entertainment'
  ];

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await eventService.getUpcoming();
      setEvents(data);
      setFilteredEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedCategory]);

  const handleRSVP = async (eventId, status) => {
    try {
      const updatedEvent = await eventService.rsvp(eventId, 1, status);
      setEvents(prev => prev.map(event =>
        event.Id === eventId ? updatedEvent : event
      ));
      toast.success(`RSVP updated: ${status === 'attending' ? 'Attending' : 'Not attending'}`);
    } catch (err) {
      toast.error('Failed to update RSVP');
    }
  };

  const getEventTypeIcon = (category) => {
    const iconMap = {
      'Cultural Celebration': 'Sparkles',
      'Professional Development': 'Briefcase',
      'Workshop': 'BookOpen',
      'Sports': 'Trophy',
      'Community Service': 'Heart',
      'Food & Dining': 'ChefHat',
      'Arts & Entertainment': 'Palette'
    };
    return iconMap[category] || 'Calendar';
  };

  const getEventTypeColor = (category) => {
    const colorMap = {
      'Cultural Celebration': 'text-pink-600 bg-pink-100',
      'Professional Development': 'text-blue-600 bg-blue-100',
      'Workshop': 'text-green-600 bg-green-100',
      'Sports': 'text-orange-600 bg-orange-100',
      'Community Service': 'text-red-600 bg-red-100',
      'Food & Dining': 'text-yellow-600 bg-yellow-100',
      'Arts & Entertainment': 'text-purple-600 bg-purple-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadEvents} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-400 to-secondary-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Community Events</h1>
        <p className="text-lg text-white text-opacity-90">
          Discover and join cultural celebrations, workshops, and community gatherings
        </p>
      </div>

      {/* Search, Filters and Controls */}
      <div className="bg-surface rounded-xl p-6 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
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

          {/* Create Event Button */}
          <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover:scale-105">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Plus" size={18} />
              <span>Create Event</span>
            </div>
          </button>
        </div>
      </div>

      {/* Events Display */}
      {filteredEvents.length === 0 ? (
        <Empty type="events" />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.Id} className="bg-surface rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-200 hover:scale-105">
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white rounded-lg p-2 text-center shadow-medium">
                    <div className="text-xs font-medium text-gray-600 uppercase">
                      {format(new Date(event.date), 'MMM')}
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {format(new Date(event.date), 'd')}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.category)}`}>
                    <ApperIcon name={getEventTypeIcon(event.category)} size={12} className="mr-1" />
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {event.description}
                  </p>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="Clock" size={16} />
                    <span>{format(new Date(event.date), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="MapPin" size={16} />
                    <span className="truncate">{event.location.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Users" size={16} className="text-primary-500" />
                      <span>{event.attendees.length}/{event.capacity} attending</span>
                    </div>
                    
                    {event.ticketPrice === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="text-gray-700 font-medium">${event.ticketPrice}</span>
                    )}
                  </div>
                </div>

                {/* RSVP Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleRSVP(event.Id, 'attending')}
                    className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover:scale-105"
                  >
                    RSVP Yes
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
          {filteredEvents.map((event) => (
            <div key={event.Id} className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200">
              <div className="flex items-start space-x-6">
                {/* Date */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex flex-col items-center justify-center text-primary-600">
                    <span className="text-xs font-medium uppercase">
                      {format(new Date(event.date), 'MMM')}
                    </span>
                    <span className="text-xl font-bold">
                      {format(new Date(event.date), 'd')}
                    </span>
                  </div>
                </div>

                {/* Event Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-display font-semibold text-gray-900 line-clamp-1">
                      {event.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.category)}`}>
                      <ApperIcon name={getEventTypeIcon(event.category)} size={12} className="mr-1" />
                      {event.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Clock" size={14} />
                      <span>{format(new Date(event.date), 'h:mm a')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="MapPin" size={14} />
                      <span>{event.location.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Users" size={14} />
                      <span>{event.attendees.length} attending</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {event.ticketPrice === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="text-gray-700 font-medium">${event.ticketPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleRSVP(event.Id, 'attending')}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
                    >
                      RSVP Yes
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
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

export default Events;