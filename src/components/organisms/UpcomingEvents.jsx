import React from 'react';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const UpcomingEvents = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="bg-surface rounded-xl p-6 shadow-soft">
        <h3 className="font-display font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <Empty type="events" />
      </div>
    );
  }

  const getEventTypeIcon = (category) => {
    const iconMap = {
      'Cultural Celebration': 'Sparkles',
      'Professional Development': 'Briefcase',
      'Workshop': 'BookOpen',
      'Sports': 'Trophy',
      'Community Service': 'Heart',
      'Food & Dining': 'ChefHat'
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
      'Food & Dining': 'text-yellow-600 bg-yellow-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-gray-900">Upcoming Events</h3>
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.Id} className="group p-4 rounded-lg border border-gray-200 hover:border-primary-200 hover:shadow-soft transition-all duration-200 cursor-pointer">
            {/* Event Header */}
            <div className="flex items-start space-x-3 mb-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center text-primary-600">
                  <span className="text-xs font-medium uppercase">
                    {format(new Date(event.date), 'MMM')}
                  </span>
                  <span className="text-lg font-bold leading-none">
                    {format(new Date(event.date), 'd')}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-primary-600 transition-colors line-clamp-2">
                  {event.title}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.category)}`}>
                    <ApperIcon name={getEventTypeIcon(event.category)} size={10} className="mr-1" />
                    {event.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Clock" size={14} />
                <span>{format(new Date(event.date), 'h:mm a')}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <ApperIcon name="MapPin" size={14} />
                <span className="truncate">{event.location.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Users" size={14} />
                  <span>{event.attendees.length} attending</span>
                </div>
                
                {event.ticketPrice === 0 ? (
                  <span className="text-green-600 font-medium text-xs">Free</span>
                ) : (
                  <span className="text-gray-700 font-medium text-xs">${event.ticketPrice}</span>
                )}
              </div>
            </div>

            {/* RSVP Button */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button className="w-full py-2 px-3 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors">
                RSVP Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;