import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  type = 'general',
  title,
  message,
  actionLabel,
  onAction,
  icon
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case 'communities':
        return {
          icon: 'Users',
          title: 'No communities found',
          message: 'Discover vibrant Indian communities in your area or create one to bring people together.',
          actionLabel: 'Explore Communities',
          gradient: 'from-primary-500 to-secondary-500'
        };
      case 'events':
        return {
          icon: 'Calendar',
          title: 'No events scheduled',
          message: 'Be the first to organize a cultural celebration or community gathering in your area.',
          actionLabel: 'Create Event',
          gradient: 'from-accent-400 to-primary-500'
        };
      case 'discussions':
        return {
          icon: 'MessageSquare',
          title: 'Start the conversation',
          message: 'Share your thoughts, ask questions, or discuss topics that matter to the community.',
          actionLabel: 'New Discussion',
          gradient: 'from-secondary-500 to-primary-500'
        };
      case 'businesses':
        return {
          icon: 'Store',
          title: 'No businesses found',
          message: 'Help grow our community by adding Indian-owned businesses and services.',
          actionLabel: 'Add Business',
          gradient: 'from-primary-500 to-accent-400'
        };
      case 'people':
        return {
          icon: 'UserCheck',
          title: 'No connections yet',
          message: 'Connect with fellow Indians in your community to build meaningful relationships.',
          actionLabel: 'Explore People',
          gradient: 'from-secondary-500 to-accent-400'
        };
      case 'messages':
        return {
          icon: 'MessageCircle',
          title: 'No messages',
          message: 'Start meaningful conversations with community members and build lasting connections.',
          actionLabel: 'Find People',
          gradient: 'from-accent-400 to-secondary-500'
        };
      default:
        return {
          icon: icon || 'Smile',
          title: title || 'Nothing here yet',
          message: message || 'This area is empty, but it won\'t be for long!',
          actionLabel: actionLabel || 'Get Started',
          gradient: 'from-primary-500 to-secondary-500'
        };
    }
  };

  const config = getEmptyConfig();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 rangoli-pattern opacity-30 pointer-events-none" />
      
      {/* Icon container with gradient background */}
      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-6 shadow-large`}>
        <ApperIcon 
          name={config.icon} 
          size={36} 
          className="text-white"
        />
        <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
        {config.title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {config.message}
      </p>
      
      {/* Action button */}
      {(onAction || config.actionLabel) && (
        <button
          onClick={onAction}
          className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${config.gradient} text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200 shadow-medium hover:shadow-large focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
        >
          <ApperIcon name="Plus" size={18} />
          <span>{config.actionLabel}</span>
        </button>
      )}
      
      {/* Encouraging message */}
      <p className="text-sm text-gray-500 mt-6 italic">
        Every community starts with someone taking the first step 🌟
      </p>
    </div>
  );
};

export default Empty;