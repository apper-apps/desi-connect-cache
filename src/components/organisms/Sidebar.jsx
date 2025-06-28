import React from 'react';
import { NavLink } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ onClose }) => {
  const navigationItems = [
    { 
      path: '/', 
      icon: 'Home', 
      label: 'Dashboard',
      description: 'Your community feed'
    },
    { 
      path: '/communities', 
      icon: 'Users', 
      label: 'Communities',
      description: 'Find your neighborhood'
    },
    { 
      path: '/discussions', 
      icon: 'MessageSquare', 
      label: 'Discussions',
      description: 'Join conversations'
    },
    { 
      path: '/events', 
      icon: 'Calendar', 
      label: 'Events',
      description: 'Cultural celebrations'
    },
    { 
      path: '/businesses', 
      icon: 'Store', 
      label: 'Businesses',
      description: 'Indian-owned directory'
    },
    { 
      path: '/people', 
      icon: 'UserCheck', 
      label: 'People',
      description: 'Connect & network'
    },
    { 
      path: '/messages', 
      icon: 'MessageCircle', 
      label: 'Messages',
      description: 'Private conversations',
      badge: 3
    },
  ];

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Logo and brand */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full cultural-gradient flex items-center justify-center">
            <ApperIcon name="Heart" className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-gray-900">Desi Connect</h1>
            <p className="text-xs text-gray-500">Building bridges</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ApperIcon name="X" size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center justify-between p-3 rounded-xl transition-all duration-200 group hover:scale-102
                ${isActive 
                  ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-medium hover:shadow-large' 
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <ApperIcon 
                  name={item.icon} 
                  size={20} 
                  className="group-hover:scale-110 transition-transform"
                />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </div>
              {item.badge && (
                <span className="bg-accent-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User profile section */}
      <div className="p-4 border-t border-gray-100">
        <NavLink 
          to="/profile"
          onClick={onClose}
          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full mandala-border">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">Priya Sharma</p>
            <p className="text-sm text-gray-500 truncate">Software Engineer</p>
          </div>
          <ApperIcon 
            name="Settings" 
            size={16} 
            className="text-gray-400 group-hover:text-primary-500 transition-colors"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;