import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'event',
      title: 'Diwali Celebration this weekend',
      message: 'Join us for the community Diwali celebration in Fremont',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'message',
      title: 'New message from Raj Patel',
      message: 'Hey, I saw your post about software engineering...',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'discussion',
      title: 'Someone replied to your discussion',
      message: 'Great insights on the H1B process!',
      time: '1 day ago',
      unread: false
    }
  ];

  return (
    <header className="bg-surface border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section - Mobile menu and search */}
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" size={24} className="text-gray-600" />
          </button>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ApperIcon name="Search" className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search communities, people, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right section - Actions and notifications */}
        <div className="flex items-center space-x-3">
          {/* Location selector */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
            <ApperIcon name="MapPin" size={16} className="text-primary-500" />
            <span className="text-sm font-medium text-gray-700">Fremont, CA</span>
            <ApperIcon name="ChevronDown" size={16} className="text-gray-500" />
          </div>

          {/* Quick actions */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <ApperIcon name="Plus" size={20} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <ApperIcon name="Bell" size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface rounded-xl shadow-large border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-display font-semibold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-500">You have 2 unread notifications</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-primary-500' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile avatar */}
          <button className="w-8 h-8 rounded-full mandala-border">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Hide notifications dropdown when clicking outside */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
};

export default Header;